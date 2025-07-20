"use client";

import React, { useEffect, useState } from "react";
import ContainerWrapper from "@/components/common/ContainerWrapper";
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
    <div className="w-full py-10">
      <ContainerWrapper>
        <h2 className="text-2xl font-bold text-primary mb-8 pt-8">
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
                className="flex justify-between items-center space-x-4 border p-3 rounded-md"
              >
                <div className="space-y-1">
                  <h3 className="cursor-pointer font-semibold">
                    {category.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {category.total.toLocaleString()} Providers
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-100 dark:bg-slate-700 rounded-lg flex items-center justify-center flex-shrink-0">
                  <User className="w-6 h-6 text-primary" />
                </div>
              </Link>
            ))}
          </div>
        )}
      </ContainerWrapper>
    </div>
  );
};

export default Categories;
