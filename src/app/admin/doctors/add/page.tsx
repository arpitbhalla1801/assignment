'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AddDoctorPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [seedLoading, setSeedLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    specialization: '',
    qualification: '',
    experience: '',
    city: '',
    clinic: '',
    fees: '',
    cashback: '',
    rating: '',
    patientCount: '',
    availableIn: '',
    image: '',
    gender: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    
    try {
      // Convert numeric fields to numbers
      const dataToSend = {
        ...formData,
        experience: parseInt(formData.experience),
        fees: parseInt(formData.fees),
        cashback: formData.cashback ? parseInt(formData.cashback) : undefined,
        rating: formData.rating ? parseInt(formData.rating) : undefined,
        patientCount: formData.patientCount ? parseInt(formData.patientCount) : undefined,
        availableIn: formData.availableIn ? parseInt(formData.availableIn) : undefined
      };
      
      const response = await fetch('/api/doctors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });
      
      const result = await response.json();
      
      if (response.ok) {
        setMessage('Doctor added successfully!');
        // Reset form
        setFormData({
          name: '',
          specialization: '',
          qualification: '',
          experience: '',
          city: '',
          clinic: '',
          fees: '',
          cashback: '',
          rating: '',
          patientCount: '',
          availableIn: '',
          image: '',
          gender: ''
        });
      } else {
        setMessage(`Error: ${result.message || 'Failed to add doctor'}`);
      }
    } catch (error) {
      setMessage('An error occurred while adding the doctor.');
      console.error('Error adding doctor:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddRandomDoctors = async () => {
    setSeedLoading(true);
    setMessage('');
    
    try {
      const response = await fetch('/api/doctors/seed', {
        method: 'POST',
      });
      
      const result = await response.json();
      
      if (response.ok) {
        setMessage('Random doctors added successfully!');
      } else {
        setMessage(`Error: ${result.message || 'Failed to add random doctors'}`);
      }
    } catch (error) {
      setMessage('An error occurred while adding random doctors.');
      console.error('Error adding random doctors:', error);
    } finally {
      setSeedLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <Link 
          href="/specialties/general-physician-internal-medicine" 
          className="text-blue-500 hover:text-blue-700"
        >
          ← Back to Doctors List
        </Link>
      </div>
      
      <h1 className="text-3xl font-bold mb-6">Add Doctors</h1>
      
      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-3">Quick Add</h2>
        <button
          onClick={handleAddRandomDoctors}
          disabled={seedLoading}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:bg-gray-400"
        >
          {seedLoading ? 'Adding...' : 'Add Random Doctors from Seed Data'}
        </button>
      </div>
      
      <div>
        <h2 className="text-xl font-semibold mb-3">Add New Doctor</h2>
        <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Name*</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Specialization*</label>
              <input
                type="text"
                name="specialization"
                value={formData.specialization}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Qualification*</label>
              <input
                type="text"
                name="qualification"
                value={formData.qualification}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Experience (years)*</label>
              <input
                type="number"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                required
                min="0"
                className="w-full p-2 border rounded"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">City*</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Clinic*</label>
              <input
                type="text"
                name="clinic"
                value={formData.clinic}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Fees (₹)*</label>
              <input
                type="number"
                name="fees"
                value={formData.fees}
                onChange={handleChange}
                required
                min="0"
                className="w-full p-2 border rounded"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Gender*</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Cashback (₹)</label>
              <input
                type="number"
                name="cashback"
                value={formData.cashback}
                onChange={handleChange}
                min="0"
                className="w-full p-2 border rounded"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Rating</label>
              <input
                type="number"
                name="rating"
                value={formData.rating}
                onChange={handleChange}
                min="0"
                max="100"
                className="w-full p-2 border rounded"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Patient Count</label>
              <input
                type="number"
                name="patientCount"
                value={formData.patientCount}
                onChange={handleChange}
                min="0"
                className="w-full p-2 border rounded"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Available In (minutes)</label>
              <input
                type="number"
                name="availableIn"
                value={formData.availableIn}
                onChange={handleChange}
                min="0"
                className="w-full p-2 border rounded"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Image URL</label>
              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>
          </div>
          
          <div className="mt-6">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
            >
              {loading ? 'Adding...' : 'Add Doctor'}
            </button>
          </div>
        </form>
      </div>
      
      {message && (
        <div className={`mt-6 p-4 rounded ${message.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
          {message}
        </div>
      )}
    </div>
  );
}