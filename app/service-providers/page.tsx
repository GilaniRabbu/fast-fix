/* eslint-disable */
"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { toast } from "sonner";
import { Search, MapPin, Bookmark } from "lucide-react";

interface Category {
  name: string;
  total: number;
}

interface ServiceProvider {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  profession: string;
  bio: string;
  experienceYears: number;
  hourlyRate: number;
  location: string;
}

export default function ServiceProvidersPage() {
  const [providers, setProviders] = useState<ServiceProvider[]>([]);
  const [serviceCategories, setServiceCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterLoading, setFilterLoading] = useState(false);
  const [filters, setFilters] = useState({
    profession: "",
    location: "",
    experienceYears: "",
  });

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_BASEURL}/service-providers/filter`);
        setProviders(res.data.data);
      } catch (error) {
        console.error("Failed to fetch service providers", error);
        toast.error("Failed to load service providers");
      } finally {
        setLoading(false);
      }
    };

    const fetchCategories = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_BASEURL}/service-providers/categories`);
        setServiceCategories(res.data.data);
      } catch (error) {
        console.error("Failed to fetch categories", error);
        toast.error("Failed to load service categories");
      }
    };

    fetchProviders();
    fetchCategories();
  }, []);

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));

    // Trigger filter update
    applyFilters({ ...filters, [name]: value });
  };

  const handleCategoryChange = (category: string) => {
    const newProfession = filters.profession === category ? "" : category;
    setFilters(prev => ({ ...prev, profession: newProfession }));
    applyFilters({ ...filters, profession: newProfession });
  };

  const clearFilters = () => {
    setFilters({
      profession: "",
      location: "",
      experienceYears: "",
    });
    // Fetch all providers again
    fetchAllProviders();
  };

  const fetchAllProviders = async () => {
    setFilterLoading(true);
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_BASEURL}/service-providers/filter`);
      setProviders(res.data.data);
    } catch (error) {
      console.error("Failed to fetch service providers", error);
      toast.error("Failed to load service providers");
    } finally {
      setFilterLoading(false);
    }
  };

  const applyFilters = async (updatedFilters: typeof filters) => {
    setFilterLoading(true);
    try {
      const params: any = {};
      if (updatedFilters.profession) params.profession = updatedFilters.profession;
      if (updatedFilters.location) params.location = updatedFilters.location;
      if (updatedFilters.experienceYears)
        params.experienceYears = parseInt(updatedFilters.experienceYears);

      const res = await axios.get(`${process.env.NEXT_PUBLIC_BASEURL}/service-providers/filter`, {
        params,
      });

      if (res.data.data && res.data.data.length > 0) {
        setProviders(res.data.data);
        toast.success("Providers filtered successfully");
      } else {
        setProviders([]);
        toast.error("No providers found with the selected filters");
      }
    } catch (error) {
      console.error("Failed to filter providers", error);
      toast.error("Failed to apply filters");
    } finally {
      setFilterLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-indigo-900 to-purple-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold text-center">Find Top Service Providers</h1>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
                <button
                  onClick={clearFilters}
                  className="text-blue-600 text-sm hover:text-blue-700"
                >
                  Clear All
                </button>
              </div>

              {/* Service Type Filter */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium text-gray-900">Service Type</h3>
                  <button
                    onClick={() => handleCategoryChange("")}
                    className="text-blue-600 text-xs hover:text-blue-700"
                  >
                    Clear
                  </button>
                </div>
                <div className="space-y-2">
                  {serviceCategories.map((category) => (
                    <div key={category.name} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={category.name}
                        checked={filters.profession === category.name}
                        onChange={() => handleCategoryChange(category.name)}
                        className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <label htmlFor={category.name} className="text-sm text-gray-700">
                        {category.name} ({category.total})
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Location Filter */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium text-gray-900">Location</h3>
                  <button
                    onClick={() => setFilters(prev => ({ ...prev, location: "" }))}
                    className="text-blue-600 text-xs hover:text-blue-700"
                  >
                    Clear
                  </button>
                </div>
                <input
                  type="text"
                  name="location"
                  value={filters.location}
                  onChange={handleFilterChange}
                  placeholder="Enter city or state"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Experience Filter */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium text-gray-900">Years of Experience</h3>
                  <button
                    onClick={() => setFilters(prev => ({ ...prev, experienceYears: "" }))}
                    className="text-blue-600 text-xs hover:text-blue-700"
                  >
                    Clear
                  </button>
                </div>
                <select
                  name="experienceYears"
                  value={filters.experienceYears}
                  onChange={handleFilterChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Experience Levels</option>
                  <option value="0">0-2 Years</option>
                  <option value="3">3-5 Years</option>
                  <option value="6">6-10 Years</option>
                  <option value="10">10+ Years</option>
                </select>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-600">
                {filterLoading ? "Loading..." : `${providers.length} service providers found`}
              </p>
            </div>

            {/* Service Provider Listings */}
            {loading ? (
              <div className="text-center py-20 text-gray-500">Loading providers...</div>
            ) : providers.length === 0 ? (
              <div className="text-center py-20 text-gray-500">No providers found</div>
            ) : (
              <div className="space-y-4">
                {providers.map((provider) => (
                  <div
                    key={provider._id}
                    className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow flex flex-col justify-between h-full"
                  >
                    <div className="flex justify-between items-start">
                      {/* Left: Initial & Provider Info */}
                      <div className="flex space-x-4">
                        <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center">
                          <span className="text-white font-bold text-sm">{provider.firstName[0]}</span>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-1">
                            {provider.firstName} {provider.lastName}
                          </h3>
                          <p className="text-gray-600 mb-3">{provider.location}</p>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                            <div>
                              <span className="text-gray-500">Profession</span>
                              <p className="font-medium">{provider.profession}</p>
                            </div>
                            <div>
                              <span className="text-gray-500">Experience</span>
                              <p className="font-medium">{provider.experienceYears} years</p>
                            </div>
                          </div>
                          <p className="text-gray-500 text-sm mt-4">{provider.bio}</p>
                        </div>
                      </div>

                      
                    </div>

                    {/* Contact Button aligned bottom right */}
                    <div className="mt-6 flex justify-end">
                      <Link
                        href={`/service-providers/${provider._id}`}
                        className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                      >
                        Contact Provider
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Load More */}
            <div className="text-center mt-8">
              <button
                className="border border-gray-300 bg-white text-gray-700 py-2 px-8 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                disabled={filterLoading}
              >
                Load More Providers
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}