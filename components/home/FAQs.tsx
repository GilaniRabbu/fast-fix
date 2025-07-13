"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "What areas do you serve?",
    answer: "We provide services across all major areas in Dhaka city.",
  },
  {
    question: "Do you offer emergency repairs?",
    answer:
      "Yes, we’re available 24/7 for emergency plumbing and electrical issues.",
  },
  {
    question: "How can I book an appointment?",
    answer: "You can call us directly or use our online booking form below.",
  },
];

export default function FAQs() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-16">
      <h2 className="text-3xl font-bold text-center mb-8">
        Frequently Asked Questions
      </h2>
      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((faq, i) => (
          <div key={i} className="border rounded-2xl overflow-hidden">
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="flex justify-between items-center w-full px-6 py-4 text-left"
            >
              <span className="font-medium">{faq.question}</span>
              <ChevronDown
                className={`transform transition-transform ${
                  openIndex === i ? "rotate-180" : ""
                }`}
              />
            </button>
            {openIndex === i && (
              <div className="px-6 py-4 border-t">{faq.answer}</div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
