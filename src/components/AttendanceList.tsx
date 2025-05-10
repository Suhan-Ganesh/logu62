
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

// Mock data for attendance
const mockAttendees = [
  { id: 'U123456', name: 'John Smith', branch: 'Computer Science', section: 'A', semester: '5', present: true },
  { id: 'U234567', name: 'Emma Johnson', branch: 'Electronics', section: 'B', semester: '3', present: true },
  { id: 'U345678', name: 'Michael Brown', branch: 'Mechanical', section: 'C', semester: '7', present: false },
  { id: 'U456789', name: 'Sophia Williams', branch: 'Civil', section: 'A', semester: '5', present: true },
  { id: 'U567890', name: 'James Davis', branch: 'Chemical', section: 'B', semester: '3', present: true },
];

const AttendanceList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [attendees, setAttendees] = useState(mockAttendees);

  const filteredAttendees = attendees.filter(
    attendee => 
      attendee.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
      attendee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      attendee.branch.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const togglePresence = (id: string) => {
    setAttendees(attendees.map(attendee => 
      attendee.id === id ? {...attendee, present: !attendee.present} : attendee
    ));
  };

  const handleExport = (format: string) => {
    // In a real app, this would trigger an export based on the format
    console.log(`Exporting in ${format} format`);
    // Mock toast notification that shows up when export is triggered
    alert(`Attendance list exported as ${format}`);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
      <div className="p-6 border-b">
        <h2 className="text-xl font-bold mb-4">Attendance List</h2>
        <div className="flex flex-col md:flex-row justify-between gap-4 items-center">
          <div className="w-full md:w-64">
            <Input
              placeholder="Search attendees..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="border-logu text-logu">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="7 10 12 15 17 10"></polyline>
                  <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
                Export
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => handleExport('CSV')}>
                Export as CSV
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleExport('XLSX')}>
                Export as Excel
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleExport('PDF')}>
                Export as PDF
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>University ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Branch</TableHead>
              <TableHead>Section</TableHead>
              <TableHead>Semester</TableHead>
              <TableHead>Present</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAttendees.length > 0 ? (
              filteredAttendees.map((attendee) => (
                <TableRow key={attendee.id}>
                  <TableCell className="font-mono">{attendee.id}</TableCell>
                  <TableCell>{attendee.name}</TableCell>
                  <TableCell>{attendee.branch}</TableCell>
                  <TableCell>{attendee.section}</TableCell>
                  <TableCell>{attendee.semester}</TableCell>
                  <TableCell>
                    <Checkbox
                      checked={attendee.present}
                      onCheckedChange={() => togglePresence(attendee.id)}
                    />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  No results found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AttendanceList;
