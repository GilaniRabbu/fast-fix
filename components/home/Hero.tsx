import Link from "next/link";
import Image from "next/image";
import { Star, Users } from "lucide-react";

export default function Hero() {
  return (
    <>
      <section className="relative py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="animate-fade-in space-y-8">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl text-primary font-bold leading-tight">
                Find Trusted Local Service Providers Near You
              </h1>
              <p className="text-lg max-w-xl">
                Connect with verified electricians, plumbers, cleaners, and
                other skilled professionals for any job — quickly and reliably.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 text-center">
              <Link
                href="/service-providers"
                className="cursor-pointer px-4 py-2 bg-lime text-lime-foreground rounded"
              >
                Book a Service Now
              </Link>
              <Link
                href="/signup"
                className="cursor-pointer px-4 py-2 border rounded"
              >
                Register Yourself
              </Link>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-12 pt-8 border-t">
              <div className="flex items-center gap-4">
                <Users className="h-8 w-8 text-primary" />
                <div>
                  <p className="text-2xl font-bold text-foreground">10k+</p>
                  <p className="text-sm text-muted-foreground">
                    Customers Globally*
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Star className="h-8 w-8 text-primary" />
                <div>
                  <p className="text-2xl font-bold text-foreground">4.8</p>
                  <p className="text-sm text-muted-foreground">
                    Service Rating*
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative animate-slide-up">
            <div className="relative">
              <Image
                src="/hero-img.jpg"
                alt="Professional service workers"
                width={512}
                height={360}
                className="w-full h-auto object-cover rounded-2xl shadow-elegant"
              />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-primary/15 to-transparent" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
