import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Doctor from '@/models/Doctor';

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    
    const searchParams = req.nextUrl.searchParams;
    
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;
    
    const specialization = searchParams.get('specialization');
    const city = searchParams.get('city');
    const gender = searchParams.get('gender');
    const minExperience = searchParams.get('minExperience');
    const maxFees = searchParams.get('maxFees');
    const language = searchParams.get('language');
    const consultMode = searchParams.get('consultMode');
    const sortBy = searchParams.get('sortBy') || 'relevance';
    const query = searchParams.get('query') || '';
    
    const filter: any = {};
    
    if (specialization) filter.specialization = specialization;
    if (city) filter.city = city;
    if (gender) filter.gender = gender;
    if (language) filter.language = language;
    if (consultMode) filter.consultMode = consultMode;
    
    if (minExperience) {
      const expValue = parseInt(minExperience);
      if (!isNaN(expValue)) {
        if (expValue === 0) {
          filter.experience = { $gte: 0, $lte: 5 };
        } else if (expValue === 6) {
          filter.experience = { $gte: 6, $lte: 10 };
        } else if (expValue === 11) {
          filter.experience = { $gte: 11 };
        }
      }
    }
    
    if (maxFees) {
      const feesValue = parseInt(maxFees);
      if (!isNaN(feesValue)) {
        filter.fees = { $lte: feesValue };
      }
    }
    
    if (query) {
      filter.$text = { $search: query };
    }
    
    let sort: any = {};
    switch(sortBy) {
      case 'fees_low':
        sort = { fees: 1 };
        break;
      case 'fees_high':
        sort = { fees: -1 };
        break;
      case 'experience':
        sort = { experience: -1 };
        break;
      case 'rating':
        sort = { rating: -1 };
        break;
      default:
        if (query) {
          sort = { score: { $meta: "textScore" } };
        } else {
          sort = { createdAt: -1 };
        }
    }
    
    console.log('Applied filters:', filter);
    console.log('Sort criteria:', sort);
    
    let doctorQuery = Doctor.find(filter);
    
    if (query && sortBy === 'relevance') {
      doctorQuery = doctorQuery.select({ score: { $meta: "textScore" } });
    }
    
    const doctors = await doctorQuery.sort(sort).skip(skip).limit(limit);
    const total = await Doctor.countDocuments(filter);
    
    const cities = await Doctor.distinct('city');
    const specializations = await Doctor.distinct('specialization');
    
    return NextResponse.json({
      success: true,
      data: {
        doctors,
        pagination: {
          total,
          page,
          limit,
          pages: Math.ceil(total / limit)
        },
        filters: {
          cities,
          specializations
        }
      }
    });
  } catch (error) {
    console.error('Error listing doctors:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to list doctors', error: (error as Error).message },
      { status: 500 }
    );
  }
}