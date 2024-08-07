import womanImage from "../assets/images/womanImage.png"; // Ensure you have the correct path to the image

export default function HRMaticSolutions() {
  return (
    <div className="container mx-auto px-6 py-12 max-w-6xl" id="home">
      <section className="flex flex-col lg:flex-row justify-center">
        <div className="lg:w-1/2 text-left flex flex-col">
          <h1 className="text-4xl font-semibold leading-normal">
            <span className="text-purple-600">HR Solutions</span> that Scale
            With Your Business
          </h1>
          <p className="mt-4 text-lg">
            Streamlining your business operations is crucial for efficiency, and
            one way to achieve this is by managing your HR and employee salaries
            in a single system.
          </p>
          <button className="mt-6 bg-purple-600 text-white px-6 py-3 rounded inline-block">
            Get Started
          </button>
        </div>
        <div className="lg:w-1/2 mt-8 lg:mt-0 lg:ml-12">
          <img
            src={womanImage}
            alt="Woman with laptop"
            className="w-auto h-[1/2] rounded-lg shadow-lg"
          />
        </div>
      </section>
    </div>
  );
}
