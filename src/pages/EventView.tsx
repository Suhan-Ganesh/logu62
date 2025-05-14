<<<<<<< HEAD
=======

>>>>>>> e812c0638777cbf0fa00543cfa28be8a8905caa3
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BarcodeScanner from "@/components/BarcodeScanner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Download, UserPlus } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

// Mock events data (same as in Events.tsx)
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

// Mock attendees data
const initialAttendeesList = [
  { id: 'U123456', name: 'John Smith', branch: 'Computer Science', timestamp: '10:15 AM' },
  { id: 'U234567', name: 'Emma Johnson', branch: 'Electronics', timestamp: '10:22 AM' },
  { id: 'U345678', name: 'Michael Brown', branch: 'Mechanical', timestamp: '10:30 AM' },
];

const EventView = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [attendees, setAttendees] = useState(initialAttendeesList);
  const [searchTerm, setSearchTerm] = useState('');
  const [showScanner, setShowScanner] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Find the current event from the mock data
  const event = initialEvents.find(e => e.id === eventId) || {
    name: "Event Not Found",
    date: "",
    location: "",
    code: "",
    attendees: 0
  };
  
  // Fetch attendees from backend API
  useEffect(() => {
    const fetchAttendees = async () => {
      try {
        setIsLoading(true);
        
        // For demo, we'll use the mock data
        // In production, use the API
        /*
        const response = await fetch(`http://localhost:5000/api/attendance/${event.code}`);
        const data = await response.json();
        
        if (response.ok) {
          // Transform backend data to match frontend format
          const formattedData = data.map(item => ({
            id: item.university_number,
            name: item.name,
            branch: item.branch,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }));
          
          setAttendees(formattedData);
        }
        */
        
        // Using mock data for now
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
        
      } catch (error) {
        console.error('Error fetching attendees:', error);
        toast({
          title: "Failed to load attendees",
          description: "Could not connect to the server. Using local data.",
          variant: "destructive"
        });
        setIsLoading(false);
      }
    };
    
    fetchAttendees();
  }, [event.code]);
  
  const handleAddAttendee = async (studentId: string) => {
    try {
      // In a real app, this would validate against the database
      /* 
      const response = await fetch('http://localhost:5000/api/attendance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          universityNumber: studentId,
          eventCode: event.code
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to mark attendance');
      }
      */
      
      // For demo purposes, we'll simulate the API call
      const newAttendee = {
        id: studentId,
        name: `Student ${Math.floor(Math.random() * 1000)}`,
        branch: ['Computer Science', 'Electronics', 'Mechanical'][Math.floor(Math.random() * 3)],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      // Add to local state
      setAttendees([newAttendee, ...attendees]);
      
      toast({
        title: "Attendee added",
        description: `${newAttendee.id} has been recorded successfully.`,
      });
      
    } catch (error) {
      console.error('Error adding attendee:', error);
      toast({
        title: "Failed to add attendee",
        description: "Could not connect to the server.",
        variant: "destructive"
      });
    }
  };

  const handleExport = (format: string) => {
    // In a real app, this would call an API endpoint to generate the export
    /*
    fetch(`http://localhost:5000/api/export/${event.code}?format=${format}`)
      .then(response => response.blob())
      .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${event.name}_attendance.${format.toLowerCase()}`;
        a.click();
      })
      .catch(error => {
        console.error('Error exporting data:', error);
        toast({
          title: `Export failed`,
          description: `Could not export data as ${format}.`,
          variant: "destructive"
        });
      });
    */
    
    // For demo, just show a toast
    toast({
      title: `Export as ${format}`,
      description: `Attendance data has been exported as ${format}.`,
    });
  };

  const filteredAttendees = attendees.filter(
    attendee => 
      attendee.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
      attendee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      attendee.branch.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-6 md:py-12">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex items-center mb-6">
            <Button variant="outline" className="mr-4" onClick={() => navigate('/events')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Events
            </Button>
            <h1 className="text-2xl md:text-3xl font-bold">{event.name}</h1>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Event Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-500">Date</p>
                      <p className="font-medium">{new Date(event.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Location</p>
                      <p className="font-medium">{event.location}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Event Code</p>
                      <p className="font-mono font-bold text-lg">{event.code}</p>
                    </div>
                    <div className="pt-2">
                      <p className="text-sm text-gray-500 mb-2">Record Attendance</p>
                      <div className="flex flex-col space-y-2">
                        <Button 
                          onClick={() => setShowScanner(true)} 
                          className="bg-gradient-blue w-full"
                        >
                          Scan Student ID
                        </Button>
                        <Button 
                          variant="outline" 
                          className="w-full" 
                          onClick={() => setShowScanner(true)}
                        >
                          <UserPlus className="h-4 w-4 mr-2" />
                          Manual Entry
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {showScanner && (
                <div className="mt-6">
                  <BarcodeScanner onScanComplete={handleAddAttendee} />
                </div>
              )}
            </div>
            
            <div className="lg:col-span-2">
              <Card>
                <CardHeader className="border-b">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <CardTitle>Attendees ({attendees.length})</CardTitle>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <div className="w-full sm:w-64">
                        <Input
                          placeholder="Search attendees..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                      </div>
                      <Button 
                        variant="outline" 
                        className="flex-shrink-0"
                        onClick={() => handleExport('CSV')}
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Export CSV
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>ID</TableHead>
                          <TableHead>Name</TableHead>
                          <TableHead>Branch</TableHead>
                          <TableHead>Time</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {isLoading ? (
                          <TableRow>
                            <TableCell colSpan={4} className="h-24 text-center">
                              Loading attendees...
                            </TableCell>
                          </TableRow>
                        ) : filteredAttendees.length > 0 ? (
                          filteredAttendees.map((attendee) => (
                            <TableRow key={attendee.id + attendee.timestamp}>
                              <TableCell className="font-mono">{attendee.id}</TableCell>
                              <TableCell>{attendee.name}</TableCell>
                              <TableCell>{attendee.branch}</TableCell>
                              <TableCell>{attendee.timestamp}</TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={4} className="h-24 text-center">
                              No results found.
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default EventView;
