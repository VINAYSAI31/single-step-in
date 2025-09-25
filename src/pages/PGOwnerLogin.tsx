import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, Lock, User } from 'lucide-react';

const PGOwnerLogin = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Demo authentication for PG owners
    const demoUsers = ['owner1', 'owner2', 'owner3'];
    if (demoUsers.includes(credentials.username) && credentials.password === 'demo123') {
      localStorage.setItem('isPGOwnerLoggedIn', 'true');
      localStorage.setItem('currentPGOwner', credentials.username);
      navigate('/pg-owner/dashboard');
    } else {
      setError('Invalid username or password');
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Side - Login Form */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Building2 className="w-8 h-8 text-primary" />
              <span className="text-2xl font-bold text-text-primary">PG Owner Portal</span>
            </div>
            <h2 className="text-3xl font-bold text-text-primary mb-2">
              Owner Login
            </h2>
            <p className="text-text-secondary">
              Manage your PG listings and view inquiries
            </p>
          </div>

          {/* Login Form */}
          <div className="bg-card border border-card-border rounded-lg p-6 shadow-md">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Username */}
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Username
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-text-muted" />
                  <input
                    type="text"
                    required
                    value={credentials.username}
                    onChange={(e) => setCredentials({
                      ...credentials,
                      username: e.target.value
                    })}
                    className="form-input w-full pl-10"
                    placeholder="Enter username"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-text-muted" />
                  <input
                    type="password"
                    required
                    value={credentials.password}
                    onChange={(e) => setCredentials({
                      ...credentials,
                      password: e.target.value
                    })}
                    className="form-input w-full pl-10"
                    placeholder="Enter password"
                  />
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-destructive/10 border border-destructive/20 text-destructive text-sm p-3 rounded">
                  {error}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="btn-hero w-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>
          </div>

          {/* Back to Home */}
          <div className="text-center mt-6">
            <a
              href="/"
              className="text-primary hover:text-primary/80 text-sm font-medium"
            >
              ← Back to PG Search
            </a>
          </div>
        </div>
      </div>

      {/* Right Side - Info Panel */}
      <div className="hidden lg:flex flex-1 bg-primary text-primary-foreground">
        <div className="flex items-center justify-center p-12">
          <div className="max-w-md">
            <h3 className="text-3xl font-bold mb-6">
              Manage Your PG Business
            </h3>
            <div className="space-y-4 text-primary-foreground/90">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-primary-foreground/20 rounded-full flex-shrink-0 flex items-center justify-center mt-0.5">
                  <span className="text-xs font-bold">1</span>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">View Your Listings</h4>
                  <p className="text-sm opacity-90">
                    See all your PG properties in one dashboard
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-primary-foreground/20 rounded-full flex-shrink-0 flex items-center justify-center mt-0.5">
                  <span className="text-xs font-bold">2</span>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Track Interested Users</h4>
                  <p className="text-sm opacity-90">
                    See who liked your PG and their contact details
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-primary-foreground/20 rounded-full flex-shrink-0 flex items-center justify-center mt-0.5">
                  <span className="text-xs font-bold">3</span>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Update & Manage</h4>
                  <p className="text-sm opacity-90">
                    Edit details, pricing, and availability instantly
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PGOwnerLogin;