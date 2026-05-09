import { popularRouteIds, overviewRouteIds, transferRoutes, type TransferRoute } from "../../lib/transferRoutes";

export const homePopularRoutes = popularRouteIds
  .map((id) => transferRoutes.find((route) => route.id === id))
  .filter((route): route is TransferRoute => Boolean(route));

export const homeOverviewRoutes = overviewRouteIds
  .map((id) => transferRoutes.find((route) => route.id === id))
  .filter((route): route is TransferRoute => Boolean(route));

export const homeRouteIcons: Record<string, string> = {
  "calis-hotels": "/images/home/route-calis.svg",
  "fethiye-center-marina": "/images/home/route-fethiye.svg",
  "oludeniz-hotels": "/images/home/route-oludeniz.svg",
  "ovacik-hisaronu": "/images/home/route-ovacik.svg",
  "faralya-kabak": "/images/home/route-faralya.svg",
  "gocek-hotels": "/images/home/route-gocek.svg",
  "marmaris-icmeler": "/images/home/route-marmaris.svg"
};

export function getHomeRouteName(routeNames: Record<string, string>, route: TransferRoute) {
  return routeNames[route.id] ?? route.name;
}
