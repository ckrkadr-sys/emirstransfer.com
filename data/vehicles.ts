import type { Vehicle } from "../lib/pricing/pricing.types";

export const vehicles: Vehicle[] = [
  {
    id: "mercedes-vito",
    name: "Mercedes Vito",
    passengerRangeIds: ["pax-1-5", "pax-1-20"]
  },
  {
    id: "mercedes-sprinter",
    name: "Mercedes Sprinter",
    passengerRangeIds: ["pax-6-12", "pax-13-16"]
  }
];

export function getVehicleById(vehicleId: string) {
  return vehicles.find((vehicle) => vehicle.id === vehicleId);
}
