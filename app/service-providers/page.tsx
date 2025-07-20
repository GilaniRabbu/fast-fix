/* eslint-disable */
"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { toast } from "sonner";

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
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BASEURL}/service-providers/filter`
        );
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
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BASEURL}/service-providers/categories`
        );
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
    setFilters((prev) => ({ ...prev, [name]: value }));

    // Trigger filter update
    applyFilters({ ...filters, [name]: value });
  };

  const handleCategoryChange = (category: string) => {
    const newProfession = filters.profession === category ? "" : category;
    setFilters((prev) => ({ ...prev, profession: newProfession }));
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
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BASEURL}/service-providers/filter`
      );
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
      if (updatedFilters.profession)
        params.profession = updatedFilters.profession;
      if (updatedFilters.location) params.location = updatedFilters.location;
      if (updatedFilters.experienceYears)
        params.experienceYears = parseInt(updatedFilters.experienceYears);

      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BASEURL}/service-providers/filter`,
        {
          params,
        }
      );

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
    <div className="min-h-screen">
      {/* Header */}
      <header className="shadow bg-white dark:bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold text-center">
            Find Top Service Providers
          </h1>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="p-6 rounded-lg shadow-sm sticky top-8 bg-white dark:bg-slate-800">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold">Filters</h2>
                <button
                  onClick={clearFilters}
                  className="cursor-pointer text-sm text-blue-600 dark:text-blue-300"
                >
                  Clear All
                </button>
              </div>

              {/* Service Type Filter */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium">Service Type</h3>
                  <button
                    onClick={() => handleCategoryChange("")}
                    className="cursor-pointer text-xs text-blue-600 dark:text-blue-300"
                  >
                    Clear
                  </button>
                </div>
                <div className="space-y-2">
                  {serviceCategories.map((category) => (
                    <div
                      key={category.name}
                      className="flex items-center space-x-2"
                    >
                      <input
                        type="checkbox"
                        id={category.name}
                        checked={filters.profession === category.name}
                        onChange={() => handleCategoryChange(category.name)}
                        className="cursor-pointer h-4 w-4"
                      />
                      <label
                        htmlFor={category.name}
                        className="cursor-pointer text-sm"
                      >
                        {category.name} ({category.total})
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Location Filter */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium">Location</h3>
                  <button
                    onClick={() =>
                      setFilters((prev) => ({ ...prev, location: "" }))
                    }
                    className="cursor-pointer text-xs text-blue-600 dark:text-blue-300"
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
                  className="w-full rounded-md px-3 py-2 outline-none border border-blue-600 dark:border-blue-300"
                />
              </div>

              {/* Experience Filter */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium">Years of Experience</h3>
                  <button
                    onClick={() =>
                      setFilters((prev) => ({ ...prev, experienceYears: "" }))
                    }
                    className="cursor-pointer text-xs text-blue-600 dark:text-blue-300"
                  >
                    Clear
                  </button>
                </div>
                <select
                  name="experienceYears"
                  value={filters.experienceYears}
                  onChange={handleFilterChange}
                  className="w-full cursor-pointer rounded-md px-3 py-2 border border-blue-600 dark:border-blue-300 bg-white dark:bg-slate-800"
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
              <p className="text-muted-foreground">
                {filterLoading
                  ? "Loading..."
                  : `${providers.length} service providers found`}
              </p>
            </div>

            {/* Service Provider Listings */}
            {loading ? (
              <div className="text-center py-20 text-muted-foreground">
                Loading providers...
              </div>
            ) : providers.length === 0 ? (
              <div className="text-center py-20 text-muted-foreground">
                No providers found
              </div>
            ) : (
              <div className="space-y-4">
                {providers.map((provider) => (
                  <div
                    key={provider._id}
                    className="p-6 rounded-lg shadow-sm bg-white dark:bg-slate-800 flex flex-col justify-between"
                  >
                    <div className="flex justify-between items-start">
                      {/* Left: Initial & Provider Info */}
                      <div className="flex gap-4 flex-col md:flex-row">
                        <div className="w-12 h-12 rounded-lg bg-slate-800 dark:bg-white flex items-center justify-center">
                          <span className="text-sm font-bold text-white dark:text-slate-800">
                            {provider.firstName[0]}
                          </span>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold mb-1">
                            {provider.firstName} {provider.lastName}
                          </h3>
                          <p className="mb-3 text-muted-foreground">
                            {provider.location}
                          </p>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                            <div>
                              <span>Profession</span>
                              <p className="font-medium text-muted-foreground">
                                {provider.profession}
                              </p>
                            </div>
                            <div>
                              <span>Experience</span>
                              <p className="font-medium text-muted-foreground">
                                {provider.experienceYears} years
                              </p>
                            </div>
                          </div>
                          <p className="text-sm mt-4 text-muted-foreground">
                            {provider.bio}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Contact Button aligned bottom right */}
                    <div className="mt-6 flex justify-end">
                      <Link
                        href={`/service-providers/${provider._id}`}
                        className="px-4 py-2 rounded-md bg-slate-300 dark:bg-slate-700"
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
                className="cursor-pointer px-8 py-2 rounded-md border border-blue-600 dark:border-blue-300"
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
