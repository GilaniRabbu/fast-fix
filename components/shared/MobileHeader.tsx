import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const navigationItems = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Services",
    href: "/service-providers",
    items: [
      {
        title: "Electrical Services",
        href: "/service-providers",
        description: "Wiring, repair, and maintenance",
      },
      {
        title: "Plumbing Services",
        href: "/service-providers",
        description: "Pipe fitting and leak repair",
      },
      {
        title: "Cleaning Services",
        href: "/service-providers",
        description: "Home and office cleaning",
      },
      {
        title: "AC & Refrigeration Services",
        href: "/service-providers",
        description: "AC and fridge installation & repair",
      },
    ],
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
    ],
  },
];

interface MobileHeaderProps {
  closeSidebar: () => void;
}

export default function MobileHeader({ closeSidebar }: MobileHeaderProps) {
  return (
    <div className="flex flex-col space-y-3">
      <div className="flex flex-col space-y-2 pb-3">
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
      <div className="pt-4 pb-6">
        <div className="flex flex-col space-y-3">
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
        </div>
      </div>
    </div>
  );
}
