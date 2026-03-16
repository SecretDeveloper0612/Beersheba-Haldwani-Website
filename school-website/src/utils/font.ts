import { Poppins, Lato } from "next/font/google";

export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const latto = Lato({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
});
