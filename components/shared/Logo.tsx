import { Wrench } from "lucide-react";
import Link from "next/link";

interface LogoProps {
  onClick?: () => void;
}

export default function Logo({ onClick }: LogoProps) {
  return (
    <Link href="/" onClick={onClick} className="flex items-center space-x-2">
      <Wrench className="w-4 h-4" />
      <span className="font-bold">FastFix</span>
    </Link>
  );
}
