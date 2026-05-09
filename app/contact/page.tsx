import type { Metadata } from "next";
import { ContactPageContent } from "./ContactPageContent";

export const metadata: Metadata = {
  title: "Contact Emirs Transfer",
  description:
    "Contact Emirs Transfer by WhatsApp to confirm your private Dalaman Airport VIP transfer with hotel name, flight number and passenger count."
};

export default function ContactPage() {
  return <ContactPageContent />;
}
