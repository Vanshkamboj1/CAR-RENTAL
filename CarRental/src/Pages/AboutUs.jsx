import React from "react";
import Background from "../assets/images/Background.png";

function AboutUs() {
  const sectionStyle = {
    backgroundImage: `url(${Background})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    width: '100%',
  };

  return (
    <section id="about" style={sectionStyle} className="py-52">
      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-black/40 p-10 rounded-xl">
          <h2 className="text-4xl font-bold text-white mb-6 drop-shadow-lg text-center md:text-left">
            About WheelX
          </h2>
          <p className="text-white text-xl mb-4 drop-shadow-md">
            WheelX is your premier car rental service across India. We provide
            a seamless booking experience, premium vehicles, and unmatched
            comfort for all your journeys.
          </p>
          <p className="text-white text-xl mb-4 drop-shadow-md">
            Whether you need a compact car for city drives or a luxury SUV for
            weekend getaways, WheelX ensures you travel in style and safety.
          </p>
          <p className="text-white text-xl drop-shadow-md">
            Our mission is to make car rentals simple, convenient, and
            enjoyable, giving you the freedom to explore India without any hassle.
          </p>
        </div>
      </div>
    </section>
  );
}

export default AboutUs;
