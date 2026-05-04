"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
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
type LanguageCode = "EN" | "TR" | "RU" | "ZH";

const languages: Array<{ code: LanguageCode; label: string; locale: string }> = [
  { code: "EN", label: "English", locale: "en" },
  { code: "TR", label: "Türkçe", locale: "tr" },
  { code: "RU", label: "Русский", locale: "ru" },
  { code: "ZH", label: "中文", locale: "zh" }
];

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
    title: "Private City Tours",
    text: "Comfortable minibus-based city tours for guests who want to explore Fethiye and nearby highlights.",
    image:
      "https://unsplash.com/photos/3NV47DS5uTk/download?force=true",
    badge: "City tours",
    icon: Map
  },
  {
    title: "Minibus Group Tours",
    text: "Tour-focused minibus service for small groups planning a relaxed day out across the region.",
    image:
      "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1400&q=80",
    badge: "Groups",
    icon: Users
  },
  {
    title: "Boat & Sea Tour Transfers",
    text: "Transfers to marinas, boat tour meeting points, and coastal sea tour departures.",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=80",
    badge: "Sea tours",
    icon: Sailboat
  },
  {
    title: "Gocek & Marina Transfers",
    text: "Private transport for marina pickups, yacht meeting points, and Gocek coastal plans.",
    image:
      "https://images.unsplash.com/photo-1554826832-fbf0ea041815?auto=format&fit=crop&w=1400&q=80",
    badge: "Marina",
    icon: MapPin
  },
  {
    title: "Villa & District Pickup",
    text: "Pickup and drop-off support for villas, districts, marinas, and nearby tourist locations.",
    image:
      "https://images.pexels.com/photos/28145274/pexels-photo-28145274.jpeg?auto=compress&cs=tinysrgb&w=1400",
    badge: "Pickup",
    icon: Luggage
  },
  {
    title: "Custom Regional Routes",
    text: "Flexible private route requests across Fethiye, Oludeniz, Hisaronu, Ovacik, Calis and nearby areas.",
    image:
      "https://unsplash.com/photos/wbtg07GpE6A/download?force=true",
    badge: "Custom",
    icon: Route
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

const content = {
  EN: {
    navItems: [
      { label: "Home", href: "#home" },
      { label: "VIP Transfer", href: "#vip-transfer" },
      { label: "Other Services", href: "#other-services" },
      { label: "Popular Destinations", href: "#popular-destinations" },
      { label: "About", href: "#about" },
      { label: "Contact", href: "#contact" }
    ],
    common: {
      bookNow: "Book Now",
      whatsapp: "WhatsApp",
      contactWhatsapp: "Contact on WhatsApp",
      viewDetails: "View Details",
      selectLanguage: "Select language",
      vehicle: "Mercedes-Benz Vito",
      fixedPrice: "Fixed price",
      to: "to"
    },
    destinations: {
      "Dalaman Airport": "Dalaman Airport",
      Fethiye: "Fethiye",
      Oludeniz: "Oludeniz",
      Hisaronu: "Hisaronu",
      Ovacik: "Ovacik",
      Calis: "Calis",
      Gocek: "Gocek",
      Kalkan: "Kalkan",
      Kas: "Kas"
    },
    durationLabel: (duration: string) => duration,
    booking: {
      transferType: "Airport Transfer",
      tripType: "Trip type",
      oneWay: "One Way",
      roundTrip: "Round Trip",
      from: "From",
      to: "To",
      departureDate: "Departure Date",
      departureTime: "Departure Time",
      passengers: "Passengers",
      search: "Search",
      swap: "Swap departure and arrival locations",
      passengerLabel: (count: number) => `${count} ${count === 1 ? "Passenger" : "Passengers"}`,
      fixedFound: (price: number) =>
        `Fixed price found: GBP ${price}. Your reservation fee is paid online; the remaining balance is paid during transfer.`,
      routeRequest: "Route request received. Fixed pricing can be confirmed in the reservation step.",
      fixedPreview: (price: number, from: string, to: string) =>
        `Fixed price preview: GBP ${price} for ${from} to ${to}. Pay a small reservation fee online, then pay the remaining balance during your transfer by cash or credit card.`,
      paymentNote:
        "Pay a small reservation fee online. Pay the remaining balance during your transfer by cash or credit card."
    },
    hero: {
      eyebrow: "Dalaman Airport - Fethiye - Kalkan - Kas",
      title: "Premium VIP Transfers from Dalaman Airport",
      mobileTitle: ["Premium VIP", "Transfers from", "Dalaman Airport"],
      text:
        "Private airport transfers to Fethiye, Gocek, Kalkan, Kas and nearby destinations with fixed prices, Mercedes-Benz Vito vehicles, 24/7 service, and airport meet & greet.",
      primaryCta: "Book Your Transfer",
      secondaryCta: "View Fixed Prices",
      trust: ["Safe private transfer", "Fixed route prices", "24/7 availability"]
    },
    routes: {
      eyebrow: "Transparent pricing",
      title: "Popular Destinations & Fixed Prices",
      text: "Choose clear fixed-price transfers to the most requested destinations between Dalaman and Kas."
    },
    vip: {
      eyebrow: "VIP transfer experience",
      title: "Private Transfers Designed for Comfort",
      text:
        "A premium but accessible transfer experience built for international tourists arriving on the Turkish Riviera."
    },
    experienceCards: [
      {
        title: "Mercedes-Benz Vito Comfort",
        text: "Private Vito transfers with spacious seating, luggage room, and calm travel between the airport and your destination."
      },
      {
        title: "Airport Meet & Greet",
        text: "A smooth arrival experience from Dalaman Airport, with clear pickup details before your journey begins."
      },
      {
        title: "24/7 Transfer Service",
        text: "Early flights, late arrivals, and holiday schedules are supported with round-the-clock availability."
      },
      {
        title: "Fixed Destination Prices",
        text: "Know your route price before you book, with no surprise destination charges on popular transfers."
      },
      {
        title: "Door-to-Door Transfers",
        text: "Travel directly to hotels, villas, marinas, districts, and nearby tourist destinations in the service area."
      },
      {
        title: "Easy Online Reservation",
        text: "Reserve online with route, date, time, and passenger details in a compact tourist-friendly flow."
      }
    ],
    otherServices: {
      eyebrow: "Beyond airport transfer",
      title: "Other Services",
      text: "Selected tour, minibus, marina, and sea tour transfer services for guests exploring the Fethiye region."
    },
    services: [
      {
        title: "Private City Tours",
        text: "Comfortable minibus-based city tours for guests who want to explore Fethiye and nearby highlights.",
        badge: "City tours"
      },
      {
        title: "Minibus Group Tours",
        text: "Tour-focused minibus service for small groups planning a relaxed day out across the region.",
        badge: "Groups"
      },
      {
        title: "Boat & Sea Tour Transfers",
        text: "Transfers to marinas, boat tour meeting points, and coastal sea tour departures.",
        badge: "Sea tours"
      },
      {
        title: "Gocek & Marina Transfers",
        text: "Private transport for marina pickups, yacht meeting points, and Gocek coastal plans.",
        badge: "Marina"
      },
      {
        title: "Villa & District Pickup",
        text: "Pickup and drop-off support for villas, districts, marinas, and nearby tourist locations.",
        badge: "Pickup"
      },
      {
        title: "Custom Regional Routes",
        text: "Flexible private route requests across Fethiye, Oludeniz, Hisaronu, Ovacik, Calis and nearby areas.",
        badge: "Custom"
      }
    ],
    fleet: {
      eyebrow: "Our fleet",
      title: "Mercedes-Benz Vito VIP Vehicles",
      text:
        "Comfortable Mercedes-Benz Vito vehicles create a calm, private transfer experience for airport arrivals, coastal routes, and direct door-to-door journeys.",
      features: [
        "Comfortable private seating",
        "Air-conditioned interior",
        "Spacious luggage capacity",
        "Clean and well-maintained vehicles"
      ],
      cta: "Book a Vito Transfer",
      imageAlt: "Black Mercedes-Benz Vito prepared for private VIP transfer"
    },
    why: {
      eyebrow: "Why travel with us?",
      title: "Why Choose EMİRSTRANSFER?",
      text: "Everything a tourist needs to feel confident before booking a private airport transfer.",
      cards: [
        { title: "Fixed Prices", text: "Clear route prices before booking, built for confidence and transparency." },
        { title: "24/7 Service", text: "Transfers for early departures, late arrivals, and changing travel schedules." },
        { title: "Airport Meet & Greet", text: "Arrival support at Dalaman Airport and direct private transfer from pickup." },
        { title: "VIP Vehicles", text: "Mercedes-Benz Vito vehicles prepared for comfortable private journeys." },
        { title: "Easy Reservation", text: "A fast booking path with route, date, time, passenger count, and trip type." },
        { title: "Simple Balance Payment", text: "Pay the remaining balance during transfer by cash or credit card." }
      ]
    },
    reservation: {
      eyebrow: "Simple booking process",
      title: "How Reservation Works",
      text: "Pay a small reservation fee online. Pay the remaining balance during your transfer by cash or credit card.",
      steps: [
        { title: "Choose your route", text: "Select pickup, destination, date, time, passenger count, and transfer type." },
        { title: "Pay reservation fee", text: "Pay a small reservation fee online to confirm your transfer." },
        { title: "Meet your driver", text: "Your driver meets you at the airport or agreed pickup point." },
        { title: "Pay remaining balance", text: "Complete the remaining payment during transfer by cash or credit card." }
      ]
    },
    testimonials: {
      eyebrow: "International travelers",
      title: "What Our Guests Say",
      text: "Short, practical feedback from guests booking private transfers across the Turkish Riviera.",
      items: [
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
      ]
    },
    faq: {
      eyebrow: "Before you book",
      title: "Frequently Asked Questions",
      text: "Clear answers for airport arrivals, fixed prices, payment, vehicles, and service coverage.",
      items: faqs
    },
    cta: {
      eyebrow: "Ready to book?",
      title: "Book Your Dalaman Airport Transfer Now",
      text: "Reserve online and pay the remaining balance during your transfer."
    },
    footer: {
      description:
        "EMİRSTRANSFER.COM provides private VIP transfer services across Dalaman, Fethiye, Gocek, Kalkan, and Kas with comfortable Mercedes-Benz Vito vehicles and fixed destination prices.",
      quickLinks: "Quick Links",
      services: "Services",
      serviceLinks: [
        "Dalaman Airport Transfer",
        "Fethiye Transfer",
        "Kalkan Transfer",
        "Kas Transfer",
        "Boat Tour Transfers"
      ],
      contact: "Contact",
      privacy: "Privacy Policy",
      terms: "Terms & Conditions",
      copyright: "© 2026 EMİRSTRANSFER.COM. All rights reserved.",
      serviceArea: "Fethiye / Dalaman / Kas"
    }
  },
  TR: {
    navItems: [
      { label: "Ana Sayfa", href: "#home" },
      { label: "VIP Transfer", href: "#vip-transfer" },
      { label: "Diğer Hizmetler", href: "#other-services" },
      { label: "Popüler Destinasyonlar", href: "#popular-destinations" },
      { label: "Hakkımızda", href: "#about" },
      { label: "İletişim", href: "#contact" }
    ],
    common: {
      bookNow: "Rezervasyon Yap",
      whatsapp: "WhatsApp",
      contactWhatsapp: "WhatsApp ile İletişim",
      viewDetails: "Detayları Gör",
      selectLanguage: "Dil seç",
      vehicle: "Mercedes-Benz Vito",
      fixedPrice: "Sabit fiyat",
      to: "→"
    },
    destinations: {
      "Dalaman Airport": "Dalaman Havalimanı",
      Fethiye: "Fethiye",
      Oludeniz: "Ölüdeniz",
      Hisaronu: "Hisarönü",
      Ovacik: "Ovacık",
      Calis: "Çalış",
      Gocek: "Göcek",
      Kalkan: "Kalkan",
      Kas: "Kaş"
    },
    durationLabel: (duration: string) =>
      duration.replace("min", "dk").replace("1 hr 45 dk", "1 sa 45 dk").replace("2 hr 10 dk", "2 sa 10 dk"),
    booking: {
      transferType: "Havalimanı Transferi",
      tripType: "Yolculuk tipi",
      oneWay: "Tek Yön",
      roundTrip: "Gidiş Dönüş",
      from: "Nereden",
      to: "Nereye",
      departureDate: "Gidiş Tarihi",
      departureTime: "Gidiş Saati",
      passengers: "Yolcular",
      search: "Ara",
      swap: "Kalkış ve varış noktalarını değiştir",
      passengerLabel: (count: number) => `${count} Yolcu`,
      fixedFound: (price: number) =>
        `Sabit fiyat bulundu: GBP ${price}. Rezervasyon ücretiniz online ödenir; kalan bakiye transfer sırasında ödenir.`,
      routeRequest: "Rota talebiniz alındı. Sabit fiyat rezervasyon adımında onaylanabilir.",
      fixedPreview: (price: number, from: string, to: string) =>
        `${from} - ${to} için sabit fiyat ön izlemesi: GBP ${price}. Online küçük bir rezervasyon ücreti ödeyin, kalan bakiyeyi transfer sırasında nakit veya kredi kartıyla tamamlayın.`,
      paymentNote:
        "Online küçük bir rezervasyon ücreti ödeyin. Kalan bakiyeyi transfer sırasında nakit veya kredi kartıyla ödeyin."
    },
    hero: {
      eyebrow: "Dalaman Havalimanı - Fethiye - Kalkan - Kaş",
      title: "Dalaman Havalimanı'ndan Premium VIP Transfer",
      mobileTitle: ["Premium VIP", "Dalaman Havalimanı", "Transferleri"],
      text:
        "Fethiye, Göcek, Kalkan, Kaş ve yakın destinasyonlara sabit fiyatlı, Mercedes-Benz Vito araçlı, 7/24 hizmet ve havalimanı karşılama içeren özel transfer.",
      primaryCta: "Transfer Rezervasyonu Yap",
      secondaryCta: "Sabit Fiyatları Gör",
      trust: ["Güvenli özel transfer", "Sabit rota fiyatları", "7/24 hizmet"]
    },
    routes: {
      eyebrow: "Şeffaf fiyatlandırma",
      title: "Popüler Destinasyonlar ve Sabit Fiyatlar",
      text: "Dalaman ile Kaş arasındaki en çok talep edilen destinasyonlara net sabit fiyatlı transfer seçin."
    },
    vip: {
      eyebrow: "VIP transfer deneyimi",
      title: "Konfor İçin Tasarlanmış Özel Transferler",
      text: "Türk Rivierası'na gelen uluslararası turistler için premium ama ulaşılabilir bir transfer deneyimi."
    },
    experienceCards: [
      { title: "Mercedes-Benz Vito Konforu", text: "Geniş oturma alanı, bagaj kapasitesi ve sakin yolculuk deneyimi sunan özel Vito transferleri." },
      { title: "Havalimanı Karşılama", text: "Dalaman Havalimanı'nda net karşılama bilgileriyle sorunsuz bir varış deneyimi." },
      { title: "7/24 Transfer Hizmeti", text: "Erken uçuşlar, geç varışlar ve tatil planları için günün her saati hizmet." },
      { title: "Sabit Destinasyon Fiyatları", text: "Rezervasyon öncesinde rota fiyatınızı bilin, popüler transferlerde sürpriz ücret yaşamayın." },
      { title: "Kapıdan Kapıya Transfer", text: "Otel, villa, marina, ilçe ve turistik noktalara doğrudan özel transfer." },
      { title: "Kolay Online Rezervasyon", text: "Rota, tarih, saat ve yolcu bilgileriyle kısa ve turist dostu rezervasyon akışı." }
    ],
    otherServices: {
      eyebrow: "Havalimanı transferinin ötesinde",
      title: "Diğer Hizmetler",
      text: "Fethiye bölgesini keşfeden misafirler için seçili tur, minibüs, marina ve deniz turu transfer hizmetleri."
    },
    services: [
      { title: "Özel Şehir Turları", text: "Fethiye ve çevresini keşfetmek isteyen misafirler için konforlu minibüs tabanlı şehir turları.", badge: "Şehir turları" },
      { title: "Minibüs Grup Turları", text: "Bölgede rahat bir gün planlayan küçük gruplar için tur odaklı minibüs hizmeti.", badge: "Gruplar" },
      { title: "Tekne ve Deniz Turu Transferleri", text: "Marinalara, tekne turu buluşma noktalarına ve sahil çıkışlarına transfer.", badge: "Deniz turları" },
      { title: "Göcek ve Marina Transferleri", text: "Marina karşılamaları, yat buluşma noktaları ve Göcek sahil planları için özel ulaşım.", badge: "Marina" },
      { title: "Villa ve Bölge Alımı", text: "Villa, ilçe, marina ve yakın turistik noktalar için alma-bırakma desteği.", badge: "Alım" },
      { title: "Özel Bölgesel Rotalar", text: "Fethiye, Ölüdeniz, Hisarönü, Ovacık, Çalış ve yakın bölgelerde esnek özel rota talepleri.", badge: "Özel" }
    ],
    fleet: {
      eyebrow: "Filomuz",
      title: "Mercedes-Benz Vito VIP Araçlar",
      text: "Mercedes-Benz Vito araçlar; havalimanı gelişleri, sahil rotaları ve kapıdan kapıya yolculuklarda sakin ve özel bir transfer deneyimi sunar.",
      features: ["Konforlu özel oturma düzeni", "Klimalı iç mekan", "Geniş bagaj kapasitesi", "Temiz ve bakımlı araçlar"],
      cta: "Vito Transfer Rezervasyonu Yap",
      imageAlt: "Özel VIP transfer için hazırlanmış siyah Mercedes-Benz Vito"
    },
    why: {
      eyebrow: "Neden bizimle yolculuk?",
      title: "Neden EMİRSTRANSFER?",
      text: "Özel havalimanı transferi rezervasyonu öncesinde turistlerin güven duyması için gereken her şey.",
      cards: [
        { title: "Sabit Fiyatlar", text: "Rezervasyon öncesi net rota fiyatları, güven ve şeffaflık için tasarlandı." },
        { title: "7/24 Hizmet", text: "Erken kalkışlar, geç varışlar ve değişen seyahat saatleri için transfer." },
        { title: "Havalimanı Karşılama", text: "Dalaman Havalimanı'nda karşılama desteği ve doğrudan özel transfer." },
        { title: "VIP Araçlar", text: "Konforlu özel yolculuklar için hazırlanmış Mercedes-Benz Vito araçlar." },
        { title: "Kolay Rezervasyon", text: "Rota, tarih, saat, yolcu sayısı ve yolculuk tipiyle hızlı rezervasyon akışı." },
        { title: "Kalan Bakiye Ödemesi", text: "Kalan bakiyeyi transfer sırasında nakit veya kredi kartıyla ödeyin." }
      ]
    },
    reservation: {
      eyebrow: "Basit rezervasyon süreci",
      title: "Rezervasyon Nasıl Çalışır?",
      text: "Online küçük bir rezervasyon ücreti ödeyin. Kalan bakiyeyi transfer sırasında nakit veya kredi kartıyla ödeyin.",
      steps: [
        { title: "Rotanızı seçin", text: "Alış ve varış noktası, tarih, saat, yolcu sayısı ve transfer tipini seçin." },
        { title: "Rezervasyon ücretini ödeyin", text: "Transferinizi onaylamak için küçük bir ücreti online ödeyin." },
        { title: "Şoförünüzle buluşun", text: "Şoförünüz sizi havalimanında veya belirlenen alış noktasında karşılar." },
        { title: "Kalan bakiyeyi ödeyin", text: "Kalan ödemeyi transfer sırasında nakit veya kredi kartıyla tamamlayın." }
      ]
    },
    testimonials: {
      eyebrow: "Uluslararası misafirler",
      title: "Misafirlerimiz Ne Diyor?",
      text: "Türk Rivierası'nda özel transfer rezervasyonu yapan misafirlerden kısa ve gerçekçi yorumlar.",
      items: [
        { quote: "Havalimanı karşılama sorunsuzdu ve fiyat online gördüğümüzle aynıydı. Fethiye tatilimize çok konforlu başladık.", name: "Emma R.", country: "Birleşik Krallık" },
        { quote: "Araç temizdi, rezervasyon kolaydı ve ailemizin bagajları için bolca yer vardı. Sabit fiyat güven verdi.", name: "Sergey M.", country: "Rusya" },
        { quote: "Gelmeden önce Dalaman-Kaş transferi ayırttık. Karşılama netti, yolculuk güvenli ve rahattı.", name: "Lin Z.", country: "Çin" }
      ]
    },
    faq: {
      eyebrow: "Rezervasyon öncesi",
      title: "Sık Sorulan Sorular",
      text: "Havalimanı gelişleri, sabit fiyatlar, ödeme, araçlar ve hizmet bölgesi için net yanıtlar.",
      items: [
        { question: "Transfer rezervasyonunu nasıl yaparım?", answer: "Rezervasyon modülünden rota, tarih, saat, yolcu sayısı ve yolculuk tipini seçip rezervasyon bilgileriyle devam edebilirsiniz." },
        { question: "Sabit fiyat sunuyor musunuz?", answer: "Evet. Dalaman Havalimanı - Fethiye, Göcek, Kalkan ve Kaş gibi popüler rotalarda net sabit destinasyon fiyatları kullanılır." },
        { question: "Rezervasyon ücreti nasıl çalışır?", answer: "Rezervasyonu onaylamak için online küçük bir ücret ödersiniz. Kalan bakiye transfer sırasında ödenir." },
        { question: "Kalan bakiyeyi kartla ödeyebilir miyim?", answer: "Evet. Kalan bakiye transfer sırasında nakit veya kredi kartıyla ödenebilir." },
        { question: "Havalimanı karşılama var mı?", answer: "Evet. Dalaman Havalimanı transferlerinde karşılama hizmeti sunulur." },
        { question: "Uçağım rötar yaparsa ne olur?", answer: "Varış bilgileriniz üzerinden transfer detayları koordine edilir, böylece karşılama süreci net ve stressiz kalır." },
        { question: "Hangi bölgelere hizmet veriyorsunuz?", answer: "Dalaman Havalimanı, Fethiye, Ölüdeniz, Hisarönü, Ovacık, Çalış, Göcek, Kalkan, Kaş ve yakın turistik destinasyonlar ana hizmet bölgesidir." },
        { question: "Transferimde hangi araç kullanılacak?", answer: "Özel VIP transferler konforlu Mercedes-Benz Vito araçlarla sağlanır." },
        { question: "Gidiş dönüş transfer ayırabilir miyim?", answer: "Evet. Rezervasyon modülünde tek yön veya gidiş dönüş transfer seçebilirsiniz." },
        { question: "Hizmetiniz 7/24 mevcut mu?", answer: "Evet. EMİRSTRANSFER.COM haftanın 7 günü, günün 24 saati transfer hizmeti sağlar." }
      ]
    },
    cta: { eyebrow: "Rezervasyona hazır mısınız?", title: "Dalaman Havalimanı Transferinizi Şimdi Ayırtın", text: "Online rezervasyon yapın ve kalan bakiyeyi transfer sırasında ödeyin." },
    footer: {
      description: "EMİRSTRANSFER.COM; Dalaman, Fethiye, Göcek, Kalkan ve Kaş genelinde Mercedes-Benz Vito araçlarla sabit fiyatlı özel VIP transfer hizmeti sunar.",
      quickLinks: "Hızlı Bağlantılar",
      services: "Hizmetler",
      serviceLinks: [
        "Dalaman Havalimanı Transfer",
        "Fethiye Transfer",
        "Kalkan Transfer",
        "Kaş Transfer",
        "Tekne Turu Transferleri"
      ],
      contact: "İletişim",
      privacy: "Gizlilik Politikası",
      terms: "Şartlar ve Koşullar",
      copyright: "© 2026 EMİRSTRANSFER.COM. Tüm hakları saklıdır.",
      serviceArea: "Fethiye / Dalaman / Kaş"
    }
  },
  RU: {
    navItems: [
      { label: "Главная", href: "#home" },
      { label: "VIP трансфер", href: "#vip-transfer" },
      { label: "Другие услуги", href: "#other-services" },
      { label: "Популярные направления", href: "#popular-destinations" },
      { label: "О нас", href: "#about" },
      { label: "Контакты", href: "#contact" }
    ],
    common: {
      bookNow: "Забронировать",
      whatsapp: "WhatsApp",
      contactWhatsapp: "Связаться в WhatsApp",
      viewDetails: "Подробнее",
      selectLanguage: "Выбрать язык",
      vehicle: "Mercedes-Benz Vito",
      fixedPrice: "Фиксированная цена",
      to: "→"
    },
    destinations: {
      "Dalaman Airport": "Аэропорт Даламан",
      Fethiye: "Фетхие",
      Oludeniz: "Олюдениз",
      Hisaronu: "Хисароню",
      Ovacik: "Оваджик",
      Calis: "Чалыш",
      Gocek: "Гёджек",
      Kalkan: "Калкан",
      Kas: "Каш"
    },
    durationLabel: (duration: string) =>
      duration.replace("min", "мин").replace("1 hr 45 мин", "1 ч 45 мин").replace("2 hr 10 мин", "2 ч 10 мин"),
    booking: {
      transferType: "Трансфер из аэропорта",
      tripType: "Тип поездки",
      oneWay: "В одну сторону",
      roundTrip: "Туда и обратно",
      from: "Откуда",
      to: "Куда",
      departureDate: "Дата выезда",
      departureTime: "Время выезда",
      passengers: "Пассажиры",
      search: "Поиск",
      swap: "Поменять местами пункт отправления и назначения",
      passengerLabel: (count: number) => `${count} ${count === 1 ? "пассажир" : count < 5 ? "пассажира" : "пассажиров"}`,
      fixedFound: (price: number) =>
        `Фиксированная цена найдена: GBP ${price}. Бронирование оплачивается онлайн; остаток оплачивается во время трансфера.`,
      routeRequest: "Запрос маршрута получен. Фиксированная цена будет подтверждена на этапе бронирования.",
      fixedPreview: (price: number, from: string, to: string) =>
        `Предварительная фиксированная цена: GBP ${price} за маршрут ${from} - ${to}. Оплатите небольшой сбор онлайн, остаток оплатите во время трансфера наличными или картой.`,
      paymentNote: "Оплатите небольшой сбор онлайн. Остаток оплачивается во время трансфера наличными или картой."
    },
    hero: {
      eyebrow: "Аэропорт Даламан - Фетхие - Калкан - Каш",
      title: "Премиальные VIP трансферы из аэропорта Даламан",
      mobileTitle: ["Премиальные VIP", "трансферы из", "аэропорта Даламан"],
      text: "Частные трансферы в Фетхие, Гёджек, Калкан, Каш и ближайшие направления с фиксированными ценами, Mercedes-Benz Vito, сервисом 24/7 и встречей в аэропорту.",
      primaryCta: "Забронировать трансфер",
      secondaryCta: "Посмотреть цены",
      trust: ["Безопасный частный трансфер", "Фиксированные цены", "Сервис 24/7"]
    },
    routes: {
      eyebrow: "Прозрачные цены",
      title: "Популярные направления и фиксированные цены",
      text: "Выбирайте понятные фиксированные цены на самые востребованные направления между Даламаном и Кашем."
    },
    vip: {
      eyebrow: "Опыт VIP трансфера",
      title: "Частные трансферы, созданные для комфорта",
      text: "Премиальный, но доступный трансфер для иностранных туристов, прибывающих на Турецкую Ривьеру."
    },
    experienceCards: [
      { title: "Комфорт Mercedes-Benz Vito", text: "Частные трансферы Vito с просторными сиденьями, местом для багажа и спокойной поездкой." },
      { title: "Встреча в аэропорту", text: "Плавное прибытие в аэропорт Даламан с понятными деталями встречи." },
      { title: "Трансфер 24/7", text: "Поддержка ранних рейсов, поздних прибытий и праздничных расписаний круглосуточно." },
      { title: "Фиксированные цены", text: "Знайте цену маршрута до бронирования без неожиданных доплат." },
      { title: "От двери до двери", text: "Прямые поездки к отелям, виллам, маринам, районам и туристическим местам." },
      { title: "Легкое онлайн-бронирование", text: "Удобный процесс с маршрутом, датой, временем и количеством пассажиров." }
    ],
    otherServices: {
      eyebrow: "Больше, чем аэропорт",
      title: "Другие услуги",
      text: "Городские туры, минибусы, марина и трансферы к морским турам для гостей региона Фетхие."
    },
    services: [
      { title: "Частные городские туры", text: "Комфортные туры на минибусе для знакомства с Фетхие и окрестностями.", badge: "Городские туры" },
      { title: "Групповые туры на минибусе", text: "Минибус для небольших групп, планирующих спокойный день в регионе.", badge: "Группы" },
      { title: "Трансферы к морским турам", text: "Трансферы к маринам, точкам встречи и отправлениям на побережье.", badge: "Морские туры" },
      { title: "Гёджек и марины", text: "Частный транспорт для встреч в марине, яхт и планов на побережье Гёджека.", badge: "Марина" },
      { title: "Виллы и районы", text: "Подача и высадка у вилл, районов, марин и ближайших туристических мест.", badge: "Подача" },
      { title: "Индивидуальные маршруты", text: "Гибкие маршруты по Фетхие, Олюденизу, Хисароню, Оваджику, Чалышу и рядом.", badge: "Индивидуально" }
    ],
    fleet: {
      eyebrow: "Наш автопарк",
      title: "VIP автомобили Mercedes-Benz Vito",
      text: "Mercedes-Benz Vito создает спокойный частный трансфер для аэропорта, прибрежных маршрутов и поездок от двери до двери.",
      features: ["Комфортные частные места", "Кондиционированный салон", "Просторное место для багажа", "Чистые и ухоженные автомобили"],
      cta: "Забронировать Vito",
      imageAlt: "Черный Mercedes-Benz Vito для частного VIP трансфера"
    },
    why: {
      eyebrow: "Почему выбирают нас?",
      title: "Почему EMİRSTRANSFER?",
      text: "Все, что нужно туристу для уверенного бронирования частного трансфера из аэропорта.",
      cards: [
        { title: "Фиксированные цены", text: "Понятные цены маршрутов до бронирования для уверенности и прозрачности." },
        { title: "Сервис 24/7", text: "Трансферы для ранних вылетов, поздних прибытий и меняющихся планов." },
        { title: "Встреча в аэропорту", text: "Поддержка в аэропорту Даламан и прямой частный трансфер." },
        { title: "VIP автомобили", text: "Mercedes-Benz Vito подготовлены для комфортных частных поездок." },
        { title: "Легкое бронирование", text: "Быстрый путь с маршрутом, датой, временем, пассажирами и типом поездки." },
        { title: "Оплата остатка", text: "Остаток можно оплатить во время трансфера наличными или картой." }
      ]
    },
    reservation: {
      eyebrow: "Простой процесс",
      title: "Как работает бронирование",
      text: "Оплатите небольшой сбор онлайн. Остаток оплатите во время трансфера наличными или картой.",
      steps: [
        { title: "Выберите маршрут", text: "Укажите место подачи, назначение, дату, время, пассажиров и тип трансфера." },
        { title: "Оплатите сбор", text: "Оплатите небольшой сбор онлайн, чтобы подтвердить трансфер." },
        { title: "Встретьте водителя", text: "Водитель встретит вас в аэропорту или в согласованной точке." },
        { title: "Оплатите остаток", text: "Остаток оплачивается во время трансфера наличными или картой." }
      ]
    },
    testimonials: {
      eyebrow: "Иностранные гости",
      title: "Что говорят гости",
      text: "Короткие практичные отзывы гостей, бронирующих частные трансферы по Турецкой Ривьере.",
      items: [
        { quote: "Встреча в аэропорту прошла гладко, цена была точно как на сайте. Отличное начало отдыха в Фетхие.", name: "Emma R.", country: "Великобритания" },
        { quote: "Чистый автомобиль, простое бронирование и достаточно места для багажа нашей семьи. Фиксированная цена удобна.", name: "Sergey M.", country: "Россия" },
        { quote: "Мы забронировали Даламан - Каш заранее. Встреча была понятной, поездка безопасной и спокойной.", name: "Lin Z.", country: "Китай" }
      ]
    },
    faq: {
      eyebrow: "Перед бронированием",
      title: "Частые вопросы",
      text: "Ответы о прибытии, фиксированных ценах, оплате, автомобилях и зоне обслуживания.",
      items: [
        { question: "Как забронировать трансфер?", answer: "Выберите маршрут, дату, время, количество пассажиров и тип поездки в модуле бронирования." },
        { question: "У вас фиксированные цены?", answer: "Да. Популярные маршруты из аэропорта Даламан в Фетхие, Гёджек, Калкан и Каш имеют фиксированные цены." },
        { question: "Как работает сбор за бронирование?", answer: "Вы оплачиваете небольшой сбор онлайн для подтверждения. Остаток оплачивается во время трансфера." },
        { question: "Можно ли оплатить остаток картой?", answer: "Да. Остаток можно оплатить во время трансфера наличными или кредитной картой." },
        { question: "Есть ли встреча в аэропорту?", answer: "Да. Для трансферов из аэропорта Даламан доступна услуга встречи." },
        { question: "Что если рейс задержится?", answer: "Детали трансфера можно согласовать по информации о прибытии, чтобы встреча оставалась понятной." },
        { question: "Какие районы вы обслуживаете?", answer: "Аэропорт Даламан, Фетхие, Олюдениз, Хисароню, Оваджик, Чалыш, Гёджек, Калкан, Каш и ближайшие туристические направления." },
        { question: "Какой автомобиль будет использоваться?", answer: "Частные VIP трансферы выполняются на комфортных Mercedes-Benz Vito." },
        { question: "Можно забронировать туда и обратно?", answer: "Да. В модуле можно выбрать поездку в одну сторону или туда и обратно." },
        { question: "Услуги доступны 24/7?", answer: "Да. EMİRSTRANSFER.COM предоставляет трансферы 24 часа в сутки, 7 дней в неделю." }
      ]
    },
    cta: { eyebrow: "Готовы забронировать?", title: "Забронируйте трансфер из Даламана сейчас", text: "Забронируйте онлайн и оплатите остаток во время трансфера." },
    footer: {
      description: "EMİRSTRANSFER.COM предоставляет частные VIP трансферы по Даламану, Фетхие, Гёджеку, Калкану и Кашу на Mercedes-Benz Vito с фиксированными ценами.",
      quickLinks: "Быстрые ссылки",
      services: "Услуги",
      serviceLinks: [
        "Трансфер из аэропорта Даламан",
        "Трансфер в Фетхие",
        "Трансфер в Калкан",
        "Трансфер в Каш",
        "Трансферы к морским турам"
      ],
      contact: "Контакты",
      privacy: "Политика конфиденциальности",
      terms: "Условия",
      copyright: "© 2026 EMİRSTRANSFER.COM. Все права защищены.",
      serviceArea: "Фетхие / Даламан / Каш"
    }
  },
  ZH: {
    navItems: [
      { label: "首页", href: "#home" },
      { label: "VIP接送", href: "#vip-transfer" },
      { label: "其他服务", href: "#other-services" },
      { label: "热门目的地", href: "#popular-destinations" },
      { label: "关于我们", href: "#about" },
      { label: "联系", href: "#contact" }
    ],
    common: {
      bookNow: "立即预订",
      whatsapp: "WhatsApp",
      contactWhatsapp: "通过 WhatsApp 联系",
      viewDetails: "查看详情",
      selectLanguage: "选择语言",
      vehicle: "Mercedes-Benz Vito",
      fixedPrice: "固定价格",
      to: "至"
    },
    destinations: {
      "Dalaman Airport": "达拉曼机场",
      Fethiye: "费特希耶",
      Oludeniz: "厄吕代尼兹",
      Hisaronu: "希萨勒尼",
      Ovacik: "奥瓦哲克",
      Calis: "查利什",
      Gocek: "格杰克",
      Kalkan: "卡尔坎",
      Kas: "卡什"
    },
    durationLabel: (duration: string) =>
      duration.replace("45 min", "45 分钟").replace("60 min", "60 分钟").replace("40 min", "40 分钟").replace("25 min", "25 分钟").replace("1 hr 45 min", "1小时45分钟").replace("2 hr 10 min", "2小时10分钟"),
    booking: {
      transferType: "机场接送",
      tripType: "行程类型",
      oneWay: "单程",
      roundTrip: "往返",
      from: "出发地",
      to: "目的地",
      departureDate: "出发日期",
      departureTime: "出发时间",
      passengers: "乘客",
      search: "搜索",
      swap: "交换出发地和目的地",
      passengerLabel: (count: number) => `${count} 位乘客`,
      fixedFound: (price: number) => `已找到固定价格：GBP ${price}。在线支付预订费，余款在接送途中支付。`,
      routeRequest: "已收到路线请求。固定价格可在预订步骤确认。",
      fixedPreview: (price: number, from: string, to: string) =>
        `${from} 至 ${to} 固定价格预览：GBP ${price}。在线支付少量预订费，余款可在接送途中以现金或信用卡支付。`,
      paymentNote: "在线支付少量预订费。余款可在接送途中以现金或信用卡支付。"
    },
    hero: {
      eyebrow: "达拉曼机场 - 费特希耶 - 卡尔坎 - 卡什",
      title: "从达拉曼机场出发的高端 VIP 接送",
      mobileTitle: ["高端 VIP", "达拉曼机场", "私人接送"],
      text: "前往费特希耶、格杰克、卡尔坎、卡什及周边目的地的私人机场接送，固定价格、Mercedes-Benz Vito 车辆、24/7 服务和机场迎接。",
      primaryCta: "预订接送",
      secondaryCta: "查看固定价格",
      trust: ["安全私人接送", "固定路线价格", "24/7 服务"]
    },
    routes: {
      eyebrow: "透明价格",
      title: "热门目的地与固定价格",
      text: "选择达拉曼至卡什之间最受欢迎目的地的清晰固定价格接送。"
    },
    vip: {
      eyebrow: "VIP 接送体验",
      title: "为舒适而设计的私人接送",
      text: "面向来到土耳其里维埃拉的国际游客，提供高端但易于预订的接送体验。"
    },
    experienceCards: [
      { title: "Mercedes-Benz Vito 舒适体验", text: "宽敞座位、充足行李空间和安静舒适的私人 Vito 接送。" },
      { title: "机场迎接服务", text: "在达拉曼机场获得清晰的接机信息和顺畅的抵达体验。" },
      { title: "24/7 接送服务", text: "支持早班机、晚到航班和假期行程，全天候可用。" },
      { title: "目的地固定价格", text: "预订前即可了解路线价格，热门接送无隐藏费用。" },
      { title: "点到点接送", text: "直达酒店、别墅、码头、区域和周边旅游目的地。" },
      { title: "轻松在线预订", text: "通过路线、日期、时间和乘客信息完成简洁友好的预订流程。" }
    ],
    otherServices: {
      eyebrow: "机场接送之外",
      title: "其他服务",
      text: "为探索费特希耶地区的客人提供精选城市游、小巴、码头和海上游接送服务。"
    },
    services: [
      { title: "私人城市游", text: "适合探索费特希耶及周边亮点的舒适小巴城市游。", badge: "城市游" },
      { title: "小团小巴游", text: "为计划轻松区域一日游的小团体提供旅游小巴服务。", badge: "小团体" },
      { title: "船游与海上游接送", text: "前往码头、船游集合点和海岸出发点的接送。", badge: "海上游" },
      { title: "格杰克与码头接送", text: "适合码头接送、游艇集合点和格杰克海岸行程的私人交通。", badge: "码头" },
      { title: "别墅与区域接送", text: "支持别墅、区域、码头和周边旅游地点的接送。", badge: "接送" },
      { title: "定制区域路线", text: "覆盖费特希耶、厄吕代尼兹、希萨勒尼、奥瓦哲克、查利什及周边的灵活路线。", badge: "定制" }
    ],
    fleet: {
      eyebrow: "我们的车队",
      title: "Mercedes-Benz Vito VIP 车辆",
      text: "Mercedes-Benz Vito 为机场抵达、海岸路线和点到点行程带来安静舒适的私人接送体验。",
      features: ["舒适私人座椅", "空调车厢", "宽敞行李空间", "干净且维护良好的车辆"],
      cta: "预订 Vito 接送",
      imageAlt: "用于私人 VIP 接送的黑色 Mercedes-Benz Vito"
    },
    why: {
      eyebrow: "为什么选择我们？",
      title: "为什么选择 EMİRSTRANSFER？",
      text: "让游客在预订私人机场接送前感到放心所需的一切。",
      cards: [
        { title: "固定价格", text: "预订前即可看到清晰路线价格，透明可信。" },
        { title: "24/7 服务", text: "支持早出发、晚抵达和变化的旅行时间。" },
        { title: "机场迎接", text: "达拉曼机场抵达支持，并直接开始私人接送。" },
        { title: "VIP 车辆", text: "Mercedes-Benz Vito 车辆为舒适私人行程准备。" },
        { title: "轻松预订", text: "路线、日期、时间、乘客数量和行程类型一步完成。" },
        { title: "余款支付简单", text: "余款可在接送途中以现金或信用卡支付。" }
      ]
    },
    reservation: {
      eyebrow: "简单预订流程",
      title: "预订如何进行",
      text: "在线支付少量预订费。余款在接送途中以现金或信用卡支付。",
      steps: [
        { title: "选择路线", text: "选择上车点、目的地、日期、时间、乘客数量和接送类型。" },
        { title: "支付预订费", text: "在线支付少量费用以确认您的接送。" },
        { title: "与司机会合", text: "司机将在机场或约定上车点与您会合。" },
        { title: "支付余款", text: "余款可在接送途中以现金或信用卡支付。" }
      ]
    },
    testimonials: {
      eyebrow: "国际旅客",
      title: "客人评价",
      text: "来自预订土耳其里维埃拉私人接送客人的简短实用反馈。",
      items: [
        { quote: "机场接机非常顺利，价格与网上看到的一致。我们的费特希耶假期有了舒适的开始。", name: "Emma R.", country: "英国" },
        { quote: "车辆干净，预订简单，家人的行李空间也足够。固定价格让人放心。", name: "Sergey M.", country: "俄罗斯" },
        { quote: "我们提前预订了达拉曼到卡什的接送。接机信息清楚，旅程安全又放松。", name: "Lin Z.", country: "中国" }
      ]
    },
    faq: {
      eyebrow: "预订前",
      title: "常见问题",
      text: "关于机场抵达、固定价格、付款、车辆和服务区域的清晰回答。",
      items: [
        { question: "如何预订接送？", answer: "在预订模块中选择路线、日期、时间、乘客数量和行程类型，然后继续填写预订信息。" },
        { question: "你们提供固定价格吗？", answer: "是的。达拉曼机场至费特希耶、格杰克、卡尔坎和卡什等热门路线采用固定目的地价格。" },
        { question: "预订费如何运作？", answer: "您在线支付少量预订费以确认订单，余款在接送途中支付。" },
        { question: "余款可以刷卡吗？", answer: "可以。余款可在接送途中以现金或信用卡支付。" },
        { question: "提供机场迎接吗？", answer: "是的。达拉曼机场接送提供机场迎接服务。" },
        { question: "如果航班延误怎么办？", answer: "可根据您的抵达信息协调接送细节，确保接机清晰且轻松。" },
        { question: "服务覆盖哪些区域？", answer: "核心服务区域包括达拉曼机场、费特希耶、厄吕代尼兹、希萨勒尼、奥瓦哲克、查利什、格杰克、卡尔坎、卡什及周边旅游目的地。" },
        { question: "接送使用什么车辆？", answer: "私人 VIP 接送使用舒适的 Mercedes-Benz Vito 车辆。" },
        { question: "可以预订往返接送吗？", answer: "可以。您可以在预订模块中选择单程或往返接送。" },
        { question: "服务是否 24/7 可用？", answer: "是的。EMİRSTRANSFER.COM 每周 7 天、每天 24 小时提供接送服务。" }
      ]
    },
    cta: { eyebrow: "准备预订？", title: "立即预订达拉曼机场接送", text: "在线预订，并在接送途中支付余款。" },
    footer: {
      description: "EMİRSTRANSFER.COM 使用舒适的 Mercedes-Benz Vito 车辆，在达拉曼、费特希耶、格杰克、卡尔坎和卡什提供固定价格私人 VIP 接送服务。",
      quickLinks: "快速链接",
      services: "服务",
      serviceLinks: [
        "达拉曼机场接送",
        "费特希耶接送",
        "卡尔坎接送",
        "卡什接送",
        "船游接送"
      ],
      contact: "联系",
      privacy: "隐私政策",
      terms: "条款与条件",
      copyright: "© 2026 EMİRSTRANSFER.COM. 保留所有权利。",
      serviceArea: "费特希耶 / 达拉曼 / 卡什"
    }
  }
};

type PageContent = typeof content.EN;

function getDestinationLabel(t: PageContent, destination: string) {
  return t.destinations[destination as keyof PageContent["destinations"]] ?? destination;
}

function Header({
  selectedLanguageCode,
  onLanguageSelect,
  t
}: {
  selectedLanguageCode: LanguageCode;
  onLanguageSelect: (code: LanguageCode) => void;
  t: PageContent;
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const languageRef = useRef<HTMLDivElement>(null);
  const selectedLanguage = languages.find((language) => language.code === selectedLanguageCode) ?? languages[0];

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!isLangOpen) {
      return;
    }

    const onPointerDown = (event: PointerEvent) => {
      if (!languageRef.current?.contains(event.target as Node)) {
        setIsLangOpen(false);
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsLangOpen(false);
      }
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isLangOpen]);

  function selectLanguage(code: LanguageCode) {
    onLanguageSelect(code);
    setIsLangOpen(false);
  }

  return (
    <header className={`site-header ${isScrolled ? "site-header--scrolled" : ""}`}>
      <div className="container header-inner">
        <a className="brand" href="#home" aria-label="EMİRSTRANSFER.COM home">
          <span className="brand-mark">E</span>
          <span>EMİRSTRANSFER.COM</span>
        </a>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {t.navItems.map((item) => (
            <a key={item.label} className="nav-pill" href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <div className="language" ref={languageRef}>
            <button
              type="button"
              className={`language-trigger ${isLangOpen ? "language-trigger-open" : ""}`}
              aria-haspopup="listbox"
              aria-expanded={isLangOpen}
              onClick={() => setIsLangOpen((open) => !open)}
            >
              <Globe2 size={16} aria-hidden="true" />
              <span>{selectedLanguage.code}</span>
              <ChevronDown className="language-chevron" size={14} aria-hidden="true" />
            </button>
            {isLangOpen && (
              <div className="language-menu" role="listbox" aria-label={t.common.selectLanguage}>
                {languages.map((language) => (
                  <button
                    type="button"
                    role="option"
                    aria-selected={selectedLanguageCode === language.code}
                    className={`language-option ${selectedLanguageCode === language.code ? "selected" : ""}`}
                    key={language.code}
                    onClick={() => selectLanguage(language.code)}
                  >
                    <span className="language-code">{language.code}</span>
                    <span>{language.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
          <a className="whatsapp-link" href="#contact" aria-label="Contact on WhatsApp">
            <MessageCircle size={16} aria-hidden="true" />
            {t.common.whatsapp}
          </a>
          <a className="button button-primary header-book" href="#booking">
            {t.common.bookNow}
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
            {t.navItems.map((item) => (
              <a key={item.label} href={item.href} onClick={() => setIsMenuOpen(false)}>
                {item.label}
              </a>
            ))}
          </nav>
          <div className="mobile-language" aria-label="Language selector">
            {languages.map((language) => (
              <button
                type="button"
                className={selectedLanguageCode === language.code ? "selected" : ""}
                key={language.code}
                onClick={() => {
                  selectLanguage(language.code);
                  setIsMenuOpen(false);
                }}
              >
                <span>{language.code}</span>
                <small>{language.label}</small>
              </button>
            ))}
          </div>
          <div className="mobile-menu-ctas">
            <a className="button button-primary" href="#booking" onClick={() => setIsMenuOpen(false)}>
              {t.common.bookNow}
            </a>
            <a className="button button-outline-dark" href="#contact" onClick={() => setIsMenuOpen(false)}>
              {t.common.contactWhatsapp}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

function BookingWidget({ t }: { t: PageContent }) {
  const [tripType, setTripType] = useState<"one-way" | "round-trip">("one-way");
  const [from, setFrom] = useState("Dalaman Airport");
  const [to, setTo] = useState("Fethiye");
  const [bookingResult, setBookingResult] = useState<"fixed" | "request" | "">("");

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
    setBookingResult(selectedRoute ? "fixed" : "request");
  }

  const bookingMessage =
    bookingResult === "fixed" && selectedRoute
      ? t.booking.fixedFound(selectedRoute.price)
      : bookingResult === "request"
        ? t.booking.routeRequest
        : selectedRoute
          ? t.booking.fixedPreview(
              selectedRoute.price,
              getDestinationLabel(t, selectedRoute.from),
              getDestinationLabel(t, selectedRoute.to)
            )
          : t.booking.paymentNote;

  return (
    <form className="booking-widget" id="booking" onSubmit={handleSubmit}>
      <div className="booking-topline">
        <button type="button" className="transfer-tab active">
          <Plane size={18} aria-hidden="true" />
          {t.booking.transferType}
        </button>
        <div className="trip-tabs" aria-label={t.booking.tripType}>
          <button
            type="button"
            className={tripType === "one-way" ? "active" : ""}
            onClick={() => setTripType("one-way")}
          >
            {t.booking.oneWay}
          </button>
          <button
            type="button"
            className={tripType === "round-trip" ? "active" : ""}
            onClick={() => setTripType("round-trip")}
          >
            {t.booking.roundTrip}
          </button>
        </div>
      </div>

      <div className="booking-grid">
        <label className="field field-location">
          <span>{t.booking.from}</span>
          <div className="field-control">
            <Plane size={18} aria-hidden="true" />
            <select value={from} onChange={(event) => setFrom(event.target.value)} aria-label={t.booking.from}>
              {destinations.map((destination) => (
                <option key={destination} value={destination}>
                  {getDestinationLabel(t, destination)}
                </option>
              ))}
            </select>
          </div>
        </label>

        <button
          className="swap-button"
          type="button"
          onClick={swapLocations}
          aria-label={t.booking.swap}
        >
          <ArrowLeftRight size={20} aria-hidden="true" />
        </button>

        <label className="field field-location">
          <span>{t.booking.to}</span>
          <div className="field-control">
            <MapPin size={18} aria-hidden="true" />
            <select value={to} onChange={(event) => setTo(event.target.value)} aria-label={t.booking.to}>
              {destinations.map((destination) => (
                <option key={destination} value={destination}>
                  {getDestinationLabel(t, destination)}
                </option>
              ))}
            </select>
          </div>
        </label>

        <label className="field">
          <span>{t.booking.departureDate}</span>
          <div className="field-control">
            <CalendarDays size={18} aria-hidden="true" />
            <input type="date" aria-label={t.booking.departureDate} />
          </div>
        </label>

        <label className="field">
          <span>{t.booking.departureTime}</span>
          <div className="field-control">
            <Clock3 size={18} aria-hidden="true" />
            <input type="time" aria-label={t.booking.departureTime} />
          </div>
        </label>

        <label className="field">
          <span>{t.booking.passengers}</span>
          <div className="field-control">
            <Users size={18} aria-hidden="true" />
            <select defaultValue="1" aria-label={t.booking.passengers}>
              {Array.from({ length: 8 }, (_, index) => String(index + 1)).map((count) => (
                <option key={count} value={count}>
                  {t.booking.passengerLabel(Number(count))}
                </option>
              ))}
            </select>
          </div>
        </label>

        <button className="button button-primary search-button" type="submit">
          <Search size={18} aria-hidden="true" />
          {t.booking.search}
        </button>
      </div>

      <div className="booking-note" aria-live="polite">
        <CreditCard size={18} aria-hidden="true" />
        <span>
          {bookingMessage}
        </span>
      </div>
    </form>
  );
}

export default function Home() {
  const [selectedLanguageCode, setSelectedLanguageCode] = useState<LanguageCode>("EN");
  const t = content[selectedLanguageCode] as PageContent;

  useEffect(() => {
    const storedLanguage = window.localStorage.getItem("emirstransfer-language") as LanguageCode | null;

    if (storedLanguage && languages.some((language) => language.code === storedLanguage)) {
      setSelectedLanguageCode(storedLanguage);
    }
  }, []);

  function selectLanguage(code: LanguageCode) {
    setSelectedLanguageCode(code);
    window.localStorage.setItem("emirstransfer-language", code);
  }

  return (
    <>
      <Header selectedLanguageCode={selectedLanguageCode} onLanguageSelect={selectLanguage} t={t} />
      <main>
        <section className="hero" id="home">
          <div className="hero-bg" />
          <div className="container hero-content">
            <div className="hero-booking">
              <BookingWidget t={t} />
            </div>
            <div className="hero-copy">
              <span className="eyebrow">{t.hero.eyebrow}</span>
              <h1>
                <span className="title-desktop">{t.hero.title}</span>
                <span className="title-mobile">
                  {t.hero.mobileTitle.map((line, index) => (
                    <span key={line}>
                      {line}
                      {index < t.hero.mobileTitle.length - 1 && <br />}
                    </span>
                  ))}
                </span>
              </h1>
              <p>{t.hero.text}</p>
              <div className="hero-actions">
                <a className="button button-primary" href="#booking">
                  {t.hero.primaryCta}
                </a>
                <a className="button button-secondary" href="#popular-destinations">
                  {t.hero.secondaryCta}
                </a>
                <a className="button button-ghost" href="#contact">
                  <MessageCircle size={17} aria-hidden="true" />
                  {t.common.contactWhatsapp}
                </a>
              </div>
              <div className="hero-trust" aria-label="Transfer highlights">
                <span>
                  <ShieldCheck size={16} aria-hidden="true" />
                  {t.hero.trust[0]}
                </span>
                <span>
                  <CircleDollarSign size={16} aria-hidden="true" />
                  {t.hero.trust[1]}
                </span>
                <span>
                  <Clock3 size={16} aria-hidden="true" />
                  {t.hero.trust[2]}
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="section" id="popular-destinations">
          <div className="container">
            <div className="section-heading">
              <span className="eyebrow">{t.routes.eyebrow}</span>
              <h2>{t.routes.title}</h2>
              <p>{t.routes.text}</p>
            </div>
            <div className="route-grid">
              {routePrices.map((route) => (
                <article className="route-card" key={`${route.from}-${route.to}`}>
                  <div>
                    <span className="route-label">{t.common.fixedPrice}</span>
                    <h3>
                      {getDestinationLabel(t, route.from)} <span>{t.common.to}</span> {getDestinationLabel(t, route.to)}
                    </h3>
                  </div>
                  <div className="route-meta">
                    <span>
                      <Clock3 size={16} aria-hidden="true" />
                      {t.durationLabel(route.duration)}
                    </span>
                    <span>
                      <Car size={16} aria-hidden="true" />
                      {t.common.vehicle}
                    </span>
                  </div>
                  <div className="route-footer">
                    <strong>GBP {route.price}</strong>
                    <a href="#booking">{t.common.bookNow}</a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section section-soft" id="vip-transfer">
          <div className="container">
            <div className="section-heading section-heading-left">
              <span className="eyebrow">{t.vip.eyebrow}</span>
              <h2>{t.vip.title}</h2>
              <p>{t.vip.text}</p>
            </div>
            <div className="experience-grid">
              {t.experienceCards.map((card, index) => {
                const sourceCard = experienceCards[index];
                const Icon = sourceCard.icon;
                const key = `${selectedLanguageCode}-${card.title}`;
                return (
                  <article className="feature-card" key={key}>
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

        <section className="section" id="other-services">
          <div className="container">
            <div className="section-heading">
              <span className="eyebrow">{t.otherServices.eyebrow}</span>
              <h2>{t.otherServices.title}</h2>
              <p>{t.otherServices.text}</p>
            </div>
            <div className="services-grid">
              {t.services.map((service, index) => {
                const sourceService = services[index];
                const Icon = sourceService.icon;
                return (
                  <article className={`service-card ${index === 0 ? "service-card-main" : ""}`} key={`${selectedLanguageCode}-${service.title}`}>
                    <img src={sourceService.image} alt="" />
                    <div className="service-overlay" />
                    <div className="service-content">
                      <span className="service-badge">
                        <Icon size={15} aria-hidden="true" />
                        {service.badge}
                      </span>
                      <h3>{service.title}</h3>
                      <p>{service.text}</p>
                      <a href="#booking">{t.common.viewDetails}</a>
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
                alt={t.fleet.imageAlt}
              />
            </div>
            <div className="fleet-copy">
              <span className="eyebrow">{t.fleet.eyebrow}</span>
              <h2>{t.fleet.title}</h2>
              <p>{t.fleet.text}</p>
              <ul className="fleet-list">
                {t.fleet.features.map((feature) => (
                  <li key={feature}>
                    <CheckCircle2 size={18} aria-hidden="true" />
                    {feature}
                  </li>
                ))}
              </ul>
              <a className="button button-primary" href="#booking">
                {t.fleet.cta}
              </a>
            </div>
          </div>
        </section>

        <section className="why-band" id="about">
          <div className="container">
            <div className="section-heading light">
              <span className="eyebrow">{t.why.eyebrow}</span>
              <h2>{t.why.title}</h2>
              <p>{t.why.text}</p>
            </div>
            <div className="why-grid">
              {t.why.cards.map((item, index) => {
                const Icon = whyChoose[index].icon;
                return (
                  <article className="why-item" key={`${selectedLanguageCode}-${item.title}`}>
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
              <span className="eyebrow">{t.reservation.eyebrow}</span>
              <h2>{t.reservation.title}</h2>
              <p>{t.reservation.text}</p>
            </div>
            <div className="steps-grid">
              {t.reservation.steps.map((step, index) => {
                const Icon = steps[index].icon;
                return (
                  <article className="step-card" key={`${selectedLanguageCode}-${step.title}`}>
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
              <span className="eyebrow">{t.testimonials.eyebrow}</span>
              <h2>{t.testimonials.title}</h2>
              <p>{t.testimonials.text}</p>
            </div>
            <div className="testimonial-grid">
              {t.testimonials.items.map((testimonial) => (
                <article className="testimonial-card" key={`${selectedLanguageCode}-${testimonial.name}`}>
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
              <span className="eyebrow">{t.faq.eyebrow}</span>
              <h2>{t.faq.title}</h2>
              <p>{t.faq.text}</p>
            </div>
            <div className="faq-list">
              {t.faq.items.map((faq) => (
                <details key={`${selectedLanguageCode}-${faq.question}`}>
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
              <span className="eyebrow">{t.cta.eyebrow}</span>
              <h2>{t.cta.title}</h2>
              <p>{t.cta.text}</p>
            </div>
            <div className="cta-actions">
              <a className="button button-light" href="#booking">
                {t.common.bookNow}
              </a>
              <a className="button button-cta-outline" href="#contact">
                <MessageCircle size={17} aria-hidden="true" />
                {t.common.contactWhatsapp}
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
            <p>{t.footer.description}</p>
          </div>
          <div>
            <h3>{t.footer.quickLinks}</h3>
            {t.navItems.map((item) => (
              <a href={item.href} key={`footer-${item.href}`}>
                {item.label}
              </a>
            ))}
          </div>
          <div>
            <h3>{t.footer.services}</h3>
            {t.footer.serviceLinks.map((serviceLink, index) => (
              <a href={index === t.footer.serviceLinks.length - 1 ? "#other-services" : "#booking"} key={serviceLink}>
                {serviceLink}
              </a>
            ))}
          </div>
          <div>
            <h3>{t.footer.contact}</h3>
            <a href="tel:+900000000000">
              <UserRound size={16} aria-hidden="true" />
              +90 000 000 00 00
            </a>
            <a href="#contact">
              <MessageCircle size={16} aria-hidden="true" />
              {t.common.whatsapp}
            </a>
            <a href="mailto:info@emirstransfer.com">
              <Mail size={16} aria-hidden="true" />
              info@emirstransfer.com
            </a>
            <span>
              <MapPin size={16} aria-hidden="true" />
              {t.footer.serviceArea}
            </span>
          </div>
        </div>
        <div className="container footer-bottom">
          <span>{t.footer.copyright}</span>
          <div>
            <a href="#contact">{t.footer.privacy}</a>
            <a href="#contact">{t.footer.terms}</a>
          </div>
        </div>
      </footer>
    </>
  );
}
