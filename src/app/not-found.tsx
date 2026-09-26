import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-32 text-center flex flex-col items-center">
      <h1 className="font-oswald text-9xl font-bold uppercase text-[#ccff00] mb-6">404</h1>
      <h2 className="text-3xl font-bold mb-4">PAGE NOT FOUND</h2>
      <p className="text-zinc-400 mb-8 max-w-md">
        The workout you're looking for doesn't exist or has been moved to a different routine.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 bg-[#ccff00] hover:bg-[#b3e600] text-black px-6 py-4 rounded-lg font-bold transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        BACK TO LIBRARY
      </Link>
    </div>
  );
}
