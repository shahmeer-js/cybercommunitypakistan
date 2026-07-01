import React from "react";
import HeroSection from "./_home-feature/components/hero";
import HomeEvents from "./_home-feature/components/home-events";

const Home = () => {
  return (
    <>
      <HeroSection />
      <section className="flex flex-wrap items-center px-12">
        <HomeEvents />
      </section>
    </>
  );
};

export default Home;
