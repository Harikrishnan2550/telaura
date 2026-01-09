import Hero from "@/components/home/Hero";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import Services from "@/components/home/Services";
import Products from "@/components/home/Products";
import WhatsAppCTA from "@/components/home/WhatsAppCTA";

export const metadata = {
  title: "Telaura | Premium Mobiles & Gadgets – Dubai & Kerala",
  description:
    "Telaura offers new and used mobile phones, gadgets, accessories, and mobile services in Dubai and Kerala.",
};

export default function Home() {
  return (
    <main>
      <Hero />
      <WhyChooseUs />
      <Services />
      <Products />
      <WhatsAppCTA />
    </main>
  );
}
