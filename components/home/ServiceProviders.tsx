/* eslint-disable */
"use client";

import React, { useEffect, useState } from "react";
import { MapPin } from "lucide-react";
import ContainerWrapper from "@/components/common/ContainerWrapper";
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
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BASEURL}/service-providers`
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

  const handleSave = (name: string) => {
    alert(`Saved ${name}`);
  };

  const handleHire = (name: string) => {
    alert(`Hire request sent to ${name}`);
  };

  if (loading) {
    return (
      <div className="text-center py-10 text-gray-500">
        Loading providers...
      </div>
    );
  }

  return (
    <div className="w-full py-16">
      <ContainerWrapper>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
          <h2 className="text-3xl font-bold text-primary">
            Explore Popular Service Providers
          </h2>
          <Link
            href="/service-providers"
            className="border text-primary px-4 py-2 rounded"
          >
            View All Providers
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {providers.map((provider) => {
            const fullName = `${provider.firstName} ${provider.lastName}`;
            return (
              <div key={provider._id} className="border rounded-md p-5">
                <div className="flex justify-between items-start">
                  {/* First character of firstName */}
                  <div className="w-10 h-10 rounded-full text-sm font-bold text-primary border flex items-center justify-center">
                    {provider.firstName.charAt(0)}
                  </div>
                </div>

                {/* Name */}
                <div className="mt-3">
                  <h3 className="font-medium">{fullName}</h3>
                </div>

                {/* Profession */}
                <h2 className="text-xl font-bold mt-1 text-lime">
                  {provider.profession}
                </h2>

                {/* Experience */}
                <div className="mt-3">
                  <span className="px-2 py-1 rounded text-sm border text-primary">
                    {provider.experienceYears}+ years experience
                  </span>
                </div>

                {/* Rate & Location */}
                <div className="mt-4 flex justify-between items-end">
                  <div>
                    <div className="font-bold">${provider.hourlyRate}/hr</div>
                    <div className="text-sm text-muted-foreground flex items-center gap-1">
                      <MapPin className="w-4 h-4" /> {provider.location}
                    </div>
                  </div>

                  {/* Hire */}
                  <Link
                    href={`/service-providers/${provider._id}`}
                    className="px-4 py-2 rounded-md transition-all bg-slate-300 dark:bg-slate-700 hover:bg-slate-400 hover:dark:bg-slate-800"
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
