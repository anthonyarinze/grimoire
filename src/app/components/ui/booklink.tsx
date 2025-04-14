import Link from "next/link";

interface BookLinkProps {
  bookId: string;
  children: React.ReactNode;
  onClick?: () => void;
}

function BookLink({ bookId, children, onClick }: BookLinkProps) {
  return (
    <Link
      href={`/book/${bookId}`}
      className="block hover:opacity-80 transition duration-200 ease-in-out"
      onClick={onClick}
    >
      {children}
    </Link>
  );
}

export default BookLink;
