
/* eslint-disable */
"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
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
import { Search, MapPin, Bookmark } from "lucide-react"

export default function ServiceProvidersPage() {
    const [providers, setProviders] = useState<ServiceProvider[]>([]);
    const [loading, setLoading] = useState(true);
    const params = useParams();
    const id = params?.id as string;
    useEffect(() => {

        const fetchProviders = async () => {
            try {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_BASEURL}/service-providers/categories/${id}`);
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
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-gradient-to-r from-indigo-900 to-purple-900 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <h1 className="text-4xl font-bold text-center">Find Top Service Providers</h1>


                </div>
            </header>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="">
                    {/* Filters Sidebar */}


                    {/* Main Content */}
                    <div className="">


                        {/* Results Header */}
                        <div className="flex items-center justify-between mb-6">
                            <p className="text-gray-600">{providers.length} service providers found</p>

                        </div>

                        {/* Service Provider Listings */}

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
                                                <h3 className="text-lg font-semibold text-gray-900 mb-1">{provider.firstName} {provider.lastName}</h3>
                                                <p className="text-gray-600 mb-3">{provider.location}</p>

                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                                                    <div>
                                                        <span className="text-gray-500">Profession</span>
                                                        <p className="font-medium">{provider.profession}</p>
                                                    </div>
                                                    <div>
                                                        <span className="text-gray-500">Experience</span>
                                                        <p className="font-medium">{provider.experienceYears}</p>
                                                    </div>

                                                </div>
                                                <p className="text-gray-500 text-sm mt-4">{provider.bio}</p>
                                            </div>
                                        </div>

                                        {/* Save Button */}
                                        <button className="text-gray-400 flex hover:text-gray-600 w-auto justify-center items-center">
                                            Save
                                            <Bookmark className="w-4 h-4 ml-1" />
                                        </button>
                                    </div>

                                    {/* Contact Button aligned bottom right */}
                                    <div className="mt-6 flex justify-end">
                                        <Link href={`/service-providers/${provider._id}`} className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                                            Contact Provider
                                        </Link >
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Load More */}
                        <div className="text-center mt-8">
                            <button className="border border-gray-300 bg-white text-gray-700 py-2 px-8 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                                Load More Providers
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}