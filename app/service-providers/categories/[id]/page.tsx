/* eslint-disable */
"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import { Bookmark } from "lucide-react";

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
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const id = params?.id as string;
  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BASEURL}/service-providers/categories/${id}`
        );
        setProviders(res.data.data);
      } catch (error) {
        console.error("Failed to fetch service providers", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProviders();
  }, []);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-lime text-white dark:text-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold text-center">
            Find Top Service Providers
          </h1>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div>
          {/* Main Content */}
          <div>
            {/* Results Header */}
            <div className="mb-6">
              <p className="text-muted-foreground">
                {providers.length} service providers found
              </p>
            </div>

            <div className="space-y-4">
              {providers.map((provider) => (
                <div
                  key={provider._id}
                  className="p-6 rounded-lg shadow-sm bg-lime text-white dark:text-slate-800 flex flex-col justify-between"
                >
                  <div className="flex justify-between items-start">
                    {/* Left: Initial & Provider Info */}
                    <div>
                      <div className="w-12 h-12 rounded-lg mb-4 bg-white dark:bg-slate-800 flex items-center justify-center">
                        <span className="font-bold text-lg text-slate-800 dark:text-white">
                          {provider.firstName[0]}
                        </span>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-1">
                          {provider.firstName} {provider.lastName}
                        </h3>
                        <p className="mb-3">{provider.location}</p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <strong>Profession</strong>
                            <p className="font-medium">{provider.profession}</p>
                          </div>
                          <div>
                            <strong>Experience</strong>
                            <p className="font-medium">
                              {provider.experienceYears}
                            </p>
                          </div>
                        </div>
                        <p className="text-sm mt-4">{provider.bio}</p>
                      </div>
                    </div>

                    {/* Save Button */}
                    <button className="flex w-auto cursor-pointer justify-center items-center opacity-75">
                      Save
                      <Bookmark className="w-4 h-4 ml-1" />
                    </button>
                  </div>

                  {/* Contact Button aligned bottom right */}
                  <div className="mt-6 flex justify-end">
                    <Link
                      href={`/service-providers/${provider._id}`}
                      className="px-4 py-2 rounded-md bg-slate-800 dark:bg-slate-300"
                    >
                      Contact Provider
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-8">
              <button className="border cursor-pointer px-8 py-2 rounded-md">
                Load More Providers
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
