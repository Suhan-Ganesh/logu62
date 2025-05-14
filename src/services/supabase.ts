import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Event types
export interface Event {
  id: string;
  name: string;
  code: string;
  date: string;
  location: string;
  created_at?: string;
}

// Student types
export interface Student {
  id: string;
  university_number: string;
  name: string;
  branch: string;
  section: string;
  semester: number;
  created_at?: string;
}

// Attendance types
export interface Attendance {
  id: string;
  event_id: string;
  student_id: string;
  marked_at: string;
  created_at?: string;
}

// Event functions
export async function createEvent(name: string, date: string, location: string): Promise<Event | null> {
  // Generate a random 6-digit code
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  
  const { data, error } = await supabase
    .from('events')
    .insert([{ name, code, date, location }])
    .select()
    .single();
    
  if (error) {
    console.error('Error creating event:', error);
    return null;
  }
  
  return data;
}

export async function getEvents(): Promise<Event[]> {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .order('created_at', { ascending: false });
    
  if (error) {
    console.error('Error fetching events:', error);
    return [];
  }
  
  return data || [];
}

export async function getEventByCode(code: string): Promise<Event | null> {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .eq('code', code)
    .single();
    
  if (error) {
    console.error('Error fetching event:', error);
    return null;
  }
  
  return data;
}

// Student functions
export async function getStudentByUniversityNumber(universityNumber: string): Promise<Student | null> {
  const { data, error } = await supabase
    .from('students')
    .select('*')
    .eq('university_number', universityNumber)
    .single();
    
  if (error) {
    console.error('Error fetching student:', error);
    return null;
  }
  
  return data;
}

// Attendance functions
export async function markAttendance(eventId: string, universityNumber: string): Promise<boolean> {
  // First get the student
  const student = await getStudentByUniversityNumber(universityNumber);
  if (!student) {
    console.error('Student not found:', universityNumber);
    return false;
  }
  
  // Try to insert attendance record
  const { error } = await supabase
    .from('attendance')
    .insert([{
      event_id: eventId,
      student_id: student.id,
    }]);
    
  if (error) {
    // If error is about unique constraint, the student is already marked
    if (error.code === '23505') {
      return true;
    }
    console.error('Error marking attendance:', error);
    return false;
  }
  
  return true;
}

export async function getEventAttendance(eventId: string): Promise<(Student & { marked_at: string })[]> {
  const { data, error } = await supabase
    .from('attendance')
    .select(`
      marked_at,
      students (
        id,
        university_number,
        name,
        branch,
        section,
        semester
      )
    `)
    .eq('event_id', eventId);
    
  if (error) {
    console.error('Error fetching attendance:', error);
    return [];
  }
  
  return data?.map(record => ({
    ...record.students,
    marked_at: record.marked_at,
  })) || [];
}