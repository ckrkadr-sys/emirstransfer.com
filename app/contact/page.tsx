import type { Metadata } from "next";
import { ContactBookingForm } from "../../components/ContactBookingForm";
import { CtaBand } from "../../components/CtaBand";
import { PageHero } from "../../components/PageHero";
import { SectionHeading } from "../../components/SectionHeading";
import { WhatsAppBrandIcon } from "../../components/WhatsAppBrandIcon";
import { buildWhatsAppUrl } from "../../lib/transferPricing";
import { serviceAreas } from "../../lib/transferRoutes";

export const metadata: Metadata = {
  title: "Contact Emirs Transfer",
  description:
    "Contact Emirs Transfer by WhatsApp to confirm your private Dalaman Airport VIP transfer with hotel name, flight number and passenger count."
};

export default function ContactPage() {
  return (
    <main>
      <PageHero
        eyebrow="Contact"
        title="Confirm your private Dalaman Airport transfer"
        text="Tell us your arrival date, flight number, hotel name and passenger count. We will confirm your private transfer quickly via WhatsApp."
      />

      <section className="section section-white">
        <div className="container contact-layout">
          <div className="contact-panel">
            <SectionHeading
              eyebrow="Booking Guidance"
              title="Send the key travel details"
              text="For the fastest confirmation, include your arrival date, flight number, hotel or destination, passenger count and name."
              align="left"
            />
            <a className="button button-whatsapp button-large" href={buildWhatsAppUrl()} target="_blank" rel="noopener noreferrer">
              <WhatsAppBrandIcon />
              Book via WhatsApp
            </a>
            <p className="contact-reassurance">
              Fixed price, private Mercedes vehicle, meet & greet and direct hotel drop-off can all be confirmed in one WhatsApp conversation.
            </p>
          </div>
          <ContactBookingForm />
        </div>
      </section>

      <section className="section section-ivory">
        <div className="container">
          <SectionHeading
            eyebrow="Service Areas"
            title="Private transfers across the Dalaman region"
            text="Our core fixed-price transfer zones cover the most requested hotels, beaches, marinas and resort areas."
          />
          <div className="service-chip-grid">
            {serviceAreas.map((area) => (
              <span key={area}>{area}</span>
            ))}
          </div>
        </div>
      </section>

      <CtaBand title="Need help choosing the right route zone?" buttonLabel="Ask for Route Help" />
    </main>
  );
}
