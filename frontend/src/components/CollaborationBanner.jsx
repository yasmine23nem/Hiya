import React from "react";
import b from "../assets/b.jpg";
import c from "../assets/c.jpg";
import d from "../assets/d.jpg";
import vid2 from "../assets/vid2.mp4";

const CollaborationBanner = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="grid grid-cols-2 max-w-6xl bg-white shadow-lg rounded-2xl overflow-hidden">
        {/* Image Section */}
        <div className="relative">
          <video autoPlay loop muted>
            <source src={vid2} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <img
            src={c}
            alt="Jewelry"
            className="absolute bottom-0 right-0 w-1/3 shadow-lg rounded-lg"
          />
        </div>

        {/* Text Section */}
        <div className="flex flex-col justify-center p-10">
          <span className="text-sm text-orange-600">Unity Collection</span>
          <h2 className="text-4xl font-bold text-gray-900 mt-2">
            Shop our limited Edition Collaborations
          </h2>
          <p className="text-gray-600 mt-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vel mi
            quam. Fusce vehicula vitae mauris sit amet tempor. Donec consectetur
            lorem ipsum dolor sit amet.
          </p>
          <button className="mt-6 px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition flex items-center gap-2">
            Contact Us →
          </button>
        </div>
      </div>
    </div>
  );
};

export default CollaborationBanner;
