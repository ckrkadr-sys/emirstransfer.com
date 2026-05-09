"use client";

import { CircleDollarSign, Handshake, MapPinned, MessageCircle, Plane, Route } from "lucide-react";
import { CtaBand } from "../../components/CtaBand";
import { PageHero } from "../../components/PageHero";
import { SectionHeading } from "../../components/SectionHeading";
import { useI18n } from "../../lib/i18n/useI18n";

const valueIcons = [CircleDollarSign, Route, MessageCircle, MapPinned, Plane, Handshake];

export function AboutPageContent() {
  const { dictionary } = useI18n();
  const copy = dictionary.site.aboutPage;

  return (
    <main>
      <PageHero eyebrow={copy.hero.eyebrow} title={copy.hero.title} text={copy.hero.text} />

      <section className="section section-white">
        <div className="container about-layout">
          <div>
            <SectionHeading
              eyebrow={copy.intro.eyebrow}
              title={copy.intro.title}
              text={copy.intro.text}
              align="left"
            />
            <p className="about-copy">{copy.intro.copy}</p>
          </div>
          <div className="about-stat-panel">
            <span>{copy.stat.label}</span>
            <strong>{copy.stat.title}</strong>
            <p>{copy.stat.text}</p>
          </div>
        </div>
      </section>

      <section className="section section-ivory">
        <div className="container value-grid">
          {copy.values.map((value, index) => {
            const Icon = valueIcons[index] ?? CircleDollarSign;
            return (
              <article className="feature-card" key={value.title}>
                <div className="feature-icon">
                  <Icon size={22} aria-hidden="true" />
                </div>
                <h2>{value.title}</h2>
                <p>{value.text}</p>
              </article>
            );
          })}
        </div>
      </section>

      <CtaBand title={copy.ctaTitle} buttonLabel={copy.ctaButton} />
    </main>
  );
}
