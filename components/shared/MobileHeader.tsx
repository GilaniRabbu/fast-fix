"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/redux/slice/authSlice";

interface Category {
  name: string;
  total: number;
}

interface MobileHeaderProps {
  closeSidebar: () => void;
}

export default function MobileHeader({ closeSidebar }: MobileHeaderProps) {
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [loading, setLoading] = React.useState(true);
  const user = useSelector(selectCurrentUser);
  console.log(user);

  React.useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BASEURL}/service-providers/categories`,
          { withCredentials: true }
        );
        setCategories(res.data.data);
      } catch (err) {
        console.error("Failed to fetch categories", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const navigationItems = [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Services",
      href: "/service-providers",
      items: categories.map((cat) => ({
        title: cat.name,
        href: `/service-providers/categories/${cat.name}`,
        description: `${cat.total.toLocaleString()} Providers`,
      })),
    },
    {
      title: "Actions",
      href: "/service-providers",
      items: [
        {
          title: "Hire A Service Provider",
          href: "/service-providers",
          description: "Find and connect with verified professionals",
        },
        {
          title: "Become A Service Provider",
          href: "/signup",
          description: "Join our platform and offer your services",
        },
        {
          title: "Contact Support",
          href: "/contact",
          description: "Reach out with your queries, issues, or feedback",
        },
      ],
    },
  ];

  return (
    <div className="flex flex-col space-y-3">
      {loading ? (
        <p>Loading Navigation...</p>
      ) : (
        <div className="flex flex-col space-y-3 pb-3">
          {navigationItems.map((item) => (
            <div key={item.title}>
              <Link
                href={item.href}
                onClick={closeSidebar}
                className="block text-lg font-medium hover:text-foreground/80"
              >
                {item.title}
              </Link>
              {item.items && (
                <div className="ml-2 flex flex-col space-y-1">
                  {item.items.map((subItem) => (
                    <Link
                      key={subItem.title}
                      href={subItem.href}
                      onClick={closeSidebar}
                      className="block text-sm text-muted-foreground hover:text-foreground"
                    >
                      - {subItem.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <div className="pb-6">
        <div className="flex flex-col space-y-3">
          {!user?._id ? (
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={closeSidebar}
                className="cursor-pointer bg-transparent dark:bg-transparent"
              >
                <Link href="/signup">Sign Up</Link>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={closeSidebar}
                className="cursor-pointer bg-transparent dark:bg-transparent"
              >
                <Link href="/login">Login</Link>
              </Button>
            </>
          ) : (
            <div className="text-sm text-muted-foreground pt-4 border-t">
              <p className="font-bold">
                Welcome, {user.firstName} {user.lastName}
              </p>
              <p className="text-xs">{user.email}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
