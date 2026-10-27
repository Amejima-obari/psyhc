"use client";

import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "wishlist";

export function useWishlist() {
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [loaded, setLoaded] = useState(false);

  // read from localStorage after mount (avoids Next.js hydration mismatch)
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setWishlist(JSON.parse(saved));
    } catch {
      // ignore bad data
    }
    setLoaded(true);
  }, []);

  // save only after the first load, so we don't overwrite with []
  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(wishlist));
    } catch {
      // storage full or blocked
    }
  }, [wishlist, loaded]);

  const toggleWishlist = useCallback((id: number) => {

    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  }, []);

  return { wishlist, toggleWishlist };
}