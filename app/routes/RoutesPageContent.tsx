"use client";

import { CtaBand } from "../../components/CtaBand";
import { FaqSection } from "../../components/FaqSection";
import { PageHero } from "../../components/PageHero";
import { PriceFinder } from "../../components/PriceFinder";
import { PriceOverviewTable } from "../../components/PriceOverviewTable";
import { RouteCard } from "../../components/RouteCard";
import { RouteHotelList } from "../../components/RouteHotelList";
import { SectionHeading } from "../../components/SectionHeading";
import { useI18n } from "../../lib/i18n/useI18n";
import { transferRoutes } from "../../lib/transferRoutes";

type RoutesPageContentProps = {
  initialRouteId: string;
};

export function RoutesPageContent({ initialRouteId }: RoutesPageContentProps) {
  const { dictionary } = useI18n();
  const copy = dictionary.site.routesPage;
  const priceCopy = dictionary.site.priceOverview;

  return (
    <main>
      <PageHero eyebrow={copy.hero.eyebrow} title={copy.hero.title} text={copy.hero.text} />

      <section className="section section-finder">
        <div className="container">
          <PriceFinder initialRouteId={initialRouteId} heading={copy.finderHeading} subheading={copy.finderText} />
        </div>
      </section>

      <section className="section section-ivory">
        <div className="container">
          <SectionHeading eyebrow={copy.allRoutes.eyebrow} title={copy.allRoutes.title} text={copy.allRoutes.text} />
          <div className="route-grid">
            {transferRoutes.map((route) => (
              <RouteCard route={route} key={route.id} />
            ))}
          </div>
        </div>
      </section>

      <PriceOverviewTable allRoutes title={priceCopy.fullTitle} text={priceCopy.fullText} />
      <RouteHotelList />
      <FaqSection />
      <CtaBand />
    </main>
  );
}
