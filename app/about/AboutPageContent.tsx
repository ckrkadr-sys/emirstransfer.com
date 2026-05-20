"use client";

import { CircleDollarSign, Handshake, MapPinned, MessageCircle, Plane, Route } from "lucide-react";
import { SectionHeading } from "../../components/SectionHeading";
import { useI18n } from "../../lib/i18n/useI18n";

const valueIcons = [CircleDollarSign, Route, MessageCircle, MapPinned, Plane, Handshake];

export function AboutPageContent() {
  const { dictionary } = useI18n();
  const copy = dictionary.site.aboutPage;
  const intro = copy.intro as typeof copy.intro & {
    closing?: string;
    paragraphs?: string[];
  };
  const introParagraphs = intro.paragraphs ?? [intro.text, intro.copy].filter(Boolean);

  return (
    <main>
      <section className="section section-white">
        <div className="container about-layout">
          <div>
            <SectionHeading
              eyebrow={intro.eyebrow}
              title={intro.title}
              align="left"
            />
            <div className="about-copy-stack">
              {introParagraphs.map((paragraph) => (
                <p className="about-copy" key={paragraph}>
                  {paragraph}
                </p>
              ))}
              {intro.closing ? <p className="about-closing">{intro.closing}</p> : null}
            </div>
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
    </main>
  );
}
