export interface PGListing {
  id: string;
  name: string;
  images: string[];
  monthlyRent: number;
  genderPreference: 'Male' | 'Female' | 'Co-ed';
  location: string;
  area: string;
  phoneNumber: string;
  googleMapsLink: string;
  rating: number;
  amenities: string[];
  roomType: 'Single' | 'Double' | 'Triple';
  description: string;
  verified: boolean;
  availability: 'Available' | 'Limited' | 'Full';
}

export interface SearchFilters {
  studentName: string;
  genderPreference: 'Any' | 'Male' | 'Female' | 'Co-ed';
  priceRange: {
    min: number;
    max: number;
  };
  location: string;
}

export interface AdminUser {
  username: string;
  password: string;
}