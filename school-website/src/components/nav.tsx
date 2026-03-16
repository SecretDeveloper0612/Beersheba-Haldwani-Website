"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Nav = () => {
  const path = usePathname();

  return (
    <ul className=" hidden lg:flex justify-between items-center gap-5 text-primary ">
      <Link href={"/"}>
        <li
          className={cn(
            "hover:text-[#DB2F2F] text-[#3B2565]",
            path === "/"
              ? "underline text-[#DB2F2F] underline-offset-8 decoration-2 decoration-[#DB2F2F]"
              : ""
          )}
        >
          Home
        </li>
      </Link>
      <Link href={"/about"}>
        <li
          className={cn(
            "hover:text-[#DB2F2F] text-[#3B2565]",
            path === "/about"
              ? "underline text-[#DB2F2F] underline-offset-8 decoration-2 decoration-[#DB2F2F]"
              : ""
          )}
        >
          About
        </li>
      </Link>
      <Link href={"/message"}>
        <li
          className={cn(
            "hover:text-[#DB2F2F] text-[#3B2565]",
            path === "/message"
              ? "underline text-[#DB2F2F] underline-offset-8 decoration-2 decoration-[#DB2F2F]"
              : ""
          )}
        >
          Message
        </li>
      </Link>
      <Link href={"/academics"}>
        <li
          className={cn(
            "hover:text-[#DB2F2F] text-[#3B2565]",
            path === "/academics"
              ? "underline text-[#DB2F2F] underline-offset-8 decoration-2 decoration-[#DB2F2F]"
              : ""
          )}
        >
          Academic
        </li>
      </Link>
      <Link href={"/facility"}>
        <li
          className={cn(
            "hover:text-[#DB2F2F] text-[#3B2565]",
            path === "/facility"
              ? "underline text-[#DB2F2F] underline-offset-8 decoration-2 decoration-[#DB2F2F]"
              : ""
          )}
        >
          Facility
        </li>
      </Link>
      <Link href={"/image-gallery"}>
        <li
          className={cn(
            "hover:text-[#DB2F2F] text-[#3B2565]",
            path === "/image-gallery"
              ? "underline text-[#DB2F2F] underline-offset-8 decoration-2 decoration-[#DB2F2F]"
              : ""
          )}
        >
          Photo Gallery
        </li>
      </Link>
      <Link href={"/video-gallery"}>
        <li
          className={cn(
            "hover:text-[#DB2F2F] text-[#3B2565]",
            path === "/video-gallery"
              ? "underline text-[#DB2F2F] underline-offset-8 decoration-2 decoration-[#DB2F2F]"
              : ""
          )}
        >
          Video Gallery
        </li>
      </Link>

      <Link href={"/registeration"}>
        <li
          className={cn(
            "hover:text-[#DB2F2F] text-[#3B2565]",
            path === "/registeration"
              ? "underline text-[#DB2F2F] underline-offset-8 decoration-2 decoration-[#DB2F2F]"
              : ""
          )}
        >
          Register
        </li>
      </Link>
      <Link href={"/transfer-certificate"}>
        <li
          className={cn(
            "hover:text-[#DB2F2F] text-[#3B2565]",
            path === "/transfer-certificate"
              ? "underline text-[#DB2F2F] underline-offset-8 decoration-2 decoration-[#DB2F2F]"
              : ""
          )}
        >
          TC Verify
        </li>
      </Link>
    </ul>
  );
};

export default Nav;
