"use client";

import { useI18n } from "../lib/i18n/useI18n";
import { overviewRouteIds, passengerTiers, transferRoutes, type Currency } from "../lib/transferRoutes";
import { formatTransferPrice, getPriceForRoute } from "../lib/transferPricing";
import { SectionHeading } from "./SectionHeading";

type PriceOverviewTableProps = {
  title?: string;
  text?: string;
  currency?: Currency;
  allRoutes?: boolean;
};

export function PriceOverviewTable({ title, text, currency = "gbp", allRoutes = false }: PriceOverviewTableProps) {
  const { dictionary } = useI18n();
  const copy = dictionary.site.priceOverview;
  const routes = allRoutes
    ? transferRoutes
    : overviewRouteIds
        .map((id) => transferRoutes.find((route) => route.id === id))
        .filter((route): route is (typeof transferRoutes)[number] => Boolean(route));

  return (
    <section className="section section-white">
      <div className="container">
        <SectionHeading eyebrow={copy.eyebrow} title={title ?? copy.title} text={text ?? copy.text} />
        <div className="price-table-shell">
          <table className="price-table">
            <thead>
              <tr>
                <th scope="col">{copy.route}</th>
                {passengerTiers.map((tier) => (
                  <th scope="col" key={tier}>
                    {copy.columns[tier]}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {routes.map((route) => (
                <tr key={route.id}>
                  <th scope="row">{route.shortName}</th>
                  {passengerTiers.map((tier) => (
                    <td key={tier}>{formatTransferPrice(getPriceForRoute(route, tier, currency), currency)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
