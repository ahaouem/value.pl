"use client";
import { motion } from "framer-motion";

import { HeroHighlight, Highlight } from "./hero-highlight";
import { useSession, useUser, UserButton, SignInButton } from "@clerk/nextjs";

export default function HelloHeader() {
  const { user } = useUser();
  const { session } = useSession();

  if (!user || !session) return null;

  return (
    <main className="px flex items-center justify-between ">
      <HeroHighlight className="pt-5">
        <motion.h1
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: [20, -5, 0],
          }}
          transition={{
            duration: 0.5,
            ease: [0.4, 0.0, 0.2, 1],
          }}
          className="mx-auto max-w-4xl px-10 text-center text-2xl font-bold leading-relaxed text-neutral-700 dark:text-white md:text-4xl lg:text-5xl lg:leading-snug "
        >
          Hello, {user.firstName}
        </motion.h1>
      </HeroHighlight>
      {user ? <UserButton /> : <SignInButton />}
    </main>
  );
}
