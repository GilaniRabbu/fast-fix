import { Wrench } from "lucide-react";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center space-x-2">
      <Wrench className="w-4 h-4" />
      <span className="font-bold">FastFix</span>
    </Link>
  );
}
