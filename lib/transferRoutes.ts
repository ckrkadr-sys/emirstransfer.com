export type Currency = "gbp" | "eur" | "usd";
export type PassengerTier = "pax_1_5" | "pax_6_12" | "pax_12_16";

export type TransferPrice = {
  gbp: number;
  eur: number;
  usd: number;
};

export type TransferRoute = {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  origin: string;
  destinations: string[];
  hotels: string[];
  prices: Record<PassengerTier, TransferPrice>;
  seoTitle: string;
  seoDescription: string;
};

export const currencies: Currency[] = ["gbp", "eur", "usd"];

export const passengerTiers: PassengerTier[] = ["pax_1_5", "pax_6_12", "pax_12_16"];

export const serviceAreas = [
  "Dalaman Airport",
  "Fethiye",
  "Çalış",
  "Ölüdeniz",
  "Ovacık",
  "Hisarönü",
  "Faralya",
  "Kabak",
  "Göcek",
  "Marmaris",
  "İçmeler"
];

export const transferRoutes: TransferRoute[] = [
  {
    id: "calis-hotels",
    slug: "dalaman-airport-to-calis-hotels",
    name: "Çalış Hotels",
    shortName: "Çalış",
    origin: "Dalaman Airport",
    destinations: ["Çalış", "Fethiye Çalış"],
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
    prices: {
      pax_1_5: { gbp: 40, eur: 50, usd: 55 },
      pax_6_12: { gbp: 80, eur: 100, usd: 110 },
      pax_12_16: { gbp: 100, eur: 115, usd: 135 }
    },
    seoTitle: "Dalaman Airport to Çalış Hotels VIP Transfer",
    seoDescription:
      "Fixed private transfer prices from Dalaman Airport to Çalış hotels including Jiva Beach Resort, Liberty Signa, Liberty Fabay and nearby hotels."
  },
  {
    id: "fethiye-center-marina",
    slug: "dalaman-airport-to-fethiye-center-marina",
    name: "Fethiye Center / Marina Hotels",
    shortName: "Fethiye Center",
    origin: "Dalaman Airport",
    destinations: ["Fethiye Center", "Fethiye Marina", "Fethiye Çarşı"],
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
    prices: {
      pax_1_5: { gbp: 40, eur: 50, usd: 55 },
      pax_6_12: { gbp: 80, eur: 100, usd: 110 },
      pax_12_16: { gbp: 100, eur: 115, usd: 135 }
    },
    seoTitle: "Dalaman Airport to Fethiye Center and Marina Transfer",
    seoDescription:
      "Private VIP transfer prices from Dalaman Airport to Fethiye Center, Fethiye Marina and central hotels with fixed Mercedes vehicle rates."
  },
  {
    id: "fethiye-peninsula",
    slug: "dalaman-airport-to-fethiye-peninsula",
    name: "Fethiye Peninsula Holiday Villages",
    shortName: "Fethiye Peninsula",
    origin: "Dalaman Airport",
    destinations: ["Fethiye Peninsula", "Merkez Yarımada"],
    hotels: ["Hillside Beach Club", "Club & Hotel Letoonia"],
    prices: {
      pax_1_5: { gbp: 45, eur: 55, usd: 60 },
      pax_6_12: { gbp: 90, eur: 110, usd: 120 },
      pax_12_16: { gbp: 100, eur: 115, usd: 135 }
    },
    seoTitle: "Dalaman Airport to Fethiye Peninsula Transfer",
    seoDescription:
      "Book fixed-price VIP transfers from Dalaman Airport to Fethiye Peninsula holiday villages including Hillside Beach Club and Club & Hotel Letoonia."
  },
  {
    id: "oludeniz-hotels",
    slug: "dalaman-airport-to-oludeniz-hotels",
    name: "Ölüdeniz Hotels",
    shortName: "Ölüdeniz",
    origin: "Dalaman Airport",
    destinations: ["Ölüdeniz", "Oludeniz"],
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
      "Hotel Ölüdeniz",
      "Katre Hotel"
    ],
    prices: {
      pax_1_5: { gbp: 50, eur: 60, usd: 65 },
      pax_6_12: { gbp: 90, eur: 110, usd: 120 },
      pax_12_16: { gbp: 100, eur: 115, usd: 135 }
    },
    seoTitle: "Dalaman Airport to Ölüdeniz Hotels VIP Transfer",
    seoDescription:
      "Check fixed VIP transfer prices from Dalaman Airport to Ölüdeniz hotels including Liberty Lykia, Sundia by Liberty and Belcekiz Beach Club."
  },
  {
    id: "ovacik-hisaronu",
    slug: "dalaman-airport-to-ovacik-hisaronu",
    name: "Ovacık & Hisarönü Hotels",
    shortName: "Ovacık & Hisarönü",
    origin: "Dalaman Airport",
    destinations: ["Ovacık", "Hisarönü", "Hisaronu"],
    hotels: [
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
    ],
    prices: {
      pax_1_5: { gbp: 45, eur: 54, usd: 60 },
      pax_6_12: { gbp: 90, eur: 110, usd: 120 },
      pax_12_16: { gbp: 100, eur: 115, usd: 135 }
    },
    seoTitle: "Dalaman Airport to Ovacık and Hisarönü Transfer",
    seoDescription:
      "Fixed private VIP transfer prices from Dalaman Airport to Ovacık and Hisarönü hotels with Mercedes Vito and Sprinter options."
  },
  {
    id: "faralya-kabak",
    slug: "dalaman-airport-to-faralya-kabak",
    name: "Faralya, Kabak & Butterfly Valley",
    shortName: "Faralya / Kabak",
    origin: "Dalaman Airport",
    destinations: ["Faralya", "Kabak", "Butterfly Valley", "Kelebekler Vadisi"],
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
    prices: {
      pax_1_5: { gbp: 80, eur: 90, usd: 110 },
      pax_6_12: { gbp: 120, eur: 140, usd: 160 },
      pax_12_16: { gbp: 150, eur: 170, usd: 200 }
    },
    seoTitle: "Dalaman Airport to Faralya and Kabak Transfer",
    seoDescription:
      "Check fixed Dalaman Airport VIP transfer prices to Faralya, Kabak and Butterfly Valley hotels with private Mercedes vehicles."
  },
  {
    id: "gocek-hotels",
    slug: "dalaman-airport-to-gocek-hotels",
    name: "Göcek Hotels",
    shortName: "Göcek",
    origin: "Dalaman Airport",
    destinations: ["Göcek", "Gocek"],
    hotels: [
      "Rixos Premium Göcek",
      "Club Prive by Rixos",
      "D-Resort Göcek",
      "Göcek Lykia Resort",
      "Yonca Lodge",
      "A&B Home Hotel",
      "Dalya Life Hotel",
      "Göcek Arion Hotel",
      "Renka Göcek",
      "Hotel Forest Gate"
    ],
    prices: {
      pax_1_5: { gbp: 35, eur: 45, usd: 50 },
      pax_6_12: { gbp: 60, eur: 70, usd: 80 },
      pax_12_16: { gbp: 80, eur: 90, usd: 100 }
    },
    seoTitle: "Dalaman Airport to Göcek Hotels Transfer",
    seoDescription:
      "Private VIP transfers from Dalaman Airport to Göcek hotels including Rixos Premium Göcek, D-Resort Göcek and marina area hotels."
  },
  {
    id: "yaniklar-katranci-gunluklu",
    slug: "dalaman-airport-to-yaniklar-katranci-gunluklu",
    name: "Yanıklar, Katrancı & Günlüklü",
    shortName: "Yanıklar / Katrancı",
    origin: "Dalaman Airport",
    destinations: ["Yanıklar", "Katrancı", "Günlüklü", "Gunluklu"],
    hotels: [
      "Katrancı Park Hotel",
      "Club Tuana Fethiye",
      "Yonca Lodge",
      "Katrancı Park Boutique",
      "Günlüklü Beach Properties"
    ],
    prices: {
      pax_1_5: { gbp: 40, eur: 50, usd: 55 },
      pax_6_12: { gbp: 65, eur: 75, usd: 85 },
      pax_12_16: { gbp: 85, eur: 95, usd: 110 }
    },
    seoTitle: "Dalaman Airport to Yanıklar Katrancı Günlüklü Transfer",
    seoDescription:
      "Fixed private transfer prices from Dalaman Airport to Yanıklar, Katrancı and Günlüklü hotels including Club Tuana Fethiye."
  },
  {
    id: "marmaris-icmeler",
    slug: "dalaman-airport-to-marmaris-icmeler",
    name: "Marmaris & İçmeler Hotels",
    shortName: "Marmaris / İçmeler",
    origin: "Dalaman Airport",
    destinations: ["Marmaris", "İçmeler", "Icmeler"],
    hotels: [],
    prices: {
      pax_1_5: { gbp: 45, eur: 55, usd: 60 },
      pax_6_12: { gbp: 90, eur: 110, usd: 120 },
      pax_12_16: { gbp: 100, eur: 115, usd: 135 }
    },
    seoTitle: "Dalaman Airport to Marmaris and İçmeler Transfer",
    seoDescription:
      "Check fixed VIP transfer prices from Dalaman Airport to Marmaris and İçmeler with private Mercedes Vito and Sprinter vehicles."
  }
];

export const popularRouteIds = [
  "calis-hotels",
  "fethiye-center-marina",
  "oludeniz-hotels",
  "ovacik-hisaronu",
  "faralya-kabak",
  "gocek-hotels",
  "marmaris-icmeler"
];

export const overviewRouteIds = [
  "gocek-hotels",
  "calis-hotels",
  "fethiye-center-marina",
  "oludeniz-hotels",
  "faralya-kabak"
];
