"use client";

import { useState, useEffect, useCallback } from "react";
import { Loader } from "@/components/loader";
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { AboutSection } from "@/components/about-section";
import { FeaturedStories } from "@/components/featured-stories";
import { Footer } from "@/components/footer";
import { FullPageScroll } from "@/components/full-page-scroll";

export default function Home() {
  const [loading, setLoading] = useState(true);

  const handleLoadComplete = () => {
    setLoading(false);
  };

  const handleHeroScrollClick = useCallback(() => {
    // Scroll to the about section
    document.getElementById('about-section')?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const sections = [
    {
      id: "hero-section",
      component: <Hero onScrollClick={handleHeroScrollClick} />
    },
    {
      id: "about-section",
      component: <AboutSection />
    },
    {
      id: "featured-stories-section",
      component: <FeaturedStories />
    },
    {
      id: "footer-section",
      component: <Footer />
    }
  ];

  return (
    <main className="relative">
      <Loader onLoadComplete={handleLoadComplete} />

      {!loading && (
        <>
          <Navbar />
          <FullPageScroll sections={sections} />
        </>
      )}
    </main>
  );
}
