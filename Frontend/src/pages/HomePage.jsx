import React from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { CategoryGrid } from '../components/home/CategoryGrid';
import { FeaturedProperties } from '../components/home/FeaturedProperties';
import { LocationGrid } from '../components/home/LocationGrid';
import { WhyRentEasee } from '../components/home/WhyRentEasee';
import { HowItWorks } from '../components/home/HowItWorks';
import { Testimonials } from '../components/home/Testimonials';
import { CtaSection } from '../components/home/CtaSection';

export const HomePage = () => {
  return (
    <div className="space-y-0">
      <HeroSection />
      <CategoryGrid />
      <FeaturedProperties />
      <LocationGrid />
      <WhyRentEasee />
      <HowItWorks />
      <Testimonials />
      <CtaSection />
    </div>
  );
};
