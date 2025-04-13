import {  SignedOut, SignInButton, SignUpButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div className="">
      <SignedOut>
        <SignInButton />
        <SignUpButton />
      </SignedOut>
      <h1 className="text-3xl font-bold underline">
        Hello world!
      </h1>
    </div>
  );
}
