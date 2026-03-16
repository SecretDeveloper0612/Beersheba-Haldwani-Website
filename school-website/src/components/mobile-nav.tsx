import React from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";
import Link from "next/link";

const MobileNav = () => {
  return (
    <div className="lg:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button size={"icon"}>
            <Menu size={24} />
          </Button>
        </SheetTrigger>
        <SheetContent>
          <nav>
            <ul className="pt-10">
              <SheetClose asChild>
                <Link href={"/"}>
                  <li className="hover:text-[] py-2 text-base font-medium">
                    Home
                  </li>
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link href={"/about"}>
                  <li className="hover:text-[] py-2 text-base font-medium">
                    About
                  </li>
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link href={"/message"}>
                  <li className="hover:text-[#3B2565] py-2 text-base font-medium">
                    Message
                  </li>
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link href={"/academics"}>
                  <li className="hover:text-[#3B2565] py-2 text-base font-medium">
                    Academics
                  </li>
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link href={"/facility"}>
                  <li className="hover:text-[#3B2565] py-2 text-base font-medium">
                    Facility
                  </li>
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link href={"/image-gallery"}>
                  <li className="hover:text-[#3B2565] py-2 text-base font-medium">
                    Image Gallery
                  </li>
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link href={"/video-gallery"}>
                  <li className="hover:text-[#3B2565] py-2 text-base font-medium">
                    Video Gallery
                  </li>
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link href={"/contact-us"}>
                  <li className="hover:text-[#3B2565] py-2 text-base font-medium">
                    Conatct us
                  </li>
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link href={"/disclosure"}>
                  <li className="hover:text-[#3B2565] py-2 text-base font-medium">
                    Disclosure
                  </li>
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link href={"/transfer-certificate"}>
                  <li className="hover:text-[#3B2565] py-2 text-base font-medium text-[#DB2F2F]">
                    TC Verify
                  </li>
                </Link>
              </SheetClose>
            </ul>
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNav;
