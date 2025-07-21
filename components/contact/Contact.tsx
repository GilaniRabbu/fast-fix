"use client";

import { useState } from "react";
import { Send } from "lucide-react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
    subject: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Here you can integrate API logic
  };

  return (
    <section className="py-16 md:py-8">
      <div className="max-w-2xl mx-auto px-4 md:px-8 lg:px-12">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl text-balance font-bold mb-4">
            Let’s schedule your next service with FastFix
          </h2>
          <p className="text-muted-foreground text-balance">
            Whether you need urgent repairs, general maintenance, or just have
            questions — we’re here to help!
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 p-6 rounded-2xl shadow-md bg-white dark:bg-slate-800"
        >
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-muted-foreground"
              >
                First name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                placeholder="First Name"
                required
                className="w-full mt-2 px-4 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-border"
              />
            </div>

            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-muted-foreground"
              >
                Last name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                placeholder="Last Name"
                required
                className="w-full mt-2 px-4 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-border"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-muted-foreground"
            >
              Email address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email address"
              required
              className="w-full mt-2 px-4 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-border"
            />
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-muted-foreground"
            >
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="Phone Number"
              required
              className="w-full mt-2 px-4 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-border"
            />
          </div>

          <div>
            <label
              htmlFor="subject"
              className="block text-sm font-medium text-muted-foreground"
            >
              Subject
            </label>
            <select
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
              required
              className="w-full cursor-pointer mt-2 px-4 py-2 rounded-md border bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-border"
            >
              <option value="">Select a subject</option>
              <option value="repair">Repair</option>
              <option value="maintenance">Maintenance</option>
              <option value="installation">Installation</option>
              <option value="quote">Request a Quote</option>
              <option value="feedback">Feedback</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-muted-foreground"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              rows={4}
              placeholder="Any additional information..."
              required
              className="w-full mt-2 px-4 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-border"
            />
          </div>

          <button
            type="submit"
            className="w-full cursor-pointer py-3 font-semibold rounded-md flex items-center justify-center gap-2 transition-colors text-white bg-red-600 hover:bg-red-700"
          >
            <Send className="w-4 h-4" />
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
}
