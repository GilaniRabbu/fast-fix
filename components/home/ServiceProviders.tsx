/* eslint-disable */
"use client";

import React, { useEffect, useState } from "react";
import { Bookmark, MapPin } from "lucide-react";
import ContainerWrapper from "../common/ContainerWrapper";
import axios from "axios";
import Link from "next/link";

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

const ServiceProviders = () => {
  const [providers, setProviders] = useState<ServiceProvider[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_BASEURL}/service-providers`);
        setProviders(res.data.data);
      } catch (error) {
        console.error("Failed to fetch service providers", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProviders();
  }, []);

  const handleSave = (name: string) => {
    alert(`Saved ${name}`);
  };

  const handleHire = (name: string) => {
    alert(`Hire request sent to ${name}`);
  };

  if (loading) {
    return <div className="text-center py-10 text-gray-500">Loading providers...</div>;
  }

  return (
    <div className="py-16 w-full bg-gray-50">
      <ContainerWrapper>
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Explore Popular Service Providers</h2>
          <Link href="/service-providers" className="border border-blue-600 text-blue-600 px-4 py-2 rounded hover:bg-blue-50 transition">
            View All Providers
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {providers.map((provider) => {
            const fullName = `${provider.firstName} ${provider.lastName}`;
            return (
              <div
                key={provider._id}
                className="bg-white rounded-lg shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start">
                  {/* First character of firstName */}
                  <div className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center text-white font-bold text-sm">
                    {provider.firstName.charAt(0)}
                  </div>


                </div>

                {/* Name */}
                <div className="mt-3">
                  <h3 className="font-medium text-gray-900">{fullName}</h3>
                </div>

                {/* Profession */}
                <h2 className="text-xl font-bold text-gray-900 mt-1">{provider.profession}</h2>

                {/* Experience */}
                <div className="mt-3">
                  <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm">
                    {provider.experienceYears}+ years experience
                  </span>
                </div>

                {/* Rate & Location */}
                <div className="mt-4 flex justify-between items-end">
                  <div>
                    <div className="text-gray-900 font-bold">${provider.hourlyRate}/hr</div>
                    <div className="text-gray-500 text-sm flex items-center gap-1">
                      <MapPin className="w-4 h-4" /> {provider.location}
                    </div>
                  </div>

                  {/* Hire */}
                  <Link
                    href={`/service-providers/${provider._id}`}
                    className="bg-black hover:bg-gray-800 text-white rounded-md px-4 py-2"
                  >
                    Contact Provider
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </ContainerWrapper>
    </div>
  );
};

export default ServiceProviders;
