import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Building2, 
  Plus, 
  Edit3, 
  Trash2, 
  Eye, 
  LogOut,
  Star,
  MapPin,
  Users,
  Phone,
  Save,
  X
} from 'lucide-react';
import { PGListing } from '../types/pg';
import { pgListings as initialPGListings, locations } from '../data/pgListings';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [pgListings, setPGListings] = useState<PGListing[]>(initialPGListings);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingPG, setEditingPG] = useState<PGListing | null>(null);
  const [formData, setFormData] = useState<Partial<PGListing>>({
    name: '',
    monthlyRent: 0,
    genderPreference: 'Co-ed',
    location: '',
    area: '',
    phoneNumber: '',
    googleMapsLink: '',
    rating: 4.0,
    amenities: [],
    roomType: 'Single',
    description: '',
    verified: true,
    availability: 'Available',
    images: []
  });

  useEffect(() => {
    // Check authentication
    const isLoggedIn = localStorage.getItem('isAdminLoggedIn');
    if (!isLoggedIn) {
      navigate('/admin');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('isAdminLoggedIn');
    navigate('/');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingPG) {
      // Update existing PG
      setPGListings(pgListings.map(pg => 
        pg.id === editingPG.id 
          ? { ...editingPG, ...formData } as PGListing
          : pg
      ));
      setEditingPG(null);
    } else {
      // Add new PG
      const newPG: PGListing = {
        ...formData as PGListing,
        id: Date.now().toString(),
        images: formData.images?.length ? formData.images : ['/placeholder.svg']
      };
      setPGListings([...pgListings, newPG]);
      setShowAddForm(false);
    }

    // Reset form
    setFormData({
      name: '',
      monthlyRent: 0,
      genderPreference: 'Co-ed',
      location: '',
      area: '',
      phoneNumber: '',
      googleMapsLink: '',
      rating: 4.0,
      amenities: [],
      roomType: 'Single',
      description: '',
      verified: true,
      availability: 'Available',
      images: []
    });
  };

  const handleEdit = (pg: PGListing) => {
    setEditingPG(pg);
    setFormData(pg);
    setShowAddForm(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this PG listing?')) {
      setPGListings(pgListings.filter(pg => pg.id !== id));
    }
  };

  const handleCancel = () => {
    setShowAddForm(false);
    setEditingPG(null);
    setFormData({
      name: '',
      monthlyRent: 0,
      genderPreference: 'Co-ed',
      location: '',
      area: '',
      phoneNumber: '',
      googleMapsLink: '',
      rating: 4.0,
      amenities: [],
      roomType: 'Single',
      description: '',
      verified: true,
      availability: 'Available',
      images: []
    });
  };

  const amenityOptions = ['WiFi', 'AC', 'Meals', 'Laundry', 'Security', 'Parking', 'Gym', 'Study Room', 'Common Kitchen', 'Power Backup'];

  const toggleAmenity = (amenity: string) => {
    const currentAmenities = formData.amenities || [];
    if (currentAmenities.includes(amenity)) {
      setFormData({
        ...formData,
        amenities: currentAmenities.filter(a => a !== amenity)
      });
    } else {
      setFormData({
        ...formData,
        amenities: [...currentAmenities, amenity]
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <Building2 className="w-8 h-8 text-primary" />
              <h1 className="text-xl font-bold text-text-primary">PG Finder Admin</h1>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowAddForm(true)}
                className="btn-success flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add New PG
              </button>
              <button
                onClick={handleLogout}
                className="btn-secondary flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-card border border-card-border rounded-lg p-6">
            <div className="text-2xl font-bold text-primary">{pgListings.length}</div>
            <div className="text-sm text-text-secondary">Total PGs</div>
          </div>
          <div className="bg-card border border-card-border rounded-lg p-6">
            <div className="text-2xl font-bold text-accent">
              {pgListings.filter(pg => pg.availability === 'Available').length}
            </div>
            <div className="text-sm text-text-secondary">Available</div>
          </div>
          <div className="bg-card border border-card-border rounded-lg p-6">
            <div className="text-2xl font-bold text-warning">
              {pgListings.filter(pg => pg.availability === 'Limited').length}
            </div>
            <div className="text-sm text-text-secondary">Limited</div>
          </div>
          <div className="bg-card border border-card-border rounded-lg p-6">
            <div className="text-2xl font-bold text-success">
              {pgListings.filter(pg => pg.verified).length}
            </div>
            <div className="text-sm text-text-secondary">Verified</div>
          </div>
        </div>

        {/* Add/Edit Form */}
        {showAddForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-card border border-card-border rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-text-primary">
                    {editingPG ? 'Edit PG Listing' : 'Add New PG Listing'}
                  </h2>
                  <button
                    onClick={handleCancel}
                    className="text-text-muted hover:text-text-primary"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* PG Name */}
                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-2">
                        PG Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="form-input w-full"
                        placeholder="Enter PG name"
                      />
                    </div>

                    {/* Monthly Rent */}
                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-2">
                        Monthly Rent *
                      </label>
                      <input
                        type="number"
                        required
                        value={formData.monthlyRent}
                        onChange={(e) => setFormData({...formData, monthlyRent: parseInt(e.target.value)})}
                        className="form-input w-full"
                        placeholder="Enter rent amount"
                      />
                    </div>

                    {/* Gender Preference */}
                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-2">
                        Gender Preference *
                      </label>
                      <select
                        value={formData.genderPreference}
                        onChange={(e) => setFormData({...formData, genderPreference: e.target.value as any})}
                        className="form-input w-full"
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Co-ed">Co-ed</option>
                      </select>
                    </div>

                    {/* Room Type */}
                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-2">
                        Room Type *
                      </label>
                      <select
                        value={formData.roomType}
                        onChange={(e) => setFormData({...formData, roomType: e.target.value as any})}
                        className="form-input w-full"
                      >
                        <option value="Single">Single</option>
                        <option value="Double">Double</option>
                        <option value="Triple">Triple</option>
                      </select>
                    </div>

                    {/* Location */}
                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-2">
                        Location *
                      </label>
                      <select
                        value={formData.location}
                        onChange={(e) => setFormData({...formData, location: e.target.value})}
                        className="form-input w-full"
                      >
                        <option value="">Select Location</option>
                        {locations.map(location => (
                          <option key={location} value={location}>{location}</option>
                        ))}
                      </select>
                    </div>

                    {/* Area */}
                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-2">
                        Area *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.area}
                        onChange={(e) => setFormData({...formData, area: e.target.value})}
                        className="form-input w-full"
                        placeholder="Enter specific area"
                      />
                    </div>

                    {/* Phone Number */}
                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phoneNumber}
                        onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}
                        className="form-input w-full"
                        placeholder="+91 98765 43210"
                      />
                    </div>

                    {/* Rating */}
                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-2">
                        Rating
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="5"
                        step="0.1"
                        value={formData.rating}
                        onChange={(e) => setFormData({...formData, rating: parseFloat(e.target.value)})}
                        className="form-input w-full"
                      />
                    </div>
                  </div>

                  {/* Google Maps Link */}
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Google Maps Link
                    </label>
                    <input
                      type="url"
                      value={formData.googleMapsLink}
                      onChange={(e) => setFormData({...formData, googleMapsLink: e.target.value})}
                      className="form-input w-full"
                      placeholder="https://maps.google.com/..."
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Description *
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      className="form-input w-full"
                      placeholder="Describe the PG accommodation"
                    />
                  </div>

                  {/* Amenities */}
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Amenities
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {amenityOptions.map(amenity => (
                        <label key={amenity} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={formData.amenities?.includes(amenity) || false}
                            onChange={() => toggleAmenity(amenity)}
                            className="rounded border-border"
                          />
                          <span className="text-sm text-text-primary">{amenity}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Availability */}
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Availability
                    </label>
                    <select
                      value={formData.availability}
                      onChange={(e) => setFormData({...formData, availability: e.target.value as any})}
                      className="form-input w-full"
                    >
                      <option value="Available">Available</option>
                      <option value="Limited">Limited</option>
                      <option value="Full">Full</option>
                    </select>
                  </div>

                  {/* Submit Buttons */}
                  <div className="flex gap-4 pt-4">
                    <button
                      type="submit"
                      className="btn-success flex items-center gap-2"
                    >
                      <Save className="w-4 h-4" />
                      {editingPG ? 'Update PG' : 'Add PG'}
                    </button>
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="btn-secondary"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* PG Listings Table */}
        <div className="bg-card border border-card-border rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-border">
            <h2 className="text-lg font-semibold text-text-primary">PG Listings</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-secondary-light">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                    PG Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {pgListings.map((pg) => (
                  <tr key={pg.id} className="hover:bg-secondary-light/50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={pg.images[0]}
                          alt={pg.name}
                          className="w-12 h-12 rounded object-cover"
                        />
                        <div>
                          <div className="font-medium text-text-primary">{pg.name}</div>
                          <div className="text-sm text-text-secondary flex items-center gap-2">
                            <Users className="w-4 h-4" />
                            {pg.genderPreference} • {pg.roomType}
                          </div>
                          <div className="text-sm text-text-secondary flex items-center gap-1">
                            <Star className="w-3 h-3 rating-star fill-current" />
                            {pg.rating}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1 text-sm text-text-secondary">
                        <MapPin className="w-4 h-4" />
                        {pg.area}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-text-primary">
                        ₹{pg.monthlyRent.toLocaleString()}/mo
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        pg.availability === 'Available' 
                          ? 'bg-accent-light text-accent' 
                          : pg.availability === 'Limited'
                          ? 'bg-warning/10 text-warning'
                          : 'bg-destructive/10 text-destructive'
                      }`}>
                        {pg.availability}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleEdit(pg)}
                          className="text-primary hover:text-primary/80"
                          title="Edit"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(pg.id)}
                          className="text-destructive hover:text-destructive/80"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;