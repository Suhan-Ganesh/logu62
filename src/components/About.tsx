
import React from 'react';
import { Users } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">About Logu</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Making attendance tracking simple, accurate and efficient for university events
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <Users className="text-logu" />
            </div>
            <h3 className="text-xl font-bold mb-3">For Club Leaders</h3>
            <p className="text-gray-600">
              Streamline your event management process. Create events, track attendance, and export valuable participation data that helps you understand engagement patterns.
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-logu">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-3">For Volunteers</h3>
            <p className="text-gray-600">
              Join any event with a 6-digit code and help manage attendance with our easy-to-use barcode scanning system. Record student attendance quickly and accurately.
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-logu">
                <rect width="14" height="20" x="5" y="2" rx="2" ry="2"></rect>
                <line x1="12" x2="12" y1="18" y2="18"></line>
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-3">For Students</h3>
            <p className="text-gray-600">
              No more waiting in long lines. Simply show your student ID barcode to mark your attendance at events. Quick, contactless, and hassle-free.
            </p>
          </div>
        </div>
        
        <div className="mt-16 bg-white p-8 rounded-xl shadow-lg border border-gray-100">
          <h3 className="text-2xl font-bold mb-6 text-center">How It Works</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-gradient-blue flex items-center justify-center text-white mx-auto mb-4">1</div>
              <h4 className="text-lg font-semibold mb-2">Create or Join</h4>
              <p className="text-gray-600">Create an event as an organizer or join as a volunteer using a 6-digit code</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-gradient-blue flex items-center justify-center text-white mx-auto mb-4">2</div>
              <h4 className="text-lg font-semibold mb-2">Scan IDs</h4>
              <p className="text-gray-600">Use your device's camera to scan student ID barcodes or enter IDs manually</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-gradient-blue flex items-center justify-center text-white mx-auto mb-4">3</div>
              <h4 className="text-lg font-semibold mb-2">Track & Export</h4>
              <p className="text-gray-600">View real-time attendance data and export reports in different formats</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
