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

export const dictionaries = {
  en: {
    seo: {
      title: "EMIRSTRANSFER.COM | Dalaman Airport VIP Transfer to Fethiye, Kalkan & Kas",
      description:
        "Book private VIP transfers from Dalaman Airport to Fethiye, Gocek, Kalkan and Kas. Fixed prices, Mercedes-Benz Vito vehicles, 24/7 service and airport meet and greet.",
      keywords: [
        "Dalaman Airport Transfer",
        "Fethiye Transfer",
        "Dalaman to Fethiye Transfer",
        "Dalaman Airport to Kalkan Transfer",
        "Dalaman Airport to Kas Transfer",
        "VIP Transfer Fethiye",
        "Private Airport Transfer Turkey"
      ]
    },
    brand: {
      mark: "E",
      name: "EMİRSTRANSFER.COM",
      phone: "+90 000 000 00 00",
      phoneHref: "+900000000000",
      email: "info@emirstransfer.com"
    },
    navItems: [
      { label: "Home", href: "/" },
      { label: "Popular Destinations", href: "#popular-destinations" },
      { label: "Other Services", href: "/other-services" },
      { label: "About", href: "#hakkimizda" },
      { label: "Contact", href: "#iletisim" }
    ],
    common: {
      bookNow: "Book Now",
      whatsapp: "WhatsApp",
      contactWhatsapp: "Contact on WhatsApp",
      whatsappInquiry: "Hello, I would like to get information about your VIP transfer service.",
      viewDetails: "View Details",
      selectLanguage: "Select language",
      vehicle: "Mercedes-Benz Vito",
      fixedPrice: "Fixed price",
      to: "to"
    },
    language: {
      en: "English",
      tr: "Türkçe",
      ru: "Русский",
      zh: "中文"
    },
    a11y: {
      home: "EMİRSTRANSFER.COM home",
      primaryNavigation: "Primary navigation",
      contactWhatsapp: "Contact on WhatsApp",
      openMobileMenu: "Open mobile menu",
      mobileNavigation: "Mobile navigation",
      languageSelector: "Language selector",
      transferHighlights: "Transfer highlights",
      fiveStarRating: "5 star rating"
    },
    destinations: {
      "Dalaman Airport": "Dalaman Airport",
      Fethiye: "Fethiye",
      Oludeniz: "Ölüdeniz",
      Hisaronu: "Hisarönü",
      Ovacik: "Ovacık",
      Calis: "Çalış",
      Gocek: "Göcek",
      Kalkan: "Kalkan",
      Kas: "Kaş"
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
      datePlaceholder: "DD.MM.YYYY",
      passengers: "Passengers",
      search: "Search Transfer",
      swap: "Swap departure and arrival locations",
      passengerLabel: (count: number) => `${count} ${count === 1 ? "Passenger" : "Passengers"}`,
      fixedFound: (price: number) =>
        `Fixed price found: GBP ${price}. Your reservation fee is paid online; the remaining balance is paid during transfer.`,
      routeRequest: "Route request received. Fixed pricing can be confirmed in the reservation step.",
      fixedPreview: (price: number, from: string, to: string) =>
        `Fixed price preview: GBP ${price} for ${from} to ${to}. Pay a small reservation fee online, then pay the remaining balance during your transfer by cash or credit card.`,
      paymentNote:
        "Pay a small reservation fee online. Pay the remaining balance during your transfer by cash or credit card.",
      returnDate: "Return Date",
      returnTime: "Return Time",
      selectLocation: "Select location",
      loading: "Searching",
      continueReservation: "Continue Reservation",
      resultAvailableTitle: "Your route is available",
      resultUnavailableTitle: "Route needs confirmation",
      resultAvailableText:
        "Your route is available. Pay a small reservation fee online and pay the remaining balance during your transfer by cash or credit card.",
      resultUnavailableText: "No fixed price found for this route. Please contact us on WhatsApp.",
      routeLabel: "Route",
      tripLabel: "Trip Type",
      dateLabel: "Departure",
      returnLabel: "Return",
      vehicleLabel: "Vehicle",
      totalPriceLabel: "Total price",
      reservationFeeLabel: "Reservation fee",
      remainingBalanceLabel: "Remaining balance",
      increasePassengers: "Increase passengers",
      decreasePassengers: "Decrease passengers",
      whatsappIntro: "Hello, I would like to book a VIP transfer.",
      errors: {
        fromRequired: "Please select a pickup location.",
        toRequired: "Please select a destination.",
        sameLocations: "Pickup and destination cannot be the same.",
        dateRequired: "Please select a departure date.",
        timeRequired: "Please select a departure time.",
        returnDateRequired: "Please select a return date.",
        returnTimeRequired: "Please select a return time.",
        pastDate: "Please select today or a future date.",
        returnBeforeDeparture: "Return date cannot be before the departure date.",
        passengersRequired: "Please select between 1 and 8 passengers."
      }
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
      text: "Alongside VIP transfer, explore private minibus city tours and private boat rental options.",
      minibusTour: {
        title: "Minibus City Tour",
        subtitle: "Private minibus tours",
        description:
          "Explore Fethiye, Oludeniz, Gocek, Kas and nearby popular destinations with comfortable Mercedes-Benz Sprinter vehicles.",
        cta: "Contact on WhatsApp",
        whatsappMessage: "Hello, I would like to get information about the Minibus City Tour."
      },
      boatRental: {
        title: "Private Tour Boat Rental",
        subtitle: "Private sea tours",
        description:
          "Enjoy a private boat experience with flexible routes, beautiful bays, and a comfortable sea tour plan.",
        cta: "Contact on WhatsApp",
        whatsappMessage: "Hello, I would like to get information about Private Tour Boat Rental."
      }
    },
    services: [
      {
        title: "Minibüsle Şehir Turu",
        text: "Fethiye, Ölüdeniz, Göcek, Kaş ve çevresindeki popüler noktaları konforlu Mercedes-Benz Sprinter araçlarla keşfedin.",
        badge: "Minibus City Tour",
        cta: "Şehir Turlarını İncele"
      },
      {
        title: "Özel Tur Teknesi Kiralama",
        text: "Size özel planlanabilen rota seçenekleriyle koyları ve deniz turu deneyimini konforlu şekilde yaşayın.",
        badge: "Private Tour Boat Rental",
        cta: "Tekne Kiralamayı İncele"
      }
    ],
    fleet: {
      eyebrow: "Our fleet",
      title: "Mercedes-Benz Vito & Sprinter Fleet",
      text:
        "Comfortable Mercedes-Benz Vito vehicles support private VIP transfers, while Mercedes-Benz Sprinter vehicles serve private minibus city tours and larger group plans.",
      features: [
        "Comfortable private seating",
        "Air-conditioned interior",
        "Spacious luggage capacity",
        "Clean and well-maintained vehicles"
      ],
      vehicles: [
        {
          name: "Mercedes-Benz Vito",
          role: "VIP Transfer",
          description: "Comfortable private airport and door-to-door transfers for guests traveling across Dalaman, Fethiye, Kalkan and Kas.",
          imageAlt: "Black Mercedes-Benz Vito prepared for private VIP transfer"
        },
        {
          name: "Mercedes-Benz Sprinter",
          role: "Minibus City Tour",
          description: "A spacious minibus option for private city tours, group routes, and comfortable regional travel plans.",
          imageAlt: "Silver Mercedes-Benz Sprinter prepared for private minibus city tours"
        }
      ],
      cta: "Book Your Transfer",
      imageAlt: "Mercedes-Benz Vito and Sprinter fleet vehicles"
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
      title: "Plan Your Comfortable VIP Transfer Experience",
      text: "Book online and pay the remaining balance during your transfer by cash or credit card."
    },
    bookPage: {
      eyebrow: "Reservation Details",
      title: "Complete Your VIP Transfer Reservation",
      description:
        "Review your route details below. Online payment integration will be connected in a later step; this page is ready for the booking flow.",
      backHome: "Back to Homepage",
      summaryTitle: "Transfer Summary",
      route: "Route",
      tripType: "Trip type",
      departure: "Departure",
      return: "Return",
      passengers: "Passengers",
      vehicle: "Vehicle",
      totalPrice: "Total fixed price",
      reservationFee: "10% reservation fee",
      remainingBalance: "Remaining balance payable during transfer",
      routeNotFound: "No fixed price was found for this route. Please contact us on WhatsApp.",
      missingValue: "-",
      balancePaymentNote: "The remaining balance can be paid during your transfer by cash or credit card.",
      form: {
        title: "Reservation Details",
        description: "Enter your contact and pickup details to prepare your VIP transfer request.",
        fullName: "Full name",
        fullNamePlaceholder: "Your full name",
        phone: "Phone / WhatsApp",
        phonePlaceholder: "+44 7000 000000",
        email: "Email",
        emailPlaceholder: "you@example.com",
        flightNumber: "Flight number",
        flightNumberPlaceholder: "TK 1234",
        pickupAddress: "Pickup address or hotel name",
        pickupAddressPlaceholder: "Hotel, villa, marina or full pickup address",
        notes: "Notes",
        notesPlaceholder: "Baby seat, extra luggage, arrival details...",
        optional: "Optional",
        requiredNote: "Required fields must be completed before continuing.",
        submit: "Send Reservation on WhatsApp",
        openingWhatsapp: "Opening WhatsApp"
      },
      success: {
        eyebrow: "Request prepared",
        title: "Your reservation details are ready",
        text: "WhatsApp has been opened with your prefilled transfer request. You can review and send the message to complete the MVP reservation flow.",
        sendAgain: "Open WhatsApp Again",
        newReservation: "Start a New Reservation"
      },
      errors: {
        fullNameRequired: "Please enter your full name.",
        phoneRequired: "Please enter your phone or WhatsApp number.",
        emailRequired: "Please enter your email address.",
        emailInvalid: "Please enter a valid email address.",
        flightNumberRequired: "Please enter your flight number.",
        pickupAddressRequired: "Please enter your pickup address or hotel name.",
        routeUnavailable: "This route does not have a confirmed fixed price yet."
      },
      whatsapp: {
        intro: "Hello, I would like to confirm a VIP transfer reservation.",
        customerDetails: "Customer details",
        transferDetails: "Transfer details",
        priceDetails: "Price details",
        notProvided: "Not provided"
      }
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
  tr: {
    seo: {
      title: "EMİRSTRANSFER.COM | Dalaman Havalimanı VIP Transfer",
      description:
        "Dalaman Havalimanı'ndan Fethiye, Göcek, Kalkan ve Kaş'a özel VIP transfer rezervasyonu yapın. Sabit fiyatlar, Mercedes-Benz Vito araçlar, 7/24 hizmet ve havalimanı karşılama.",
      keywords: [
        "Dalaman Havalimanı Transfer",
        "Fethiye Transfer",
        "Dalaman Fethiye Transfer",
        "Dalaman Kalkan Transfer",
        "Dalaman Kaş Transfer",
        "VIP Transfer Fethiye",
        "Özel Havalimanı Transferi"
      ]
    },
    brand: {
      mark: "E",
      name: "EMİRSTRANSFER.COM",
      phone: "+90 000 000 00 00",
      phoneHref: "+900000000000",
      email: "info@emirstransfer.com"
    },
    navItems: [
      { label: "Ana Sayfa", href: "/" },
      { label: "Popüler Destinasyonlar", href: "#popular-destinations" },
      { label: "Diğer Hizmetler", href: "/diger-hizmetler" },
      { label: "Hakkımızda", href: "#hakkimizda" },
      { label: "İletişim", href: "#iletisim" }
    ],
    common: {
      bookNow: "Rezervasyon Yap",
      whatsapp: "WhatsApp",
      contactWhatsapp: "WhatsApp ile İletişim",
      whatsappInquiry: "Merhaba, VIP transfer hizmetiniz hakkında bilgi almak istiyorum.",
      viewDetails: "Detayları Gör",
      selectLanguage: "Dil seç",
      vehicle: "Mercedes-Benz Vito",
      fixedPrice: "Sabit fiyat",
      to: "→"
    },
    language: {
      en: "English",
      tr: "Türkçe",
      ru: "Русский",
      zh: "中文"
    },
    a11y: {
      home: "EMİRSTRANSFER.COM ana sayfa",
      primaryNavigation: "Ana navigasyon",
      contactWhatsapp: "WhatsApp ile iletişime geç",
      openMobileMenu: "Mobil menüyü aç",
      mobileNavigation: "Mobil navigasyon",
      languageSelector: "Dil seçici",
      transferHighlights: "Transfer öne çıkanları",
      fiveStarRating: "5 yıldız değerlendirme"
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
      datePlaceholder: "GG.AA.YYYY",
      passengers: "Yolcular",
      search: "Rezervasyon Ara",
      swap: "Kalkış ve varış noktalarını değiştir",
      passengerLabel: (count: number) => `${count} Yolcu`,
      fixedFound: (price: number) =>
        `Sabit fiyat bulundu: GBP ${price}. Rezervasyon ücretiniz online ödenir; kalan bakiye transfer sırasında ödenir.`,
      routeRequest: "Rota talebiniz alındı. Sabit fiyat rezervasyon adımında onaylanabilir.",
      fixedPreview: (price: number, from: string, to: string) =>
        `${from} - ${to} için sabit fiyat ön izlemesi: GBP ${price}. Online küçük bir rezervasyon ücreti ödeyin, kalan bakiyeyi transfer sırasında nakit veya kredi kartıyla tamamlayın.`,
      paymentNote:
        "Online küçük bir rezervasyon ücreti ödeyin. Kalan bakiyeyi transfer sırasında nakit veya kredi kartıyla ödeyin.",
      returnDate: "Dönüş Tarihi",
      returnTime: "Dönüş Saati",
      selectLocation: "Lokasyon seç",
      loading: "Aranıyor",
      continueReservation: "Rezervasyona Devam Et",
      resultAvailableTitle: "Rotanız uygun",
      resultUnavailableTitle: "Rota onay gerektiriyor",
      resultAvailableText:
        "Rota talebiniz alındı. Sabit fiyat rezervasyon adımında onaylanabilir. Rezervasyon ücretini online ödeyin, kalan tutarı transfer sırasında nakit veya kredi kartı ile tamamlayın.",
      resultUnavailableText: "Bu rota için sabit fiyat bulunamadı. Lütfen WhatsApp üzerinden bizimle iletişime geçin.",
      routeLabel: "Rota",
      tripLabel: "Yolculuk Tipi",
      dateLabel: "Gidiş",
      returnLabel: "Dönüş",
      vehicleLabel: "Araç",
      totalPriceLabel: "Toplam fiyat",
      reservationFeeLabel: "Rezervasyon ücreti",
      remainingBalanceLabel: "Kalan tutar",
      increasePassengers: "Yolcu sayısını artır",
      decreasePassengers: "Yolcu sayısını azalt",
      whatsappIntro: "Merhaba, VIP transfer rezervasyonu yapmak istiyorum.",
      errors: {
        fromRequired: "Lütfen alış lokasyonu seçin.",
        toRequired: "Lütfen varış lokasyonu seçin.",
        sameLocations: "Alış ve varış lokasyonu aynı olamaz.",
        dateRequired: "Lütfen gidiş tarihi seçin.",
        timeRequired: "Lütfen gidiş saati seçin.",
        returnDateRequired: "Lütfen dönüş tarihi seçin.",
        returnTimeRequired: "Lütfen dönüş saati seçin.",
        pastDate: "Lütfen bugün veya ileri bir tarih seçin.",
        returnBeforeDeparture: "Dönüş tarihi gidiş tarihinden önce olamaz.",
        passengersRequired: "Lütfen 1 ile 8 arasında yolcu seçin."
      }
    },
    hero: {
      eyebrow: "Dalaman Havalimanı - Fethiye - Kalkan - Kaş",
      title: "Dalaman Havalimanı'ndan Premium VIP Transfer",
      mobileTitle: ["Premium VIP", "Dalaman Havalimanı", "Transferleri"],
      text:
        "Dalaman Havalimanı’ndan Fethiye, Ölüdeniz, Kalkan ve Kaş’a kadar uzanan VIP transfer hizmetimiz; sabit fiyat politikası, Mercedes-Benz Vito konforu, 7/24 kesintisiz hizmet anlayışı ve özenli havalimanı karşılama deneyimiyle ayrıcalıklı bir ulaşım sunar.",
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
      title: "Konfor İçin Tasarlanmış Özel VIP Transferler",
      text:
        "Türk Rivierası’na gelen uluslararası turistler için Dalaman Havalimanı, Fethiye, Ölüdeniz, Kalkan ve Kaş rotalarında konforlu, güvenilir ve profesyonel özel transfer deneyimi."
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
      text: "VIP transfer hizmetimize ek olarak özel şehir turu ve tekne kiralama seçenekleri sunuyoruz.",
      minibusTour: {
        title: "Minibüsle Şehir Turu",
        subtitle: "Özel minibüs turları",
        description:
          "Fethiye, Ölüdeniz, Göcek, Kaş ve çevresindeki popüler noktaları konforlu Mercedes-Benz Sprinter araçlarla keşfedin.",
        cta: "WhatsApp ile İletişime Geç",
        whatsappMessage: "Merhaba, Minibüsle Şehir Turu hakkında bilgi almak istiyorum."
      },
      boatRental: {
        title: "Özel Tur Teknesi Kiralama",
        subtitle: "Özel deniz turu",
        description:
          "Size özel planlanabilen rota seçenekleriyle koyları ve deniz turu deneyimini konforlu şekilde yaşayın.",
        cta: "WhatsApp ile İletişime Geç",
        whatsappMessage: "Merhaba, Özel Tur Teknesi Kiralama hakkında bilgi almak istiyorum."
      }
    },
    services: [
      {
        title: "Minibüsle Şehir Turu",
        text: "Fethiye, Ölüdeniz, Göcek, Kaş ve çevresindeki popüler noktaları konforlu Mercedes-Benz Sprinter araçlarla keşfedin.",
        badge: "Minibus City Tour",
        cta: "Şehir Turlarını İncele"
      },
      {
        title: "Özel Tur Teknesi Kiralama",
        text: "Size özel planlanabilen rota seçenekleriyle koyları ve deniz turu deneyimini konforlu şekilde yaşayın.",
        badge: "Private Tour Boat Rental",
        cta: "Tekne Kiralamayı İncele"
      }
    ],
    fleet: {
      eyebrow: "Filomuz",
      title: "Mercedes-Benz Vito ve Sprinter Araçlar",
      text: "Mercedes-Benz Vito araçlar özel VIP transferler için, Mercedes-Benz Sprinter araçlar ise minibüsle şehir turu ve daha geniş grup planları için konforlu bir seçenek sunar.",
      features: ["Konforlu özel oturma düzeni", "Klimalı iç mekan", "Geniş bagaj kapasitesi", "Temiz ve bakımlı araçlar"],
      vehicles: [
        {
          name: "Mercedes-Benz Vito",
          role: "VIP Transfer",
          description: "Dalaman, Fethiye, Kalkan ve Kaş hattında özel havalimanı ve kapıdan kapıya transferler için konforlu araç.",
          imageAlt: "Özel VIP transfer için hazırlanmış siyah Mercedes-Benz Vito"
        },
        {
          name: "Mercedes-Benz Sprinter",
          role: "Minibüsle Şehir Turu",
          description: "Özel şehir turları, grup rotaları ve bölgesel yolculuk planları için geniş ve konforlu minibüs seçeneği.",
          imageAlt: "Minibüsle şehir turları için hazırlanmış gri Mercedes-Benz Sprinter"
        }
      ],
      cta: "Transfer Rezervasyonu Yap",
      imageAlt: "Mercedes-Benz Vito ve Sprinter filo araçları"
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
    cta: {
      eyebrow: "REZERVASYONA HAZIR MISINIZ?",
      title: "Konforlu VIP Transfer Deneyiminizi Şimdi Planlayın",
      text: "Online rezervasyon yapın, kalan bakiyeyi transfer sırasında nakit veya kredi kartı ile ödeyin."
    },
    bookPage: {
      eyebrow: "Rezervasyon Detayları",
      title: "VIP Transfer Rezervasyonunuzu Tamamlayın",
      description:
        "Rota detaylarınızı aşağıdan kontrol edin. Online ödeme entegrasyonu sonraki adımda bağlanacak; bu sayfa rezervasyon akışı için hazır.",
      backHome: "Ana Sayfaya Dön",
      summaryTitle: "Transfer Özeti",
      route: "Rota",
      tripType: "Yolculuk tipi",
      departure: "Gidiş",
      return: "Dönüş",
      passengers: "Yolcular",
      vehicle: "Araç",
      totalPrice: "Toplam sabit fiyat",
      reservationFee: "%10 rezervasyon ücreti",
      remainingBalance: "Transfer sırasında ödenecek kalan bakiye",
      routeNotFound: "Bu rota için sabit fiyat bulunamadı. Lütfen WhatsApp üzerinden bizimle iletişime geçin.",
      missingValue: "-",
      balancePaymentNote: "Kalan bakiye transfer sırasında nakit veya kredi kartı ile ödenebilir.",
      form: {
        title: "Rezervasyon Bilgileri",
        description: "VIP transfer talebinizi hazırlamak için iletişim ve karşılama bilgilerinizi girin.",
        fullName: "Ad Soyad",
        fullNamePlaceholder: "Adınız ve soyadınız",
        phone: "Telefon / WhatsApp",
        phonePlaceholder: "+90 500 000 00 00",
        email: "E-posta",
        emailPlaceholder: "ornek@email.com",
        flightNumber: "Uçuş numarası",
        flightNumberPlaceholder: "TK 1234",
        pickupAddress: "Alış adresi veya otel adı",
        pickupAddressPlaceholder: "Otel, villa, marina veya açık alış adresi",
        notes: "Notlar",
        notesPlaceholder: "Bebek koltuğu, ekstra bagaj, varış detayı...",
        optional: "Opsiyonel",
        requiredNote: "Devam etmek için zorunlu alanları doldurun.",
        submit: "Rezervasyonu WhatsApp ile Gönder",
        openingWhatsapp: "WhatsApp açılıyor"
      },
      success: {
        eyebrow: "Talep hazırlandı",
        title: "Rezervasyon bilgileriniz hazır",
        text: "WhatsApp, transfer talebiniz doldurulmuş şekilde açıldı. Mesajı kontrol edip göndererek MVP rezervasyon akışını tamamlayabilirsiniz.",
        sendAgain: "WhatsApp'ı Tekrar Aç",
        newReservation: "Yeni Rezervasyon Başlat"
      },
      errors: {
        fullNameRequired: "Lütfen adınızı ve soyadınızı girin.",
        phoneRequired: "Lütfen telefon veya WhatsApp numaranızı girin.",
        emailRequired: "Lütfen e-posta adresinizi girin.",
        emailInvalid: "Lütfen geçerli bir e-posta adresi girin.",
        flightNumberRequired: "Lütfen uçuş numaranızı girin.",
        pickupAddressRequired: "Lütfen alış adresi veya otel adını girin.",
        routeUnavailable: "Bu rota için onaylı sabit fiyat henüz bulunmuyor."
      },
      whatsapp: {
        intro: "Merhaba, VIP transfer rezervasyonu oluşturmak istiyorum.",
        customerDetails: "Müşteri bilgileri",
        transferDetails: "Transfer bilgileri",
        priceDetails: "Fiyat bilgileri",
        notProvided: "Belirtilmedi"
      }
    },
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
  ru: {
    seo: {
      title: "EMİRSTRANSFER.COM | VIP-трансфер из аэропорта Даламан",
      description:
        "Забронируйте частный VIP-трансфер из аэропорта Даламан в Фетхие, Гёджек, Калкан и Каш. Фиксированные цены, Mercedes-Benz Vito, сервис 24/7 и встреча в аэропорту.",
      keywords: [
        "трансфер аэропорт Даламан",
        "трансфер Фетхие",
        "Даламан Фетхие трансфер",
        "Даламан Калкан трансфер",
        "Даламан Каш трансфер",
        "VIP трансфер Фетхие",
        "частный трансфер Турция"
      ]
    },
    brand: {
      mark: "E",
      name: "EMİRSTRANSFER.COM",
      phone: "+90 000 000 00 00",
      phoneHref: "+900000000000",
      email: "info@emirstransfer.com"
    },
    navItems: [
      { label: "Главная", href: "/" },
      { label: "Популярные направления", href: "#popular-destinations" },
      { label: "Другие услуги", href: "/diger-hizmetler" },
      { label: "О нас", href: "#hakkimizda" },
      { label: "Контакты", href: "#iletisim" }
    ],
    common: {
      bookNow: "Забронировать",
      whatsapp: "WhatsApp",
      contactWhatsapp: "Связаться в WhatsApp",
      whatsappInquiry: "Здравствуйте, я хочу получить информацию о VIP-трансфере.",
      viewDetails: "Подробнее",
      selectLanguage: "Выбрать язык",
      vehicle: "Mercedes-Benz Vito",
      fixedPrice: "Фиксированная цена",
      to: "→"
    },
    language: {
      en: "English",
      tr: "Türkçe",
      ru: "Русский",
      zh: "中文"
    },
    a11y: {
      home: "Главная EMİRSTRANSFER.COM",
      primaryNavigation: "Основная навигация",
      contactWhatsapp: "Связаться в WhatsApp",
      openMobileMenu: "Открыть мобильное меню",
      mobileNavigation: "Мобильная навигация",
      languageSelector: "Выбор языка",
      transferHighlights: "Преимущества трансфера",
      fiveStarRating: "Оценка 5 звезд"
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
      datePlaceholder: "ДД.ММ.ГГГГ",
      passengers: "Пассажиры",
      search: "Найти трансфер",
      swap: "Поменять местами пункт отправления и назначения",
      passengerLabel: (count: number) => `${count} ${count === 1 ? "пассажир" : count < 5 ? "пассажира" : "пассажиров"}`,
      fixedFound: (price: number) =>
        `Фиксированная цена найдена: GBP ${price}. Бронирование оплачивается онлайн; остаток оплачивается во время трансфера.`,
      routeRequest: "Запрос маршрута получен. Фиксированная цена будет подтверждена на этапе бронирования.",
      fixedPreview: (price: number, from: string, to: string) =>
        `Предварительная фиксированная цена: GBP ${price} за маршрут ${from} - ${to}. Оплатите небольшой сбор онлайн, остаток оплатите во время трансфера наличными или картой.`,
      paymentNote: "Оплатите небольшой сбор онлайн. Остаток оплачивается во время трансфера наличными или картой.",
      returnDate: "Дата возвращения",
      returnTime: "Время возвращения",
      selectLocation: "Выбрать локацию",
      loading: "Поиск",
      continueReservation: "Продолжить бронирование",
      resultAvailableTitle: "Маршрут доступен",
      resultUnavailableTitle: "Маршрут требует подтверждения",
      resultAvailableText:
        "Ваш маршрут доступен. Оплатите небольшой сбор онлайн, а остаток оплатите во время трансфера наличными или картой.",
      resultUnavailableText: "Для этого маршрута нет фиксированной цены. Пожалуйста, свяжитесь с нами в WhatsApp.",
      routeLabel: "Маршрут",
      tripLabel: "Тип поездки",
      dateLabel: "Выезд",
      returnLabel: "Возвращение",
      vehicleLabel: "Автомобиль",
      totalPriceLabel: "Итоговая цена",
      reservationFeeLabel: "Сбор за бронирование",
      remainingBalanceLabel: "Остаток",
      increasePassengers: "Увеличить количество пассажиров",
      decreasePassengers: "Уменьшить количество пассажиров",
      whatsappIntro: "Здравствуйте, я хочу забронировать VIP трансфер.",
      errors: {
        fromRequired: "Выберите место подачи.",
        toRequired: "Выберите пункт назначения.",
        sameLocations: "Место подачи и пункт назначения не могут совпадать.",
        dateRequired: "Выберите дату выезда.",
        timeRequired: "Выберите время выезда.",
        returnDateRequired: "Выберите дату возвращения.",
        returnTimeRequired: "Выберите время возвращения.",
        pastDate: "Выберите сегодняшнюю или будущую дату.",
        returnBeforeDeparture: "Дата возвращения не может быть раньше даты выезда.",
        passengersRequired: "Выберите от 1 до 8 пассажиров."
      }
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
      text: "Дополнительно к VIP трансферам доступны частные городские туры на минибусе и аренда частной лодки.",
      minibusTour: {
        title: "Экскурсия по городу на микроавтобусе",
        subtitle: "Частные туры на минибусе",
        description:
          "Исследуйте Фетхие, Олюдениз, Гёджек, Каш и ближайшие направления на комфортных Mercedes-Benz Sprinter.",
        cta: "Связаться в WhatsApp",
        whatsappMessage: "Здравствуйте, я хочу получить информацию о городской экскурсии на микроавтобусе."
      },
      boatRental: {
        title: "Аренда частной прогулочной лодки",
        subtitle: "Частные морские туры",
        description:
          "Насладитесь частной лодочной прогулкой с гибкими маршрутами, красивыми бухтами и комфортным планом морского тура.",
        cta: "Связаться в WhatsApp",
        whatsappMessage: "Здравствуйте, я хочу получить информацию об аренде частной прогулочной лодки."
      }
    },
    services: [
      {
        title: "Minibüsle Şehir Turu",
        text: "Fethiye, Ölüdeniz, Göcek, Kaş ve çevresindeki popüler noktaları konforlu Mercedes-Benz Sprinter araçlarla keşfedin.",
        badge: "Minibus City Tour",
        cta: "Şehir Turlarını İncele"
      },
      {
        title: "Özel Tur Teknesi Kiralama",
        text: "Size özel planlanabilen rota seçenekleriyle koyları ve deniz turu deneyimini konforlu şekilde yaşayın.",
        badge: "Private Tour Boat Rental",
        cta: "Tekne Kiralamayı İncele"
      }
    ],
    fleet: {
      eyebrow: "Наш автопарк",
      title: "Автопарк Mercedes-Benz Vito и Sprinter",
      text: "Mercedes-Benz Vito используется для частных VIP трансферов, а Mercedes-Benz Sprinter подходит для городских туров на минибусе и групповых маршрутов.",
      features: ["Комфортные частные места", "Кондиционированный салон", "Просторное место для багажа", "Чистые и ухоженные автомобили"],
      vehicles: [
        {
          name: "Mercedes-Benz Vito",
          role: "VIP трансфер",
          description: "Комфортный автомобиль для частных трансферов из аэропорта и поездок от двери до двери по маршрутам Даламан, Фетхие, Калкан и Каш.",
          imageAlt: "Черный Mercedes-Benz Vito для частного VIP трансфера"
        },
        {
          name: "Mercedes-Benz Sprinter",
          role: "Тур на минибусе",
          description: "Просторный минибус для частных городских туров, групповых маршрутов и комфортных региональных поездок.",
          imageAlt: "Серый Mercedes-Benz Sprinter для частных городских туров на минибусе"
        }
      ],
      cta: "Забронировать трансфер",
      imageAlt: "Автомобили Mercedes-Benz Vito и Sprinter"
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
    cta: {
      eyebrow: "Готовы забронировать?",
      title: "Спланируйте комфортный VIP-трансфер",
      text: "Забронируйте онлайн и оплатите остаток во время трансфера наличными или картой."
    },
    bookPage: {
      eyebrow: "Детали бронирования",
      title: "Завершите бронирование VIP трансфера",
      description:
        "Проверьте детали маршрута ниже. Интеграция онлайн-оплаты будет подключена на следующем этапе; страница готова для процесса бронирования.",
      backHome: "Вернуться на главную",
      summaryTitle: "Сводка трансфера",
      route: "Маршрут",
      tripType: "Тип поездки",
      departure: "Выезд",
      return: "Возвращение",
      passengers: "Пассажиры",
      vehicle: "Автомобиль",
      totalPrice: "Фиксированная итоговая цена",
      reservationFee: "10% сбор за бронирование",
      remainingBalance: "Остаток к оплате во время трансфера",
      routeNotFound: "Для этого маршрута нет фиксированной цены. Пожалуйста, свяжитесь с нами в WhatsApp.",
      missingValue: "-",
      balancePaymentNote: "Остаток можно оплатить во время трансфера наличными или картой.",
      form: {
        title: "Данные бронирования",
        description: "Введите контактные данные и информацию о месте подачи для VIP-трансфера.",
        fullName: "Полное имя",
        fullNamePlaceholder: "Ваше полное имя",
        phone: "Телефон / WhatsApp",
        phonePlaceholder: "+7 900 000 00 00",
        email: "Email",
        emailPlaceholder: "you@example.com",
        flightNumber: "Номер рейса",
        flightNumberPlaceholder: "TK 1234",
        pickupAddress: "Адрес подачи или название отеля",
        pickupAddressPlaceholder: "Отель, вилла, марина или полный адрес",
        notes: "Примечания",
        notesPlaceholder: "Детское кресло, багаж, детали прибытия...",
        optional: "Необязательно",
        requiredNote: "Заполните обязательные поля перед продолжением.",
        submit: "Отправить бронирование в WhatsApp",
        openingWhatsapp: "Открываем WhatsApp"
      },
      success: {
        eyebrow: "Запрос подготовлен",
        title: "Данные бронирования готовы",
        text: "WhatsApp открыт с заполненным запросом на трансфер. Проверьте сообщение и отправьте его, чтобы завершить MVP-процесс бронирования.",
        sendAgain: "Открыть WhatsApp снова",
        newReservation: "Начать новое бронирование"
      },
      errors: {
        fullNameRequired: "Введите полное имя.",
        phoneRequired: "Введите телефон или номер WhatsApp.",
        emailRequired: "Введите email.",
        emailInvalid: "Введите корректный email.",
        flightNumberRequired: "Введите номер рейса.",
        pickupAddressRequired: "Введите адрес подачи или название отеля.",
        routeUnavailable: "Для этого маршрута пока нет подтвержденной фиксированной цены."
      },
      whatsapp: {
        intro: "Здравствуйте, я хочу подтвердить бронирование VIP-трансфера.",
        customerDetails: "Данные клиента",
        transferDetails: "Детали трансфера",
        priceDetails: "Детали цены",
        notProvided: "Не указано"
      }
    },
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
  zh: {
    seo: {
      title: "EMİRSTRANSFER.COM | 达拉曼机场VIP接送",
      description:
        "预订从达拉曼机场前往费特希耶、格杰克、卡尔坎和卡什的私人VIP接送。固定价格、Mercedes-Benz Vito车辆、24/7服务和机场接机。",
      keywords: [
        "达拉曼机场接送",
        "费特希耶接送",
        "达拉曼到费特希耶接送",
        "达拉曼到卡尔坎接送",
        "达拉曼到卡什接送",
        "费特希耶VIP接送",
        "土耳其私人机场接送"
      ]
    },
    brand: {
      mark: "E",
      name: "EMİRSTRANSFER.COM",
      phone: "+90 000 000 00 00",
      phoneHref: "+900000000000",
      email: "info@emirstransfer.com"
    },
    navItems: [
      { label: "首页", href: "/" },
      { label: "热门目的地", href: "#popular-destinations" },
      { label: "其他服务", href: "/diger-hizmetler" },
      { label: "关于我们", href: "#hakkimizda" },
      { label: "联系", href: "#iletisim" }
    ],
    common: {
      bookNow: "立即预订",
      whatsapp: "WhatsApp",
      contactWhatsapp: "通过 WhatsApp 联系",
      whatsappInquiry: "您好，我想了解 VIP 接送服务。",
      viewDetails: "查看详情",
      selectLanguage: "选择语言",
      vehicle: "Mercedes-Benz Vito",
      fixedPrice: "固定价格",
      to: "至"
    },
    language: {
      en: "English",
      tr: "Türkçe",
      ru: "Русский",
      zh: "中文"
    },
    a11y: {
      home: "EMİRSTRANSFER.COM 首页",
      primaryNavigation: "主导航",
      contactWhatsapp: "通过 WhatsApp 联系",
      openMobileMenu: "打开移动菜单",
      mobileNavigation: "移动导航",
      languageSelector: "语言选择器",
      transferHighlights: "接送亮点",
      fiveStarRating: "5 星评分"
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
      duration
        .replace("30 min", "30 分钟")
        .replace("45 min", "45 分钟")
        .replace("60 min", "60 分钟")
        .replace("90 min", "90 分钟")
        .replace("120 min", "120 分钟"),
    booking: {
      transferType: "机场接送",
      tripType: "行程类型",
      oneWay: "单程",
      roundTrip: "往返",
      from: "出发地",
      to: "目的地",
      departureDate: "出发日期",
      departureTime: "出发时间",
      datePlaceholder: "DD.MM.YYYY",
      passengers: "乘客",
      search: "搜索接送",
      swap: "交换出发地和目的地",
      passengerLabel: (count: number) => `${count} 位乘客`,
      fixedFound: (price: number) => `已找到固定价格：GBP ${price}。在线支付预订费，余款在接送途中支付。`,
      routeRequest: "已收到路线请求。固定价格可在预订步骤确认。",
      fixedPreview: (price: number, from: string, to: string) =>
        `${from} 至 ${to} 固定价格预览：GBP ${price}。在线支付少量预订费，余款可在接送途中以现金或信用卡支付。`,
      paymentNote: "在线支付少量预订费。余款可在接送途中以现金或信用卡支付。",
      returnDate: "返回日期",
      returnTime: "返回时间",
      selectLocation: "选择地点",
      loading: "搜索中",
      continueReservation: "继续预订",
      resultAvailableTitle: "路线可预订",
      resultUnavailableTitle: "路线需要确认",
      resultAvailableText: "您的路线可预订。在线支付少量预订费，余款可在接送途中以现金或信用卡支付。",
      resultUnavailableText: "未找到该路线的固定价格。请通过 WhatsApp 联系我们。",
      routeLabel: "路线",
      tripLabel: "行程类型",
      dateLabel: "出发",
      returnLabel: "返回",
      vehicleLabel: "车辆",
      totalPriceLabel: "总价",
      reservationFeeLabel: "预订费",
      remainingBalanceLabel: "余款",
      increasePassengers: "增加乘客",
      decreasePassengers: "减少乘客",
      whatsappIntro: "您好，我想预订 VIP 接送。",
      errors: {
        fromRequired: "请选择出发地。",
        toRequired: "请选择目的地。",
        sameLocations: "出发地和目的地不能相同。",
        dateRequired: "请选择出发日期。",
        timeRequired: "请选择出发时间。",
        returnDateRequired: "请选择返回日期。",
        returnTimeRequired: "请选择返回时间。",
        pastDate: "请选择今天或未来日期。",
        returnBeforeDeparture: "返回日期不能早于出发日期。",
        passengersRequired: "请选择 1 至 8 位乘客。"
      }
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
      text: "除 VIP 接送外，我们还提供私人小巴城市游和私人游船租赁选择。",
      minibusTour: {
        title: "小巴城市游",
        subtitle: "私人小巴游",
        description: "乘坐舒适的 Mercedes-Benz Sprinter 探索费特希耶、厄吕代尼兹、格杰克、卡什及周边热门目的地。",
        cta: "通过 WhatsApp 联系",
        whatsappMessage: "您好，我想了解小巴城市游。"
      },
      boatRental: {
        title: "私人游船租赁",
        subtitle: "私人海上游",
        description: "享受私人游船体验，灵活路线、美丽海湾和舒适的海上游计划。",
        cta: "通过 WhatsApp 联系",
        whatsappMessage: "您好，我想了解私人游船租赁。"
      }
    },
    services: [
      {
        title: "Minibüsle Şehir Turu",
        text: "Fethiye, Ölüdeniz, Göcek, Kaş ve çevresindeki popüler noktaları konforlu Mercedes-Benz Sprinter araçlarla keşfedin.",
        badge: "Minibus City Tour",
        cta: "Şehir Turlarını İncele"
      },
      {
        title: "Özel Tur Teknesi Kiralama",
        text: "Size özel planlanabilen rota seçenekleriyle koyları ve deniz turu deneyimini konforlu şekilde yaşayın.",
        badge: "Private Tour Boat Rental",
        cta: "Tekne Kiralamayı İncele"
      }
    ],
    fleet: {
      eyebrow: "我们的车队",
      title: "Mercedes-Benz Vito 与 Sprinter 车队",
      text: "Mercedes-Benz Vito 用于私人 VIP 接送，Mercedes-Benz Sprinter 则适合小巴城市游和较大团体路线计划。",
      features: ["舒适私人座椅", "空调车厢", "宽敞行李空间", "干净且维护良好的车辆"],
      vehicles: [
        {
          name: "Mercedes-Benz Vito",
          role: "VIP 接送",
          description: "适合达拉曼、费特希耶、卡尔坎和卡什区域私人机场接送与点到点行程的舒适车辆。",
          imageAlt: "用于私人 VIP 接送的黑色 Mercedes-Benz Vito"
        },
        {
          name: "Mercedes-Benz Sprinter",
          role: "小巴城市游",
          description: "适合私人城市游、团体路线和舒适区域行程的宽敞小巴选择。",
          imageAlt: "用于私人小巴城市游的灰色 Mercedes-Benz Sprinter"
        }
      ],
      cta: "预订接送",
      imageAlt: "Mercedes-Benz Vito 与 Sprinter 车队车辆"
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
    cta: {
      eyebrow: "准备预订？",
      title: "现在规划您的舒适 VIP 接送体验",
      text: "在线预订，并在接送途中以现金或信用卡支付余款。"
    },
    bookPage: {
      eyebrow: "预订详情",
      title: "完成您的 VIP 接送预订",
      description: "请在下方查看路线详情。在线支付集成将在下一步连接；此页面已为预订流程准备好。",
      backHome: "返回首页",
      summaryTitle: "接送摘要",
      route: "路线",
      tripType: "行程类型",
      departure: "出发",
      return: "返回",
      passengers: "乘客",
      vehicle: "车辆",
      totalPrice: "固定总价",
      reservationFee: "10% 预订费",
      remainingBalance: "接送途中支付的余款",
      routeNotFound: "未找到该路线的固定价格。请通过 WhatsApp 联系我们。",
      missingValue: "-",
      balancePaymentNote: "余款可在接送途中以现金或信用卡支付。",
      form: {
        title: "预订详情",
        description: "请输入联系信息和接车信息，以准备您的 VIP 接送请求。",
        fullName: "姓名",
        fullNamePlaceholder: "您的姓名",
        phone: "电话 / WhatsApp",
        phonePlaceholder: "+86 130 0000 0000",
        email: "电子邮箱",
        emailPlaceholder: "you@example.com",
        flightNumber: "航班号",
        flightNumberPlaceholder: "TK 1234",
        pickupAddress: "接车地址或酒店名称",
        pickupAddressPlaceholder: "酒店、别墅、码头或完整接车地址",
        notes: "备注",
        notesPlaceholder: "儿童座椅、额外行李、抵达信息...",
        optional: "可选",
        requiredNote: "继续前请填写必填字段。",
        submit: "通过 WhatsApp 发送预订",
        openingWhatsapp: "正在打开 WhatsApp"
      },
      success: {
        eyebrow: "请求已准备",
        title: "您的预订信息已准备好",
        text: "WhatsApp 已打开并填入您的接送请求。请检查并发送消息以完成 MVP 预订流程。",
        sendAgain: "再次打开 WhatsApp",
        newReservation: "开始新的预订"
      },
      errors: {
        fullNameRequired: "请输入姓名。",
        phoneRequired: "请输入电话或 WhatsApp 号码。",
        emailRequired: "请输入电子邮箱。",
        emailInvalid: "请输入有效的电子邮箱。",
        flightNumberRequired: "请输入航班号。",
        pickupAddressRequired: "请输入接车地址或酒店名称。",
        routeUnavailable: "该路线尚无确认的固定价格。"
      },
      whatsapp: {
        intro: "您好，我想确认 VIP 接送预订。",
        customerDetails: "客户信息",
        transferDetails: "接送信息",
        priceDetails: "价格信息",
        notProvided: "未提供"
      }
    },
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

export type Dictionaries = typeof dictionaries;
export type PageDictionary = Dictionaries["en"];
