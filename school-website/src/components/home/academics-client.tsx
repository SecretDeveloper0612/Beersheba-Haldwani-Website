"use client";

import dynamic from "next/dynamic";

// Radix UI Tabs generates random IDs on each render.
// ssr: false prevents SSR so server & client IDs always match.
const Academics = dynamic(() => import("./academics"), { ssr: false });

export default Academics;
