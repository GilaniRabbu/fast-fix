"use client";
import { User } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

const UserTopNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  }
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <header ref={menuRef} className="bg-white w-full fixed z-40 top-0 right-0 border-b border-gray-200 pl-5 pr-5 xl:pr-20 py-4">
      <div className="flex items-center justify-between">
        <div className="flex-1" />

        {/* Right side - Notifications */}
        <div className="flex items-center gap-4">
          {/* User Menu */}
          <div className="flex relative items-center gap-3 ">
            <div onClick={toggleMenu} className="w-8 group cursor-pointer h-8 bg-gray-200 rounded-full flex items-center justify-center">
              <User className="w-4 h-4" />
            </div>

            <div className={`absolute right-0 top-12  ${isOpen ? "block" : "hidden"} transition-all duration-200`}>
              <ul className="bg-white border border-gray-200 rounded-lg p-4 space-y-2 w-48">
                <li className="text-sm text-gray-600 hover:text-gray-900 cursor-pointer">
                  <Link href="/user/settings/profile">Profile</Link>
                </li>
                <li className="text-sm text-gray-600 hover:text-gray-900 cursor-pointer">
                  <Link href="/user/settings/security">Security</Link>
                </li>
                <li className="text-sm text-gray-600 hover:text-gray-900 cursor-pointer">
                  Logout
                </li>
              </ul>
            </div>

          </div>
        </div>
      </div>
    </header>
  );
};

export default UserTopNavbar;
// 