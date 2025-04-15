import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ServicesSection from '@/components/ServicesSection';
import ProgramsSection from '@/components/ProgramsSection';
import AdvantagesSection from '@/components/AdvantagesSection';
import BeforeAfterSection from '@/components/BeforeAfterSection';
import PricingSection from '@/components/PricingSection';
import FaqSection from '@/components/FaqSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import VideoSection from '@/components/VideoSection';

export default function Home() {
  return (
    <main>
      <Header />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <ProgramsSection />
      <AdvantagesSection />
      <VideoSection />
      <BeforeAfterSection />
      <PricingSection />
      <FaqSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
