"use client";
import React, { useState, ChangeEvent } from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
import { Search, User, LayoutDashboard, Settings, LogOut } from "lucide-react";

import ContainerWrapper from "../common/ContainerWrapper";
import Logo from "./Logo";
import { selectCurrentUser } from "@/redux/slice/authSlice";

// Interface for a service provider
interface IServiceProvider {
  _id: string;
  firstName: string;
  lastName: string;
  profession: string;
  hourlyRate: string;
  location: string;
}

const navLinks: { name: string; href: string }[] = [
  { name: "Home", href: "/" },
  { name: "Hire A Service Provider", href: "/service-providers" },
  { name: "Become A Service Provider", href: "/signup" },
];

const DesktopHeader: React.FC = () => {
  const user = useSelector(selectCurrentUser);
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<IServiceProvider[]>([]);

  const handleSearch = async (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    if (value.trim() === "") {
      setResults([]);
      return;
    }

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASEURL}/service-providers/search?searchTerm=${value}`
      );
      const data = await res.json();

      if (data.success) {
        setResults(data.data);
      } else {
        setResults([]);
      }
    } catch (error) {
      console.error("Search error:", error);
      setResults([]);
    }
  };

  return (
    <>
      {/* HEADER SECTION */}
      <header className="bg-white shadow-sm z-50 relative">
        <ContainerWrapper className="hidden lg:block w-full">
          <div className="flex justify-between items-center h-16">
            <Logo />

            {/* Search Bar */}
            <div className="flex flex-1 justify-center items-center max-w-md mx-8 relative">
              <input
                type="text"
                placeholder="What Are You Looking For?"
                value={query}
                onChange={handleSearch}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
              <Search className="absolute hidden xl:block right-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            </div>

            {/* Navigation */}
            <nav className="hidden lg:flex items-center space-x-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-gray-700 hover:text-violet-700"
                >
                  {link.name}
                </Link>
              ))}

              {!user?._id ? (
                <>
                  <Link
                    href="/signup"
                    className="text-gray-700 px-4 py-2 rounded-md hover:text-violet-700"
                  >
                    Sign Up
                  </Link>
                  <Link
                    href="/login"
                    className="bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-gray-800"
                  >
                    Login
                  </Link>
                </>
              ) : (
                <div className="relative group">
                  <button className="flex cursor-pointer items-center justify-center size-10 bg-gray-100 rounded-full hover:bg-gray-200">
                    <User className="w-4 h-4" />
                  </button>
                  <div className="absolute hidden group-hover:block right-0 z-50">
                    <div className="pt-3">
                      <div className="w-40 bg-white shadow-md rounded-md overflow-hidden">
                        <Link
                          href="/dashboard"
                          className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          <LayoutDashboard className="h-4 w-4 text-gray-500" />
                          Dashboard
                        </Link>
                        <Link
                          href="/settings"
                          className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          <Settings className="h-4 w-4 text-gray-500" />
                          Settings
                        </Link>
                        <Link
                          href="/logout"
                          className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          <LogOut className="h-4 w-4 text-red-500" />
                          Logout
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </nav>

            {/* Mobile menu placeholder */}
            <div className="lg:hidden">
              <button className="p-2">
                <User className="w-5 h-5" />
              </button>
            </div>
          </div>
        </ContainerWrapper>
      </header>

      {/* SEARCH RESULTS BELOW HEADER */}
      {results.length > 0 && (
        <div className="bg-gray-50 border-t border-gray-200 shadow-sm w-full z-40 relative">
          <ContainerWrapper className="py-4">
            <div className="space-y-4">
              {results.map((provider) => (
                <div
                  key={provider._id}
                  className="p-4 border bg-white rounded-md transition"
                >
                  <p className="font-semibold text-gray-800">
                    {provider.firstName} {provider.lastName}
                  </p>
                  <p className="text-sm text-gray-600">{provider.profession}</p>
                  <p className="text-sm text-gray-600">{provider.hourlyRate}</p>
                  <p className="text-sm text-gray-600">{provider.location}</p>
                  <Link
                    href={`/service-providers/${provider._id}`}
                    className="text-violet-600 text-sm font-medium hover:underline"
                  >
                    Contact Provider
                  </Link>
                </div>
              ))}
            </div>
          </ContainerWrapper>
        </div>
      )}
    </>
  );
};

export default DesktopHeader;
