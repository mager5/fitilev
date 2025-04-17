import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ServicesSection from '@/components/ServicesSection';
import ProgramsSection from '@/components/ProgramsSection';
import AdvantagesSection from '@/components/AdvantagesSection';
import VideoSection from '@/components/VideoSection';
import BeforeAfterSection from '@/components/BeforeAfterSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import ScheduleSection from '@/components/ScheduleSection';
import PricingSection from '@/components/PricingSection';
import FaqSection from '@/components/FaqSection';
import ContactSection from '@/components/ContactSection';
import BlogSection from '@/components/BlogSection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Header />
      <main id="main" className="main-content" tabIndex={-1}>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <ProgramsSection />
        <AdvantagesSection />
        <VideoSection />
        <BeforeAfterSection />
        <TestimonialsSection />
        <ScheduleSection />
        <PricingSection />
        <FaqSection />
        <BlogSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
