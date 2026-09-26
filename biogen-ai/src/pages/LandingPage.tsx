import { motion } from "motion/react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import FeatureStrip from "../components/FeatureStrip";
import ToolsSection from "../components/ToolsSection";
import WhyChooseSection from "../components/WhyChooseSection";
import HowItWorksSection from "../components/HowItWorksSection";
import CTASection from "../components/CTASection";
import Footer from "../components/Footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-bg-main font-sans">
      <Navbar />
      
      <main className="flex-1">
        <Hero />
        
        <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12">
          <FeatureStrip />
          <ToolsSection />
          <WhyChooseSection />
          <HowItWorksSection />
          <CTASection />
        </div>
      </main>

      <Footer />
    </div>
  );
}
