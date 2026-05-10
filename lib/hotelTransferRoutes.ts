export type PriceTier = {
  pax: string;
  vehicle: string;
  gbp: number;
  eur: number;
  usd: number;
};

export type HotelTransferRoute = {
  id: string;
  slug: string;
  title: string;
  regionName: string;
  origin: string;
  destination: string;
  description: string;
  hotels: string[];
  prices: PriceTier[];
};

const fethiyeStandardPrices: PriceTier[] = [
  { pax: "1-5 pax", vehicle: "Mercedes Vito", gbp: 40, eur: 50, usd: 55 },
  { pax: "6-12 pax", vehicle: "Mercedes Sprinter", gbp: 80, eur: 100, usd: 110 },
  { pax: "12-16 pax", vehicle: "Mercedes Sprinter", gbp: 100, eur: 115, usd: 135 }
];

const fethiyeResortPrices: PriceTier[] = [
  { pax: "1-5 pax", vehicle: "Mercedes Vito", gbp: 45, eur: 55, usd: 60 },
  { pax: "6-12 pax", vehicle: "Mercedes Sprinter", gbp: 90, eur: 110, usd: 120 },
  { pax: "12-16 pax", vehicle: "Mercedes Sprinter", gbp: 100, eur: 115, usd: 135 }
];

export type HotelTransferRouteMatch = {
  hotelName?: string;
  route: HotelTransferRoute;
  matchType: "hotel" | "route";
};

export function normalizeHotelSearchValue(value: string) {
  return value
    .trim()
    .toLocaleLowerCase("tr")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\u0131/g, "i")
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

const hotelSearchStopWords = new Set(["hotel", "hotels", "otel", "oteli", "otelleri", "resort", "resorts"]);

function removeSearchStopWords(value: string) {
  const meaningfulTokens = value.split(" ").filter((token) => token && !hotelSearchStopWords.has(token));
  return meaningfulTokens.join(" ").trim();
}

function isNormalizedSearchMatch(query: string, target: string) {
  if (!query || !target) {
    return false;
  }

  const searchableQuery = removeSearchStopWords(query) || query;
  const searchableTarget = removeSearchStopWords(target) || target;

  if (searchableTarget.includes(searchableQuery)) {
    return true;
  }

  const queryTokens = searchableQuery.split(" ").filter(Boolean);
  return queryTokens.length > 0 && queryTokens.every((token) => searchableTarget.includes(token));
}

function normalizeHotelName(hotelName: string) {
  return normalizeHotelSearchValue(hotelName);
}

function getRouteSearchText(route: HotelTransferRoute) {
  return normalizeHotelSearchValue([route.title, route.regionName, route.origin, route.destination, route.slug].join(" "));
}

function uniqueHotels(hotels: string[]) {
  const seen = new Set<string>();

  return hotels.filter((hotel) => {
    const normalizedHotel = normalizeHotelName(hotel);

    if (seen.has(normalizedHotel)) {
      return false;
    }

    seen.add(normalizedHotel);
    return true;
  });
}

export const hotelTransferRoutes: HotelTransferRoute[] = [
  {
    id: "calis-hotels",
    slug: "dalaman-airport-to-calis-hotels",
    title: "Dalaman Airport to Çalış Hotels",
    regionName: "Çalış Bölgesi Otelleri",
    origin: "Dalaman Airport",
    destination: "Çalış Hotels",
    description:
      "Private fixed-price transfers from Dalaman Airport to Çalış hotels with Mercedes Vito and Mercedes Sprinter options.",
    hotels: [
      "Jiva Beach Resort",
      "Liberty Signa",
      "Liberty Fabay",
      "Sundia Exclusive by Liberty",
      "XO Cape Arnna",
      "Hotel Malhun",
      "S-Cape Hotel",
      "Tugay Hotel",
      "IDEE Suites",
      "Mia Casa Hotel",
      "Güneş Hotel",
      "Delta Hotel",
      "Dove Apart Hotel",
      "Kerim Hotel",
      "Area Hotel",
      "Ten Apart",
      "Nevada Hotel Spa",
      "Yasemin Hotel",
      "Rebin Beach Hotel",
      "Harman Hotel",
      "Mendos Garden Exclusive",
      "Ibrahim Bey Hotel",
      "Hotel Seril 1",
      "Hotel Seril 2"
    ],
    prices: fethiyeStandardPrices
  },
  {
    id: "fethiye-center-hotels",
    slug: "dalaman-airport-to-fethiye-center-hotels",
    title: "Dalaman Airport to Fethiye Center Hotels",
    regionName: "Fethiye Merkez Otelleri",
    origin: "Dalaman Airport",
    destination: "Fethiye Center Hotels",
    description:
      "Private fixed-price transfers from Dalaman Airport to Fethiye Center, Marina and Çarşı area hotels.",
    hotels: [
      "Yacht Classic Hotel",
      "Orka Boutique Hotel",
      "Yeniceri City Hotel",
      "Skykhan Hotel",
      "Nakas Hotel",
      "Cennet Life Hotel",
      "Midtown Fethiye Residences",
      "Renka Hotel & Spa",
      "Casa Margot Hotel",
      "Infinity City Hotel",
      "Alesta Yacht Hotel",
      "Alesta Midtown",
      "Ece Saray Marina Resort",
      "Status Pension",
      "El Camino Hostel",
      "Pinara Pension",
      "Dove Apart Downtown",
      "Kilim Apart Hotel",
      "Exelans Hotel",
      "Green Peace Hotel"
    ],
    prices: fethiyeStandardPrices
  },
  {
    id: "fethiye-peninsula-resorts",
    slug: "dalaman-airport-to-fethiye-peninsula-resorts",
    title: "Dalaman Airport to Fethiye Peninsula Resorts",
    regionName: "Merkez Yarımada Tatil Köyleri",
    origin: "Dalaman Airport",
    destination: "Fethiye Peninsula Resorts",
    description: "Private fixed-price transfers from Dalaman Airport to Fethiye Peninsula resort hotels.",
    hotels: ["Hillside Beach Club", "Club & Hotel Letoonia"],
    prices: fethiyeResortPrices
  },
  {
    id: "oludeniz-hotels",
    slug: "dalaman-airport-to-oludeniz-hotels",
    title: "Dalaman Airport to Ölüdeniz Hotels",
    regionName: "Ölüdeniz Otelleri",
    origin: "Dalaman Airport",
    destination: "Ölüdeniz Hotels",
    description:
      "Private fixed-price transfers from Dalaman Airport to Ölüdeniz hotels with Mercedes Vito and Sprinter options.",
    hotels: [
      "Liberty Lykia",
      "Liberty Lykia Adults Only",
      "Sundia by Liberty Ölüdeniz",
      "Belcekiz Beach Club",
      "Tonoz Beach Hotel",
      "Karbel Hotel",
      "Karbel Beach Hotel",
      "Blue Lagoon Hotel",
      "Montebello Deluxe Hotel",
      "Montebello Resort",
      "Flamingo Hotel",
      "Morina Deluxe Hotel",
      "Symbola Ölüdeniz",
      "Marcan Resort Hotel",
      "Oyster Residences",
      "Manaspark Deluxe Hotel",
      "Manaspark Hotel",
      "White Hotel",
      "Dream Of Ölüdeniz",
      "Garcia Resort & Spa",
      "Hotel Oludeniz",
      "Katre Hotel"
    ],
    prices: [
      { pax: "1-5 pax", vehicle: "Mercedes Vito", gbp: 50, eur: 60, usd: 65 },
      { pax: "6-12 pax", vehicle: "Mercedes Sprinter", gbp: 90, eur: 110, usd: 120 },
      { pax: "12-16 pax", vehicle: "Mercedes Sprinter", gbp: 100, eur: 115, usd: 135 }
    ]
  },
  {
    id: "ovacik-hisaronu-hotels",
    slug: "dalaman-airport-to-ovacik-hisaronu-hotels",
    title: "Dalaman Airport to Ovacık and Hisarönü Hotels",
    regionName: "Ovacık - Hisarönü Bölgesi Otelleri",
    origin: "Dalaman Airport",
    destination: "Ovacık and Hisarönü Hotels",
    description: "Private fixed-price transfers from Dalaman Airport to Ovacık and Hisarönü hotels.",
    hotels: uniqueHotels([
      "Orka Sunlife Resort",
      "Sahra Su Holiday Village",
      "Monta Verde Hotel",
      "Pinehill Hotel & Suites",
      "Tolay Hotel",
      "Green Forest Holiday Village",
      "Nicholas Park Hotel",
      "Telmessos Select Hotel",
      "Telmessos Neva Hotel",
      "Perdikia Hill Hotel",
      "Golden Life Resort",
      "Larimar Suite Hotel",
      "Alize Hotel Ovacık",
      "Yel Holiday Resort",
      "S3 Seahorse Hotel",
      "Sunshine Hotel",
      "AES Club Hotel",
      "Orka Village Hisarönü",
      "Residence 222",
      "Hisar Holiday Club",
      "Suzanne Hotel",
      "Han Deluxe Hotel",
      "Celay Hotel",
      "Gurol Aqua Resort Hotel",
      "Ocean Blue Hotel"
    ]),
    prices: [
      { pax: "1-5 pax", vehicle: "Mercedes Vito", gbp: 45, eur: 54, usd: 60 },
      { pax: "6-12 pax", vehicle: "Mercedes Sprinter", gbp: 90, eur: 110, usd: 120 },
      { pax: "12-16 pax", vehicle: "Mercedes Sprinter", gbp: 100, eur: 115, usd: 135 }
    ]
  },
  {
    id: "faralya-kabak-butterfly-valley",
    slug: "dalaman-airport-to-faralya-kabak-butterfly-valley",
    title: "Dalaman Airport to Faralya, Kabak and Butterfly Valley",
    regionName: "Faralya - Kabak - Kelebekler Vadisi Hattı",
    origin: "Dalaman Airport",
    destination: "Faralya, Kabak and Butterfly Valley",
    description:
      "Private fixed-price transfers from Dalaman Airport to Faralya, Kabak and Butterfly Valley area hotels and camps.",
    hotels: [
      "Lov Faralya",
      "Seaview Faralya Hotel",
      "Nautical Hotel",
      "Zakros Hotel",
      "Kabak Armes Hotel",
      "Tree Houses Kabak",
      "Full Moon Camp",
      "Sea Valley Lodge",
      "La Boheme Kabak",
      "Mandala Camping"
    ],
    prices: [
      { pax: "1-5 pax", vehicle: "Mercedes Vito", gbp: 80, eur: 90, usd: 110 },
      { pax: "6-12 pax", vehicle: "Mercedes Sprinter", gbp: 120, eur: 140, usd: 160 },
      { pax: "12-16 pax", vehicle: "Mercedes Sprinter", gbp: 150, eur: 170, usd: 200 }
    ]
  },
  {
    id: "gocek-hotels",
    slug: "dalaman-airport-to-gocek-hotels",
    title: "Dalaman Airport to Göcek Hotels",
    regionName: "Göcek Bölgesi",
    origin: "Dalaman Airport",
    destination: "Göcek Hotels",
    description: "Private fixed-price transfers from Dalaman Airport to Göcek hotels and resorts.",
    hotels: [
      "Rixos Premium Göcek",
      "Club Privé by Rixos",
      "D-Resort Göcek",
      "Göcek Lykia Resort",
      "Yonca Lodge",
      "A&B Home Hotel",
      "Dalya Life Hotel",
      "Göcek Arion Hotel",
      "Renka Göcek",
      "Hotel Forest Gate"
    ],
    prices: [
      { pax: "1-5 pax", vehicle: "Mercedes Vito", gbp: 35, eur: 45, usd: 50 },
      { pax: "6-12 pax", vehicle: "Mercedes Sprinter", gbp: 60, eur: 70, usd: 80 },
      { pax: "12-16 pax", vehicle: "Mercedes Sprinter", gbp: 80, eur: 90, usd: 100 }
    ]
  },
  {
    id: "yaniklar-katranci-gunluklu-hotels",
    slug: "dalaman-airport-to-yaniklar-katranci-gunluklu-hotels",
    title: "Dalaman Airport to Yanıklar, Katrancı and Günlüklü Hotels",
    regionName: "Yanıklar - Katrancı - Günlüklü Hattı",
    origin: "Dalaman Airport",
    destination: "Yanıklar, Katrancı and Günlüklü Hotels",
    description:
      "Private fixed-price transfers from Dalaman Airport to Yanıklar, Katrancı and Günlüklü area hotels and beach resorts.",
    hotels: [
      "Katrancı Park Hotel",
      "Club Tuana Fethiye",
      "Yonca Lodge",
      "Katrancı Park Boutique",
      "Günlüklü Beach Tesisleri"
    ],
    prices: [
      { pax: "1-5 pax", vehicle: "Mercedes Vito", gbp: 40, eur: 50, usd: 55 },
      { pax: "6-12 pax", vehicle: "Mercedes Sprinter", gbp: 65, eur: 75, usd: 85 },
      { pax: "12-16 pax", vehicle: "Mercedes Sprinter", gbp: 85, eur: 95, usd: 110 }
    ]
  },
  {
    id: "marmaris-icmeler-hotels",
    slug: "dalaman-airport-to-marmaris-icmeler-hotels",
    title: "Dalaman Airport to Marmaris and İçmeler Hotels",
    regionName: "Marmaris - İçmeler Otelleri",
    origin: "Dalaman Airport",
    destination: "Marmaris and İçmeler Hotels",
    description: "Private fixed-price transfers from Dalaman Airport to Marmaris and İçmeler hotels.",
    hotels: [],
    prices: [
      { pax: "1-5 pax", vehicle: "Mercedes Vito", gbp: 45, eur: 55, usd: 60 },
      { pax: "6-12 pax", vehicle: "Mercedes Sprinter", gbp: 90, eur: 110, usd: 120 },
      { pax: "12-16 pax", vehicle: "Mercedes Sprinter", gbp: 100, eur: 115, usd: 135 }
    ]
  }
];

export function getHotelTransferRouteBySlug(slug: string) {
  return hotelTransferRoutes.find((route) => route.slug === slug);
}

export function getAllHotelTransferRouteSlugs() {
  return hotelTransferRoutes.map((route) => route.slug);
}

export function findHotelTransferRouteByHotelName(hotelName: string) {
  return findHotelTransferRouteMatchByHotelName(hotelName)?.route;
}

export function findHotelTransferRouteMatchByHotelName(hotelName: string): HotelTransferRouteMatch | undefined {
  const normalizedHotelName = normalizeHotelSearchValue(hotelName);

  if (!normalizedHotelName) {
    return undefined;
  }

  for (const route of hotelTransferRoutes) {
    const hotel = route.hotels.find((hotelNameOption) =>
      isNormalizedSearchMatch(normalizedHotelName, normalizeHotelName(hotelNameOption))
    );

    if (hotel) {
      return {
        hotelName: hotel,
        route,
        matchType: "hotel"
      };
    }
  }

  return undefined;
}

export function findHotelTransferRouteMatch(searchValue: string): HotelTransferRouteMatch | undefined {
  return searchHotelTransferRoutes(searchValue, 1)[0];
}

export function searchHotelTransferRoutes(searchValue: string, limit = 6): HotelTransferRouteMatch[] {
  const normalizedSearchValue = normalizeHotelSearchValue(searchValue);

  if (!normalizedSearchValue) {
    return [];
  }

  const matches: HotelTransferRouteMatch[] = [];

  for (const route of hotelTransferRoutes) {
    for (const hotelName of route.hotels) {
      if (isNormalizedSearchMatch(normalizedSearchValue, normalizeHotelName(hotelName))) {
        matches.push({
          hotelName,
          route,
          matchType: "hotel"
        });

        if (matches.length >= limit) {
          return matches;
        }
      }
    }
  }

  for (const route of hotelTransferRoutes) {
    if (matches.some((match) => match.route.id === route.id)) {
      continue;
    }

    if (isNormalizedSearchMatch(normalizedSearchValue, getRouteSearchText(route))) {
      matches.push({
        route,
        matchType: "route"
      });

      if (matches.length >= limit) {
        return matches;
      }
    }
  }

  return matches;
}
