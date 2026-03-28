import React from "react";
import Background from "../assets/Images/Background.png";
import LayoutBox from "../Components/LayoutBox.jsx";

function AboutUs() {
  return (
    <LayoutBox background={Background}>

      {/* 🔥 Wrapper for spacing */}
      <div className="space-y-6">

        {/* Main About Box */}
        <div className="bg-white/80 backdrop-blur-md p-10 rounded-3xl shadow-xl">
          <h2 className="text-4xl font-bold text-black mb-6 text-center md:text-left">
            About WheelX
          </h2>

          <p className="text-gray-700 text-lg mb-4 leading-relaxed">
            WheelX is your premier car rental service across India. We provide
            a seamless booking experience, premium vehicles, and unmatched
            comfort for all your journeys.
          </p>

          <p className="text-gray-700 text-lg mb-4 leading-relaxed">
            Whether you need a compact car for city drives or a luxury SUV for
            weekend getaways, WheelX ensures you travel in style and safety.
          </p>

          <p className="text-gray-700 text-lg leading-relaxed">
            Our mission is to make car rentals simple, convenient, and
            enjoyable, giving you the freedom to explore India without any hassle.
          </p>
        </div>

        {/* Disclaimer Box */}
        <div className="bg-white/70 backdrop-blur-md p-8 rounded-2xl shadow-lg border border-gray-200">
          <p className="text-gray-600 text-sm leading-relaxed text-center">
            This website is a non-commercial demonstration project intended solely for educational and portfolio purposes. 
            The services, listings, and booking functionalities displayed are fictional and do not represent any real-world offering. 
            The owner of this website is not responsible for any misunderstanding or misuse of this platform.
          </p>
        </div>

      </div>

    </LayoutBox>
  );
}

export default AboutUs;