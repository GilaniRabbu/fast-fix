"use client";

import * as React from "react";
import Link from "next/link";
import {
  Menu,
  Search,
  Sun,
  Moon,
  X,
  LogOut,
  Settings,
  LayoutDashboard,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  CommandDialog,
  CommandEmpty,
  CommandInput,
  CommandList,
} from "@/components/ui/command";
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
import axios from "axios";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/redux/slice/authSlice";
import Logo from "./Logo";
import MobileHeader from "./MobileHeader";
import { useDispatch } from "react-redux";
import { logout } from "@/redux/slice/authSlice";
import { useRouter } from "next/navigation";
import ContainerWrapper from "@/components/common/ContainerWrapper";

interface Category {
  name: string;
  total: number;
}

interface IServiceProvider {
  _id: string;
  firstName: string;
  lastName: string;
  profession: string;
  hourlyRate: string;
  location: string;
}

export default function DesktopHeader() {
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [open, setOpen] = React.useState(false);
  const [searchOpen, setSearchOpen] = React.useState(false);
  const { setTheme, theme } = useTheme();
  const [query, setQuery] = React.useState<string>("");
  const [results, setResults] = React.useState<IServiceProvider[]>([]);

  const user = useSelector(selectCurrentUser);

  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logout());
    router.push("/login");
  };

  const handleSearch = async (value: string) => {
    if (value.trim() === "") {
      setResults([]);
      return;
    }

    try {
      const res = await fetch(
        `${
          process.env.NEXT_PUBLIC_BASEURL
        }/service-providers/search?searchTerm=${encodeURIComponent(value)}`
      );

      if (!res.ok) throw new Error("Failed to fetch search results");

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

  const navigationItems = [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Services",
      href: "/service-providers",
      items: categories.map((category) => ({
        title: category.name,
        href: `/service-providers/categories/${category.name}`,
        description: `${category.total.toLocaleString()} Providers`,
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
    <>
      <header className="sticky top-0 z-50 w-full border-b backdrop-blur bg-background/95 supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-5 flex h-16 items-center">
          {/* Logo */}
          <div>
            <Logo />
          </div>

          {/* Desktop Navigation */}
          {loading ? (
            <p>Loading Navigation...</p>
          ) : (
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
                                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-primary hover:text-background"
                                      >
                                        <div className="font-bold leading-none">
                                          {subItem.title}
                                        </div>
                                        <p className="line-clamp-2 text-sm leading-snug">
                                          &#8226; {subItem.description}
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
                              className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-all data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
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
          )}

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
                  <Logo onClick={() => setOpen(false)} />
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-9 w-9 p-0 cursor-pointer rounded bg-transparent dark:bg-transparent"
                    onClick={() => setOpen(false)}
                  >
                    <X className="h-4 w-4" />
                    <span className="sr-only">Close menu</span>
                  </Button>
                </div>
                <div className="px-4 py-2">
                  <MobileHeader closeSidebar={() => setOpen(false)} />
                </div>
              </SheetContent>
            </Sheet>

            {!user?._id ? (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  className="cursor-pointer hidden md:block bg-transparent dark:bg-transparent"
                >
                  <Link href="/signup">Sign Up</Link>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="cursor-pointer hidden md:block bg-transparent dark:bg-transparent"
                >
                  <Link href="/login">Login</Link>
                </Button>
              </>
            ) : (
              <div className="relative group">
                <button className="flex cursor-pointer items-center justify-center size-10 rounded-full bg-gray-100 dark:bg-slate-700 hover:bg-gray-200">
                  <User className="w-4 h-4" />
                </button>
                <div className="absolute hidden group-hover:block right-0 z-50">
                  <div className="pt-3">
                    <div className="w-40 shadow-md rounded-md overflow-hidden bg-white">
                      <Link
                        href="/user/dashboard"
                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <LayoutDashboard className="h-4 w-4 text-gray-500" />
                        Dashboard
                      </Link>
                      <Link
                        href="/user/settings"
                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <Settings className="h-4 w-4 text-gray-500" />
                        Settings
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="cursor-pointer w-full text-left flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <LogOut className="h-4 w-4 text-red-500" />
                        Logout
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Search Command Dialog */}
      <CommandDialog open={searchOpen} onOpenChange={setSearchOpen}>
        <CommandInput
          placeholder="Type a command or search..."
          value={query}
          onValueChange={(value) => {
            setQuery(value);
            handleSearch(value);
          }}
        />
        <CommandList>
          {results.length > 0 ? (
            <div className="shadow-sm w-full z-40 relative">
              <ContainerWrapper className="py-4">
                <div className="space-y-4">
                  {results.map((provider) => (
                    <div
                      key={provider._id}
                      className="p-4 border rounded-md transition"
                    >
                      <p className="font-bold dark:text-[#202020]">
                        {provider.firstName} {provider.lastName}
                      </p>
                      <p className="text-sm text-muted-foreground dark:text-[#202020]">
                        {provider.profession}
                      </p>
                      <p className="text-sm text-muted-foreground dark:text-[#202020]">
                        {provider.hourlyRate}
                      </p>
                      <p className="text-sm text-muted-foreground dark:text-[#202020]">
                        {provider.location}
                      </p>
                      <Link
                        href={`/service-providers/${provider._id}`}
                        className="text-sm font-bold text-indigo-600 dark:text-slate-950 hover:underline"
                      >
                        Contact Provider
                      </Link>
                    </div>
                  ))}
                </div>
              </ContainerWrapper>
            </div>
          ) : (
            <CommandEmpty>No results found.</CommandEmpty>
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
}
