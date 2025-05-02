import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaShoppingCart, FaSearch, FaUser, FaMapMarkerAlt, FaChevronDown, FaPlus } from 'react-icons/fa';

const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-[var(--gray-200)]">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center mr-8">
              <div className="relative h-9 w-32">
                <div className="flex items-center">
                  <span className="text-[var(--primary)] font-bold text-xl">Apollo</span>
                  <span className="bg-[var(--secondary)] text-white font-bold px-1 rounded-sm text-sm mx-1">24|7</span>
                </div>
              </div>
            </Link>
            
            <div className="hidden md:flex items-center text-[var(--gray-600)] text-sm">
              <FaMapMarkerAlt className="text-[var(--secondary)] mr-1" />
              <span>Select Location</span>
              <div className="flex items-center ml-1 font-medium">
                <span>Select Address</span>
                <FaChevronDown className="ml-1 text-xs" />
              </div>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="relative hidden md:block mr-4">
              <div className="flex items-center border border-[var(--gray-300)] rounded-md bg-[var(--gray-50)] pr-3">
                <input
                  type="text"
                  placeholder="Search Doctors, Specialities, Conditions etc."
                  className="py-2 pl-3 pr-10 w-80 bg-transparent border-none focus:outline-none text-sm"
                />
                <FaSearch className="text-[var(--gray-500)]" />
              </div>
            </div>
            
            <Link href="/login" className="flex items-center border border-[var(--primary)] rounded-md px-4 py-1 text-[var(--primary)] hover:bg-[var(--primary-light)] hover:text-white transition-colors duration-200">
              <span className="font-medium">Login</span>
              <FaUser className="ml-2" />
            </Link>
          </div>
        </div>
      </div>
      
      <div className="border-t border-[var(--gray-200)]">
        <div className="container mx-auto px-4">
          <nav className="flex overflow-x-auto scrollbar-hidden">
            <Link href="/doctors" className="py-3 px-4 text-[var(--gray-700)] hover:text-[var(--primary)] font-medium border-b-2 border-[var(--primary)] whitespace-nowrap">
              Find Doctors
            </Link>
            <Link href="/admin/doctors/add" className="py-3 px-4 text-[var(--gray-700)] hover:text-[var(--primary)] whitespace-nowrap flex items-center">
              <FaPlus className="mr-1" size={14} /> Add Doctors
            </Link>
          </nav>
        </div>
      </div>
      
      <div className="bg-white border-t border-[var(--gray-200)]">
        <div className="container mx-auto px-4">
          <nav className="flex text-sm py-2">
            <Link href="/" className="text-gray-500 hover:text-[var(--primary)]">
              Home
            </Link>
            <span className="mx-2 text-gray-400">/</span>
            <Link href="/doctors" className="text-gray-500 hover:text-[var(--primary)]">
              Doctors
            </Link>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-black">General Physicians</span>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;