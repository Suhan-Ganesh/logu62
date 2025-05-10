import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="w-full py-4 px-6 md:px-8 bg-white shadow-sm">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <div className="h-10 w-10 rounded-full bg-gradient-blue flex items-center justify-center">
            <span className="text-white font-bold text-xl">L</span>
          </div>
          <h1 className="text-2xl font-bold bg-gradient-blue bg-clip-text text-transparent">Logu</h1>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-gray-600 hover:text-logu font-medium">Home</Link>
          <Link to="/events" className="text-gray-600 hover:text-logu font-medium">Events</Link>
          <Link to="/about" className="text-gray-600 hover:text-logu font-medium">About</Link>
        </nav>

        <div className="flex gap-3">
          <Link to="/events">
            <Button 
              variant="outline"
              className="hidden md:flex border-logu text-logu hover:bg-logu hover:text-white"
            >
              Join Event
            </Button>
          </Link>
          <Link to="/events">
            <Button 
              className="bg-gradient-blue hover:bg-logu-dark transition-colors"
            >
              Create Event
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
