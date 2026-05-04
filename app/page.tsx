"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import {
  ArrowLeftRight,
  BadgeCheck,
  CalendarCheck,
  CalendarDays,
  Car,
  CheckCircle2,
  ChevronDown,
  CircleDollarSign,
  Clock3,
  CreditCard,
  Globe2,
  Luggage,
  Mail,
  Map,
  MapPin,
  Menu,
  MessageCircle,
  Plane,
  Route,
  Sailboat,
  Search,
  ShieldCheck,
  Star,
  UserRound,
  Users,
  X
} from "lucide-react";

type RoutePrice = {
  from: string;
  to: string;
  duration: string;
  price: number;
};

type IconType = typeof Plane;

const destinations = [
  "Dalaman Airport",
  "Fethiye",
  "Oludeniz",
  "Hisaronu",
  "Ovacik",
  "Calis",
  "Gocek",
  "Kalkan",
  "Kas"
];

const routePrices: RoutePrice[] = [
  { from: "Dalaman Airport", to: "Fethiye", duration: "45 min", price: 40 },
  { from: "Dalaman Airport", to: "Oludeniz", duration: "60 min", price: 50 },
  { from: "Dalaman Airport", to: "Calis", duration: "40 min", price: 40 },
  { from: "Dalaman Airport", to: "Gocek", duration: "25 min", price: 35 },
  { from: "Dalaman Airport", to: "Kalkan", duration: "1 hr 45 min", price: 80 },
  { from: "Dalaman Airport", to: "Kas", duration: "2 hr 10 min", price: 95 }
];

const experienceCards: Array<{ icon: IconType; title: string; text: string }> = [
  {
    icon: Car,
    title: "Mercedes-Benz Vito Comfort",
    text: "Private Vito transfers with spacious seating, luggage room, and calm travel between the airport and your destination."
  },
  {
    icon: BadgeCheck,
    title: "Airport Meet & Greet",
    text: "A smooth arrival experience from Dalaman Airport, with clear pickup details before your journey begins."
  },
  {
    icon: Clock3,
    title: "24/7 Transfer Service",
    text: "Early flights, late arrivals, and holiday schedules are supported with round-the-clock availability."
  },
  {
    icon: CircleDollarSign,
    title: "Fixed Destination Prices",
    text: "Know your route price before you book, with no surprise destination charges on popular transfers."
  },
  {
    icon: Route,
    title: "Door-to-Door Transfers",
    text: "Travel directly to hotels, villas, marinas, districts, and nearby tourist destinations in the service area."
  },
  {
    icon: CalendarCheck,
    title: "Easy Online Reservation",
    text: "Reserve online with route, date, time, and passenger details in a compact tourist-friendly flow."
  }
];

const services = [
  {
    title: "Dalaman Airport Transfer",
    text: "Private airport pickup and drop-off for Fethiye, Gocek, Kalkan, Kas and nearby destinations.",
    image:
      "https://images.pexels.com/photos/28145274/pexels-photo-28145274.jpeg?auto=compress&cs=tinysrgb&w=1400",
    badge: "Main service",
    icon: Plane
  },
  {
    title: "Fethiye VIP Transfer",
    text: "Comfortable private transfers around Fethiye, Calis, Oludeniz, Hisaronu and Ovacik.",
    image:
      "https://images.unsplash.com/photo-1554826832-fbf0ea041815?auto=format&fit=crop&w=1400&q=80",
    badge: "Popular",
    icon: MapPin
  },
  {
    title: "Kalkan & Kas Transfer",
    text: "Scenic private routes across the Riviera coastline with fixed destination pricing.",
    image:
      "https://unsplash.com/photos/wbtg07GpE6A/download?force=true",
    badge: "Coast route",
    icon: Route
  },
  {
    title: "Private City Tours",
    text: "Flexible day tours with comfortable minibus transportation for nearby sightseeing plans.",
    image:
      "https://unsplash.com/photos/3NV47DS5uTk/download?force=true",
    badge: "Secondary",
    icon: Map
  },
  {
    title: "Minibus Group Tours",
    text: "Tour-focused minibus service for small groups who want a relaxed day out in the region.",
    image:
      "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1400&q=80",
    badge: "Tours",
    icon: Users
  },
  {
    title: "Boat & Sea Tour Transfers",
    text: "Comfortable transfers to marinas, boat tour meeting points, and coastal experiences.",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=80",
    badge: "Tours",
    icon: Sailboat
  }
];

const whyChoose = [
  {
    icon: CircleDollarSign,
    title: "Fixed Prices",
    text: "Clear route prices before booking, built for confidence and transparency."
  },
  {
    icon: Clock3,
    title: "24/7 Service",
    text: "Transfers for early departures, late arrivals, and changing travel schedules."
  },
  {
    icon: Plane,
    title: "Airport Meet & Greet",
    text: "Arrival support at Dalaman Airport and direct private transfer from pickup."
  },
  {
    icon: Car,
    title: "VIP Vehicles",
    text: "Mercedes-Benz Vito vehicles prepared for comfortable private journeys."
  },
  {
    icon: CheckCircle2,
    title: "Easy Reservation",
    text: "A fast booking path with route, date, time, passenger count, and trip type."
  },
  {
    icon: CreditCard,
    title: "Simple Balance Payment",
    text: "Pay the remaining balance during transfer by cash or credit card."
  }
];

const steps = [
  {
    icon: Route,
    title: "Choose your route",
    text: "Select pickup, destination, date, time, passenger count, and transfer type."
  },
  {
    icon: CreditCard,
    title: "Pay reservation fee",
    text: "Pay a small reservation fee online to confirm your transfer."
  },
  {
    icon: BadgeCheck,
    title: "Meet your driver",
    text: "Your driver meets you at the airport or agreed pickup point."
  },
  {
    icon: CircleDollarSign,
    title: "Pay remaining balance",
    text: "Complete the remaining payment during transfer by cash or credit card."
  }
];

const testimonials = [
  {
    quote:
      "The airport pickup was smooth and the price was exactly what we saw online. A very comfortable start to our Fethiye holiday.",
    name: "Emma R.",
    country: "United Kingdom"
  },
  {
    quote:
      "Clean vehicle, easy reservation, and our family had plenty of space for luggage. The fixed price made the booking simple.",
    name: "Sergey M.",
    country: "Russia"
  },
  {
    quote:
      "We booked Dalaman to Kas before arriving. The meet and greet was clear, and the journey felt safe and relaxed.",
    name: "Lin Z.",
    country: "China"
  }
];

const faqs = [
  {
    question: "How do I book a transfer?",
    answer:
      "Choose your route, date, time, passenger count, and trip type from the reservation module, then continue with your booking details."
  },
  {
    question: "Do you offer fixed prices?",
    answer:
      "Yes. Popular routes such as Dalaman Airport to Fethiye, Gocek, Kalkan and Kas use clear fixed destination prices."
  },
  {
    question: "How does the reservation fee work?",
    answer:
      "You pay a small reservation fee online to confirm the booking. The remaining balance is paid during your transfer."
  },
  {
    question: "Can I pay the remaining balance by card?",
    answer:
      "Yes. The remaining balance can be paid during your transfer by cash or credit card."
  },
  {
    question: "Do you provide airport meet & greet?",
    answer:
      "Yes. Airport meet and greet service is available for Dalaman Airport transfers."
  },
  {
    question: "What happens if my flight is delayed?",
    answer:
      "Your transfer details can be coordinated around your arrival information so the pickup remains clear and stress-free."
  },
  {
    question: "Which areas do you serve?",
    answer:
      "The core service area includes Dalaman Airport, Fethiye, Oludeniz, Hisaronu, Ovacik, Calis, Gocek, Kalkan, Kas, and nearby tourist destinations."
  },
  {
    question: "What vehicle will be used for my transfer?",
    answer:
      "Private VIP transfers are provided with comfortable Mercedes-Benz Vito vehicles."
  },
  {
    question: "Can I book a round trip transfer?",
    answer:
      "Yes. You can select either one-way or round-trip transfer in the booking module."
  },
  {
    question: "Are your services available 24/7?",
    answer:
      "Yes. EMİRSTRANSFER.COM provides transfer service 24 hours a day, 7 days a week."
  }
];

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = ["Home", "Airport Transfer", "Routes & Prices", "Tours", "Fleet", "About", "Contact"];

  return (
    <header className={`site-header ${isScrolled ? "site-header--scrolled" : ""}`}>
      <div className="container header-inner">
        <a className="brand" href="#home" aria-label="EMİRSTRANSFER.COM home">
          <span className="brand-mark">E</span>
          <span>EMİRSTRANSFER.COM</span>
        </a>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {links.map((link) => (
            <a key={link} href={`#${slugify(link)}`}>
              {link}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <div className="language">
            <button
              type="button"
              className="language-trigger"
              aria-expanded={isLangOpen}
              onClick={() => setIsLangOpen((open) => !open)}
            >
              <Globe2 size={16} aria-hidden="true" />
              EN
              <ChevronDown size={14} aria-hidden="true" />
            </button>
            {isLangOpen && (
              <div className="language-menu">
                <button type="button">EN</button>
                <button type="button">TR</button>
                <button type="button">RU</button>
                <button type="button">ZH</button>
              </div>
            )}
          </div>
          <a className="whatsapp-link" href="#contact" aria-label="Contact on WhatsApp">
            <MessageCircle size={16} aria-hidden="true" />
            WhatsApp
          </a>
          <a className="button button-primary header-book" href="#booking">
            Book Now
          </a>
          <button
            type="button"
            className="mobile-menu-button"
            aria-expanded={isMenuOpen}
            aria-label="Open mobile menu"
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="mobile-menu">
          <nav aria-label="Mobile navigation">
            {links.map((link) => (
              <a key={link} href={`#${slugify(link)}`} onClick={() => setIsMenuOpen(false)}>
                {link}
              </a>
            ))}
          </nav>
          <div className="mobile-language" aria-label="Language selector">
            <button type="button">EN</button>
            <button type="button">TR</button>
            <button type="button">RU</button>
            <button type="button">ZH</button>
          </div>
          <div className="mobile-menu-ctas">
            <a className="button button-primary" href="#booking" onClick={() => setIsMenuOpen(false)}>
              Book Now
            </a>
            <a className="button button-outline-dark" href="#contact" onClick={() => setIsMenuOpen(false)}>
              Contact on WhatsApp
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

function BookingWidget() {
  const [tripType, setTripType] = useState<"one-way" | "round-trip">("one-way");
  const [from, setFrom] = useState("Dalaman Airport");
  const [to, setTo] = useState("Fethiye");
  const [bookingStatus, setBookingStatus] = useState("");

  const selectedRoute = useMemo(() => {
    return routePrices.find(
      (route) =>
        (route.from === from && route.to === to) ||
        (route.from === to && route.to === from)
    );
  }, [from, to]);

  function swapLocations() {
    setFrom(to);
    setTo(from);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBookingStatus(
      selectedRoute
        ? `Fixed price found: GBP ${selectedRoute.price}. Your reservation fee is paid online; the remaining balance is paid during transfer.`
        : "Route request received. Fixed pricing can be confirmed in the reservation step."
    );
  }

  return (
    <form className="booking-widget" id="booking" onSubmit={handleSubmit}>
      <div className="booking-topline">
        <button type="button" className="transfer-tab active">
          <Plane size={18} aria-hidden="true" />
          Airport Transfer
        </button>
        <div className="trip-tabs" aria-label="Trip type">
          <button
            type="button"
            className={tripType === "one-way" ? "active" : ""}
            onClick={() => setTripType("one-way")}
          >
            One Way
          </button>
          <button
            type="button"
            className={tripType === "round-trip" ? "active" : ""}
            onClick={() => setTripType("round-trip")}
          >
            Round Trip
          </button>
        </div>
      </div>

      <div className="booking-grid">
        <label className="field field-location">
          <span>From</span>
          <div className="field-control">
            <Plane size={18} aria-hidden="true" />
            <select value={from} onChange={(event) => setFrom(event.target.value)} aria-label="From">
              {destinations.map((destination) => (
                <option key={destination}>{destination}</option>
              ))}
            </select>
          </div>
        </label>

        <button
          className="swap-button"
          type="button"
          onClick={swapLocations}
          aria-label="Swap departure and arrival locations"
        >
          <ArrowLeftRight size={20} aria-hidden="true" />
        </button>

        <label className="field field-location">
          <span>To</span>
          <div className="field-control">
            <MapPin size={18} aria-hidden="true" />
            <select value={to} onChange={(event) => setTo(event.target.value)} aria-label="To">
              {destinations.map((destination) => (
                <option key={destination}>{destination}</option>
              ))}
            </select>
          </div>
        </label>

        <label className="field">
          <span>Departure Date</span>
          <div className="field-control">
            <CalendarDays size={18} aria-hidden="true" />
            <input type="date" aria-label="Departure date" />
          </div>
        </label>

        <label className="field">
          <span>Departure Time</span>
          <div className="field-control">
            <Clock3 size={18} aria-hidden="true" />
            <input type="time" aria-label="Departure time" />
          </div>
        </label>

        <label className="field">
          <span>Passengers</span>
          <div className="field-control">
            <Users size={18} aria-hidden="true" />
            <select defaultValue="1" aria-label="Passengers">
              {Array.from({ length: 8 }, (_, index) => String(index + 1)).map((count) => (
                <option key={count} value={count}>
                  {count} {count === "1" ? "Passenger" : "Passengers"}
                </option>
              ))}
            </select>
          </div>
        </label>

        <button className="button button-primary search-button" type="submit">
          <Search size={18} aria-hidden="true" />
          Search
        </button>
      </div>

      <div className="booking-note" aria-live="polite">
        <CreditCard size={18} aria-hidden="true" />
        <span>
          {bookingStatus ||
            (selectedRoute
              ? `Fixed price preview: GBP ${selectedRoute.price} for ${selectedRoute.from} to ${selectedRoute.to}. Pay a small reservation fee online, then pay the remaining balance during your transfer by cash or credit card.`
              : "Pay a small reservation fee online. Pay the remaining balance during your transfer by cash or credit card.")}
        </span>
      </div>
    </form>
  );
}

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <section className="hero" id="home">
          <div className="hero-bg" />
          <div className="container hero-content">
            <div className="hero-copy">
              <span className="eyebrow">Dalaman Airport - Fethiye - Kalkan - Kas</span>
              <h1>Premium VIP Transfers from Dalaman Airport</h1>
              <p>
                Private airport transfers to Fethiye, Gocek, Kalkan, Kas and nearby
                destinations with fixed prices, Mercedes-Benz Vito vehicles, 24/7 service,
                and airport meet & greet.
              </p>
              <div className="hero-actions">
                <a className="button button-primary" href="#booking">
                  Book Your Transfer
                </a>
                <a className="button button-secondary" href="#routes-prices">
                  View Fixed Prices
                </a>
                <a className="button button-ghost" href="#contact">
                  <MessageCircle size={17} aria-hidden="true" />
                  Contact on WhatsApp
                </a>
              </div>
              <div className="hero-trust" aria-label="Transfer highlights">
                <span>
                  <ShieldCheck size={16} aria-hidden="true" />
                  Safe private transfer
                </span>
                <span>
                  <CircleDollarSign size={16} aria-hidden="true" />
                  Fixed route prices
                </span>
                <span>
                  <Clock3 size={16} aria-hidden="true" />
                  24/7 availability
                </span>
              </div>
            </div>
          </div>
        </section>

        <div className="booking-shell">
          <div className="container">
            <BookingWidget />
          </div>
        </div>

        <section className="section" id="routes-prices">
          <div className="container">
            <div className="section-heading">
              <span className="eyebrow">Transparent pricing</span>
              <h2>Popular Fixed Price Transfers</h2>
              <p>Enjoy clear destination prices with no surprises on the most booked VIP transfer routes.</p>
            </div>
            <div className="route-grid">
              {routePrices.map((route) => (
                <article className="route-card" key={`${route.from}-${route.to}`}>
                  <div>
                    <span className="route-label">Fixed price</span>
                    <h3>
                      {route.from} <span>to</span> {route.to}
                    </h3>
                  </div>
                  <div className="route-meta">
                    <span>
                      <Clock3 size={16} aria-hidden="true" />
                      {route.duration}
                    </span>
                    <span>
                      <Car size={16} aria-hidden="true" />
                      Mercedes-Benz Vito
                    </span>
                  </div>
                  <div className="route-footer">
                    <strong>GBP {route.price}</strong>
                    <a href="#booking">Book Now</a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section section-soft" id="airport-transfer">
          <div className="container">
            <div className="section-heading section-heading-left">
              <span className="eyebrow">VIP transfer experience</span>
              <h2>Private Transfers Designed for Comfort</h2>
              <p>
                A premium but accessible transfer experience built for international tourists arriving on the Turkish Riviera.
              </p>
            </div>
            <div className="experience-grid">
              {experienceCards.map((card) => {
                const Icon = card.icon;
                return (
                  <article className="feature-card" key={card.title}>
                    <div className="icon-badge">
                      <Icon size={22} aria-hidden="true" />
                    </div>
                    <h3>{card.title}</h3>
                    <p>{card.text}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="section" id="tours">
          <div className="container">
            <div className="section-heading">
              <span className="eyebrow">Transfer & tour services</span>
              <h2>Explore Our Services</h2>
              <p>VIP transfer is the core service, with selected private tour and sea tour transport options for the region.</p>
            </div>
            <div className="services-grid">
              {services.map((service, index) => {
                const Icon = service.icon;
                return (
                  <article className={`service-card ${index === 0 ? "service-card-main" : ""}`} key={service.title}>
                    <img src={service.image} alt="" />
                    <div className="service-overlay" />
                    <div className="service-content">
                      <span className="service-badge">
                        <Icon size={15} aria-hidden="true" />
                        {service.badge}
                      </span>
                      <h3>{service.title}</h3>
                      <p>{service.text}</p>
                      <a href="#booking">View Details</a>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="section fleet-section" id="fleet">
          <div className="container fleet-layout">
            <div className="fleet-media">
              <img
                src="https://images.pexels.com/photos/17455633/pexels-photo-17455633.jpeg?auto=compress&cs=tinysrgb&w=1500"
                alt="Black Mercedes-Benz Vito prepared for private VIP transfer"
              />
            </div>
            <div className="fleet-copy">
              <span className="eyebrow">Our fleet</span>
              <h2>Mercedes-Benz Vito VIP Vehicles</h2>
              <p>
                Comfortable Mercedes-Benz Vito vehicles create a calm, private transfer experience for airport arrivals, coastal routes, and direct door-to-door journeys.
              </p>
              <ul className="fleet-list">
                <li>
                  <CheckCircle2 size={18} aria-hidden="true" />
                  Comfortable private seating
                </li>
                <li>
                  <CheckCircle2 size={18} aria-hidden="true" />
                  Air-conditioned interior
                </li>
                <li>
                  <CheckCircle2 size={18} aria-hidden="true" />
                  Spacious luggage capacity
                </li>
                <li>
                  <CheckCircle2 size={18} aria-hidden="true" />
                  Clean and well-maintained vehicles
                </li>
              </ul>
              <a className="button button-primary" href="#booking">
                Book a Vito Transfer
              </a>
            </div>
          </div>
        </section>

        <section className="why-band" id="why-travel-with-us">
          <div className="container">
            <div className="section-heading light">
              <span className="eyebrow">Why travel with us?</span>
              <h2>Why Choose EMİRSTRANSFER?</h2>
              <p>Everything a tourist needs to feel confident before booking a private airport transfer.</p>
            </div>
            <div className="why-grid">
              {whyChoose.map((item) => {
                const Icon = item.icon;
                return (
                  <article className="why-item" key={item.title}>
                    <div className="why-icon">
                      <Icon size={22} aria-hidden="true" />
                    </div>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="section section-soft" id="how-reservation-works">
          <div className="container">
            <div className="section-heading">
              <span className="eyebrow">Simple booking process</span>
              <h2>How Reservation Works</h2>
              <p>Pay a small reservation fee online. Pay the remaining balance during your transfer by cash or credit card.</p>
            </div>
            <div className="steps-grid">
              {steps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <article className="step-card" key={step.title}>
                    <span className="step-number">{index + 1}</span>
                    <Icon size={24} aria-hidden="true" />
                    <h3>{step.title}</h3>
                    <p>{step.text}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="section" id="testimonials">
          <div className="container">
            <div className="section-heading">
              <span className="eyebrow">International travelers</span>
              <h2>What Our Guests Say</h2>
              <p>Short, practical feedback from guests booking private transfers across the Turkish Riviera.</p>
            </div>
            <div className="testimonial-grid">
              {testimonials.map((testimonial) => (
                <article className="testimonial-card" key={testimonial.name}>
                  <div className="stars" aria-label="5 star rating">
                    {Array.from({ length: 5 }, (_, index) => (
                      <Star key={index} size={16} fill="currentColor" aria-hidden="true" />
                    ))}
                  </div>
                  <p>“{testimonial.quote}”</p>
                  <div className="guest">
                    <span>{testimonial.name.slice(0, 1)}</span>
                    <div>
                      <strong>{testimonial.name}</strong>
                      <small>{testimonial.country}</small>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section faq-section" id="faq">
          <div className="container faq-layout">
            <div className="faq-intro">
              <span className="eyebrow">Before you book</span>
              <h2>Frequently Asked Questions</h2>
              <p>
                Clear answers for airport arrivals, fixed prices, payment, vehicles, and service coverage.
              </p>
            </div>
            <div className="faq-list">
              {faqs.map((faq) => (
                <details key={faq.question}>
                  <summary>
                    {faq.question}
                    <ChevronDown size={18} aria-hidden="true" />
                  </summary>
                  <p>{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="cta-banner">
          <div className="container cta-content">
            <div>
              <span className="eyebrow">Ready to book?</span>
              <h2>Book Your Dalaman Airport Transfer Now</h2>
              <p>Reserve online and pay the remaining balance during your transfer.</p>
            </div>
            <div className="cta-actions">
              <a className="button button-light" href="#booking">
                Book Now
              </a>
              <a className="button button-cta-outline" href="#contact">
                <MessageCircle size={17} aria-hidden="true" />
                Contact on WhatsApp
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer" id="contact">
        <div className="container footer-grid">
          <div>
            <a className="brand footer-brand" href="#home">
              <span className="brand-mark">E</span>
              <span>EMİRSTRANSFER.COM</span>
            </a>
            <p>
              EMİRSTRANSFER.COM provides private VIP transfer services across Dalaman, Fethiye, Gocek, Kalkan, and Kas with comfortable Mercedes-Benz Vito vehicles and fixed destination prices.
            </p>
          </div>
          <div>
            <h3>Quick Links</h3>
            <a href="#home">Home</a>
            <a href="#airport-transfer">Airport Transfer</a>
            <a href="#routes-prices">Routes & Prices</a>
            <a href="#tours">Tours</a>
            <a href="#fleet">Fleet</a>
          </div>
          <div>
            <h3>Services</h3>
            <a href="#booking">Dalaman Airport Transfer</a>
            <a href="#booking">Fethiye Transfer</a>
            <a href="#booking">Kalkan Transfer</a>
            <a href="#booking">Kas Transfer</a>
            <a href="#tours">Boat Tour Transfers</a>
          </div>
          <div>
            <h3>Contact</h3>
            <a href="tel:+900000000000">
              <UserRound size={16} aria-hidden="true" />
              +90 000 000 00 00
            </a>
            <a href="#contact">
              <MessageCircle size={16} aria-hidden="true" />
              WhatsApp
            </a>
            <a href="mailto:info@emirstransfer.com">
              <Mail size={16} aria-hidden="true" />
              info@emirstransfer.com
            </a>
            <span>
              <MapPin size={16} aria-hidden="true" />
              Fethiye / Dalaman / Kas
            </span>
          </div>
        </div>
        <div className="container footer-bottom">
          <span>© 2026 EMİRSTRANSFER.COM. All rights reserved.</span>
          <div>
            <a href="#contact">Privacy Policy</a>
            <a href="#contact">Terms & Conditions</a>
          </div>
        </div>
      </footer>
    </>
  );
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}
