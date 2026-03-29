import React from "react";

function LayoutBox({ children, background }) {
  return (
    <div className="pt-32 pb-16 bg-gray-100 ">

      <div
        style={
          background
            ? {
                backgroundImage: `url(${background})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }
            : {}
        }
        className="w-[98%] max-w-[1500px] mx-auto px-10 py-12 min-h-[80vh] rounded-3xl shadow-2xl bg-white/70 backdrop-blur-md"
      >
        {children}
      </div>

    </div>
  );
}

export default LayoutBox;