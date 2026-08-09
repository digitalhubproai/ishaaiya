import { Hero } from "@/components/site/hero";
import { Ticker } from "@/components/site/ticker";
import { WaveDivider } from "@/components/site/wave-divider";
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
      <WaveDivider className="text-[#241813] bg-[#120f0d]" />
      <MenuSection />
      <WaveDivider flip className="text-[#120f0d] bg-[#0d0b09]" />
      <AboutSection />
      <Testimonials />
      <ContactSection />
    </>
  );
}