
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const EventCreator = () => {
  const [eventName, setEventName] = useState("");
  const [eventCreated, setEventCreated] = useState(false);
  const [eventCode, setEventCode] = useState("");
  
  const handleCreateEvent = () => {
    // Generate a random 6-digit code
    const generatedCode = Math.floor(100000 + Math.random() * 900000).toString();
    setEventCode(generatedCode);
    setEventCreated(true);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-gradient-blue hover:bg-logu-dark">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
            <path d="M12 5v14M5 12h14" />
          </svg>
          Create Event
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {eventCreated ? "Event Created Successfully!" : "Create New Event"}
          </DialogTitle>
        </DialogHeader>
        
        {eventCreated ? (
          <div className="py-6 text-center">
            <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            </div>
            <h3 className="font-bold text-xl mb-1">{eventName}</h3>
            <p className="text-gray-500 mb-4">Share this code with your team members</p>
            
            <div className="font-mono text-2xl font-bold text-center mb-4 p-3 bg-gray-50 rounded border">
              {eventCode}
            </div>
            
            <Button className="w-full bg-gradient-blue">
              Go to Event
            </Button>
          </div>
        ) : (
          <div className="py-4 space-y-4">
            <div className="space-y-2">
              <label htmlFor="eventName" className="text-sm font-medium">Event Name</label>
              <Input 
                id="eventName"
                placeholder="Tech Week Workshop" 
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="eventDate" className="text-sm font-medium">Event Date</label>
              <Input 
                id="eventDate"
                type="date"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="eventLocation" className="text-sm font-medium">Location</label>
              <Input 
                id="eventLocation"
                placeholder="Main Hall, Building B"
              />
            </div>
            <Button 
              onClick={handleCreateEvent}
              className="w-full bg-gradient-blue" 
              disabled={!eventName}
            >
              Create Event
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default EventCreator;
