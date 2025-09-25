import { PGListing } from '@/types/pg';

export interface PGOwner {
  id: string;
  username: string;
  name: string;
  phone: string;
  email: string;
  pgListings: string[]; // PG IDs
}

export interface UserInteraction {
  id: string;
  userName: string;
  userPhone: string;
  userEmail: string;
  pgId: string;
  likedAt: string;
  message?: string;
}

export const pgOwners: PGOwner[] = [
  {
    id: 'owner1',
    username: 'owner1',
    name: 'Rajesh Kumar',
    phone: '+91 9876543210',
    email: 'rajesh@pgowner.com',
    pgListings: ['1', '2']
  },
  {
    id: 'owner2',
    username: 'owner2',
    name: 'Priya Sharma',
    phone: '+91 9876543211',
    email: 'priya@pgowner.com',
    pgListings: ['3', '4']
  },
  {
    id: 'owner3',
    username: 'owner3',
    name: 'Amit Singh',
    phone: '+91 9876543212',
    email: 'amit@pgowner.com',
    pgListings: ['5']
  }
];

export const userInteractions: UserInteraction[] = [
  {
    id: '1',
    userName: 'Ankit Verma',
    userPhone: '+91 8765432109',
    userEmail: 'ankit@gmail.com',
    pgId: '1',
    likedAt: '2024-01-15T10:30:00Z',
    message: 'Interested in single room'
  },
  {
    id: '2',
    userName: 'Sneha Patel',
    userPhone: '+91 8765432108',
    userEmail: 'sneha@gmail.com',
    pgId: '1',
    likedAt: '2024-01-16T14:20:00Z'
  },
  {
    id: '3',
    userName: 'Rohit Gupta',
    userPhone: '+91 8765432107',
    userEmail: 'rohit@gmail.com',
    pgId: '2',
    likedAt: '2024-01-17T09:15:00Z',
    message: 'Want to visit this weekend'
  },
  {
    id: '4',
    userName: 'Kavya Reddy',
    userPhone: '+91 8765432106',
    userEmail: 'kavya@gmail.com',
    pgId: '3',
    likedAt: '2024-01-18T16:45:00Z'
  },
  {
    id: '5',
    userName: 'Arjun Nair',
    userPhone: '+91 8765432105',
    userEmail: 'arjun@gmail.com',
    pgId: '4',
    likedAt: '2024-01-19T11:30:00Z',
    message: 'Looking for long-term stay'
  },
  {
    id: '6',
    userName: 'Divya Joshi',
    userPhone: '+91 8765432104',
    userEmail: 'divya@gmail.com',
    pgId: '5',
    likedAt: '2024-01-20T13:20:00Z'
  }
];

export const getOwnerPGs = (ownerId: string): PGListing[] => {
  const owner = pgOwners.find(o => o.id === ownerId);
  if (!owner) return [];
  
  // This would typically come from your PG listings data
  // For demo, returning mock data based on owner
  const mockPGs: { [key: string]: PGListing[] } = {
    'owner1': [
      {
        id: '1',
        name: 'Green Valley PG',
        images: ['/src/assets/pg-room-1.jpg'],
        monthlyRent: 8000,
        genderPreference: 'Male',
        location: 'Koramangala',
        area: 'Bangalore',
        phoneNumber: '+91 9876543210',
        googleMapsLink: 'https://maps.google.com',
        rating: 4.5,
        amenities: ['WiFi', 'AC', 'Laundry', 'Meals'],
        roomType: 'Single',
        description: 'Comfortable PG with all amenities',
        verified: true,
        availability: 'Available'
      },
      {
        id: '2',
        name: 'Sunrise Residency',
        images: ['/src/assets/pg-room-2.jpg'],
        monthlyRent: 7000,
        genderPreference: 'Male',
        location: 'BTM Layout',
        area: 'Bangalore',
        phoneNumber: '+91 9876543210',
        googleMapsLink: 'https://maps.google.com',
        rating: 4.2,
        amenities: ['WiFi', 'Laundry', 'Meals'],
        roomType: 'Double',
        description: 'Budget-friendly PG near metro',
        verified: true,
        availability: 'Limited'
      }
    ],
    'owner2': [
      {
        id: '3',
        name: 'Rose Garden PG',
        images: ['/src/assets/pg-female-room.jpg'],
        monthlyRent: 9000,
        genderPreference: 'Female',
        location: 'Indiranagar',
        area: 'Bangalore',
        phoneNumber: '+91 9876543211',
        googleMapsLink: 'https://maps.google.com',
        rating: 4.7,
        amenities: ['WiFi', 'AC', 'Laundry', 'Meals', 'Security'],
        roomType: 'Single',
        description: 'Premium PG for working women',
        verified: true,
        availability: 'Available'
      },
      {
        id: '4',
        name: 'Comfort Zone',
        images: ['/src/assets/pg-common-area.jpg'],
        monthlyRent: 6500,
        genderPreference: 'Female',
        location: 'HSR Layout',
        area: 'Bangalore',
        phoneNumber: '+91 9876543211',
        googleMapsLink: 'https://maps.google.com',
        rating: 4.0,
        amenities: ['WiFi', 'Laundry', 'Meals'],
        roomType: 'Triple',
        description: 'Affordable option for students',
        verified: true,
        availability: 'Available'
      }
    ],
    'owner3': [
      {
        id: '5',
        name: 'Elite Stays',
        images: ['/src/assets/pg-room-1.jpg'],
        monthlyRent: 12000,
        genderPreference: 'Co-ed',
        location: 'Whitefield',
        area: 'Bangalore',
        phoneNumber: '+91 9876543212',
        googleMapsLink: 'https://maps.google.com',
        rating: 4.8,
        amenities: ['WiFi', 'AC', 'Laundry', 'Meals', 'Gym', 'Pool'],
        roomType: 'Single',
        description: 'Luxury PG with premium amenities',
        verified: true,
        availability: 'Limited'
      }
    ]
  };
  
  return mockPGs[ownerId] || [];
};

export const getPGInteractions = (pgId: string): UserInteraction[] => {
  return userInteractions.filter(interaction => interaction.pgId === pgId);
};