import type { Metadata } from "next";
import { FleetPageContent } from "./FleetPageContent";

export const metadata: Metadata = {
  title: "Mercedes VIP Transfer Fleet",
  description:
    "Mercedes Vito and Mercedes Sprinter VIP airport transfer vehicles for couples, families and groups travelling from Dalaman Airport."
};

export default function FleetPage() {
  return <FleetPageContent />;
}
