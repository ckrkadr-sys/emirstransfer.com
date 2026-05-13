import type { Location } from "../lib/routes/route.types";

export const locations: Location[] = [
  { id: "dalaman-airport", name: "Dalaman Airport", dictionaryKey: "Dalaman Airport", selectable: true },
  { id: "fethiye", name: "Fethiye", dictionaryKey: "Fethiye", selectable: true },
  { id: "calis", name: "Calis", dictionaryKey: "Calis", aliases: ["Çalış"], selectable: true },
  { id: "oludeniz", name: "Oludeniz", dictionaryKey: "Oludeniz", aliases: ["Ölüdeniz"], selectable: true },
  { id: "hisaronu", name: "Hisaronu", dictionaryKey: "Hisaronu", aliases: ["Hisarönü"], selectable: true },
  { id: "ovacik", name: "Ovacik", dictionaryKey: "Ovacik", aliases: ["Ovacık"], selectable: true },
  { id: "gocek", name: "Gocek", dictionaryKey: "Gocek", aliases: ["Göcek"], selectable: true },
  { id: "kalkan", name: "Kalkan", dictionaryKey: "Kalkan", selectable: true },
  { id: "kas", name: "Kas", dictionaryKey: "Kas", aliases: ["Kaş"], selectable: true }
];

export const selectableLocations = locations.filter((location) => location.selectable);

export function getLocationById(locationId: string) {
  return locations.find((location) => location.id === locationId);
}
