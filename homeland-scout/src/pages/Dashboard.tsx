import React, { useState, useMemo } from 'react';
import { Building2, Users, Award, TrendingUp } from 'lucide-react';
import SearchSection from '../components/SearchSection';
import PGCard from '../components/PGCard';
import { SearchFilters } from '../types/pg';
import { pgListings } from '../data/pgListings';

const Dashboard = () => {
  const [filters, setFilters] = useState<SearchFilters>({
    studentName: '',
    genderPreference: 'Any',
    priceRange: { min: 5000, max: 20000 },
    location: ''
  });

  const filteredPGs = useMemo(() => {
    return pgListings.filter(pg => {
      // Gender filter
      if (filters.genderPreference !== 'Any' && pg.genderPreference !== filters.genderPreference) {
        return false;
      }
      
      // Price filter
      if (pg.monthlyRent < filters.priceRange.min || pg.monthlyRent > filters.priceRange.max) {
        return false;
      }
      
      // Location filter
      if (filters.location && pg.location !== filters.location) {
        return false;
      }
      
      return true;
    });
  }, [filters]);

  const handleSearch = () => {
    // Search is performed automatically via useMemo
    // This function could trigger analytics or other side effects
    console.log('Search performed with filters:', filters);
  };

  // Stats for display
  const totalPGs = pgListings.length;
  const availablePGs = pgListings.filter(pg => pg.availability === 'Available').length;
  const averageRating = pgListings.reduce((sum, pg) => sum + pg.rating, 0) / pgListings.length;
  const verifiedPGs = pgListings.filter(pg => pg.verified).length;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <Building2 className="w-8 h-8 text-primary" />
              <h1 className="text-xl font-bold text-text-primary">PG Finder</h1>
            </div>
            <nav>
              <a
                href="/admin"
                className="btn-secondary"
              >
                Admin Login
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Search Section */}
      <SearchSection
        filters={filters}
        onFiltersChange={setFilters}
        onSearch={handleSearch}
        resultCount={filteredPGs.length}
      />

      {/* Stats Section */}
      <div className="bg-secondary-light border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{totalPGs}</div>
              <div className="text-sm text-text-secondary">Total PGs</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-accent">{availablePGs}</div>
              <div className="text-sm text-text-secondary">Available Now</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-text-primary">{averageRating.toFixed(1)}★</div>
              <div className="text-sm text-text-secondary">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-success">{verifiedPGs}</div>
              <div className="text-sm text-text-secondary">Verified</div>
            </div>
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {filteredPGs.length > 0 ? (
          <>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-text-primary mb-2">
                Available PG Accommodations
              </h2>
              <p className="text-text-secondary">
                {filteredPGs.length} PG{filteredPGs.length > 1 ? 's' : ''} match your preferences
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPGs.map(pg => (
                <PGCard key={pg.id} pg={pg} />
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🏠</div>
            <h3 className="text-xl font-semibold text-text-primary mb-2">
              No PGs found
            </h3>
            <p className="text-text-secondary mb-4">
              Try adjusting your filters to see more results
            </p>
            <button
              onClick={() => setFilters({
                studentName: '',
                genderPreference: 'Any',
                priceRange: { min: 5000, max: 20000 },
                location: ''
              })}
              className="btn-hero"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-card border-t border-border mt-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Building2 className="w-6 h-6 text-primary" />
              <span className="text-lg font-semibold text-text-primary">PG Finder</span>
            </div>
            <p className="text-text-secondary mb-4">
              Helping students find trusted accommodations in Bangalore
            </p>
            <div className="flex justify-center gap-8 text-sm text-text-muted">
              <span>✓ Verified Listings</span>
              <span>✓ Direct Contact</span>
              <span>✓ Real Reviews</span>
              <span>✓ No Hidden Costs</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;