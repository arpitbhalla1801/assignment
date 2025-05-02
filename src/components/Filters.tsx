import React, { useState } from 'react';
import { FaFilter, FaLocationArrow, FaSearch } from 'react-icons/fa';

interface FiltersProps {
  cities: string[];
  specializations: string[];
  onFilterChange: (filters: FilterState) => void;
}

export interface FilterState {
  city?: string;
  specialization?: string;
  gender?: string;
  minExperience?: string;
  maxFees?: string;
  sortBy?: string;
  language?: string;
  consultMode?: string;
}

const Filters: React.FC<FiltersProps> = ({ cities, specializations, onFilterChange }) => {
  const [localFilters, setLocalFilters] = useState<FilterState>({
    city: '',
    specialization: '',
    gender: '',
    minExperience: '',
    maxFees: '',
    sortBy: 'relevance',
    language: '',
    consultMode: ''
  });
  
  const [isOpen, setIsOpen] = useState(true);

  const handleLocalFilterChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      if (localFilters[name as keyof FilterState] === value) {
        setLocalFilters({ 
          ...localFilters, 
          [name]: '' 
        });
      } 
      else if (checked) {
        setLocalFilters({ 
          ...localFilters, 
          [name]: value 
        });
      }
    } 
    else {
      setLocalFilters({ 
        ...localFilters, 
        [name]: value 
      });
    }
  };
  
  const applyFilters = () => {
    onFilterChange(localFilters);
  };
  
  const clearFilters = () => {
    const defaultFilters = {
      city: '',
      specialization: '',
      gender: '',
      minExperience: '',
      maxFees: '',
      sortBy: 'relevance',
      language: '',
      consultMode: ''
    };
    setLocalFilters(defaultFilters);
    onFilterChange(defaultFilters);
  };

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-medium text-[var(--gray-800)]">Filters</h3>
        <button 
          onClick={clearFilters}
          className="text-[var(--primary)] text-sm hover:underline"
        >
          Clear All
        </button>
      </div>
      
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/5 md:pr-4">
          <div className="bg-white border border-[var(--gray-200)] rounded p-4">
            <h4 className="font-medium mb-4">City</h4>
            <div className="space-y-3 mb-6">
              {cities.length > 0 ? (
                cities.slice(0, 5).map((city) => (
                  <div key={city} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`city-${city}`}
                      name="city"
                      value={city}
                      className="h-4 w-4 text-[var(--primary)] border-[var(--gray-300)]"
                      onChange={handleLocalFilterChange}
                      checked={localFilters.city === city}
                    />
                    <label htmlFor={`city-${city}`} className="ml-2 text-sm text-[var(--gray-700)]">
                      {city}
                    </label>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500">Loading cities...</p>
              )}
            </div>
            
            <h4 className="font-medium mb-4">Mode of Consult</h4>
            <div className="space-y-3">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="hospital-visit"
                  name="consultMode"
                  value="hospital"
                  className="h-4 w-4 text-[var(--primary)] border-[var(--gray-300)]"
                  onChange={handleLocalFilterChange}
                  checked={localFilters.consultMode === 'hospital'}
                />
                <label htmlFor="hospital-visit" className="ml-2 text-sm text-[var(--gray-700)]">
                  Hospital Visit
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="online-consult"
                  name="consultMode"
                  value="online"
                  className="h-4 w-4 text-[var(--primary)] border-[var(--gray-300)]"
                  onChange={handleLocalFilterChange}
                  checked={localFilters.consultMode === 'online'}
                />
                <label htmlFor="online-consult" className="ml-2 text-sm text-[var(--gray-700)]">
                  Online Consult
                </label>
              </div>
            </div>
            
            <div className="mt-6">
              <h4 className="font-medium mb-4">Experience (In Years)</h4>
              
              <div className="space-y-3">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="exp-0-5"
                    name="minExperience"
                    value="0"
                    className="h-4 w-4 text-[var(--primary)] border-[var(--gray-300)]"
                    onChange={handleLocalFilterChange}
                    checked={localFilters.minExperience === "0"}
                  />
                  <label htmlFor="exp-0-5" className="ml-2 text-sm text-[var(--gray-700)]">
                    0-5
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="exp-6-10"
                    name="minExperience"
                    value="6"
                    className="h-4 w-4 text-[var(--primary)] border-[var(--gray-300)]"
                    onChange={handleLocalFilterChange}
                    checked={localFilters.minExperience === "6"}
                  />
                  <label htmlFor="exp-6-10" className="ml-2 text-sm text-[var(--gray-700)]">
                    6-10
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="exp-11-15"
                    name="minExperience"
                    value="11"
                    className="h-4 w-4 text-[var(--primary)] border-[var(--gray-300)]"
                    onChange={handleLocalFilterChange}
                    checked={localFilters.minExperience === "11"}
                  />
                  <label htmlFor="exp-11-15" className="ml-2 text-sm text-[var(--gray-700)]">
                    11-16
                  </label>
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <h4 className="font-medium mb-4">Fees (In Rupees)</h4>
              
              <div className="space-y-3">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="fees-100-500"
                    name="maxFees"
                    value="500"
                    className="h-4 w-4 text-[var(--primary)] border-[var(--gray-300)]"
                    onChange={handleLocalFilterChange}
                    checked={localFilters.maxFees === "500"}
                  />
                  <label htmlFor="fees-100-500" className="ml-2 text-sm text-[var(--gray-700)]">
                    100-500
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="fees-500-1000"
                    name="maxFees"
                    value="1000"
                    className="h-4 w-4 text-[var(--primary)] border-[var(--gray-300)]"
                    onChange={handleLocalFilterChange}
                    checked={localFilters.maxFees === "1000"}
                  />
                  <label htmlFor="fees-500-1000" className="ml-2 text-sm text-[var(--gray-700)]">
                    500-1000
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="fees-1000+"
                    name="maxFees"
                    value="2000"
                    className="h-4 w-4 text-[var(--primary)] border-[var(--gray-300)]"
                    onChange={handleLocalFilterChange}
                    checked={localFilters.maxFees === "2000"}
                  />
                  <label htmlFor="fees-1000+" className="ml-2 text-sm text-[var(--gray-700)]">
                    1000+
                  </label>
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <h4 className="font-medium mb-4">Gender</h4>
              
              <div className="space-y-3">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="gender-male"
                    name="gender"
                    value="male"
                    className="h-4 w-4 text-[var(--primary)] border-[var(--gray-300)]"
                    onChange={handleLocalFilterChange}
                    checked={localFilters.gender === "male"}
                  />
                  <label htmlFor="gender-male" className="ml-2 text-sm text-[var(--gray-700)]">
                    Male
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="gender-female"
                    name="gender"
                    value="female"
                    className="h-4 w-4 text-[var(--primary)] border-[var(--gray-300)]"
                    onChange={handleLocalFilterChange}
                    checked={localFilters.gender === "female"}
                  />
                  <label htmlFor="gender-female" className="ml-2 text-sm text-[var(--gray-700)]">
                    Female
                  </label>
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <h4 className="font-medium mb-4">Language</h4>
              
              <div className="space-y-3">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="lang-english"
                    name="language"
                    value="english"
                    className="h-4 w-4 text-[var(--primary)] border-[var(--gray-300)]"
                    onChange={handleLocalFilterChange}
                    checked={localFilters.language === "english"}
                  />
                  <label htmlFor="lang-english" className="ml-2 text-sm text-[var(--gray-700)]">
                    English
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="lang-hindi"
                    name="language"
                    value="hindi"
                    className="h-4 w-4 text-[var(--primary)] border-[var(--gray-300)]"
                    onChange={handleLocalFilterChange}
                    checked={localFilters.language === "hindi"}
                  />
                  <label htmlFor="lang-hindi" className="ml-2 text-sm text-[var(--gray-700)]">
                    Hindi
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="lang-telugu"
                    name="language"
                    value="telugu"
                    className="h-4 w-4 text-[var(--primary)] border-[var(--gray-300)]"
                    onChange={handleLocalFilterChange}
                    checked={localFilters.language === "telugu"}
                  />
                  <label htmlFor="lang-telugu" className="ml-2 text-sm text-[var(--gray-700)]">
                    Telugu
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="w-full md:w-4/5 mt-4 md:mt-0">
          <div className="bg-white border border-[var(--gray-200)] rounded p-4 mb-4">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center">
              <div className="flex items-center mb-4 md:mb-0">
                <label htmlFor="sortBy" className="text-sm mr-2">Sort by:</label>
                <select
                  id="sortBy"
                  name="sortBy"
                  value={localFilters.sortBy}
                  onChange={handleLocalFilterChange}
                  className="border border-[var(--gray-300)] rounded p-1 text-sm focus:outline-none focus:ring-1 focus:ring-[var(--primary)]"
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
                  onClick={applyFilters}
                  className="bg-[var(--primary)] text-white py-2 px-4 rounded text-sm flex items-center"
                >
                  <FaSearch className="mr-2" /> 
                  Apply Filters
                </button>
                
                <button 
                  className="bg-[var(--secondary)] text-white py-2 px-4 rounded text-sm flex items-center"
                  onClick={() => {
                    applyFilters();
                  }}
                >
                  <FaLocationArrow className="mr-2" /> 
                  Show Doctors Near Me
                </button>
              </div>
            </div>
          </div>
          
          <div className="md:hidden mb-4 space-y-3">
            <div className="w-full">
              <select
                name="sortBy"
                value={localFilters.sortBy}
                onChange={handleLocalFilterChange}
                className="w-full border border-[var(--gray-300)] rounded p-2 text-sm"
              >
                <option value="relevance">Sort by: Relevance</option>
                <option value="fees_low">Sort by: Fees: Low to High</option>
                <option value="fees_high">Sort by: Fees: High to Low</option>
                <option value="experience">Sort by: Experience</option>
                <option value="rating">Sort by: Rating</option>
              </select>
            </div>
            
            <div className="flex space-x-2">
              <button 
                onClick={applyFilters}
                className="flex-1 bg-[var(--primary)] text-white py-2 px-4 rounded text-sm flex items-center justify-center"
              >
                <FaSearch className="mr-2" /> 
                Apply Filters
              </button>
              
              <button 
                className="flex-1 bg-[var(--secondary)] text-white py-2 px-4 rounded text-sm flex items-center justify-center"
                onClick={() => {
                  applyFilters();
                }}
              >
                <FaLocationArrow className="mr-2" /> 
                Doctors Near Me
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filters;