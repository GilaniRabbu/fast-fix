"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import ContainerWrapper from "../common/ContainerWrapper";

const testimonials = [
  {
    name: "Sarah Khan",
    title: "Freelance Designer",
    quote:
      "The platform helped me find a reliable handyman within minutes. Excellent user experience and trustworthy service providers!",
  },
  {
    name: "Ahmed Hossain",
    title: "Interior Designer",
    quote:
      "Booking a plumber was easier than ever. Transparent reviews and instant communication made the process hassle-free.",
  },
  {
    name: "Tania Rahman",
    title: "Architectural Designer",
    quote:
      "FastFix saved me time and stress. I hired a cleaning team quickly and easily. Highly recommend it!",
  },
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);

  const next = () => setIndex((prev) => (prev + 1) % testimonials.length);
  const prev = () =>
    setIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : (prev - 1) % testimonials.length
    );

  const current = testimonials[index];

  return (
    <section className="py-16">
      <ContainerWrapper>
        <h2 className="text-3xl font-bold text-center mb-12">
          What Our Users Say
        </h2>
        <div className="relative max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="p-8 text-center rounded-2xl relative border italic bg-background"
            >
              <Quote className="absolute top-4 left-4 text-blue-500/60 w-8 h-8 rotate-180" />
              <Quote className="absolute bottom-4 right-4 text-blue-500/60 w-8 h-8" />
              <p className="mb-4 max-w-xl mx-auto">{`"${current.quote}"`}</p>
              <h4 className="text-lg font-semibold">{current.name}</h4>
              <span className="font-medium text-gray-500">{current.title}</span>
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="flex justify-center items-center gap-4 mt-10">
          <Button
            variant="outline"
            size="icon"
            className="cursor-pointer"
            onClick={prev}
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="cursor-pointer"
            onClick={next}
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>
      </ContainerWrapper>
    </section>
  );
}
