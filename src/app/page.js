"use client";
import React from "react";
import Vision from "./components/vision";
import Test from "./components/api";
const Home = () => {
  return (
    <>
      <main className="h-screen w-screen flex flex-col items-center justify-center gap-5">
        <Vision />
      </main>
    </>
  );
};

export default Home;
