import * as React from "react";
import { Phone } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const navigationItems = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Services",
    href: "/services",
    items: [
      {
        title: "Electrical Services",
        href: "/services/electrical",
        description: "Wiring, repair, and maintenance",
      },
      {
        title: "Plumbing Services",
        href: "/services/plumbing",
        description: "Pipe fitting and leak repair",
      },
      {
        title: "Cleaning Services",
        href: "/services/cleaning",
        description: "Home and office cleaning",
      },
      {
        title: "AC & Refrigeration Services",
        href: "/services/ac-refrigeration",
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

const phoneNumbers = [
  { label: "Main Office", number: "+1 (555) 123-4567" },
  { label: "Sales", number: "+1 (555) 987-6543" },
  { label: "Support", number: "+1 (555) 456-7890" },
];

export default function MobileHeader() {
  return (
    <div className="flex flex-col space-y-3">
      <div className="flex flex-col space-y-2 pb-3">
        {navigationItems.map((item) => (
          <div key={item.title}>
            <Link
              href={item.href}
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
      <div className="border-t pt-4">
        <div className="space-y-2">
          <h4 className="font-medium text-lg">Contact Numbers</h4>
          {phoneNumbers.map((phone) => (
            <Link
              key={phone.label}
              href={`tel:${phone.number}`}
              className="flex items-center gap-3 text-sm mb-3"
            >
              <Phone className="h-5 w-5" />
              <div>
                <div className="font-medium">{phone.label}</div>
                <div className="text-muted-foreground">{phone.number}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className="pt-4 pb-6">
        <div className="flex flex-col space-y-3">
          <Button variant="outline" size="sm" className="cursor-pointer">
            <Link href="/signup">Sign Up</Link>
          </Button>
          <Button variant="outline" size="sm" className="cursor-pointer">
            <Link href="/login">Login</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
