import img from "../../assets/images/guy_shows_group.jpg";

export default function Serve() {
  return (
    <div id="services" className="flex flex-row gap-2 justify-center mt-20">
      <div className="lg:w-1/2 mt-8 lg:mt-0 lg:ml-12">
        <img
          src={img}
          alt="Woman with laptop"
          className="w-auto h-[1/2] rounded-lg shadow-lg"
        />
      </div>
      <div className="lg:w-1/2 text-left flex flex-col justify-center lg:mr-12">
        <h1 className="text-4xl font-semibold leading-normal">
          Unbeatable Support meets Innovative Technology
        </h1>
        <p className="mt-4 text-lg">
          Unmatched support , At Matic group we believe in providing ultimate
          solution for efficient and seamless HR Management. We believe that
          exceptional customer support is the cornerstone of a successful
          business. Our detailed team of proffesionals.
        </p>
        <hr />
      </div>
    </div>
    //     <h1 className="text-4xl font-semibold leading-normal">
    //     See How HR Matic Customers Are Finding Success
    //   </h1>
    //   <p className="mt-4 text-lg">
    //     HR Matic, a leading provider of human resources and business
    //     perfomance solutions, has a track record of helping its customers
    //     achieve their success in various ways. One of the key Factors
    //     contributing to this success is the HR Matic is providing a committed
    //     HR tailored to providing HR solutions and support.
    //   </p>
    //   <button className="mt-6 bg-purple-600 text-white px-6 py-3 rounded inline-block">
    //     Get Started
    //   </button>
  );
}
