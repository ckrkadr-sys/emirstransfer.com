import type { Metadata } from "next";
import { RoutesPageContent } from "./RoutesPageContent";
import { getRouteById } from "../../lib/transferPricing";

export const metadata: Metadata = {
  title: "Dalaman Airport Transfer Routes & Prices",
  description:
    "Check fixed VIP transfer prices from Dalaman Airport to Calis, Fethiye, Oludeniz, Ovacik, Hisaronu, Faralya, Kabak, Gocek, Marmaris and Icmeler."
};

type RoutesPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function readParam(params: Record<string, string | string[] | undefined>, key: string) {
  const value = params[key];
  return Array.isArray(value) ? value[0] ?? "" : value ?? "";
}

export default async function RoutesPage({ searchParams }: RoutesPageProps) {
  const params = await searchParams;
  const requestedRoute = readParam(params, "route");
  const initialRouteId = getRouteById(requestedRoute)?.id ?? "oludeniz-hotels";

  return <RoutesPageContent initialRouteId={initialRouteId} />;
}
