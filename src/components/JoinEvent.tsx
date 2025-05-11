
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";

// Mock events data
const initialEvents = [
  {
    id: "1",
    name: "Tech Week Meetup",
    date: "2025-05-20",
    location: "Main Hall, Building B",
    code: "723945",
    attendees: 42
  },
  {
    id: "2",
    name: "Robotics Workshop",
    date: "2025-06-05",
    location: "Engineering Lab",
    code: "139872",
    attendees: 27
  },
  {
    id: "3",
    name: "Annual Club Gathering",
    date: "2025-06-15",
    location: "Student Center",
    code: "584712",
    attendees: 89
  }
];

const JoinEvent = () => {
  const [eventCode, setEventCode] = useState("");
  const [isJoining, setIsJoining] = useState(false);
  const [joined, setJoined] = useState(false);
  const [foundEvent, setFoundEvent] = useState<any>(null);
  const navigate = useNavigate();
  
  const handleJoinEvent = () => {
    if (eventCode.length === 6) {
      setIsJoining(true);
      
      // Find the event with the matching code
      const event = initialEvents.find(e => e.code === eventCode);
      
      // Simulate API call
      setTimeout(() => {
        setIsJoining(false);
        
        if (event) {
          setFoundEvent(event);
          setJoined(true);
        } else {
          toast({
            title: "Event not found",
            description: "Please check the event code and try again.",
            variant: "destructive"
          });
        }
      }, 1500);
    }
  };

  const goToEvent = () => {
    if (foundEvent) {
      navigate(`/events/${foundEvent.id}`);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="border-logu text-logu hover:bg-logu hover:text-white">
          Join Event
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {joined ? "Event Joined!" : "Join an Event"}
          </DialogTitle>
        </DialogHeader>
        
        {joined ? (
          <div className="py-6 text-center">
            <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            </div>
            <h3 className="font-bold text-xl mb-1">{foundEvent?.name}</h3>
            <p className="text-gray-500 mb-4">You have successfully joined the event!</p>
            
            <Button className="w-full bg-gradient-blue" onClick={goToEvent}>
              Go to Event
            </Button>
          </div>
        ) : (
          <div className="py-4 space-y-4">
            <p className="text-gray-500">Enter the 6-digit code provided by the event organizer</p>
            <div className="space-y-2">
              <label htmlFor="eventCode" className="text-sm font-medium">Event Code</label>
              <Input 
                id="eventCode"
                placeholder="123456" 
                value={eventCode}
                onChange={(e) => setEventCode(e.target.value)}
                className="text-center text-xl font-mono"
                maxLength={6}
              />
            </div>
            <Button 
              onClick={handleJoinEvent}
              className="w-full bg-gradient-blue" 
              disabled={eventCode.length !== 6 || isJoining}
            >
              {isJoining ? "Joining..." : "Join Event"}
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default JoinEvent;
