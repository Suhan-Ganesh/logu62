import mysql from 'mysql2/promise';

// Database configuration
const dbConfig = {
  host: 'YOUR_DATABASE_HOST',
  user: 'YOUR_USERNAME',
  password: 'YOUR_PASSWORD',
  database: 'attendance_system'
};

// Create connection pool
const pool = mysql.createPool(dbConfig);

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

// Event functions
export async function createEvent(name: string, date: string, location: string): Promise<Event | null> {
  try {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const [result] = await pool.execute(
      'INSERT INTO events (name, code, date, location) VALUES (?, ?, ?, ?)',
      [name, code, date, location]
    );
    
    if ('insertId' in result) {
      return {
        id: result.insertId.toString(),
        name,
        code,
        date,
        location
      };
    }
    return null;
  } catch (error) {
    console.error('Error creating event:', error);
    return null;
  }
}

export async function getEvents(): Promise<Event[]> {
  try {
    const [rows] = await pool.query('SELECT * FROM events ORDER BY created_at DESC');
    return rows as Event[];
  } catch (error) {
    console.error('Error fetching events:', error);
    return [];
  }
}

export async function getEventByCode(code: string): Promise<Event | null> {
  try {
    const [rows] = await pool.execute(
      'SELECT * FROM events WHERE code = ?',
      [code]
    );
    const events = rows as Event[];
    return events[0] || null;
  } catch (error) {
    console.error('Error fetching event:', error);
    return null;
  }
}

// Student functions
export async function getStudentByUniversityNumber(universityNumber: string): Promise<Student | null> {
  try {
    const [rows] = await pool.execute(
      'SELECT * FROM students WHERE university_number = ?',
      [universityNumber]
    );
    const students = rows as Student[];
    return students[0] || null;
  } catch (error) {
    console.error('Error fetching student:', error);
    return null;
  }
}

// Attendance functions
export async function markAttendance(eventId: string, universityNumber: string): Promise<boolean> {
  try {
    const student = await getStudentByUniversityNumber(universityNumber);
    if (!student) {
      console.error('Student not found:', universityNumber);
      return false;
    }

    await pool.execute(
      'INSERT IGNORE INTO attendance (event_id, student_id) VALUES (?, ?)',
      [eventId, student.id]
    );
    
    return true;
  } catch (error) {
    console.error('Error marking attendance:', error);
    return false;
  }
}

export async function getEventAttendance(eventId: string): Promise<(Student & { marked_at: string })[]> {
  try {
    const [rows] = await pool.execute(`
      SELECT s.*, a.marked_at 
      FROM attendance a 
      JOIN students s ON a.student_id = s.id 
      WHERE a.event_id = ?
    `, [eventId]);
    
    return rows as (Student & { marked_at: string })[];
  } catch (error) {
    console.error('Error fetching attendance:', error);
    return [];
  }
}