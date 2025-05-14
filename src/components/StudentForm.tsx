import React, { useState } from 'react';
import { createStudent, updateStudent } from '../services/studentService';
import type { Student } from '../services/studentService';

interface StudentFormProps {
  initialData?: Partial<Student>;
  onSuccess: (student: Student) => void;
  onCancel: () => void;
}

const StudentForm: React.FC<StudentFormProps> = ({
  initialData,
  onSuccess,
  onCancel
}) => {
  const [formData, setFormData] = useState({
    usn: initialData?.usn || '',
    name: initialData?.name || '',
    department: initialData?.department || '',
    section: initialData?.section || '',
    semester: initialData?.semester || 1
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  
  const isEditing = !!initialData?.id;
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'semester' ? parseInt(value) : value
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    
    try {
      let result;
      
      if (isEditing && initialData.id) {
        result = await updateStudent(initialData.id, formData);
      } else {
        result = await createStudent(formData);
      }
      
      if (result) {
        onSuccess(result);
      } else {
        setError(`Failed to ${isEditing ? 'update' : 'create'} student record`);
      }
    } catch (err) {
      console.error('Form submission error:', err);
      setError('An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">
        {isEditing ? 'Edit Student' : 'Add New Student'}
      </h2>
      
      {error && (
        <div className="mb-4 p-2 bg-red-50 text-red-700 rounded border border-red-200">
          {error}
        </div>
      )}
      
      <div className="space-y-4">
        <div>
          <label htmlFor="usn" className="block text-sm font-medium text-gray-700 mb-1">
            USN (University Serial Number)
          </label>
          <input
            type="text"
            id="usn"
            name="usn"
            value={formData.usn}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., 1MS21CS001"
            required
          />
        </div>
        
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., John Doe"
            required
          />
        </div>
        
        <div>
          <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-1">
            Department
          </label>
          <input
            type="text"
            id="department"
            name="department"
            value={formData.department}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., Computer Science"
            required
          />
        </div>
        
        <div>
          <label htmlFor="section" className="block text-sm font-medium text-gray-700 mb-1">
            Section
          </label>
          <input
            type="text"
            id="section"
            name="section"
            value={formData.section}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., A"
            required
          />
        </div>
        
        <div>
          <label htmlFor="semester" className="block text-sm font-medium text-gray-700 mb-1">
            Semester
          </label>
          <select
            id="semester"
            name="semester"
            value={formData.semester}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="flex justify-end space-x-2 mt-6">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          disabled={isSubmitting}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <span className="flex items-center">
              Processing...
            </span>
          ) : isEditing ? (
            'Update Student'
          ) : (
            'Add Student'
          )}
        </button>
      </div>
    </form>
  );
};

export default StudentForm;