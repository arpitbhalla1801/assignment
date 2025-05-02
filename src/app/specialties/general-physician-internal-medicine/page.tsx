'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '@/components/Header';
import Filters, { FilterState } from '@/components/Filters';
import DoctorCard from '@/components/DoctorCard';
import Pagination from '@/components/Pagination';
import { IDoctor } from '@/models/Doctor';
import Image from 'next/image';
import { FaInfoCircle, FaLocationArrow, FaSearch, FaSpinner } from 'react-icons/fa';

interface DoctorsResponse {
  success: boolean;
  data: {
    doctors: IDoctor[];
    pagination: {
      total: number;
      page: number;
      limit: number;
      pages: number;
    };
    filters: {
      cities: string[];
      specializations: string[];
    };
  };
}

export default function GeneralPhysicianPage() {
  const [doctors, setDoctors] = useState<IDoctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [cities, setCities] = useState<string[]>([]);
  const [specializations, setSpecializations] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState<FilterState>({
    specialization: 'General Physician',
    sortBy: 'relevance'
  });
  
  // Local state for selected sort option
  const [sortBy, setSortBy] = useState('relevance');

  const fetchDoctors = async () => {
    setLoading(true);
    try {
      // Build query parameters
      const params = new URLSearchParams();
      params.append('page', currentPage.toString());
      params.append('limit', '5'); // Changed from 10 to 5 doctors per page
      
      if (filters.city) params.append('city', filters.city);
      if (filters.specialization) params.append('specialization', filters.specialization);
      if (filters.gender) params.append('gender', filters.gender);
      if (filters.minExperience) params.append('minExperience', filters.minExperience);
      if (filters.maxFees) params.append('maxFees', filters.maxFees);
      if (filters.sortBy) params.append('sortBy', filters.sortBy);
      if (filters.language) params.append('language', filters.language);
      if (filters.consultMode) params.append('consultMode', filters.consultMode);
      
      console.log('Fetching doctors with params:', params.toString());
      
      const response = await axios.get<DoctorsResponse>(`/api/doctors/list?${params.toString()}`);
      
      if (response.data.success) {
        setDoctors(response.data.data.doctors);
        setCities(response.data.data.filters.cities || []);
        setSpecializations(response.data.data.filters.specializations || []);
        setTotalPages(response.data.data.pagination.pages);
      } else {
        setError('Failed to fetch doctors');
      }
    } catch (err) {
      setError('An error occurred while fetching doctors');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Initial load only - fetch doctors once when component mounts
  useEffect(() => {
    fetchDoctors();
  }, []);
  
  // Only change page without re-applying filters
  useEffect(() => {
    fetchDoctors();
  }, [currentPage]);

  const handleFilterChange = (newFilters: FilterState) => {
    // Always maintain the specialty filter
    const updatedFilters = {
      ...newFilters,
      specialization: 'General Physician'
    };
    
    setFilters(updatedFilters);
    setCurrentPage(1); // Reset to first page when filters change
  };

  const handleApplyFilters = () => {
    // Update filters with current sortBy value and apply all filters
    setFilters(prev => ({
      ...prev,
      sortBy
    }));
    
    // Reset to first page and fetch doctors with all filters
    setCurrentPage(1);
    
    // Small delay to ensure state update before fetching
    setTimeout(fetchDoctors, 10);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Smooth scroll to top when page changes
  };

  return (
    <main className="min-h-screen bg-white">
      <Header />
      <div className="container mx-auto px-4 py-4">
        <div className="mb-6">
          <h1 className="text-2xl font-medium text-black">
            Consult General Physicians Online - Internal Medicine Specialists
          </h1>
          <div className="text-sm text-gray-600">
            ({doctors.length > 0 ? '761' : '0'} doctors)
          </div>
        </div>

        {/* Main content layout - horizontal row with filters on left, doctors on right */}
        <div className="flex flex-col md:flex-row">
          {/* Left sidebar filters - like in the screenshot */}
          <div className="w-full md:w-72 md:pr-6 mb-6 md:mb-0">
            <div className="bg-white rounded border border-gray-200 p-5">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium">Filters</h2>
                <button 
                  onClick={() => {
                    setFilters({specialization: 'General Physician', sortBy: 'relevance'});
                    setSortBy('relevance');
                    setTimeout(fetchDoctors, 0);
                  }}
                  className="text-[var(--primary)] text-sm hover:underline"
                >
                  Clear All
                </button>
              </div>
              
              {/* City filter */}
              <div className="mb-6">
                <h3 className="text-base font-medium mb-3">City</h3>
                <div className="space-y-2">
                  {cities && cities.length > 0 ? cities.slice(0, 5).map((city) => (
                    <div key={city} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`city-${city}`}
                        checked={filters.city === city}
                        onChange={() => {
                          if (filters.city === city) {
                            setFilters({...filters, city: ''});
                          } else {
                            setFilters({...filters, city});
                          }
                        }}
                        className="w-4 h-4 text-[var(--primary)] border-gray-300 rounded focus:ring-[var(--primary)]"
                      />
                      <label htmlFor={`city-${city}`} className="ml-2 text-sm text-gray-700">{city}</label>
                    </div>
                  )) : (
                    <p className="text-sm text-gray-500">Loading cities...</p>
                  )}
                </div>
              </div>
              
              {/* Mode of consult */}
              <div className="mb-6">
                <h3 className="text-base font-medium mb-3">Mode of Consult</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="hospital-visit"
                      checked={filters.consultMode === 'hospital'}
                      onChange={() => {
                        if (filters.consultMode === 'hospital') {
                          setFilters({...filters, consultMode: ''});
                        } else {
                          setFilters({...filters, consultMode: 'hospital'});
                        }
                      }}
                      className="w-4 h-4 text-[var(--primary)] border-gray-300 rounded focus:ring-[var(--primary)]"
                    />
                    <label htmlFor="hospital-visit" className="ml-2 text-sm text-gray-700">Hospital Visit</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="online-consult"
                      checked={filters.consultMode === 'online'}
                      onChange={() => {
                        if (filters.consultMode === 'online') {
                          setFilters({...filters, consultMode: ''});
                        } else {
                          setFilters({...filters, consultMode: 'online'});
                        }
                      }}
                      className="w-4 h-4 text-[var(--primary)] border-gray-300 rounded focus:ring-[var(--primary)]"
                    />
                    <label htmlFor="online-consult" className="ml-2 text-sm text-gray-700">Online Consult</label>
                  </div>
                </div>
              </div>
              
              {/* Experience filter */}
              <div className="mb-6">
                <h3 className="text-base font-medium mb-3">Experience (In Years)</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="exp-0-5"
                      checked={filters.minExperience === '0'}
                      onChange={() => {
                        if (filters.minExperience === '0') {
                          setFilters({...filters, minExperience: ''});
                        } else {
                          setFilters({...filters, minExperience: '0'});
                        }
                      }}
                      className="w-4 h-4 text-[var(--primary)] border-gray-300 rounded focus:ring-[var(--primary)]"
                    />
                    <label htmlFor="exp-0-5" className="ml-2 text-sm text-gray-700">0-5</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="exp-6-10"
                      checked={filters.minExperience === '6'}
                      onChange={() => {
                        if (filters.minExperience === '6') {
                          setFilters({...filters, minExperience: ''});
                        } else {
                          setFilters({...filters, minExperience: '6'});
                        }
                      }}
                      className="w-4 h-4 text-[var(--primary)] border-gray-300 rounded focus:ring-[var(--primary)]"
                    />
                    <label htmlFor="exp-6-10" className="ml-2 text-sm text-gray-700">6-10</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="exp-11-15"
                      checked={filters.minExperience === '11'}
                      onChange={() => {
                        if (filters.minExperience === '11') {
                          setFilters({...filters, minExperience: ''});
                        } else {
                          setFilters({...filters, minExperience: '11'});
                        }
                      }}
                      className="w-4 h-4 text-[var(--primary)] border-gray-300 rounded focus:ring-[var(--primary)]"
                    />
                    <label htmlFor="exp-11-15" className="ml-2 text-sm text-gray-700">11-16</label>
                  </div>
                </div>
              </div>
              
              {/* Gender filter */}
              <div className="mb-6">
                <h3 className="text-base font-medium mb-3">Gender</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="gender-male"
                      checked={filters.gender === 'male'}
                      onChange={() => {
                        if (filters.gender === 'male') {
                          setFilters({...filters, gender: ''});
                        } else {
                          setFilters({...filters, gender: 'male'});
                        }
                      }}
                      className="w-4 h-4 text-[var(--primary)] border-gray-300 rounded focus:ring-[var(--primary)]"
                    />
                    <label htmlFor="gender-male" className="ml-2 text-sm text-gray-700">Male</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="gender-female"
                      checked={filters.gender === 'female'}
                      onChange={() => {
                        if (filters.gender === 'female') {
                          setFilters({...filters, gender: ''});
                        } else {
                          setFilters({...filters, gender: 'female'});
                        }
                      }}
                      className="w-4 h-4 text-[var(--primary)] border-gray-300 rounded focus:ring-[var(--primary)]"
                    />
                    <label htmlFor="gender-female" className="ml-2 text-sm text-gray-700">Female</label>
                  </div>
                </div>
              </div>
              
              {/* Fees filter */}
              <div className="mb-6">
                <h3 className="text-base font-medium mb-3">Fees (in Rupees)</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="fees-100-500"
                      checked={filters.maxFees === '500'}
                      onChange={() => {
                        if (filters.maxFees === '500') {
                          setFilters({...filters, maxFees: ''});
                        } else {
                          setFilters({...filters, maxFees: '500'});
                        }
                      }}
                      className="w-4 h-4 text-[var(--primary)] border-gray-300 rounded focus:ring-[var(--primary)]"
                    />
                    <label htmlFor="fees-100-500" className="ml-2 text-sm text-gray-700">100-500</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="fees-500-1000"
                      checked={filters.maxFees === '1000'}
                      onChange={() => {
                        if (filters.maxFees === '1000') {
                          setFilters({...filters, maxFees: ''});
                        } else {
                          setFilters({...filters, maxFees: '1000'});
                        }
                      }}
                      className="w-4 h-4 text-[var(--primary)] border-gray-300 rounded focus:ring-[var(--primary)]"
                    />
                    <label htmlFor="fees-500-1000" className="ml-2 text-sm text-gray-700">500-1000</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="fees-1000+"
                      checked={filters.maxFees === '2000'}
                      onChange={() => {
                        if (filters.maxFees === '2000') {
                          setFilters({...filters, maxFees: ''});
                        } else {
                          setFilters({...filters, maxFees: '2000'});
                        }
                      }}
                      className="w-4 h-4 text-[var(--primary)] border-gray-300 rounded focus:ring-[var(--primary)]"
                    />
                    <label htmlFor="fees-1000+" className="ml-2 text-sm text-gray-700">1000+</label>
                  </div>
                </div>
              </div>
              
              {/* Language filter */}
              <div className="mb-6">
                <h3 className="text-base font-medium mb-3">Language</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="lang-english"
                      checked={filters.language === 'english'}
                      onChange={() => {
                        if (filters.language === 'english') {
                          setFilters({...filters, language: ''});
                        } else {
                          setFilters({...filters, language: 'english'});
                        }
                      }}
                      className="w-4 h-4 text-[var(--primary)] border-gray-300 rounded focus:ring-[var(--primary)]"
                    />
                    <label htmlFor="lang-english" className="ml-2 text-sm text-gray-700">English</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="lang-hindi"
                      checked={filters.language === 'hindi'}
                      onChange={() => {
                        if (filters.language === 'hindi') {
                          setFilters({...filters, language: ''});
                        } else {
                          setFilters({...filters, language: 'hindi'});
                        }
                      }}
                      className="w-4 h-4 text-[var(--primary)] border-gray-300 rounded focus:ring-[var(--primary)]"
                    />
                    <label htmlFor="lang-hindi" className="ml-2 text-sm text-gray-700">Hindi</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="lang-telugu"
                      checked={filters.language === 'telugu'}
                      onChange={() => {
                        if (filters.language === 'telugu') {
                          setFilters({...filters, language: ''});
                        } else {
                          setFilters({...filters, language: 'telugu'});
                        }
                      }}
                      className="w-4 h-4 text-[var(--primary)] border-gray-300 rounded focus:ring-[var(--primary)]"
                    />
                    <label htmlFor="lang-telugu" className="ml-2 text-sm text-gray-700">Telugu</label>
                  </div>
                </div>
              </div>
              
              {/* Additional filters as needed */}
            </div>
          </div>

          {/* Right side content area */}
          <div className="flex-grow">
            {/* Help banner - exactly like in the screenshot */}
            <div className="bg-[#004D61] text-white rounded-md p-5 mb-5">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-medium mb-2">Need help consult the right doctor?</h3>
                  <p>Call +91-8040245807 to book instantly</p>
                </div>
                <div>
                  <Image 
                    src="/doctors-banner.png" 
                    alt="Apollo 24/7 Doctors" 
                    width={150} 
                    height={80}
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
            
            {/* Sort controls with Apply Filters and Show Doctors Near Me buttons */}
            <div className="mb-5 flex flex-col md:flex-row md:items-center space-y-3 md:space-y-0">
              <div className="md:mr-auto flex items-center">
                <span className="text-sm mr-2">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-gray-300 rounded p-1.5 text-sm"
                >
                  <option value="relevance">Relevance</option>
                  <option value="fees_low">Fees: Low to High</option>
                  <option value="fees_high">Fees: High to Low</option>
                  <option value="experience">Experience</option>
                  <option value="rating">Rating</option>
                </select>
              </div>
              
              <div className="flex space-x-3">
                <button 
                  onClick={handleApplyFilters}
                  className="bg-[#005D76] text-white py-2 px-4 rounded flex items-center"
                >
                  {loading && <FaSpinner className="animate-spin mr-2" />}
                  Apply Filters
                </button>
                <button 
                  onClick={handleApplyFilters}
                  className="bg-[#FF7E1D] text-white py-2 px-4 rounded flex items-center"
                >
                  <FaLocationArrow className="mr-2" />
                  Show Doctors Near Me
                </button>
              </div>
            </div>

            {/* Error message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
                {error}
              </div>
            )}

            {/* Loading state */}
            {loading && (
              <div className="flex justify-center items-center py-6">
                <div className="flex flex-col items-center">
                  <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[var(--primary)]"></div>
                  <span className="mt-2 text-sm text-gray-600">Loading doctors...</span>
                </div>
              </div>
            )}

            {/* Doctors list - directly below the filters */}
            {!loading && doctors.length === 0 ? (
              <div className="text-center py-8 bg-white border border-gray-200 rounded-lg">
                <p className="text-lg text-gray-600">No doctors found matching your criteria.</p>
                <p className="mt-2 text-gray-500">Try adjusting your filters or search query.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {doctors.map((doctor) => (
                  <DoctorCard key={doctor.name} doctor={doctor} />
                ))}
              </div>
            )}

            {/* Pagination */}
            <div className="mt-6">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          </div>
        </div>
        
        {/* General Medicine Information Content */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 mt-8">
          <h2 className="text-xl font-medium text-[var(--gray-800)] mb-4">
            Book Consult for General Medicine Online
          </h2>
          <p className="text-[var(--gray-700)] mb-4 text-sm leading-relaxed">
            Booking an appointment with a top general physician (GP) is now easier than ever with Apollo 24|7. Our experienced doctors provide comprehensive care for a wide range of medical conditions, including fever, allergies, and diabetes. You can conveniently schedule an online general physician consultation or visit a trusted hospital/clinic near you. Our allergies doctor and diabetes doctor offer flexible appointment slots to suit your needs. With transparent general physician fees and genuine general physician reviews, you can make an informed decision when choosing your healthcare provider. Take charge of your health today by booking a doctor near your location by searching the phrase general physician near me.
          </p>

          <h3 className="text-lg font-medium text-[var(--gray-800)] mt-6 mb-3">
            What is General Medicine?
          </h3>
          <p className="text-[var(--gray-700)] mb-4 text-sm leading-relaxed">
            General medicine is a medical speciality that focuses on the prevention, diagnosis, and treatment of internal diseases in adults. This speciality encompasses a wide range of acute and chronic conditions affecting various parts of the body, including fever, asthma, heart disease, liver problems, hypertension, and neurological disorders. General medicine plays a crucial role in healthcare by providing comprehensive medical care, managing complex conditions, and addressing multiple co-morbidities. General physicians are essential in preventive healthcare, early diagnosis, and the long-term management of chronic diseases, ultimately improving patient outcomes and quality of life.
          </p>

          <h3 className="text-lg font-medium text-[var(--gray-800)] mt-6 mb-3">
            Who is a General Physician?
          </h3>
          <p className="text-[var(--gray-700)] mb-4 text-sm leading-relaxed">
            A general physician is a medical doctor who specialises in the diagnosis, treatment, and prevention of adult diseases. To become a general physician in the Indian subcontinent, one must complete an MBBS degree followed by postgraduate training in General Medicine or Internal Medicine. General physicians are trained to diagnose and treat a wide range of medical conditions, providing comprehensive care that includes preventive health measures, early detection of diseases, and long-term management of chronic conditions. They play a vital role in coordinating care when patients have multiple co-morbidities or complex presentations, making them essential in preventive healthcare.
          </p>

          <h3 className="text-lg font-medium text-[var(--gray-800)] mt-6 mb-3">
            What Do General Physicians Do?
          </h3>
          <p className="text-[var(--gray-700)] mb-3 text-sm leading-relaxed">
            General physicians (GPs) are the first point of contact for patients seeking medical care. Some of the key responsibilities of doctors include:
          </p>
          <ul className="list-disc pl-5 mb-4 text-[var(--gray-700)] text-sm leading-relaxed space-y-1">
            <li>Conducting thorough physical examinations and taking detailed medical histories to accurately diagnose health issues</li>
            <li>Ordering and interpreting diagnostic tests, such as blood work, imaging studies, and biopsies, to identify underlying conditions</li>
            <li>Developing personalised treatment plans that may include medications, lifestyle modifications, or referrals to specialists when necessary</li>
            <li>Providing preventive care, such as vaccinations and health screenings, to help patients maintain optimal health and prevent the onset of diseases</li>
            <li>Educating patients about their health conditions, treatment options, and self-care strategies to promote better health outcomes</li>
            <li>Collaborating with other healthcare professionals, such as specialists and nurses, to ensure comprehensive and coordinated patient care</li>
          </ul>

          <h3 className="text-lg font-medium text-[var(--gray-800)] mt-6 mb-3">
            What are the Other Sub-Specialities of General Medicine?
          </h3>
          <p className="text-[var(--gray-700)] mb-3 text-sm leading-relaxed">
            General medicine encompasses several sub-specialties that focus on specific areas of adult healthcare, These include:
          </p>
          <ul className="list-disc pl-5 mb-4 text-[var(--gray-700)] text-sm leading-relaxed space-y-1">
            <li>Geriatric Medicine: This sub-speciality focuses on the unique healthcare needs of older adults, addressing age-related conditions and promoting healthy ageing.</li>
            <li>Palliative Care: Palliative care specialists provide compassionate care to patients with serious or life-limiting illnesses, focusing on symptom management and quality of life.</li>
            <li>Sports Medicine: This sub-speciality deals with the prevention, diagnosis, and treatment of sports-related injuries and conditions, helping athletes maintain optimal performance and recover from injuries.</li>
            <li>Preventive Medicine: Preventive medicine specialists focus on promoting health and preventing diseases at the individual and population levels through lifestyle interventions, health education, and public health initiatives.</li>
            <li>Paediatric Medicine: While general medicine primarily focuses on adult care, some general physicians may have additional training in paediatric medicine, allowing them to provide care for children and adolescents.</li>
            <li>Addiction Medicine: This sub-speciality addresses substance use disorders and related health issues, providing evidence-based treatments and support for individuals struggling with addiction.</li>
            <li>Occupational Medicine: Occupational medicine specialists focus on the health and safety of workers, preventing and treating work-related injuries and illnesses, and promoting safe work environments.</li>
            <li>Rural Medicine: General physicians practising in rural areas often have a broad skill set to address the diverse healthcare needs of communities with limited access to specialist care.</li>
          </ul>

          <h3 className="text-lg font-medium text-[var(--gray-800)] mt-6 mb-3">
            What are the Examinations Conducted Under General Medicine or Tests Performed by a General Physician?
          </h3>
          <p className="text-[var(--gray-700)] mb-3 text-sm leading-relaxed">
            General physicians perform a variety of diagnostic tests and examinations to accurately diagnose and monitor health conditions. Some of the most common tests and examinations include:
          </p>
          <ul className="list-disc pl-5 mb-4 text-[var(--gray-700)] text-sm leading-relaxed space-y-1">
            <li>Physical Examination: A thorough head-to-toe assessment to evaluate overall health and identify any signs of disease or abnormalities.</li>
            <li>Blood Tests: Various blood tests, such as complete blood count (CBC), metabolic panel, and lipid profile, assess organ function, detect infections, and screen for health issues.</li>
            <li>Urine Analysis: Examination of urine samples to detect urinary tract infections, kidney problems, or other health conditions.</li>
            <li>Imaging Studies: X-rays, ultrasounds, CT scans, and MRI scans to visualise internal structures and diagnose conditions such as fractures, tumours, or organ damage.</li>
            <li>Electrocardiogram (ECG): A test that records the electrical activity of the heart to detect heart rhythm abnormalities or signs of heart disease.</li>
            <li>Pulmonary Function Tests (PFTs): Breathing tests that measure lung function and capacity, are often used to diagnose and monitor respiratory conditions like asthma or chronic obstructive pulmonary disease (COPD).</li>
            <li>Biopsies: The removal of small tissue samples for laboratory analysis to diagnose conditions such as cancer or inflammatory diseases.</li>
            <li>Allergy Tests: Skin prick tests or blood tests to identify specific allergens causing allergic reactions.</li>
            <li>Glucose Tolerance Test: A test that measures blood sugar levels over time to diagnose diabetes or prediabetes.</li>
          </ul>

          <h3 className="text-lg font-medium text-[var(--gray-800)] mt-6 mb-3">
            What are the Common Conditions & Diseases that General Physicians Treat?
          </h3>
          <p className="text-[var(--gray-700)] mb-3 text-sm leading-relaxed">
            General physicians are skilled at managing a wide array of health issues. Here are some of the conditions and diseases most commonly treated by doctors:
          </p>
          <ul className="list-disc pl-5 mb-4 text-[var(--gray-700)] text-sm leading-relaxed space-y-1">
            <li>Fever: A doctor for fever can diagnose and treat various infections causing fever, such as viral or bacterial infections.</li>
            <li>Allergies: As allergies doctor, GP can identify allergens and provide treatment options to manage symptoms like sneezing, runny nose, and itchy eyes.</li>
            <li>Diabetes: As a diabetes doctor, a GP plays a crucial role in diagnosing and managing diabetes, helping patients maintain healthy blood sugar levels through medication, diet, and lifestyle changes.</li>
            <li>Hypertension: General physicians regularly monitor blood pressure and prescribe medications to control hypertension, reducing the risk of heart disease and stroke.</li>
            <li>Respiratory infections: Common colds, flu, bronchitis, and pneumonia are frequently managed by doctors, who provide appropriate treatment to alleviate symptoms and prevent complications.</li>
            <li>Gastrointestinal issues: General physicians treat digestive problems like acid reflux, irritable bowel syndrome, and constipation, offering dietary advice and medications to relieve symptoms.</li>
            <li>Urinary tract infections (UTIs): General physicians diagnose and treat UTIs, which can cause painful urination, frequent urges to urinate, and abdominal discomfort.</li>
            <li>Skin conditions: Rashes, eczema, acne, and other skin problems are addressed by GPs, who may prescribe topical or oral treatments to improve skin health.</li>
            <li>Musculoskeletal pain: General physicians evaluate and treat muscle and joint pain, including back pain, arthritis, and sports injuries, recommending exercises, physical therapy, or pain medications as needed.</li>
            <li>Mental health concerns: General physicians can identify and provide initial treatment for mental health issues like anxiety, depression, and stress, referring patients to specialists when necessary.</li>
            <li>Headaches: General physicians can diagnose and treat various types of headaches, including tension headaches, migraines, and those caused by underlying health conditions.</li>
            <li>Thyroid disorders: Doctors can detect and manage thyroid disorders like hypothyroidism and hyperthyroidism, which can cause weight changes, fatigue, and mood disturbances.</li>
            <li>Anaemia: GPs can diagnose anaemia, a condition characterised by low haemoglobin levels, and recommend dietary changes or supplements to improve red blood cell production.</li>
            <li>Sleep disorders: General physicians can identify sleep disorders like insomnia and sleep apnea, offering lifestyle recommendations or referring patients to sleep specialists for further evaluation and treatment.</li>
            <li>Vaccinations: General physicians administer vaccinations to protect patients against preventable diseases like influenza, pneumonia, and hepatitis.</li>
          </ul>

          <h3 className="text-lg font-medium text-[var(--gray-800)] mt-6 mb-3">
            Reasons to See a General Physician
          </h3>
          <p className="text-[var(--gray-700)] mb-3 text-sm leading-relaxed">
            Regular visits to a general physician are essential for maintaining optimal health and detecting potential health issues early on. Here are some key reasons to book general physician appointments:
          </p>
          <ul className="list-disc pl-5 mb-4 text-[var(--gray-700)] text-sm leading-relaxed space-y-1">
            <li>Annual check-ups: Scheduling yearly check-ups with a general physician allows for the monitoring of overall health, including blood pressure, cholesterol levels, and weight, helping to identify any developing health concerns.</li>
            <li>Chronic disease management: If you have a chronic condition like diabetes, hypertension, or asthma, regular visits to a doctor are crucial for monitoring your condition and adjusting treatment plans as needed.</li>
            <li>Acute illnesses: When you experience symptoms of acute illnesses like fever, sore throat, or ear pain, a general physician can provide prompt diagnosis and treatment to help you recover quickly and prevent complications.</li>
            <li>Unexplained symptoms: If you experience persistent or unusual symptoms like fatigue, weight changes, or digestive issues, a GP can perform a thorough evaluation to determine the underlying cause and recommend appropriate treatment.</li>
            <li>Preventive care: General physicians offer preventive services like vaccinations, cancer screenings, and lifestyle counselling to help you maintain optimal health and reduce your risk of developing chronic diseases.</li>
            <li>Family history of health issues: If you have a family history of certain health conditions like heart disease, diabetes, or cancer, a general physician can assess your risk factors and provide guidance on preventive measures to lower your risk.</li>
          </ul>

          <h3 className="text-lg font-medium text-[var(--gray-800)] mt-6 mb-3">
            What Types of Procedures Do General Physicians Perform?
          </h3>
          <p className="text-[var(--gray-700)] mb-3 text-sm leading-relaxed">
            General physicians perform a variety of therapeutic and minor surgical procedures, including:
          </p>
          <ul className="list-disc pl-5 mb-4 text-[var(--gray-700)] text-sm leading-relaxed space-y-1">
            <li>Health screenings: General physicians conduct routine health screenings like physical examinations, well-child visits, and adolescent health checks to assess overall health and identify any potential concerns.</li>
            <li>Vaccination administration: Doctors administer vaccinations to protect patients against preventable diseases like influenza, pneumonia, and hepatitis.</li>
            <li>Wound care: General physicians clean, suture, and dress wounds to promote healing and prevent infection.</li>
            <li>Skin lesion removal: General physicians can perform minor surgical procedures to remove skin lesions like moles, warts, and skin tags for cosmetic or diagnostic purposes.</li>
            <li>Ingrown toenail treatment: Doctors can remove or partially remove ingrown toenails to relieve pain and prevent infection.</li>
            <li>Abscess drainage: Doctors can perform incision and drainage procedures to treat abscesses, which are localised infections that cause painful swelling and pus accumulation.</li>
            <li>Joint injections: General physicians may administer corticosteroid injections into joints to relieve pain and inflammation associated with conditions like arthritis or bursitis.</li>
            <li>Nebulizer treatment: GPs can provide nebulizer treatments to patients with respiratory conditions like asthma or COPD to deliver medication directly to the lungs and improve breathing.</li>
            <li>Ear wax removal: Doctors can safely remove excessive ear wax using irrigation, suction, or specialised instruments to improve hearing and prevent ear discomfort.</li>
            <li>Pap smears: Female general physicians can perform pap smears to screen for cervical cancer and detect any abnormalities in the cervical cells.</li>
            <li>Electrocardiograms (ECGs): General physicians can perform and interpret ECGs to assess heart rhythm and detect any abnormalities that may indicate underlying heart disease.</li>
            <li>Spirometry: GPs can conduct spirometry tests to measure lung function and diagnose respiratory conditions like asthma and COPD.</li>
            <li>Urinalysis: General physicians can perform urine tests to screen for urinary tract infections, kidney problems, and other health issues.</li>
            <li>Blood glucose testing: GPs can perform blood glucose tests to diagnose and monitor diabetes, ensuring proper management of the condition.</li>
            <li>Minor fracture management: Doctors can diagnose and treat minor fractures by applying splints or casts and providing pain management until the bone heals.</li>
          </ul>

          <h3 className="text-lg font-medium text-[var(--gray-800)] mt-6 mb-3">
            Why Choose an Apollo 24|7 General Physician?
          </h3>
          <p className="text-[var(--gray-700)] mb-4 text-sm leading-relaxed">
            Apollo 24|7 doctors for fever and allergies doctor are highly skilled and experienced in providing comprehensive healthcare services. With their expertise and access to advanced facilities, they offer personalised care tailored to each patient's unique needs. Apollo 24|7 diabetes doctors stay up-to-date with the latest medical advancements, ensuring that patients receive the most effective and evidence-based treatments available.
          </p>
          <p className="text-[var(--gray-700)] mb-4 text-sm leading-relaxed">
            Patients can easily book general physician appointments through the Apollo 24|7 platform, which offers seamless access to both online and in-clinic consultations. The user-friendly interface allows patients to view general physician reviews, compare general physician fees, and find a doctor near their location by searching for the phrase general physician near me based on their preferences. By choosing an Apollo 24|7 general physician, patients can expect high-quality, patient-centric care that prioritises their health and well-being.
          </p>

          <h3 className="text-lg font-medium text-[var(--gray-800)] mt-6 mb-3">
            What to Expect When Visiting a General Physician?
          </h3>
          <p className="text-[var(--gray-700)] mb-3 text-sm leading-relaxed">
            When you visit a general physician, you can expect a comprehensive evaluation of your health concerns and a personalised treatment plan tailored to your needs. Here's what a typical doctor visit may involve:
          </p>
          <ul className="list-disc pl-5 mb-4 text-[var(--gray-700)] text-sm leading-relaxed space-y-1">
            <li>Medical history review: Your general physician will ask about your medical history, including any pre-existing conditions, medications, allergies, and family history of health issues.</li>
            <li>Symptom discussion: You will have the opportunity to discuss your current symptoms, concerns, and any changes in your health status since your last visit.</li>
            <li>Physical examination: Your general physician will perform a thorough physical examination, checking your vital signs, assessing your overall health, and focusing on any areas of concern.</li>
            <li>Diagnostic tests: Depending on your symptoms and medical history, your doctor may order diagnostic tests like blood work, urine tests, or imaging studies to gather more information about your health.</li>
            <li>Diagnosis and treatment plan: Based on the information gathered during your visit, your general physician will provide a diagnosis and develop a treatment plan that may include medications, lifestyle modifications, or referrals to specialists if needed.</li>
          </ul>

          <h3 className="text-lg font-medium text-[var(--gray-800)] mt-6 mb-3">
            How Can I Get an Appointment With a General Physician?
          </h3>
          <p className="text-[var(--gray-700)] mb-3 text-sm leading-relaxed">
            Getting an appointment with a general physician is easy and convenient with Apollo 24|7. Here are the steps to book a general physician:
          </p>
          <ul className="list-disc pl-5 mb-4 text-[var(--gray-700)] text-sm leading-relaxed space-y-1">
            <li>Online booking through the website: Visit the Apollo 24|7 website and navigate to the "Book Appointment" section. Choose your preferred general physician based on their profile, experience, general physician reviews, and general physician fee. Select a suitable date and time for your appointment and complete booking online general physician consultation.</li>
            <li>Online booking through the mobile app: Download the Apollo 24|7 mobile app from the App Store or Google Play Store. Log in or create an account, and follow the same steps as mentioned above for booking through the website. The app allows you to easily search for a doctor near your location by searching the phrase general physician near me, view available slots, and book your appointment with just a few taps.</li>
            <li>Offline booking: You can also book an appointment by visiting your nearest Apollo Clinic or Hospital and requesting an appointment with a general physician at the reception. The staff will assist you in scheduling your consultation based on the doctor's availability.</li>
          </ul>
        </div>
      </div>
    </main>
  );
}