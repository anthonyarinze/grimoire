import Link from "next/link";

interface BookLinkProps {
  bookId: string;
  chilren: React.ReactNode;
}

function BookLink({ bookId, children }: BookLinkProps) {
  return (
    <Link
      href={`/book/${bookId}`}
      className="block hover:opacity-80 transition"
    >
      {children}
    </Link>
  );
}

export default BookLink;
