"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/slice/authSlice";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASEURL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        const { _id, firstName, email, lastName, phone, role } =
          data?.data?.user;
        const { accessToken, refreshToken } = data?.data;

        // ✅ Store tokens in localStorage
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        dispatch(
          setUser({
            user: {
              _id,
              firstName,
              lastName,
              email,
              phone,
              role,
            },
          })
        );
        toast.success("Logged in successfully!");
        // optionally store token: localStorage.setItem("token", data.token)
        router.push("/user/dashboard"); // redirect to home or dashboard
        console.log("user data", data?.data?.user);
      } else {
        toast.error(data.message || "Login failed");
      }
    } catch (err) {
      console.error("Login error:", err);
      toast.error("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-12 md:py-16 lg:py-20">
      <div className="max-w-xl w-full mx-auto px-4 md:px-6 lg:px-8">
        <div className="p-8 rounded-xl shadow bg-white dark:bg-slate-800">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2 text-label">Welcome Back</h1>
            <p className="text-muted-foreground">Sign in to your account</p>
          </div>

          <form className="space-y-6 w-full" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium">
                Email Address *
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full border rounded-md px-3 py-2 outline-none"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium">
                Password *
              </label>
              <div className="relative mt-1">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="block w-full border rounded-md px-3 py-2 pr-10 outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-end">
              <Link href="/forgot-password" className="text-sm text-label">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`cursor-pointer w-full py-3 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 
                ${
                  isLoading
                    ? "bg-lime text-[#95FE8A] dark:text-[#202020] cursor-not-allowed"
                    : "bg-lime text-[#71EE61] dark:text-[#121212] focus:ring-ring"
                }`}
            >
              {isLoading ? "Login..." : "Login"}
            </button>
          </form>

          <div className="text-center mt-6">
            <p className="text-sm">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="font-medium text-label">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
