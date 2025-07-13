/*eslint-disable*/
"use client"

import { useState } from "react"
import { Eye, EyeOff, User, Building2 } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  location: string;
  profession: string;
  experienceYears: string;
  hourlyRate: number;
  bio: string;
  role: string;
}

export default function SignupPage() {
  const [userType, setUserType] = useState<"CUSTOMER" | "SERVICE_PROVIDER">("CUSTOMER")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setLoading] = useState(false)
  const router = useRouter()
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    location: "",
    profession: "",
    experienceYears: "",
    hourlyRate: 0,
    bio: "",
    role: "CUSTOMER", // Initialize with default, will be updated dynamically
  })
  const [error, setError] = useState<string | null>(null)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target

    setFormData(prev => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
      role: userType,
    }))
  }


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)

    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      setError("Invalid password: Passwords do not match")
      return
    }

    if (formData.password.length < 8) {
      setError("Invalid password: Password must be at least 8 characters long")
      return
    }

    // Validate required provider fields
    if (userType === "SERVICE_PROVIDER") {
      if (!formData.profession || !formData.experienceYears || !formData.hourlyRate) {
        setError("Please fill out all required provider fields")
        return
      }
    }

    try {
      setLoading(true)
      // Prepare data for submission, excluding confirmPassword
      const { confirmPassword, ...restData } = formData
      const { bio, profession, experienceYears, hourlyRate, ...customerData } = restData
      let submissionData

      if (userType === "CUSTOMER") {
        submissionData = customerData
      } else {
        submissionData = {
          ...restData,
          experienceYears: parseInt(experienceYears) || 0, // Convert experienceYears to number
          hourlyRate: hourlyRate || 0, // Ensure hourlyRate is also a number
        }
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_BASEURL}/users/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submissionData),
      })

      const responseData = await response.json()

      if (responseData.success) {
        toast.success("Account Created Successfully")
        router.push("/login")
        setLoading(false)
      }
    } catch (err: any) {
      setLoading(false)
      const errorMessage = err.message || "An error occurred during signup. Please try again."
      setError(errorMessage)
      console.error("Signup error:", err)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Your Account</h1>
          </div>



          <div className="mb-8">
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setUserType("CUSTOMER")}
                className={`flex-1 flex items-center justify-center cursor-pointer py-3 px-4 rounded-md text-sm font-medium transition-all ${userType === "CUSTOMER" ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900"}`}
              >
                <User className="w-4 h-4 mr-2" />
                Customer Registration
              </button>
              <button
                onClick={() => setUserType("SERVICE_PROVIDER")}
                className={`flex-1 flex items-center justify-center cursor-pointer py-3 px-4 rounded-md text-sm font-medium transition-all ${userType === "SERVICE_PROVIDER" ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900"}`}
              >
                <Building2 className="w-4 h-4 mr-2" />
                Service Provider
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                  First Name *
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  required
                  value={formData.firstName}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                  Last Name *
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  required
                  value={formData.lastName}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address *
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Phone Number *
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                value={formData.phone}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
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
                    className="block w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-400 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                  Confirm Password *
                </label>
                <div className="relative mt-1">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="block w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-400 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                Location
              </label>
              <input
                id="location"
                name="location"
                type="text"
                placeholder="City, State"
                value={formData.location}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>

            {userType === "SERVICE_PROVIDER" && (
              <>
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label htmlFor="profession" className="block text-sm font-medium text-gray-700">
                      Profession *
                    </label>
                    <select
                      id="profession"
                      name="profession"
                      required={userType === "SERVICE_PROVIDER"}
                      value={formData.profession}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-400"
                    >
                      <option value="">Select your profession</option>
                      <option value="Electrician">Electrician</option>
                      <option value="Plumber">Plumber</option>
                      <option value="Painter">Painter</option>
                      <option value="Cleaner">Cleaner</option>
                      <option value="Mechanic">Mechanic</option>
                      <option value="AC Repair">AC Repair</option>
                      <option value="Tech Support">Tech Support</option>
                      <option value="Carpenter">Carpenter</option>
                      <option value="Gardener">Gardener</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="experienceYears" className="block text-sm font-medium text-gray-700">
                      Years of Experience *
                    </label>
                    <select
                      id="experienceYears"
                      name="experienceYears"
                      required={userType === "SERVICE_PROVIDER"}
                      value={formData.experienceYears}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-400"
                    >
                      <option value="">Select experience</option>
                      <option value="0">0-1 years</option>
                      <option value="2">2-5 years</option>
                      <option value="6">6-10 years</option>
                      <option value="10">10+ years</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="hourlyRate" className="block text-sm font-medium text-gray-700">
                    Hourly Rate (in BDT) *
                  </label>
                  <input
                    id="hourlyRate"
                    name="hourlyRate"
                    type="number"
                    required={userType === "SERVICE_PROVIDER"}
                    min="0"
                    placeholder="e.g., 500"
                    value={formData.hourlyRate}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-400"
                  />
                </div>

                <div>
                  <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
                    Professional Bio
                  </label>
                  <textarea
                    id="bio"
                    name="bio"
                    placeholder="Tell us about your experience and design philosophy..."
                    value={formData.bio}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-400"
                    rows={4}
                  />
                </div>
              </>
            )}
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                <span className="block sm:inline">{error}</span>
              </div>
            )}
            <div className="flex items-start space-x-2">
              <input
                type="checkbox"
                id="terms"
                required
                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="terms" className="text-sm text-gray-700 leading-5">
                I agree to the{" "}
                <Link href="/terms" className="text-blue-600 hover:text-blue-700">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-blue-600 hover:text-blue-700">
                  Privacy Policy
                </Link>
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 cursor-pointer px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2
                ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-gray-900 hover:bg-gray-800 text-white focus:ring-gray-900'}
              `}
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>
          <div className="text-sm text-gray-600 flex items-end justify-center pt-5 w-full gap-1">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-600 hover:text-blue-700 font-medium">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}