import React from 'react'
import { FaInstagram, FaYoutube, FaFacebookF } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-10">
      <div className="flex flex-col items-center text-center px-4">
        <h2 className="text-3xl font-bold tracking-wide mb-3">
          WATCH
        </h2>
        <p className="text-gray-400 text-sm mb-1">
          Timeless designs crafted for every moment.
        </p>
        <p className="text-gray-400 text-sm mb-6">
          Discover premium watches that define your style.
        </p>
        <div className="flex gap-6 text-xl">
          <a href="#" className="hover:text-pink-500 transition">
            <FaInstagram />
          </a>
          <a href="#" className="hover:text-red-500 transition">
            <FaYoutube />
          </a>
          <a href="#" className="hover:text-blue-500 transition">
            <FaFacebookF />
          </a>
        </div>

      </div>
    </footer>
  );
};

