"use client";
import React, { useEffect, useState } from "react";
import ContainerWrapper from "../common/ContainerWrapper";
import { User } from "lucide-react";
import axios from "axios";
import Link from "next/link";

interface Category {
  name: string;
  total: number;
}

const Categories = () => {
  const [serviceCategories, setServiceCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BASEURL}/service-providers/categories`,
          {
            withCredentials: true, // 🔥 THIS LINE IS ESSENTIAL
          }
        );
        setServiceCategories(res.data.data);
      } catch (error) {
        console.error("Failed to fetch categories", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="w-full">
      <div className="bg-gray-50 p-8">
        <ContainerWrapper>
          <h2 className="text-2xl font-bold text-gray-900 mb-8 pt-10">
            Most Popular Categories
          </h2>

          {loading ? (
            <p>Loading categories...</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {serviceCategories.map((category, index) => (
                <Link
                  href={`/service-providers/categories/${category.name}`}
                  key={index}
                  className="flex justify-between bg-white items-center space-x-4 border p-3 rounded-lg"
                >
                  <div className="space-y-1">
                    <h3 className="font-semibold text-gray-900 hover:text-blue-600 cursor-pointer transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {category.total.toLocaleString()} Providers
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <User className="w-6 h-6 text-gray-600" />
                  </div>
                </Link>
              ))}
            </div>
          )}
        </ContainerWrapper>
      </div>
    </div>
  );
};

export default Categories;
