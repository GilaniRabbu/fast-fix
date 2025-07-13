"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Footer = () => {
  const pathname = usePathname();
  const hideHeader =
    pathname.startsWith("/user") || pathname.startsWith("/admin");

  if (hideHeader) return null;
  return (
    <footer className=" lg:py-12">
      <div className="container px-5 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mt-8 mb-10">
          {/* Logo and Contact Info */}
          <div className="lg:col-span-1 lg:w-4/5">
            <h2 className="text-xl font-semibold mb-4">JustFix</h2>
            <p className="text-sm text-gray-600">
              JustFix connects you with trusted electricians, plumbers, cleaners, and other local experts. Get reliable help for your home and office needs — quickly and easily.
            </p>
          </div>


          {/* Pages */}
          {/* Pages (Updated to match navLinks) */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Pages</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-600 hover:text-gray-900 text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/post-job" className="text-gray-600 hover:text-gray-900 text-sm">
                  Post A Job
                </Link>
              </li>
              <li>
                <Link href="/hire-serivce-provider" className="text-gray-600 hover:text-gray-900 text-sm">
                  Hire A Service Provider
                </Link>
              </li>
              <li>
                <Link href="/signup" className="text-gray-600 hover:text-gray-900 text-sm">
                  Become A Service Provider
                </Link>
              </li>
              <li>
                <Link href="/login" className="text-gray-600 hover:text-gray-900 text-sm">
                  Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Utility */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Utility</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className="text-gray-600 hover:text-gray-900 text-sm"
                >
                  License
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-600 hover:text-gray-900 text-sm"
                >
                  Reservation Policy
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-600 hover:text-gray-900 text-sm"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Contact</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className="text-gray-600 hover:text-gray-900 text-sm"
                >
                  123 Main Street, Downtown
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-600 hover:text-gray-900 text-sm"
                >
                  +880 123-4567
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-600 hover:text-gray-900 text-sm"
                >
                  JustFix@gmail.com
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-5 border-t border-gray-200">
          <p className="text-gray-600 text-sm text-center">
            © 2025 JustFix. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
