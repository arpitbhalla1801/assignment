import React from 'react';
import Image from 'next/image';
import { IDoctor } from '@/models/Doctor';
import { FaStar, FaThumbsUp } from 'react-icons/fa';

interface DoctorCardProps {
  doctor: IDoctor;
}

const DoctorCard: React.FC<DoctorCardProps> = ({ doctor }) => {
  return (
    <div className="bg-white rounded-lg border border-[var(--gray-200)] p-4 mb-5">
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/6 flex justify-center md:justify-start mb-4 md:mb-0">
          <div className="w-24 h-24 relative rounded-full overflow-hidden border border-[var(--gray-200)]">
            <Image 
              src={doctor.image || '/default-doctor.png'} 
              alt={doctor.name}
              fill
              className="object-cover"
            />
          </div>
        </div>
        
        <div className="w-full md:w-3/6 md:pl-4">
          <h3 className="text-[var(--primary)] font-medium text-lg flex items-center">
            Dr. {doctor.name}
            {doctor.verified && (
              <svg className="ml-1 h-4 w-4 text-[var(--info)]" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            )}
          </h3>
          <p className="text-[var(--gray-700)] text-sm">{doctor.specialization}</p>
          <p className="text-[var(--gray-600)] text-xs mb-2">{doctor.qualification}</p>
          
          <div className="flex items-center text-xs text-[var(--gray-600)] mb-1">
            <span className="font-medium">{doctor.experience} YEARS</span>
            <span className="mx-2 text-[var(--gray-300)]">•</span>
            <span>{doctor.city}</span>
          </div>
          
          <p className="text-[var(--gray-600)] text-xs">
            {doctor.clinic}
          </p>
          
          {doctor.rating && doctor.patientCount && (
            <div className="mt-2 flex items-center">
              <div className="bg-green-100 text-green-800 flex items-center py-0.5 px-1.5 rounded text-xs">
                <FaThumbsUp className="mr-1 text-xs" />
                <span>{doctor.rating}%</span>
              </div>
              <span className="text-[var(--gray-500)] text-xs ml-2">({doctor.patientCount}+ Patients)</span>
            </div>
          )}
        </div>
        
        <div className="w-full md:w-2/6 mt-4 md:mt-0">
          <div className="flex flex-col md:items-end">
            <div className="md:text-right mb-3">
              <span className="text-xl font-medium">₹{doctor.fees}</span>
              {doctor.cashback && (
                <div className="flex items-center text-xs text-[var(--success)]">
                  <svg className="h-3 w-3 mr-1" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.31-8.86c-1.77-.45-2.34-.94-2.34-1.67 0-.84.79-1.43 2.1-1.43 1.38 0 1.9.66 1.94 1.64h1.71c-.05-1.34-.87-2.57-2.49-2.97V5H10.9v1.69c-1.51.32-2.72 1.3-2.72 2.81 0 1.79 1.49 2.69 3.66 3.21 1.95.46 2.34 1.15 2.34 1.87 0 .53-.39 1.39-2.1 1.39-1.6 0-2.23-.72-2.32-1.64H8.04c.1 1.7 1.36 2.66 2.86 2.97V19h2.34v-1.67c1.52-.29 2.72-1.16 2.73-2.77-.01-2.2-1.9-2.96-3.66-3.42z" />
                  </svg>
                  ₹{doctor.cashback} Cashback
                </div>
              )}
            </div>
            
            <div className="w-full flex flex-col space-y-2">
              <button className="w-full md:w-auto md:ml-auto py-2 px-4 rounded-md bg-[var(--primary)] text-white hover:bg-[var(--primary-dark)] text-sm text-center">
                Consult Online
                <div className="text-xs font-normal">Available in {doctor.availableIn || 2} minutes</div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;