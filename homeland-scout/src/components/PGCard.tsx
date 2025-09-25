import React from 'react';
import { Star, MapPin, Phone, ExternalLink, Wifi, Car, Utensils, Shield, User, Users } from 'lucide-react';
import { PGListing } from '../types/pg';

interface PGCardProps {
  pg: PGListing;
}

const PGCard: React.FC<PGCardProps> = ({ pg }) => {
  const getGenderBadgeClass = (gender: string) => {
    switch (gender) {
      case 'Male': return 'gender-male';
      case 'Female': return 'gender-female';
      case 'Co-ed': return 'gender-coed';
      default: return 'gender-coed';
    }
  };

  const getAmenityIcon = (amenity: string) => {
    switch (amenity.toLowerCase()) {
      case 'wifi': return <Wifi className="w-4 h-4" />;
      case 'parking': return <Car className="w-4 h-4" />;
      case 'meals': return <Utensils className="w-4 h-4" />;
      case 'security': return <Shield className="w-4 h-4" />;
      default: return <User className="w-4 h-4" />;
    }
  };

  const getRoomTypeIcon = (roomType: string) => {
    switch (roomType) {
      case 'Single': return <User className="w-4 h-4" />;
      case 'Double': return <Users className="w-4 h-4" />;
      case 'Triple': return <Users className="w-4 h-4" />;
      default: return <User className="w-4 h-4" />;
    }
  };

  return (
    <div className="pg-card">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={pg.images[0]}
          alt={pg.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 left-3">
          <span className="price-badge">
            ₹{pg.monthlyRent.toLocaleString()}/month
          </span>
        </div>
        <div className="absolute top-3 right-3">
          {pg.verified && (
            <span className="bg-accent text-accent-foreground px-2 py-1 rounded text-xs font-medium">
              ✓ Verified
            </span>
          )}
        </div>
        <div className="absolute bottom-3 right-3">
          <span className={`px-2 py-1 rounded text-xs font-medium ${getGenderBadgeClass(pg.genderPreference)}`}>
            {pg.genderPreference}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Header */}
        <div className="mb-3">
          <h3 className="font-semibold text-lg text-text-primary mb-1">
            {pg.name}
          </h3>
          <div className="flex items-center gap-4 text-sm text-text-secondary">
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>{pg.area}</span>
            </div>
            <div className="flex items-center gap-1">
              {getRoomTypeIcon(pg.roomType)}
              <span>{pg.roomType}</span>
            </div>
          </div>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(pg.rating) 
                    ? 'rating-star fill-current' 
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-sm font-medium text-text-primary">
            {pg.rating}
          </span>
          <span className="text-xs text-text-muted">
            ({Math.floor(Math.random() * 50) + 10} reviews)
          </span>
        </div>

        {/* Amenities */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {pg.amenities.slice(0, 4).map((amenity, index) => (
              <div
                key={index}
                className="flex items-center gap-1 text-xs text-text-secondary bg-secondary-light px-2 py-1 rounded"
              >
                {getAmenityIcon(amenity)}
                <span>{amenity}</span>
              </div>
            ))}
            {pg.amenities.length > 4 && (
              <span className="text-xs text-text-muted px-2 py-1">
                +{pg.amenities.length - 4} more
              </span>
            )}
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-text-secondary mb-4 line-clamp-2">
          {pg.description}
        </p>

        {/* Availability */}
        <div className="mb-4">
          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
            pg.availability === 'Available' 
              ? 'bg-accent-light text-accent' 
              : pg.availability === 'Limited'
              ? 'bg-warning/10 text-warning'
              : 'bg-destructive/10 text-destructive'
          }`}>
            {pg.availability}
          </span>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <a
            href={`tel:${pg.phoneNumber}`}
            className="btn-success flex-1 flex items-center justify-center gap-1"
          >
            <Phone className="w-4 h-4" />
            Call Now
          </a>
          <a
            href={pg.googleMapsLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary flex items-center justify-center gap-1"
          >
            <ExternalLink className="w-4 h-4" />
            View Map
          </a>
        </div>
      </div>
    </div>
  );
};

export default PGCard;