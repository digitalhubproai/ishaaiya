import { Hero } from "@/components/site/hero";
import { Ticker } from "@/components/site/ticker";
import { DealsSection } from "@/components/site/deals";
import { MenuSection } from "@/components/site/menu-section";
import { AboutSection } from "@/components/site/about";
import { Testimonials } from "@/components/site/testimonials";
import { ContactSection } from "@/components/site/contact";

export default function Home() {
  return (
    <>
      <Hero />
      <Ticker />
      <DealsSection />
      <MenuSection />
      <AboutSection />
      <Testimonials />
      <ContactSection />
    </>
  );
}