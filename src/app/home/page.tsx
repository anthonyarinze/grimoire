import React from "react";
import HeroSection from "../components/homepage/herosection";
import HowItWorksSection from "../components/homepage/howitworks";
import FeaturedBooksGrid from "../components/homepage/featuredbooks";
import UserWelcomeSection from "../components/homepage/userwelcome";

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <UserWelcomeSection />
      <HowItWorksSection />
      <FeaturedBooksGrid />
    </main>
  );
}
