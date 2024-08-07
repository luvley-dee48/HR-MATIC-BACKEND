import React from "react";
import Navbar from "../components/Navbar";
import womanImage from "../assets/images/womanImage.png"; // Ensure you have the correct path to the image

export default function HRMaticSolutions() {
  return (
    <>
      <Navbar />
      <div className="container mx-auto mt-24 px-6 py-12 max-w-6xl">
        <section className="flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 text-left">
            <h1 className="text-6xl font-semibold leading-normal">
              HR Solutions that <span className="text-purple-600">Scale With Your Business</span>
            </h1>
            <p className="mt-4 text-xl">
              Streamlining your business operations is crucial for efficiency, and one
              way to achieve this is by managing your HR and employee salaries in a
              single system.
            </p>
            <button className="mt-6 bg-purple-600 text-white px-6 py-3 rounded">Get Started</button>
          </div>
          <div className="lg:w-1/2 mt-8 lg:mt-0 lg:ml-12">
            <img
              src={womanImage}
              alt="Woman with laptop"
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
        </section>
      </div>
    </>
  );
}
