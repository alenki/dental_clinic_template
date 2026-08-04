import type { Metadata, Viewport } from "next";
import { Playfair_Display, Onest } from "next/font/google";
import { ScrollBehaviour } from "@/components/scroll-behaviour";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { clinic } from "@/content/clinic";
import "./globals.css";

/* Обе гарнитуры обязаны нести кириллицу: Fraunces и Instrument Sans из
   английской сборки латинские, и каждое русское слово ушло бы в подстановочный
   шрифт. */
const playfair = Playfair_Display({
  subsets: ["latin", "cyrillic"],
  variable: "--font-playfair",
  display: "swap",
});

const onest = Onest({
  subsets: ["latin", "cyrillic"],
  variable: "--font-onest",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://pokrovka-clinic.ru"),
  title: {
    default: `${clinic.name} · ${clinic.tagline}`,
    template: `%s · ${clinic.shortName}`,
  },
  description:
    "Лечение, реставрация и имплантация зубов на Покровском бульваре в Москве. Приём гигиениста длится час, есть письменный план с ценами и седация для тех, кому страшно.",
  openGraph: {
    type: "website",
    siteName: clinic.name,
    title: `${clinic.name} · ${clinic.tagline}`,
    description:
      "Лечение, реставрация и имплантация зубов на Покровском бульваре в Москве. Приём без спешки и письменный план с ценами.",
  },
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#f6f4f0",
  colorScheme: "light",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Dentist",
  name: clinic.name,
  description: "Лечение, реставрация и имплантация зубов на Покровском бульваре в Москве.",
  address: {
    "@type": "PostalAddress",
    streetAddress: `${clinic.address.street}, ${clinic.address.unit}`,
    addressLocality: clinic.address.city,
    addressRegion: "Москва",
    postalCode: clinic.address.zip,
    addressCountry: "RU",
  },
  /* В отображаемом номере стоят неразрывные пробелы и дефисы; для
     структурированных данных номер возвращается к обычным знакам. */
  telephone: clinic.phone.display.replaceAll(" ", " ").replaceAll("‑", "-"),
  email: clinic.email,
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday"],
      opens: "09:00",
      closes: "20:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Friday"],
      opens: "09:00",
      closes: "18:00",
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={`${playfair.variable} ${onest.variable}`}>
      <body className="grain antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-6 focus:top-24 focus:z-[70] focus:bg-scrub focus:px-5 focus:py-3 focus:u-label focus:text-bone"
        >
          Перейти к содержимому
        </a>
        <ScrollBehaviour />
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
