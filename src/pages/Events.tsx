import React, { useState } from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import EventCreator from "@/components/EventCreator";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { toast } from "@/components/ui/use-toast";
import { Calendar, List, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

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

const Events = () => {
  const [events, setEvents] = useState(initialEvents);

  const handleDeleteEvent = (eventId: string) => {
    setEvents(events.filter(event => event.id !== eventId));
    toast({
      title: "Event deleted",
      description: "The event has been successfully removed.",
    });
  };

  const getFormattedDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-12">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Events</h1>
            <EventCreator />
          </div>
          
          {events.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto flex items-center justify-center mb-4">
                <Calendar className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-medium text-gray-700 mb-2">No events yet</h3>
              <p className="text-gray-500 mb-6">Create your first event to start tracking attendance</p>
              <EventCreator />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map(event => (
                <Card key={event.id}>
                  <CardHeader className="pb-3">
                    <div className="flex justify-between">
                      <CardTitle>{event.name}</CardTitle>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="icon" className="text-gray-500 hover:text-red-500">
                            <Trash2 className="h-5 w-5" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Event</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete "{event.name}"? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDeleteEvent(event.id)} className="bg-red-500 hover:bg-red-600">
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                    <CardDescription>{getFormattedDate(event.date)} • {event.location}</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="bg-gray-50 p-3 rounded">
                      <p className="text-sm text-gray-500">Event code</p>
                      <p className="font-mono font-bold text-lg">{event.code}</p>
                    </div>
                    <div className="mt-3">
                      <p className="text-sm text-gray-500">Attendees</p>
                      <p className="font-bold">{event.attendees}</p>
                    </div>
                  </CardContent>
                  <CardFooter className="flex gap-2">
                    <Link to={`/events/${event.id}`} className="w-full">
                      <Button variant="outline" className="w-full">
                        <List className="h-4 w-4 mr-2" />
                        View Attendees
                      </Button>
                    </Link>
                    <Link to={`/events/${event.id}`} className="w-full">
                      <Button className="w-full bg-gradient-blue">
                        Scan Attendees
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Events;