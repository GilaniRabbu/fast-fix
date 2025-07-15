import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import ReduxProvider from "@/redux/ReduxProvider";
import { ThemeProvider } from "@/components/shared/ThemeProvider";
import Header from "@/components/shared/Header";
import "./globals.css";

const inter = Inter({
  weight: ["500"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Fast Fix",
  description:
    "Fast Fix helps you quickly find trusted service providers for any household task — from plumbing and cleaning to electrical repairs and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <ReduxProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Header />
            {children}
            <Toaster />
          </ThemeProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
