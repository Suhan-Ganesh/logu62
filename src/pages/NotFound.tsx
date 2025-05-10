
import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center p-8">
        <div className="flex justify-center mb-6">
          <div className="h-16 w-16 rounded-full bg-gradient-blue flex items-center justify-center">
            <span className="text-white font-bold text-3xl">L</span>
          </div>
        </div>
        <h1 className="text-6xl font-bold mb-4 bg-gradient-blue bg-clip-text text-transparent">404</h1>
        <p className="text-xl text-gray-600 mb-8">Oops! Page not found</p>
        <Link to="/" className="bg-gradient-blue text-white px-6 py-3 rounded-lg hover:bg-logu-dark transition-colors font-medium">
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
