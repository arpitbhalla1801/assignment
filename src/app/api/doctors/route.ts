import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Doctor from '@/models/Doctor';

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    
    const data = await req.json();
    
    const requiredFields = ['name', 'specialization', 'qualification', 'experience', 'city', 'clinic', 'fees', 'gender'];
    for (const field of requiredFields) {
      if (!data[field]) {
        return NextResponse.json(
          { success: false, message: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }
    
    const doctor = await Doctor.create(data);
    
    return NextResponse.json(
      { success: true, data: doctor },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error adding doctor:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to add doctor', error: (error as Error).message },
      { status: 500 }
    );
  }
}