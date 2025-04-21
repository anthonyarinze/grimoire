import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="text-center py-16 px-4 bg-gradient-to-b text-black from-white to-gray-100">
      <h1 className="text-4xl font-bold mb-4">Welcome to Grimoire 📚</h1>
      <p className="text-lg text-gray-700 mb-6">
        Discover, track, and manage your reading journey.
      </p>
      <Link
        href="/"
        className="inline-block px-6 py-3 bg-ceruleanBlue text-white font-semibold rounded hover:bg-blue-700 transition"
      >
        Explore Books
      </Link>
    </section>
  );
}
