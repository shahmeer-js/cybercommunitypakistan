import React from "react";
import HeroSection from "@/app/_home-feature/components/hero";
import HomeEvents from "./_home-feature/components/home-events";

const Home = () => {
  return (
    <main className="pb-24">
      <HeroSection />

      <section className="flex flex-wrap items-center px-12">
        <HomeEvents />
      </section>
    </main>
  );
};

export default Home;
