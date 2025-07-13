"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, Search, Sun, Moon, Phone, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useTheme } from "next-themes";
import Logo from "./Logo";
import MobileHeader from "./MobileHeader";

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
        title: "Web Development",
        href: "/services/web-development",
        description: "Custom web applications and websites",
      },
      {
        title: "Mobile Apps",
        href: "/services/mobile-apps",
        description: "iOS and Android app development",
      },
      {
        title: "Consulting",
        href: "/services/consulting",
        description: "Technical consulting and strategy",
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
        description: "Custom web applications and websites",
      },
      {
        title: "Become A Service Provider",
        href: "/signup",
        description: "iOS and Android app development",
      },
    ],
  },
];

const phoneNumbers = [
  { label: "Main Office", number: "+1 (555) 123-4567" },
  { label: "Sales", number: "+1 (555) 987-6543" },
  { label: "Support", number: "+1 (555) 456-7890" },
];

export default function DesktopHeader() {
  const [open, setOpen] = React.useState(false);
  const [searchOpen, setSearchOpen] = React.useState(false);
  const { setTheme, theme } = useTheme();

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setSearchOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b backdrop-blur bg-background/95 supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-5 flex h-16 items-center">
          {/* Logo */}
          <div>
            <Logo />
          </div>

          {/* Desktop Navigation */}
          <div className="flex flex-1 items-center justify-between space-x-2 md:justify-center">
            <div className="w-full flex-1 md:w-auto md:flex-none">
              <NavigationMenu className="hidden md:flex">
                <NavigationMenuList>
                  {navigationItems.map((item) => (
                    <NavigationMenuItem key={item.title}>
                      {item.items ? (
                        <>
                          <NavigationMenuTrigger className="cursor-pointer bg-transparent">
                            {item.title}
                          </NavigationMenuTrigger>
                          <NavigationMenuContent>
                            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                              {item.items.map((subItem) => (
                                <li key={subItem.title}>
                                  <NavigationMenuLink asChild>
                                    <Link
                                      href={subItem.href}
                                      className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                    >
                                      <div className="text-sm font-medium leading-none">
                                        {subItem.title}
                                      </div>
                                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                        {subItem.description}
                                      </p>
                                    </Link>
                                  </NavigationMenuLink>
                                </li>
                              ))}
                            </ul>
                          </NavigationMenuContent>
                        </>
                      ) : (
                        <NavigationMenuLink asChild>
                          <Link
                            href={item.href}
                            className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                          >
                            {item.title}
                          </Link>
                        </NavigationMenuLink>
                      )}
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-2">
            {/* Search */}
            <Button
              variant="ghost"
              size="sm"
              className="h-9 w-9 px-0 cursor-pointer"
              onClick={() => setSearchOpen(true)}
            >
              <Search className="h-4 w-4" />
              <span className="sr-only">Search</span>
            </Button>

            {/* Phone Numbers Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-9 w-9 px-0 cursor-pointer hidden md:block"
                >
                  <Phone className="h-4 w-4" />
                  <span className="sr-only">Phone Numbers</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                {phoneNumbers.map((phone) => (
                  <DropdownMenuItem key={phone.label} asChild>
                    <a
                      href={`tel:${phone.number}`}
                      className="flex items-center"
                    >
                      <Phone className="mr-2 h-4 w-4" />
                      <div>
                        <div className="font-medium">{phone.label}</div>
                        <div className="text-sm text-muted-foreground">
                          {phone.number}
                        </div>
                      </div>
                    </a>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="sm"
              className="h-9 w-9 px-0 cursor-pointer"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>

            {/* Mobile Menu */}
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-9 w-9 px-0 cursor-pointer md:hidden"
                >
                  <Menu className="h-4 w-4" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="pr-0 [&>button]:hidden overflow-y-auto"
              >
                <div className="flex items-center justify-between p-4 border-b">
                  <Logo />
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-9 w-9 p-0 cursor-pointer rounded"
                    onClick={() => setOpen(false)}
                  >
                    <X className="h-4 w-4" />
                    <span className="sr-only">Close menu</span>
                  </Button>
                </div>
                <div className="px-4 py-2">
                  <MobileHeader />
                </div>
              </SheetContent>
            </Sheet>

            <Button variant="outline" size="sm" className="cursor-pointer">
              <Link href="/login">Login</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Search Command Dialog */}
      <CommandDialog open={searchOpen} onOpenChange={setSearchOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Navigation">
            {navigationItems.map((item) => (
              <CommandItem
                key={item.href}
                onSelect={() => {
                  setSearchOpen(false);
                  // Navigate to the item
                }}
              >
                {item.title}
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandGroup heading="Quick Actions">
            <CommandItem
              onSelect={() => {
                setSearchOpen(false);
                setTheme(theme === "dark" ? "light" : "dark");
              }}
            >
              Toggle Theme
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
