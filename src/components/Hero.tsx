
import React from 'react';
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 md:pr-10">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-blue bg-clip-text text-transparent">Simplify</span> Event Attendance Tracking
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Track event attendance effortlessly with barcode scanning. 
              Perfect for university clubs and organizations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                className="bg-gradient-blue hover:bg-logu-dark text-white px-8 py-6 text-lg"
              >
                Create an Event
              </Button>
              <Button 
                variant="outline" 
                className="border-logu text-logu hover:bg-logu-light hover:text-white px-8 py-6 text-lg"
              >
                Learn More
              </Button>
            </div>
          </div>
          <div className="md:w-1/2 mt-12 md:mt-0">
            <div className="relative">
              <div className="h-[450px] w-full max-w-md mx-auto bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                <div className="h-16 bg-gradient-blue flex items-center px-6">
                  <div className="w-3 h-3 rounded-full bg-white opacity-50 mr-2"></div>
                  <div className="w-3 h-3 rounded-full bg-white opacity-50 mr-2"></div>
                  <div className="w-3 h-3 rounded-full bg-white"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-4">Tech Club Meetup</h3>
                  <p className="text-gray-500 mb-6">Event code: <span className="font-mono font-bold text-logu">723945</span></p>
                  
                  <div className="h-60 border-2 border-dashed border-gray-200 rounded-lg flex flex-col items-center justify-center relative overflow-hidden mb-6">
                    <div className="absolute w-full h-[2px] bg-logu-light opacity-70 top-0 animate-scanner"></div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-gray-300 mb-3">
                      <rect width="16" height="16" x="4" y="4" rx="2" strokeWidth="2" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 9h1m-1 3h1m3-3h1m-1 3h1m2-3h.01m-.01 3h.01" strokeWidth="2" />
                    </svg>
                    <p className="text-gray-500 font-medium">Scan Student ID</p>
                  </div>
                  
                  <Button className="w-full bg-gradient-blue hover:bg-logu">
                    Start Scanning
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
