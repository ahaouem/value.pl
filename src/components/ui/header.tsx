"use client";
import { motion } from "framer-motion";

import { UserButton, useUser } from "@clerk/nextjs";
import { HeroHighlight } from "./hero-highlight";

export default function HelloHeader() {
  const { user } = useUser();

  if (!user) return null;

  return (
    <div className="flex h-[4.125rem] items-center justify-between">
      <HeroHighlight>
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
          className="mx-auto max-w-4xl text-center text-2xl font-bold leading-relaxed text-zinc-900 dark:text-white md:text-4xl lg:text-5xl lg:leading-snug"
        >
          Hello, {user.firstName}
        </motion.h1>
      </HeroHighlight>
      <UserButton />
    </div>
  );
}
