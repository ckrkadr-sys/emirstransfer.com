import type { Metadata } from "next";
import { AboutPageContent } from "./AboutPageContent";

export const metadata: Metadata = {
  title: "About Emirs Transfer",
  description:
    "Emirs Transfer provides private VIP airport transfers from Dalaman Airport to Fethiye, Oludeniz, Gocek, Marmaris and surrounding hotel regions."
};

export default function AboutPage() {
  return <AboutPageContent />;
}
