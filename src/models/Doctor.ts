import mongoose, { Schema } from 'mongoose';

export interface IDoctor {
  name: string;
  specialization: string;
  qualification: string;
  experience: number;
  city: string;
  clinic: string;
  fees: number;
  cashback?: number;
  rating?: number;
  patientCount?: number;
  availableIn?: number;
  image?: string;
  gender: 'male' | 'female' | 'other';
  verified?: boolean;
}

const DoctorSchema = new Schema<IDoctor>(
  {
    name: { type: String, required: true },
    specialization: { type: String, required: true },
    qualification: { type: String, required: true },
    experience: { type: Number, required: true },
    city: { type: String, required: true },
    clinic: { type: String, required: true },
    fees: { type: Number, required: true },
    cashback: { type: Number, default: 0 },
    rating: { type: Number, default: 0 },
    patientCount: { type: Number, default: 0 },
    availableIn: { type: Number, default: 30 },
    image: { type: String },
    gender: { 
      type: String, 
      required: true, 
      enum: ['male', 'female', 'other'] 
    },
    verified: { type: Boolean, default: false }
  },
  {
    timestamps: true,
  }
);

DoctorSchema.index({
  name: 'text',
  specialization: 'text',
  qualification: 'text',
  city: 'text',
  clinic: 'text'
});

export default mongoose.models.Doctor || mongoose.model<IDoctor>('Doctor', DoctorSchema);