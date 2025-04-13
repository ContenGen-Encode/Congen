import {
  SignedOut,
  SignInButton,
  SignUpButton,
} from "@clerk/nextjs";

export default function Navbar() {
  return (
    <header className="flex justify-between items-center p-4 gap-4 h-16">
      <div className="">
        <h1 className="text-2xl font-bold">ContentGen</h1>
      </div>
      <div className="flex gap-4">
        <SignedOut>
          <SignInButton />
          <SignUpButton />
        </SignedOut>
      </div>
    </header>
  );
}
