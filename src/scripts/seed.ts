import mongoose from 'mongoose';
import dbConnect from '@/lib/dbConnect';
import Doctor from '@/models/Doctor';

const seedDoctors = async () => {
  try {
    await dbConnect();
    
    await Doctor.deleteMany({});
    
    const doctors = [
      {
        name: 'Dr. Lakshmi Sanjitha Kakani',
        specialization: 'General Physician',
        qualification: 'MBBS, MD (GENERAL MEDICINE)',
        experience: 6,
        city: 'Visakhapatnam',
        clinic: 'Apollo 24|7 Virtual Clinic - Andhra Pradesh',
        fees: 499,
        cashback: 75,
        rating: 92,
        patientCount: 210,
        availableIn: 15,
        gender: 'female'
      },
      {
        name: 'Dr. J T Hema Pratima',
        specialization: 'General Physician',
        qualification: 'MBBS',
        experience: 9,
        city: 'Chennai',
        clinic: 'Apollo 24|7 Virtual Clinic - Tamilnadu',
        fees: 499,
        cashback: 75,
        rating: 85,
        patientCount: 200,
        availableIn: 20,
        gender: 'female'
      },
      {
        name: 'Dr. Shesham Srinidhi',
        specialization: 'General Physician',
        qualification: 'MD (PHYSICIAN)',
        experience: 5,
        city: 'Hyderabad',
        clinic: 'Apollo 24|7 Virtual Clinic - Telangana',
        fees: 399,
        cashback: 60,
        rating: 91,
        patientCount: 75,
        availableIn: 10,
        gender: 'female'
      },
      {
        name: 'Dr. Jawwad Mohammed Kaleem',
        specialization: 'General Physician',
        qualification: 'MBBS',
        experience: 4,
        city: 'Hyderabad',
        clinic: 'Apollo 24|7 Virtual Clinic - Telangana',
        fees: 379,
        cashback: 57,
        rating: 88,
        patientCount: 50,
        availableIn: 5,
        gender: 'male'
      },
      {
        name: 'Dr. Mohammed Huzef Ul Arifeen',
        specialization: 'General Physician',
        qualification: 'MBBS',
        experience: 3,
        city: 'Hyderabad',
        clinic: 'Apollo 24|7 Virtual Clinic - Telangana',
        fees: 350,
        cashback: 53,
        rating: 82,
        patientCount: 30,
        availableIn: 25,
        gender: 'male'
      },
      {
        name: 'Dr. Divya Lekha Gunta',
        specialization: 'General Physician',
        qualification: 'MBBS, MD (PATHOLOGY)',
        experience: 10,
        city: 'Visakhapatnam',
        clinic: 'Apollo 24|7 Virtual Clinic - Andhra Pradesh',
        fees: 489,
        cashback: 73,
        rating: 95,
        patientCount: 180,
        availableIn: 30,
        gender: 'female'
      },
      {
        name: 'Dr. Syed Ismail Ali',
        specialization: 'General Physician',
        qualification: 'MBBS',
        experience: 6,
        city: 'Hyderabad',
        clinic: 'Apollo 24|7 Virtual Clinic - Telangana',
        fees: 399,
        cashback: 60,
        rating: 87,
        patientCount: 65,
        availableIn: 20,
        gender: 'male'
      },
      {
        name: 'Dr. Rahul Sharma',
        specialization: 'Internal Medicine',
        qualification: 'MBBS, DNB (INTERNAL MEDICINE)',
        experience: 8,
        city: 'Delhi',
        clinic: 'Apollo 24|7 Virtual Clinic - Delhi',
        fees: 599,
        cashback: 90,
        rating: 94,
        patientCount: 250,
        availableIn: 15,
        gender: 'male'
      },
      {
        name: 'Dr. Priya Patel',
        specialization: 'Internal Medicine',
        qualification: 'MBBS, MD (INTERNAL MEDICINE)',
        experience: 7,
        city: 'Mumbai',
        clinic: 'Apollo 24|7 Virtual Clinic - Maharashtra',
        fees: 549,
        cashback: 82,
        rating: 93,
        patientCount: 175,
        availableIn: 20,
        gender: 'female'
      },
      {
        name: 'Dr. Anand Kumar',
        specialization: 'General Physician',
        qualification: 'MBBS, MD (GENERAL MEDICINE)',
        experience: 12,
        city: 'Bangalore',
        clinic: 'Apollo 24|7 Virtual Clinic - Karnataka',
        fees: 649,
        cashback: 97,
        rating: 96,
        patientCount: 320,
        availableIn: 10,
        gender: 'male'
      }
    ];
    
    await Doctor.insertMany(doctors);
    
    console.log('Database seeded successfully');
    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding database:', error);
    mongoose.connection.close();
  }
};

seedDoctors();