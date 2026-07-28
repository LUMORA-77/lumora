"use client";

import { SignInButton, UserButton as ClerkUserButton, useUser } from "@clerk/nextjs";

export default function UserButton() {
  const { isSignedIn, isLoaded } = useUser();

  if (!isLoaded) {
    return null;
  }

  return isSignedIn ? (
    <ClerkUserButton />
  ) : (
    <SignInButton mode="modal">
      <button className="rounded-full border border-white/10 px-6 py-3 font-bold hover:bg-white hover:text-black transition">
        Connexion
      </button>
    </SignInButton>
  );
}
