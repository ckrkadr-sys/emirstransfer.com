import { overviewRouteIds, passengerTiers, transferRoutes, type Currency } from "../lib/transferRoutes";
import { formatTransferPrice, getPriceForRoute } from "../lib/transferPricing";
import { SectionHeading } from "./SectionHeading";

type PriceOverviewTableProps = {
  title?: string;
  text?: string;
  currency?: Currency;
  allRoutes?: boolean;
};

const columnLabels = {
  pax_1_5: "Vito 1-5",
  pax_6_12: "Sprinter 6-12",
  pax_12_16: "Sprinter 12-16"
};

export function PriceOverviewTable({
  title = "Quick Price Overview",
  text = "A compact view of fixed private transfer prices from Dalaman Airport.",
  currency = "gbp",
  allRoutes = false
}: PriceOverviewTableProps) {
  const routes = allRoutes
    ? transferRoutes
    : overviewRouteIds
        .map((id) => transferRoutes.find((route) => route.id === id))
        .filter((route): route is (typeof transferRoutes)[number] => Boolean(route));

  return (
    <section className="section section-white">
      <div className="container">
        <SectionHeading eyebrow="Fixed Pricing" title={title} text={text} />
        <div className="price-table-shell">
          <table className="price-table">
            <thead>
              <tr>
                <th scope="col">Route</th>
                {passengerTiers.map((tier) => (
                  <th scope="col" key={tier}>
                    {columnLabels[tier]}
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
