"use client";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import SoundFamiliar from "@/components/sections/SoundFamiliar";
import JourneySteps from "@/components/sections/JourneySteps";
import WhyOriginBI from "@/components/sections/WhyOriginBI";
import IndustryExperts from "@/components/sections/IndustryExperts";
import CareerValueCard from "@/components/sections/CareerValueCard";
import FAQSection from "@/components/sections/FAQSection";
import Testimonials from "@/components/sections/Testimonials";
import FinalCTASection from "@/components/sections/FinalCTASection";



export default function Home() {
  return (
    <div className="relative w-full overflow-x-clip flex flex-col min-h-screen bg-white dark:bg-brand-dark-primary transition-colors duration-500">
      <Header />

      <Hero />
      <SoundFamiliar />
      <JourneySteps />
      <WhyOriginBI />
      <IndustryExperts />
      <CareerValueCard />
      <Testimonials />
      <FAQSection />

      <FinalCTASection />

      <Footer />
    </div>
  );
}
