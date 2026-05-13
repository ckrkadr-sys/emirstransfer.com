import {
  findHotelTransferRouteMatchByHotelName,
  listHotelTransferRoutes
} from "./routes/static-route.repository";

export type { PriceTier } from "./pricing/pricing.types";
export type { TransferRoute as HotelTransferRoute, TransferRouteMatch as HotelTransferRouteMatch } from "./routes/route.types";

export {
  findHotelTransferRouteMatch,
  findHotelTransferRouteMatchByHotelName,
  getAllHotelTransferRouteSlugs,
  getHotelTransferRouteBySlug,
  normalizeRouteSearchValue as normalizeHotelSearchValue,
  searchHotelTransferRoutes
} from "./routes/static-route.repository";

export const hotelTransferRoutes = listHotelTransferRoutes();

export function findHotelTransferRouteByHotelName(hotelName: string) {
  return findHotelTransferRouteMatchByHotelName(hotelName)?.route;
}
