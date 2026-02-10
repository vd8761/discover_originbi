"use client";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Problem from "@/components/sections/Problem";
import WhatIsIt from "@/components/sections/WhatIsIt";
import WhyThisMatters from "@/components/sections/WhyThisMatters";
import DiscoverYourself from "@/components/sections/DiscoverYourself";

import HowItWorks from "@/components/sections/HowItWorks";
import WhereCanItLead from "@/components/sections/WhereCanItLead";
import Outcomes from "@/components/sections/Outcomes";
import WhoIsItFor from "@/components/sections/WhoIsItFor";
import Impact from "@/components/sections/Impact";
import SchoolIntegration from "@/components/sections/SchoolIntegration";
import Testimonials from "@/components/sections/Testimonials";


export default function Home() {
  return (
    <div className="relative w-full overflow-x-hidden flex flex-col min-h-screen bg-white dark:bg-brand-dark-primary transition-colors duration-500">
      <Header />

      <Hero />
      <Problem />
      <WhatIsIt />
      <WhyThisMatters />
      <DiscoverYourself />
      <HowItWorks />
      <WhereCanItLead />
      <Outcomes />
      <WhoIsItFor />
      <Impact />
      <SchoolIntegration />
      <Testimonials />


      <Footer />
    </div>
  );
}
