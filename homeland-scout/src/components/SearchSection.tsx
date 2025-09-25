import React from 'react';
import { Search, MapPin, Users, DollarSign } from 'lucide-react';
import { SearchFilters } from '../types/pg';
import { locations } from '../data/pgListings';

interface SearchSectionProps {
  filters: SearchFilters;
  onFiltersChange: (filters: SearchFilters) => void;
  onSearch: () => void;
  resultCount: number;
}

const SearchSection: React.FC<SearchSectionProps> = ({
  filters,
  onFiltersChange,
  onSearch,
  resultCount
}) => {
  return (
    <div className="search-section py-8 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-text-primary mb-3">
            Find Your Perfect PG in Bangalore
          </h1>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Trusted accommodations for students, verified by our team. Find your ideal home away from home.
          </p>
        </div>

        {/* Search Form */}
        <div className="bg-card border border-card-border rounded-xl p-6 shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {/* Student Name */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-text-primary">
                Student Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={filters.studentName}
                  onChange={(e) => onFiltersChange({
                    ...filters,
                    studentName: e.target.value
                  })}
                  className="form-input w-full pl-4"
                />
              </div>
            </div>

            {/* Gender Preference */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-text-primary">
                <Users className="inline w-4 h-4 mr-1" />
                Gender Preference
              </label>
              <select
                value={filters.genderPreference}
                onChange={(e) => onFiltersChange({
                  ...filters,
                  genderPreference: e.target.value as any
                })}
                className="form-input w-full"
              >
                <option value="Any">Any</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Co-ed">Co-ed</option>
              </select>
            </div>

            {/* Location */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-text-primary">
                <MapPin className="inline w-4 h-4 mr-1" />
                Location
              </label>
              <select
                value={filters.location}
                onChange={(e) => onFiltersChange({
                  ...filters,
                  location: e.target.value
                })}
                className="form-input w-full"
              >
                <option value="">All Locations</option>
                {locations.map(location => (
                  <option key={location} value={location}>{location}</option>
                ))}
              </select>
            </div>

            {/* Search Button */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-transparent">
                Search
              </label>
              <button
                onClick={onSearch}
                className="btn-hero w-full flex items-center justify-center gap-2"
              >
                <Search className="w-4 h-4" />
                Search PGs
              </button>
            </div>
          </div>

          {/* Price Range */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-text-primary">
              <DollarSign className="inline w-4 h-4 mr-1" />
              Monthly Rent Range: ₹{filters.priceRange.min.toLocaleString()} - ₹{filters.priceRange.max.toLocaleString()}
            </label>
            <div className="flex gap-4 items-center">
              <div className="flex-1">
                <input
                  type="range"
                  min="5000"
                  max="20000"
                  step="500"
                  value={filters.priceRange.min}
                  onChange={(e) => onFiltersChange({
                    ...filters,
                    priceRange: {
                      ...filters.priceRange,
                      min: parseInt(e.target.value)
                    }
                  })}
                  className="w-full accent-primary"
                />
              </div>
              <span className="text-text-muted">to</span>
              <div className="flex-1">
                <input
                  type="range"
                  min="5000"
                  max="20000"
                  step="500"
                  value={filters.priceRange.max}
                  onChange={(e) => onFiltersChange({
                    ...filters,
                    priceRange: {
                      ...filters.priceRange,
                      max: parseInt(e.target.value)
                    }
                  })}
                  className="w-full accent-primary"
                />
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-4 pt-4 border-t border-border">
            <p className="text-sm text-text-secondary">
              Showing <span className="font-medium text-primary">{resultCount}</span> verified PG listings
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchSection;