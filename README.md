# Apollo247 Doctor Listing Clone

This project is a clone of the Apollo247 doctor listing page, focusing specifically on the General Physician & Internal Medicine specialists section. The application implements a full-stack solution with Next.js for the frontend and a MongoDB backend with REST APIs.

## Features Implemented

- **Doctor Listing Page**: Clone of https://www.apollo247.com/specialties/general-physician-internal-medicine
- **Functional Filters**: Filter doctors by city, specialization, gender, experience, fees, and more
- **Pagination**: Navigate through doctor listings with a user-friendly pagination system
- **Responsive Design**: Works well on both desktop and mobile devices
- **SEO Optimization**: Implemented offpage SEO with metadata, semantic HTML, and content optimization
- **REST APIs**: Backend APIs for doctor management
  - `POST /api/doctors` - Add a new doctor
  - `GET /api/doctors/list` - List doctors with filtering and pagination

## Technical Implementation

- **Frontend**: Next.js with TypeScript and Tailwind CSS
- **Backend**: Next.js API routes
- **Database**: MongoDB with Mongoose
- **State Management**: React Hooks (useState, useEffect)
- **HTTP Client**: Axios for API requests
- **Icons**: React Icons

## Project Structure

- `/src/app` - Next.js app directory
  - `/api` - API routes
  - `/specialties/general-physician-internal-medicine` - Main doctor listing page
- `/src/components` - Reusable UI components
- `/src/lib` - Utility functions and database connection
- `/src/models` - MongoDB models
- `/src/scripts` - Database seeding scripts

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or remote)

### Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env.local` file with your MongoDB connection string:
   ```
   MONGODB_URI=mongodb://localhost:27017/apollo247-clone
   ```

### Running the Application

1. Seed the database with sample data:
   ```
   npm run seed
   ```
2. Start the development server:
   ```
   npm run dev
   ```
3. Open [http://localhost:3000](http://localhost:3000) in your browser

## API Endpoints

### Add Doctor

```
POST /api/doctors
```

Request body:
```json
{
  "name": "Dr. John Doe",
  "specialization": "General Physician",
  "qualification": "MBBS, MD",
  "experience": 10,
  "city": "Mumbai",
  "clinic": "Apollo Clinic",
  "fees": 500,
  "gender": "male",
  "cashback": 75,
  "rating": 90,
  "patientCount": 200,
  "availableIn": 15
}
```

### List Doctors with Filters

```
GET /api/doctors/list?page=1&limit=10&city=Mumbai&gender=male&sortBy=rating
```

Query parameters:
- `page`: Page number (default: 1)
- `limit`: Number of doctors per page (default: 10)
- `specialization`: Filter by specialization
- `city`: Filter by city
- `gender`: Filter by gender
- `minExperience`: Minimum years of experience
- `maxFees`: Maximum consultation fees
- `sortBy`: Sort results by (relevance, fees_low, fees_high, experience, rating)
- `query`: Text search query

## License

This project is for educational purposes only. It is not affiliated with or endorsed by Apollo 247.
