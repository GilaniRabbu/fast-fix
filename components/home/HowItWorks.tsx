import { Button } from "@/components/ui/button";
import { Search, Calendar, CheckCircle, MessageSquare } from "lucide-react";

const steps = [
  {
    icon: Search,
    number: "01",
    title: "Choose Your Service",
    description:
      "Browse verified service providers across various categories. Filter by location, rating, and service type to find the best fit for your needs.",
  },
  {
    icon: Calendar,
    number: "02",
    title: "Book Instantly",
    description:
      "Contact service providers directly through the platform. Request quotes, discuss your requirements, and schedule your service hassle-free.",
  },
  {
    icon: MessageSquare,
    number: "03",
    title: "Hire with Confidence",
    description:
      "Choose the best service provider based on reviews, experience, and your budget. Enjoy professional service delivered right to your doorstep.",
  },
  {
    icon: CheckCircle,
    number: "04",
    title: "Service Complete",
    description:
      "Get your tasks done by trusted professionals. Join thousands of satisfied users who found reliable service providers through our platform.",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-16">
      {/* Header */}
      <div className="text-center mb-16 space-y-4">
        <h2 className="text-3xl md:text-4xl font-bold">How FastFix Works</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Get professional home services in just a few simple steps. It&apos;s
          that easy!
        </p>
      </div>

      {/* Steps */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <div key={index} className="relative group border rounded-2xl p-6">
              <div className="absolute top-4 right-4 text-6xl text-foreground font-bold opacity-10 select-none">
                {step.number}
              </div>
              <div className="flex items-center justify-center w-12 h-12 rounded-full mb-6 bg-blue-100 text-blue-600">
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold mb-3 line-clamp-1">
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed line-clamp-4 text-muted-foreground">
                {step.description}
              </p>
            </div>
          );
        })}
      </div>

      {/* CTA Section */}
      <div className="text-center">
        <div className="border rounded-2xl p-8 lg:p-12">
          <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            Ready to Get Started?
          </h3>
          <p className="mb-6 max-w-lg mx-auto text-muted-foreground">
            Join thousands of satisfied customers who trust FastFix for their
            home service needs.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Button
              variant="destructive"
              size="lg"
              className="text-base cursor-pointer"
            >
              Book Your First Service
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-base cursor-pointer"
            >
              Become a Professional
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
