import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, Eye, Edit, Trash2, Phone, Mail, LogOut, Users } from 'lucide-react';
import { pgOwners, getOwnerPGs, getPGInteractions, UserInteraction } from '@/data/demoData';
import { PGListing } from '@/types/pg';

const PGOwnerDashboard = () => {
  const [currentOwner, setCurrentOwner] = useState<any>(null);
  const [ownerPGs, setOwnerPGs] = useState<PGListing[]>([]);
  const [selectedPG, setSelectedPG] = useState<string | null>(null);
  const [pgInteractions, setPGInteractions] = useState<UserInteraction[]>([]);
  const [showViewers, setShowViewers] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isPGOwnerLoggedIn');
    const ownerUsername = localStorage.getItem('currentPGOwner');
    
    if (!isLoggedIn || !ownerUsername) {
      navigate('/pg-owner');
      return;
    }

    const owner = pgOwners.find(o => o.username === ownerUsername);
    if (owner) {
      setCurrentOwner(owner);
      const pgs = getOwnerPGs(owner.id);
      setOwnerPGs(pgs);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('isPGOwnerLoggedIn');
    localStorage.removeItem('currentPGOwner');
    navigate('/pg-owner');
  };

  const handleViewInteractions = (pgId: string) => {
    const interactions = getPGInteractions(pgId);
    setPGInteractions(interactions);
    setSelectedPG(pgId);
    setShowViewers(true);
  };

  const handleEdit = (pgId: string) => {
    // Placeholder for edit functionality
    alert(`Edit PG ${pgId} - Feature coming soon!`);
  };

  const handleDelete = (pgId: string) => {
    if (confirm('Are you sure you want to delete this PG listing?')) {
      alert(`Delete PG ${pgId} - Feature coming soon!`);
    }
  };

  if (!currentOwner) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-card-border px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Building2 className="w-8 h-8 text-primary" />
            <div>
              <h1 className="text-xl font-bold text-text-primary">PG Owner Dashboard</h1>
              <p className="text-sm text-text-secondary">Welcome back, {currentOwner.name}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 text-sm text-text-secondary hover:text-text-primary"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </header>

      <div className="p-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-card border border-card-border rounded-lg p-6">
            <div className="flex items-center gap-3">
              <Building2 className="w-8 h-8 text-primary" />
              <div>
                <p className="text-sm text-text-secondary">Total PGs</p>
                <p className="text-2xl font-bold text-text-primary">{ownerPGs.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-card border border-card-border rounded-lg p-6">
            <div className="flex items-center gap-3">
              <Users className="w-8 h-8 text-primary" />
              <div>
                <p className="text-sm text-text-secondary">Total Inquiries</p>
                <p className="text-2xl font-bold text-text-primary">
                  {ownerPGs.reduce((total, pg) => total + getPGInteractions(pg.id).length, 0)}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-card border border-card-border rounded-lg p-6">
            <div className="flex items-center gap-3">
              <Eye className="w-8 h-8 text-primary" />
              <div>
                <p className="text-sm text-text-secondary">Available PGs</p>
                <p className="text-2xl font-bold text-text-primary">
                  {ownerPGs.filter(pg => pg.availability === 'Available').length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* PG Listings */}
        <div className="bg-card border border-card-border rounded-lg p-6">
          <h2 className="text-xl font-bold text-text-primary mb-6">Your PG Listings</h2>
          <div className="space-y-4">
            {ownerPGs.map((pg) => (
              <div key={pg.id} className="border border-border rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div className="flex gap-4">
                    <img
                      src={pg.images[0]}
                      alt={pg.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-text-primary mb-1">{pg.name}</h3>
                      <p className="text-sm text-text-secondary mb-2">{pg.location}, {pg.area}</p>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="text-primary font-medium">₹{pg.monthlyRent}/month</span>
                        <span className="text-text-secondary">{pg.roomType} Sharing</span>
                        <span className={`px-2 py-1 rounded text-xs ${
                          pg.availability === 'Available' 
                            ? 'bg-green-100 text-green-800' 
                            : pg.availability === 'Limited'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {pg.availability}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleViewInteractions(pg.id)}
                      className="flex items-center gap-1 px-3 py-2 text-sm bg-primary text-primary-foreground rounded hover:bg-primary/90"
                    >
                      <Eye className="w-4 h-4" />
                      Viewers ({getPGInteractions(pg.id).length})
                    </button>
                    <button
                      onClick={() => handleEdit(pg.id)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(pg.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Viewers Modal */}
      {showViewers && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-card border border-card-border rounded-lg p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-text-primary">
                Viewers for {ownerPGs.find(pg => pg.id === selectedPG)?.name}
              </h3>
              <button
                onClick={() => setShowViewers(false)}
                className="text-text-secondary hover:text-text-primary"
              >
                ✕
              </button>
            </div>
            
            {pgInteractions.length === 0 ? (
              <p className="text-text-secondary text-center py-8">No inquiries yet for this PG.</p>
            ) : (
              <div className="space-y-4">
                {pgInteractions.map((interaction) => (
                  <div key={interaction.id} className="border border-border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-text-primary">{interaction.userName}</h4>
                        <p className="text-sm text-text-secondary">
                          Liked on {new Date(interaction.likedAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-text-secondary mb-3">
                      <div className="flex items-center gap-1">
                        <Phone className="w-4 h-4" />
                        <span>{interaction.userPhone}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Mail className="w-4 h-4" />
                        <span>{interaction.userEmail}</span>
                      </div>
                    </div>
                    
                    {interaction.message && (
                      <div className="bg-secondary-light p-3 rounded text-sm">
                        <p className="text-text-secondary">Message:</p>
                        <p className="text-text-primary mt-1">{interaction.message}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PGOwnerDashboard;