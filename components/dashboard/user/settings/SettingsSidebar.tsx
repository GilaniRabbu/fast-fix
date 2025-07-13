"use client";

import React from "react";
import { User, Shield } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const SettingsSidebar = () => {
  const pathname = usePathname();

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "security", label: "Security", icon: Shield },
  ];

  return (
    <div className="w-full">
      <div className="bg-white rounded-sm border border-gray-200  px-2 py-2">
        <nav className="flex gap-4">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = pathname?.includes(tab.id);

            return (
              <Link
                href={`/user/settings/${tab.id}`}
                key={tab.id}
                className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${isActive
                  ? "bg-red-50 text-red-600 border border-red-200"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default SettingsSidebar;
