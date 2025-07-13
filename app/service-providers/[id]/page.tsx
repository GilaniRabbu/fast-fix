/* eslint-disable */
"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import {
  MapPin,
  Briefcase,
  Star,
  Mail,
  Phone,
} from "lucide-react";
import { selectCurrentUser } from "@/redux/slice/authSlice";

interface Provider {
  _id: string;
  firstName: string;
  lastName: string;
  phone: string;
  role: string;
  email: string;
  profession: string;
  bio: string;
  experienceYears: number;
  hourlyRate: number;
  location: string;
  createdAt: string;
  updatedAt: string;
}

interface Category {
  name: string;
  total: number;
}

interface FormData {
  location: string;
  message: string;
}

export default function ProviderDetailsPage() {
  const [formData, setFormData] = useState<FormData>({
    location: "",
    message: "",
  });
  const user = useSelector(selectCurrentUser);
  const isLoggedIn = user?._id;
  const [serviceCategories, setServiceCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const params = useParams();
  const id = params?.id as string;

  const [provider, setProvider] = useState<Provider | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProvider = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_BASEURL}/service-providers/${id}`);
        setProvider(res.data.data);
      } catch (error) {
        console.error("Failed to fetch provider", error);
        toast.error("Failed to load provider details");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProvider();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isLoggedIn) {
      toast.error("Please sign up or log in to contact the provider");
      router.push("/signup");
      return;
    }

    setIsLoading(true);

    try {
      const payload = {
        userId: user._id,
        location: formData.location,
        message: formData.message,
        providerId: id,
      };

      const response = await fetch(`${process.env.NEXT_PUBLIC_BASEURL}/contacts/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        toast.success("Message sent to provider!");
        setFormData({
          location: "",
          message: "",
        });
      } else {
        toast.error(data.message || "Something went wrong");
      }
    } catch (error) {
      toast.error("Failed to send message.");
    } finally {
      setIsLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-20 text-gray-500">Loading provider...</div>;
  }

  if (!provider) {
    return <div className="text-center py-20 text-red-500">Provider not found.</div>;
  }

  const fullName = `${provider.firstName} ${provider.lastName}`;
  const initial = provider.firstName.charAt(0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-indigo-900 to-purple-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="">
            <Link href="/service-providers" className="text-white hover:text-gray-200">
              ← Back to Service Providers
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Provider Overview */}
        <div className="flex justify-between bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
          <div className="flex items-start space-x-6">
            <div className="w-16 h-16 bg-black rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-lg">{initial}</span>
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{fullName}</h1>
              <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  {provider.location}
                </div>
              </div>
              <p className="text-gray-600">
                {provider.profession} with {provider.experienceYears}+ years of experience.
              </p>
            </div>
          </div>
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h2>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-gray-600" />
                <a href={`mailto:${provider.email}`} className="text-blue-600 hover:text-blue-700">{provider.email}</a>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-gray-600" />
                <a href={`tel:${provider.phone}`} className="text-blue-600 hover:text-blue-700">{provider.phone}</a>
              </div>
            </div>
          </div>
        </div>

        {/* Provider Details */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* About Section */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">About {fullName}</h2>
              <p className="text-gray-600">{provider.bio}</p>
            </div>

            {/* Profession & Rate */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Profession & Rate</h2>
              <div className="space-y-2">
                <p><strong>Profession:</strong> {provider.profession}</p>
                <p><strong>Experience:</strong> {provider.experienceYears} years</p>
                <p><strong>Hourly Rate:</strong> ${provider.hourlyRate}</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              {/* Experience */}
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Experience</h2>
                <div className="flex items-center space-x-2">
                  <Briefcase className="w-4 h-4 text-gray-600" />
                  <span className="text-gray-700">{provider.experienceYears}+ Years</span>
                </div>
              </div>
            </div>
            <form
              onSubmit={handleSubmit}
              className="bg-white mt-6 rounded-lg shadow-sm border border-gray-200 p-6 space-y-4"
            >
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                  Location *
                </label>
                <input
                  id="location"
                  name="location"
                  type="text"
                  required
                  value={formData.location}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  value={formData.message}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {isLoading ? "Sending..." : "Contact Provider"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}