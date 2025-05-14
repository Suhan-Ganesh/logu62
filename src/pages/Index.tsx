
import React from 'react';
import { Link } from 'react-router-dom';
import { toast } from "@/components/ui/use-toast";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import About from "@/components/About";
import BarcodeScanner from "@/components/BarcodeScanner";
import AttendanceList from "@/components/AttendanceList";
import EventCreator from "@/components/EventCreator";
import JoinEvent from "@/components/JoinEvent";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

const Index = () => {
  const handleScanComplete = (studentId: string) => {
    // This would connect to your backend in a real app
    toast({
      title: "Demo Mode",
      description: `Scanned ID: ${studentId} - In a real app, this would be sent to your Node.js backend.`,
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <Hero />
        <Features />
        <About />
        
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Try It Yourself</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Scanning and tracking attendance has never been easier
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
              <div>
                <h3 className="text-2xl font-bold mb-6 flex items-center">
                  <span className="w-8 h-8 rounded-full bg-gradient-blue flex items-center justify-center text-white mr-3">1</span>
                  Create or Join an Event
                </h3>
                <p className="text-gray-600 mb-6">
                  Start by creating a new event or joining an existing one with a 6-digit code shared by your team.
                </p>
                
                <div className="flex flex-wrap gap-4 mb-12">
                  <EventCreator />
                  <JoinEvent />
                </div>
                
                <h3 className="text-2xl font-bold mb-6 flex items-center">
                  <span className="w-8 h-8 rounded-full bg-gradient-blue flex items-center justify-center text-white mr-3">2</span>
                  Scan Student IDs
                </h3>
                <p className="text-gray-600 mb-6">
                  Use your phone's camera to quickly scan student ID barcodes, or manually enter university numbers.
                </p>
                
                <BarcodeScanner onScanComplete={handleScanComplete} />
              </div>
              
              <div>
                <h3 className="text-2xl font-bold mb-6 flex items-center">
                  <span className="w-8 h-8 rounded-full bg-gradient-blue flex items-center justify-center text-white mr-3">3</span>
                  Track & Export Attendance
                </h3>
                <p className="text-gray-600 mb-6">
                  View real-time attendance lists and export data in your preferred format.
                </p>
                
                <AttendanceList />
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-16 bg-gradient-blue">
          <div className="container mx-auto px-4 md:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Simplify Your Event Attendance?
            </h2>
            <p className="text-white text-opacity-90 text-lg mb-8 max-w-2xl mx-auto">
              Start using Logu today and make attendance tracking effortless for your university events.
            </p>
            <Link to="/events">
              <Button className="bg-white text-logu hover:bg-gray-100 px-8 py-6 text-lg">
                Get Started Now
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
