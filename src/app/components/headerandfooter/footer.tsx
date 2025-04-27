import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import { CgWebsite } from "react-icons/cg";

export default function Footer() {
  return (
    <footer className="bg-white border-t text-sm text-gray-600 mt-8">
      <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Left side */}
        <div className="flex flex-col items-center md:items-start">
          <h1 className="text-lg font-bold text-black">Grimoire</h1>
          <p className="text-gray-500">Discover your next favorite book.</p>
          <p className="mt-2">&copy; 2025 Grimoire. All rights reserved.</p>
        </div>

        {/* Center links */}
        <div className="flex space-x-6">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <Link href="/library" className="hover:underline">
            Library
          </Link>
          <Link href="/account" className="hover:underline">
            Account
          </Link>
        </div>

        {/* Right side social */}
        <div className="flex space-x-4">
          <a
            href="https://github.com/anthonyarinze"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub size={20} />
          </a>
          <a
            href="https://saintanthony.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <CgWebsite size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
}
