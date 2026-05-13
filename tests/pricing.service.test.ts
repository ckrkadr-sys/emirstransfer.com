import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { passengerRanges } from "../data/prices";
import {
  calculateTransferRouteQuote,
  getBookingQuoteForSelection,
  getPriceTierForPassengers
} from "../lib/pricing/pricing.service";
import { findFixedRoutePrice } from "../lib/pricing/static-pricing.repository";
import { findHotelTransferRouteMatch, getHotelTransferRouteBySlug } from "../lib/routes/static-route.repository";

describe("static pricing repository", () => {
  it("finds the canonical Dalaman Airport to Fethiye route price in either direction", () => {
    const outbound = findFixedRoutePrice("Dalaman Airport", "Fethiye");
    const inbound = findFixedRoutePrice("Fethiye", "Dalaman Airport");

    assert.equal(outbound?.id, "dalaman-airport-to-fethiye");
    assert.equal(outbound?.price, 40);
    assert.equal(outbound?.currency, "GBP");
    assert.equal(inbound?.id, outbound?.id);
  });

  it("returns no fixed route price when the route is not canonical", () => {
    assert.equal(findFixedRoutePrice("Dalaman Airport", "Unknown Resort"), undefined);
  });
});

describe("passenger tier matching", () => {
  const calisRoute = getHotelTransferRouteBySlug("dalaman-airport-to-calis-hotels");

  it("matches the 1-5 passenger tier", () => {
    assert.ok(calisRoute);

    const tier = getPriceTierForPassengers(calisRoute.prices, 5);

    assert.equal(tier?.passengerRange.id, "pax-1-5");
    assert.equal(tier?.prices.GBP, 40);
  });

  it("matches the 6-12 passenger tier when available", () => {
    assert.ok(calisRoute);

    const tier = getPriceTierForPassengers(calisRoute.prices, 6);

    assert.equal(tier?.passengerRange.id, "pax-6-12");
    assert.equal(tier?.prices.GBP, 80);
  });

  it("does not match outside supported passenger ranges", () => {
    assert.ok(calisRoute);
    assert.equal(getPriceTierForPassengers(calisRoute.prices, 21), null);
  });

  it("keeps the shared passenger range definitions canonical", () => {
    assert.deepEqual(
      passengerRanges.map((range) => [range.id, range.min, range.max]),
      [
        ["pax-1-5", 1, 5],
        ["pax-6-12", 6, 12],
        ["pax-13-16", 13, 16],
        ["pax-1-20", 1, 20]
      ]
    );
  });
});

describe("hotel route matching", () => {
  it("matches Dalaman Airport to Çalış Hotels by route text", () => {
    const match = findHotelTransferRouteMatch("Çalış Hotels");

    assert.equal(match?.route.slug, "dalaman-airport-to-calis-hotels");
    assert.equal(match?.matchType, "route");
  });

  it("matches a hotel name to its hotel transfer route", () => {
    const match = findHotelTransferRouteMatch("Jiva Beach Resort");

    assert.equal(match?.route.slug, "dalaman-airport-to-calis-hotels");
    assert.equal(match?.hotelName, "Jiva Beach Resort");
    assert.equal(match?.matchType, "hotel");
  });
});

describe("pricing service", () => {
  it("calculates the expected Dalaman Airport to Fethiye booking price", () => {
    const quote = getBookingQuoteForSelection({
      from: "Dalaman Airport",
      to: "Fethiye",
      passengers: 2,
      tripType: "one-way",
      currency: "GBP"
    });

    assert.equal(quote?.unitPrice, 40);
    assert.equal(quote?.totalPrice, 40);
    assert.equal(quote?.reservationFee, 4);
    assert.equal(quote?.remainingBalance, 36);
    assert.equal(quote?.currency, "GBP");
  });

  it("calculates the expected Dalaman Airport to Çalış Hotels 1-5 passenger price", () => {
    const quote = getBookingQuoteForSelection({
      from: "Dalaman Airport",
      to: "Çalış Hotels",
      passengers: 2,
      tripType: "one-way",
      currency: "GBP"
    });

    assert.equal(quote?.unitPrice, 40);
    assert.equal(quote?.totalPrice, 40);
    assert.equal(quote?.priceTier?.passengerRange.id, "pax-1-5");
  });

  it("calculates the expected Dalaman Airport to Çalış Hotels 6-12 passenger price", () => {
    const quote = getBookingQuoteForSelection({
      from: "Dalaman Airport",
      to: "Çalış Hotels",
      passengers: 6,
      tripType: "one-way",
      currency: "GBP"
    });

    assert.equal(quote?.unitPrice, 80);
    assert.equal(quote?.totalPrice, 80);
    assert.equal(quote?.priceTier?.passengerRange.id, "pax-6-12");
  });

  it("selects the requested currency price from a hotel route tier", () => {
    const route = getHotelTransferRouteBySlug("dalaman-airport-to-calis-hotels");
    assert.ok(route);

    const quote = calculateTransferRouteQuote({
      route,
      passengers: 2,
      tripType: "one-way",
      currency: "EUR"
    });

    assert.equal(quote?.currency, "EUR");
    assert.equal(quote?.unitPrice, 50);
    assert.equal(quote?.totalPrice, 50);
  });

  it("doubles the route price for round-trip quotes", () => {
    const quote = getBookingQuoteForSelection({
      from: "Dalaman Airport",
      to: "Fethiye",
      passengers: 2,
      tripType: "round-trip",
      currency: "GBP"
    });

    assert.equal(quote?.unitPrice, 40);
    assert.equal(quote?.totalPrice, 80);
    assert.equal(quote?.reservationFee, 8);
    assert.equal(quote?.remainingBalance, 72);
  });

  it("falls back to null when no fixed route or hotel route is found", () => {
    const quote = getBookingQuoteForSelection({
      from: "Dalaman Airport",
      to: "Unknown Resort",
      passengers: 2,
      tripType: "one-way",
      currency: "GBP"
    });

    assert.equal(quote, null);
  });

  it("ignores fake query-string price values and recomputes from canonical data", () => {
    const selectionWithInjectedPrices = {
      from: "Dalaman Airport",
      to: "Fethiye",
      passengers: 2,
      tripType: "one-way" as const,
      currency: "GBP" as const,
      price: 999,
      totalPrice: 999,
      reservationFee: 999,
      remainingBalance: 999
    };

    const quote = getBookingQuoteForSelection(selectionWithInjectedPrices);

    assert.equal(quote?.unitPrice, 40);
    assert.equal(quote?.totalPrice, 40);
    assert.equal(quote?.reservationFee, 4);
    assert.equal(quote?.remainingBalance, 36);
  });
});
