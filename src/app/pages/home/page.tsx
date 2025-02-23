import TrendingBooks from "@/app/components/trendingbooks/trendingbooks";
import Carousel from "@/app/components/carousel/carouselslider";
import React from "react";

export default function HomePage() {
  return (
    <main>
      <Carousel />
      <TrendingBooks />
    </main>
  );
}
