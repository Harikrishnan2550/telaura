"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Camera,
  Mesh,
  Plane,
  Program,
  Renderer,
  Texture,
  Transform,
} from "ogl";

// === HELPER FUNCTIONS ===
function debounce(func, wait) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

function lerp(p1, p2, t) {
  return p1 + (p2 - p1) * t;
}

function autoBind(instance) {
  const proto = Object.getPrototypeOf(instance);
  Object.getOwnPropertyNames(proto).forEach((key) => {
    if (key !== "constructor" && typeof instance[key] === "function") {
      instance[key] = instance[key].bind(instance);
    }
  });
}

function createTextTexture(gl, text, font = "bold 48px Figtree", color = "#ffffff") {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  ctx.font = font;

  const metrics = ctx.measureText(text);
  const width = Math.ceil(metrics.width + 60);
  const height = Math.ceil(parseInt(font.match(/\d+/)?.[0] || 48, 10) * 1.6);

  canvas.width = width;
  canvas.height = height;

  ctx.font = font;
  ctx.fillStyle = color;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text, width / 2, height / 2);

  const texture = new Texture(gl, { generateMipmaps: false });
  texture.image = canvas;

  return { texture, width, height };
}

// === TITLE CLASS ===
class Title {
  constructor({ gl, plane, renderer, text, font = "bold 48px Figtree", color = "#ffffff" }) {
    autoBind(this);
    this.gl = gl;
    this.plane = plane;
    this.renderer = renderer;
    this.text = text;
    this.font = font;
    this.color = color;
    this.createMesh();
  }

  createMesh() {
    const { texture, width, height } = createTextTexture(this.gl, this.text, this.font, this.color);

    const geometry = new Plane(this.gl);
    const program = new Program(this.gl, {
      vertex: `
        attribute vec3 position;
        attribute vec2 uv;
        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragment: `
        precision highp float;
        uniform sampler2D tMap;
        varying vec2 vUv;
        void main() {
          vec4 color = texture2D(tMap, vUv);
          if (color.a < 0.1) discard;
          gl_FragColor = color;
        }
      `,
      uniforms: { tMap: { value: texture } },
      transparent: true,
    });

    this.mesh = new Mesh(this.gl, { geometry, program });

    const aspect = width / height;
    const textScale = this.plane.scale.y * 0.18;
    this.mesh.scale.set(textScale * aspect, textScale, 1);
    this.mesh.position.y = -this.plane.scale.y * 0.5 - textScale * 0.6;
    this.mesh.setParent(this.plane);
  }
}

// === MEDIA CLASS ===
class Media {
  constructor({
    gl,
    scene,
    geometry,
    image,
    text,
    index,
    length,
    renderer,
    screen,
    viewport,
    bend = 3,
    borderRadius = 0.08,
  }) {
    this.gl = gl;
    this.scene = scene;
    this.geometry = geometry;
    this.image = image;
    this.text = text;
    this.index = index;
    this.length = length;
    this.renderer = renderer;
    this.screen = screen;
    this.viewport = viewport;
    this.bend = bend;
    this.borderRadius = borderRadius;

    this.extra = 0;
    this.widthTotal = 0;

    this.createShader();
    this.createMesh();
    this.createTitle();
    this.onResize();
  }

  createShader() {
    const texture = new Texture(this.gl);
    this.program = new Program(this.gl, {
      vertex: `
        precision highp float;
        attribute vec3 position;
        attribute vec2 uv;
        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;
        uniform float uTime;
        uniform float uSpeed;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          vec3 pos = position;
          float wave = sin(pos.x * 3.0 + uTime) * 0.1;
          pos.z += wave * uSpeed;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragment: `
        precision highp float;
        uniform sampler2D tMap;
        uniform vec2 uImageSizes;
        uniform vec2 uPlaneSizes;
        uniform float uBorderRadius;
        varying vec2 vUv;

        void main() {
          vec2 ratio = vec2(
            min(uPlaneSizes.x / uPlaneSizes.y / (uImageSizes.x / uImageSizes.y), 1.0),
            min(uPlaneSizes.y / uPlaneSizes.x / (uImageSizes.y / uImageSizes.x), 1.0)
          );

          vec2 uv = vec2(
            vUv.x * ratio.x + (1.0 - ratio.x) * 0.5,
            vUv.y * ratio.y + (1.0 - ratio.y) * 0.5
          );

          vec4 tex = texture2D(tMap, uv);

          vec2 size = uPlaneSizes / 2.0;
          vec2 center = vUv - 0.5;
          float dist = length(max(abs(center) - size + uBorderRadius, 0.0)) - uBorderRadius;
          float alpha = 1.0 - smoothstep(-0.01, 0.01, dist);

          gl_FragColor = vec4(tex.rgb, tex.a * alpha);
        }
      `,
      uniforms: {
        tMap: { value: texture },
        uImageSizes: { value: [1, 1] },
        uPlaneSizes: { value: [1, 1] },
        uTime: { value: 0 },
        uSpeed: { value: 0 },
        uBorderRadius: { value: this.borderRadius },
      },
      transparent: true,
    });

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = this.image;
    img.onload = () => {
      texture.image = img;
      this.program.uniforms.uImageSizes.value = [img.naturalWidth, img.naturalHeight];
    };
  }

  createMesh() {
    this.mesh = new Mesh(this.gl, { geometry: this.geometry, program: this.program });
    this.mesh.setParent(this.scene);
  }

  createTitle() {
    if (this.text) {
      this.title = new Title({
        gl: this.gl,
        plane: this.mesh,
        renderer: this.renderer,
        text: this.text,
        font: "bold 42px Figtree",
        color: "#ffffff",
      });
    }
  }

  onResize({ screen, viewport } = {}) {
    if (screen) this.screen = screen;
    if (viewport) this.viewport = viewport;

    const scale = this.screen.height / 1200;
    this.mesh.scale.x = (this.viewport.width * (0.7 * scale)) / this.screen.width;
    this.mesh.scale.y = (this.viewport.height * (0.9 * scale)) / this.screen.height;

    this.program.uniforms.uPlaneSizes.value = [this.mesh.scale.x, this.mesh.scale.y];

    this.width = this.mesh.scale.x + 0.5;
    this.widthTotal = this.width * this.length;
    this.mesh.position.x = this.width * this.index;
  }

  update(scroll, direction) {
    this.mesh.position.x = this.width * this.index + this.extra - scroll.current;

    const planeOffset = this.mesh.scale.x / 2;
    const viewportOffset = this.viewport.width / 2;

    this.isBefore = this.mesh.position.x + planeOffset < -viewportOffset;
    this.isAfter = this.mesh.position.x - planeOffset > viewportOffset;

    if (direction === "right" && this.isBefore) {
      this.extra -= this.widthTotal;
    }
    if (direction === "left" && this.isAfter) {
      this.extra += this.widthTotal;
    }

    this.program.uniforms.uTime.value += 0.03;
    this.program.uniforms.uSpeed.value = Math.abs(scroll.current - scroll.last) * 0.1;
  }
}

// === MAIN GALLERY ENGINE ===
class GalleryApp {
  constructor(container, items = [], bend = 3) {
    this.container = container;
    this.items = items.length ? items.concat(items) : []; // duplicate for infinite loop
    this.bend = bend;

    this.scroll = { current: 0, target: 0, last: 0, ease: 0.08 };
    this.isDown = false;
    this.startX = 0;

    this.createRenderer();
    this.createCamera();
    this.createScene();
    this.createGeometry();
    this.createMedias();
    this.onResize();

    this.update();
    this.addEventListeners();
  }

  createRenderer() {
    this.renderer = new Renderer({ dpr: Math.min(devicePixelRatio, 2), alpha: true, antialias: true });
    this.gl = this.renderer.gl;
    this.gl.clearColor(1, 1, 1, 0);
    this.container.appendChild(this.gl.canvas);
  }

  createCamera() {
    this.camera = new Camera(this.gl);
    this.camera.position.z = 5;
  }

  createScene() {
    this.scene = new Transform();
  }

  createGeometry() {
    this.geometry = new Plane(this.gl, { widthSegments: 20, heightSegments: 40 });
  }

  createMedias() {
    this.medias = this.items.map((item, i) => {
      return new Media({
        gl: this.gl,
        scene: this.scene,
        geometry: this.geometry,
        image: item.image,
        text: item.title,
        index: i,
        length: this.items.length,
        renderer: this.renderer,
        screen: this.screen,
        viewport: this.viewport,
        bend: this.bend,
        borderRadius: 0.08,
      });
    });
  }

  onResize() {
    this.screen = {
      width: this.container.clientWidth,
      height: this.container.clientHeight,
    };

    this.renderer.setSize(this.screen.width, this.screen.height);
    this.camera.perspective({ aspect: this.screen.width / this.screen.height });

    const fov = (this.camera.fov * Math.PI) / 180;
    const height = 2 * Math.tan(fov / 2) * this.camera.position.z;
    const width = height * this.camera.aspect;

    this.viewport = { width, height };

    if (this.medias) {
      this.medias.forEach((media) => media.onResize({ screen: this.screen, viewport: this.viewport }));
    }
  }

  onTouchDown(e) {
    this.isDown = true;
    this.startX = e.touches ? e.touches[0].clientX : e.clientX;
    this.scroll.position = this.scroll.current;
  }

  onTouchMove(e) {
    if (!this.isDown) return;
    const x = e.touches ? e.touches[0].clientX : e.clientX;
    const distance = (this.startX - x) * 2.5;
    this.scroll.target = this.scroll.position + distance;
  }

  onTouchUp() {
    this.isDown = false;
  }

  onWheel(e) {
    this.scroll.target += e.deltaY * 0.8;
  }

  update() {
    this.scroll.current = lerp(this.scroll.current, this.scroll.target, this.scroll.ease);
    const direction = this.scroll.current > this.scroll.last ? "right" : "left";

    if (this.medias) {
      this.medias.forEach((media) => media.update(this.scroll, direction));
    }

    this.renderer.render({ scene: this.scene, camera: this.camera });
    this.scroll.last = this.scroll.current;

    requestAnimationFrame(this.update.bind(this));
  }

  addEventListeners() {
    window.addEventListener("resize", debounce(this.onResize.bind(this), 100));
    window.addEventListener("wheel", this.onWheel.bind(this));
    window.addEventListener("mousedown", this.onTouchDown.bind(this));
    window.addEventListener("mousemove", this.onTouchMove.bind(this));
    window.addEventListener("mouseup", this.onTouchUp.bind(this));
    window.addEventListener("touchstart", this.onTouchDown.bind(this));
    window.addEventListener("touchmove", this.onTouchMove.bind(this));
    window.addEventListener("touchend", this.onTouchUp.bind(this));
  }

  destroy() {
    cancelAnimationFrame(this.update);
    if (this.gl?.canvas?.parentNode) {
      this.gl.canvas.parentNode.removeChild(this.gl.canvas);
    }
  }
}

// === FINAL COMPONENT ===
export default function ProductsSection() {
  const containerRef = useRef(null);

  const products = [
    { image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-1inch-naturaltitanium?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1692910040844", title: "iPhone Series" },
    { image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp-14-spacegray-select-202310?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1697239362529", title: "Premium Laptops" },
    { image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/airpods-pro-2-select-202409?wid=400&hei=400&fmt=jpeg&qlt=90&.v=1724369387133", title: "Accessories" },
    { image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/watch-ultra2-49-titanium-alpine-loop-blue-202409?wid=400&hei=400&fmt=jpeg&qlt=90&.v=1724369387133", title: "Smart Watches" },
    { image: "https://m.media-amazon.com/images/I/81p4nB1tU8L._AC_SL1500_.jpg", title: "Android Phones" },
    { image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-pro-finish-select-202405-13inch-spaceblack?wid=400&hei=400&fmt=jpeg&qlt=90&.v=1724369387133", title: "Tablets" },
  ];

  useEffect(() => {
    if (!containerRef.current || products.length === 0) return;

    const app = new GalleryApp(containerRef.current, products, 3);

    return () => {
      app.destroy();
    };
  }, []);

  return (
    <section className="bg-white py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 lg:mb-24 gap-8">
          <div className="max-w-xl">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="text-xs uppercase tracking-[0.4em] text-neutral-500 font-semibold block mb-4"
            >
              Our Collection
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2 }}
              className="text-5xl md:text-6xl lg:text-7xl font-light tracking-tight text-black"
            >
              Curated <span className="font-serif italic text-neutral-600">Tech</span>
            </motion.h2>
          </div>
          <Link
            href="/products"
            className="text-sm uppercase tracking-widest font-medium text-black border-b-2 border-black pb-1 hover:border-neutral-400 transition"
          >
            View All Products →
          </Link>
        </div>

        {/* Gallery Canvas */}
        <div
          ref={containerRef}
          className="w-full h-[500px] sm:h-[600px] md:h-[700px] lg:h-[850px] overflow-hidden relative cursor-grab active:cursor-grabbing rounded-2xl shadow-2xl bg-neutral-50"
        />
      </div>
    </section>
  );
}