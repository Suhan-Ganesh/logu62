/*
  # Initial Schema Setup for Attendance System

  1. New Tables
    - `events`
      - `id` (uuid, primary key)
      - `name` (text)
      - `code` (text, unique 6-digit code)
      - `date` (timestamptz)
      - `location` (text)
      - `created_at` (timestamptz)
      
    - `students`
      - `id` (uuid, primary key) 
      - `university_number` (text, unique)
      - `name` (text)
      - `branch` (text)
      - `section` (text)
      - `semester` (integer)
      - `created_at` (timestamptz)

    - `attendance`
      - `id` (uuid, primary key)
      - `event_id` (uuid, foreign key)
      - `student_id` (uuid, foreign key)
      - `marked_at` (timestamptz)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for public access (as per requirements)
*/

-- Create events table
CREATE TABLE IF NOT EXISTS events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  code text NOT NULL UNIQUE,
  date timestamptz NOT NULL,
  location text,
  created_at timestamptz DEFAULT now()
);

-- Create students table
CREATE TABLE IF NOT EXISTS students (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  university_number text NOT NULL UNIQUE,
  name text NOT NULL,
  branch text NOT NULL,
  section text,
  semester integer,
  created_at timestamptz DEFAULT now()
);

-- Create attendance table with unique constraint
CREATE TABLE IF NOT EXISTS attendance (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id uuid REFERENCES events(id) ON DELETE CASCADE,
  student_id uuid REFERENCES students(id) ON DELETE CASCADE,
  marked_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now(),
  UNIQUE(event_id, student_id)
);

-- Enable RLS
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendance ENABLE ROW LEVEL SECURITY;

-- Create policies for public access
CREATE POLICY "Allow public read access to events" ON events
  FOR SELECT TO public USING (true);

CREATE POLICY "Allow public insert to events" ON events
  FOR INSERT TO public WITH CHECK (true);

CREATE POLICY "Allow public read access to students" ON students
  FOR SELECT TO public USING (true);

CREATE POLICY "Allow public read/write access to attendance" ON attendance
  FOR ALL TO public USING (true) WITH CHECK (true);