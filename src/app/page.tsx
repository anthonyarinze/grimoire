import HomePage from "@/app/home/page";
import Header from "@/app/components/headerandfooter/header";
import SignIn from "./auth/signin/page";

export default function Home() {
  return (
    <main>
      <SignIn />
    </main>
  );
}
