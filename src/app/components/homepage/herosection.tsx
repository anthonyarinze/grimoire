import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="text-center py-16 px-4 dark:text-gray-300 dark:bg-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-4">Welcome to Grimoire 📚</h1>
      <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
        Discover, track, and manage your reading journey.
      </p>
      <Link
        href="/explore"
        className="inline-block px-6 py-3 bg-ceruleanBlue dark:text-gray-300 font-semibold rounded hover:bg-blue-700 transition brightness-95"
      >
        Explore Books
      </Link>
    </section>
  );
}
