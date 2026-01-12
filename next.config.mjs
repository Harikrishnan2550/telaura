/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", // ✅ makes project static (creates /out folder)
  images: {
    unoptimized: true, // ✅ required for shared hosting/static export
  },
};

export default nextConfig;
