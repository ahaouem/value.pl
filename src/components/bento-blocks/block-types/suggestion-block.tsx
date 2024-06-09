"use client";
import { useState, useEffect } from "react";
import sendSuggestionRequest from "@/lib/send-suggestion-request";

export default function SuggestionBlock() {
  const [suggestions, setSuggestions] = useState([]);
  const [currentSuggestionIndex, setCurrentSuggestionIndex] = useState(0);

  useEffect(() => {
    sendSuggestionRequest().then((data) => setSuggestions(data));

    const interval = setInterval(() => {
      setCurrentSuggestionIndex((prevIndex) =>
        suggestions.length > 0 ? (prevIndex + 1) % suggestions.length : 0,
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [suggestions.length]);

  const randomSuggestion =
    suggestions.length > 0 ? suggestions[currentSuggestionIndex] : "Loading...";

  return (
    <>
      <div className="relative">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 14 20"
          className="absolute -right-2 -top-2.5 size-12 fill-violet-950/25 dark:fill-violet-200/25 lg:-right-6 lg:-top-7 lg:size-24"
        >
          <path
            className="cls-2"
            d="M4.25,16.71c0-.42.34-.76.75-.76h4c.41,0,.75.34.75.76s-.34.76-.75.76h-4c-.41,0-.75-.34-.75-.76ZM4.92,19.24c0-.42.34-.76.75-.76h2.67c.41,0,.75.34.75.76s-.34.76-.75.76h-2.67c-.41,0-.75-.34-.75-.76Z"
          />
          <path
            className="cls-1"
            d="M2.41,11.83l1.1,1.05c.31.3.49.71.49,1.14,0,.65.52,1.17,1.16,1.17h3.69c.64,0,1.16-.52,1.16-1.17,0-.43.18-.84.49-1.14l1.1-1.05c1.54-1.48,2.4-3.42,2.41-5.45v-.08c0-3.45-3.13-6.3-7-6.3S0,2.84,0,6.3v.08c0,2.02.87,3.97,2.41,5.45Z"
          />
        </svg>
        <section>
          <h2 className="text-balance text-left text-base/6 tracking-[-0.015em] text-violet-900 dark:text-violet-200">
            Suggestion for you:
          </h2>
          <p className="mt-px text-left text-base font-semibold italic text-violet-950 dark:text-violet-50 md:text-xl lg:text-3xl">
            {randomSuggestion}
          </p>
        </section>
      </div>
    </>
  );
}
