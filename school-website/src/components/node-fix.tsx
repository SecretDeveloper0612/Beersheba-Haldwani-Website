"use client";

import { useEffect } from "react";

export default function NodeFix() {
  useEffect(() => {
    // Client-side fix is handled by node-polyfill which is imported in layout
  }, []);

  return null;
}
