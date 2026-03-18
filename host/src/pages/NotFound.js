import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="text-center px-4">
        {/* 404 Number */}
        <div className="relative">
          <h1 className="text-9xl md:text-[200px] font-bold text-gray-200 select-none">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-6xl animate-bounce">
              🔍
            </div>
          </div>
        </div>

        {/* Message */}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mt-8">
          Oops! Page Not Found
        </h2>
        <p className="text-lg text-gray-600 mt-4 max-w-md mx-auto">
          The page you're looking for seems to have wandered off into the digital void. 
          Don't worry, we'll help you find your way back!
        </p>

        {/* Actions */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            to="/" 
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Return Home
          </Link>

          <Link 
            to="/productos" 
            className="inline-flex items-center px-6 py-3 bg-white text-blue-600 font-medium rounded-lg hover:bg-gray-50 transition border-2 border-blue-600 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            Browse Products
          </Link>
        </div>

        {/* Popular Links */}
        <div className="mt-12 pt-8 border-t border-gray-300">
          <p className="text-sm text-gray-500 mb-4">Popular Pages:</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/" className="text-blue-600 hover:text-blue-800 text-sm hover:underline">
              Home
            </Link>
            <Link to="/productos" className="text-blue-600 hover:text-blue-800 text-sm hover:underline">
              Products
            </Link>
            <Link to="/carrito" className="text-blue-600 hover:text-blue-800 text-sm hover:underline">
              Shopping Cart
            </Link>
            <a href="#contact" className="text-blue-600 hover:text-blue-800 text-sm hover:underline">
              Contact Us
            </a>
          </div>
        </div>

        {/* Fun Message */}
        <div className="mt-8 p-4 bg-white rounded-lg shadow-md max-w-md mx-auto">
          <p className="text-sm text-gray-600">
            <span className="font-semibold">Fun fact:</span> While you're here, 
            did you know that 404 errors got their name from a room number at CERN 
            where the original web server was located? 🤓
          </p>
        </div>
      </div>
    </div>
  );
}
