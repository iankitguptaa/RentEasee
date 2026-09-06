import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const mockProperties = [
  {
    title: "Skyline Residency & Penthouse",
    tagline: "Ultra-luxury high-rise apartment with lush green balconies",
    city: "New Delhi",
    locality: "Vasant Vihar",
    address: "Diplomatic Enclave, Vasant Vihar, New Delhi, Delhi 110057",
    price: 145000,
    deposit: 450000,
    maintenance: 8500,
    type: "Apartment",
    bhk: 3,
    bathrooms: 3,
    areaSqFt: 1850,
    furnishing: "Fully Furnished",
    floor: "18th out of 24",
    facing: "Park Facing / North",
    availableFrom: "Immediate",
    verified: true,
    featured: true,
    rating: 4.9,
    reviewsCount: 28,
    images: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80"
    ],
    amenities: [
      "24/7 Security",
      "Park View Balcony",
      "Modular Kitchen",
      "Swimming Pool",
      "Fitness Center & Gym",
      "Power Backup",
      "Covered Parking (2)",
      "High-speed Elevator",
      "Pet Friendly",
      "Clubhouse"
    ],
    description: "Designed for modern executive living, this stunning 3 BHK apartment in Vasant Vihar offers panoramic green park views, high ceilings, Italian marble flooring, and customized modular fittings.",
    ownerName: "Vikram Malhotra",
    ownerAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    ownerPhone: "+91 98201 44512"
  },
  {
    title: "The Heritage Villa at Hauz Khas",
    tagline: "Serene 4 BHK independent villa with private garden",
    city: "New Delhi",
    locality: "Hauz Khas",
    address: "Deer Park Road, Hauz Khas, New Delhi, Delhi 110016",
    price: 110000,
    deposit: 330000,
    maintenance: 5000,
    type: "Villa",
    bhk: 4,
    bathrooms: 4,
    areaSqFt: 3200,
    furnishing: "Semi-Furnished",
    floor: "Independent (G+2)",
    facing: "East Facing",
    availableFrom: "1st Next Month",
    verified: true,
    featured: true,
    rating: 4.95,
    reviewsCount: 42,
    images: [
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80"
    ],
    amenities: [
      "Private Lawn & Garden",
      "EV Charging Point",
      "Solar Power Backup",
      "Terrace Lounge",
      "Servant Quarters"
    ],
    description: "An elegant sanctuary nestled in heart of Hauz Khas. Features floor-to-ceiling glass windows overlooking lush greenery, private backyard lawn, solar backup grid.",
    ownerName: "Priya Sundaram",
    ownerAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
    ownerPhone: "+91 99002 88719"
  },
  {
    title: "DLF Crest Executive Suite",
    tagline: "High-end luxury apartment with golf course vistas",
    city: "Gurugram",
    locality: "DLF Phase 5",
    address: "Golf Course Road, Sector 54, Gurugram, Haryana 122002",
    price: 95000,
    deposit: 190000,
    maintenance: 7000,
    type: "Apartment",
    bhk: 2,
    bathrooms: 2,
    areaSqFt: 1450,
    furnishing: "Fully Furnished",
    floor: "12th out of 30",
    facing: "North-East",
    availableFrom: "Immediate",
    verified: true,
    featured: true,
    rating: 4.85,
    reviewsCount: 19,
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80"
    ],
    amenities: [
      "Central Air Conditioning",
      "Golf Course View",
      "Smart Home Automation",
      "Olympic Size Pool",
      "Tennis Court"
    ],
    description: "Experience modern luxury at DLF Crest, Gurugram. Smart automation system, imported hardwood flooring, customized designer lighting.",
    ownerName: "Rajesh Singhania",
    ownerAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    ownerPhone: "+91 98110 56789"
  },
  {
    title: "Noida Expressway Sky Manor",
    tagline: "Charming 3 BHK luxury condo overlooking golf course",
    city: "Noida",
    locality: "Noida Expressway",
    address: "Sector 128, Noida Expressway, Noida, Uttar Pradesh 201304",
    price: 68000,
    deposit: 150000,
    maintenance: 3500,
    type: "House",
    bhk: 3,
    bathrooms: 3,
    areaSqFt: 2100,
    furnishing: "Semi-Furnished",
    floor: "Ground + 1",
    facing: "North Facing",
    availableFrom: "Immediate",
    verified: true,
    featured: false,
    rating: 4.78,
    reviewsCount: 15,
    images: [
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&w=1200&q=80"
    ],
    amenities: [
      "Private Courtyard",
      "Covered Car Garage",
      "Spacious Balconies",
      "Quiet Neighborhood"
    ],
    description: "Located in Noida premier residential corridor along Expressway. High ceilings, serene courtyard views, premium fittings.",
    ownerName: "Anita Deshmukh",
    ownerAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
    ownerPhone: "+91 97640 12345"
  }
];

async function main() {
  console.log('Seeding initial properties into PostgreSQL database...');
  for (const prop of mockProperties) {
    await prisma.property.create({
      data: prop,
    });
  }
  console.log('Seeding finished successfully!');
}

main()
  .catch((e) => {
    console.error('Seeding Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
