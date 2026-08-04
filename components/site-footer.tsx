import Link from "next/link";
import { clinic } from "@/content/clinic";
import { services } from "@/content/services";
import { ButtonLink } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/primitives";
import { Reveal } from "@/components/motion/reveal";
import { ru } from "@/lib/typo";

const practice = [
  { href: "/about", label: "О клинике" },
  { href: "/patients", label: "Новым пациентам" },
  { href: "/patients#insurance", label: "ДМС и оплата" },
  { href: "/contact", label: "Контакты и проезд" },
];

/**
 * Правовые страницы в демоверсию не входят. Раньше они стояли в нижней строке
 * подвала серыми словами: выглядели как ссылки, вели в никуда и делили строку
 * с настоящими ссылками на соцсети. Теперь они названы там, где им и место, —
 * в примечании о том, чего в демоверсии нет.
 */
const legal = ["Политика конфиденциальности", "пользовательское соглашение", "доступность"];

export function SiteFooter() {
  return (
    /* Призыв лежит ВНУТРИ <footer>, а не рядом с ним. Пока открыто мобильное
       меню, шапка гасит фон атрибутом inert по выборке "main, footer"; когда
       эта секция была третьим элементом верхнего уровня, она в выборку не
       попадала, и табуляция из меню уводила на две ссылки под непрозрачной
       подложкой, прокручивая «замороженную» страницу в самый низ. */
    <footer className="bg-bone">
      {/* Финальный призыв на зелёном chair, чтобы читался как конец страницы. */}
      <section className="bg-chair text-bone">
        <div className="u-gutter u-section">
          <Reveal>
            <Eyebrow tone="dark">Запись на приём</Eyebrow>
          </Reveal>
          <div className="mt-8 grid gap-x-16 gap-y-10 lg:grid-cols-12">
            <Reveal className="lg:col-span-7" delay={0.05}>
              <h2 className="text-display-l font-display text-bone">
                {ru("Первичная консультация это разговор, и больше ничего.")}
              </h2>
            </Reveal>
            <Reveal className="lg:col-span-4 lg:col-start-9" delay={0.12}>
              <p className="u-prose text-body-l text-bone-soft">
                {ru(
                  "Полтора часа, полный осмотр и письменный план, который вы забираете с собой и обдумываете без спешки. На лечение в тот же день не записываем, если вы сами не попросите."
                )}
              </p>
              <div className="mt-9 flex flex-wrap items-stretch gap-4 [&>*]:min-w-[13rem] [&>*]:flex-1">
                <ButtonLink href="/contact" variant="solidOnDark">
                  Записаться
                </ButtonLink>
                <ButtonLink href={clinic.phone.href} variant="outlineOnDark" arrow={false}>
                  {clinic.phone.display}
                </ButtonLink>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <div className="u-gutter py-16 md:py-24">
        <div className="grid gap-x-12 gap-y-14 md:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <span className="u-label block text-[0.8125rem] tracking-[0.2em] text-ink">
              ПОКРОВКА
            </span>
            <p className="mt-6 max-w-xs text-body-s text-ink-mute">
              {ru("Лечение, реставрация и имплантация зубов. Принимаем на Покровке с ")}
              {clinic.established} года.
            </p>
            <address className="mt-8 not-italic text-body-s text-ink-mute">
              {clinic.address.street}
              <br />
              {clinic.address.unit}
              <br />
              {clinic.address.city}, {clinic.address.zip}
            </address>
            {/* items-start обязателен: без него ссылки-колонки растягиваются на
                всю ширину, и на сенсорном экране статичное подчёркивание
                u-underline рисуется до правого края — две «линейки» через весь
                подвал. u-tap и gap-3 доводят соседние цели нажатия до 44px. */}
            <div className="mt-6 flex flex-col items-start gap-3 text-body-s">
              <a href={clinic.phone.href} className="u-tap u-underline text-ink">
                {clinic.phone.display}
              </a>
              <a href={`mailto:${clinic.email}`} className="u-tap u-underline text-ink-mute">
                {clinic.email}
              </a>
            </div>
          </div>

          <div className="lg:col-span-3">
            <h2 className="u-label text-ink-mute">Услуги</h2>
            <ul className="mt-6 flex flex-col gap-3">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="u-tap u-underline text-body-s text-ink-soft"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h2 className="u-label text-ink-mute">Клиника</h2>
            <ul className="mt-6 flex flex-col gap-3">
              {practice.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="u-tap u-underline text-body-s text-ink-soft">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h2 className="u-label text-ink-mute">Часы</h2>
            <dl className="mt-6 flex flex-col gap-3">
              {clinic.hours.map((h) => (
                <div key={h.days} className="flex justify-between gap-4 text-body-s">
                  <dt className="text-ink-soft">{h.days}</dt>
                  <dd className="text-ink tabular-nums">{h.time}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-6 u-prose text-body-s text-ink-mute">
              {ru("В нерабочие часы отвечает дежурный врач: ")}
              <a href={clinic.emergency.href} className="u-tap u-underline text-ink-soft">
                {clinic.emergency.line}
              </a>
            </p>
          </div>
        </div>

        <div className="u-close flex flex-col gap-6 border-t border-ink/12 pt-8 md:flex-row md:items-center md:justify-between">
          <p className="u-label text-ink-mute">
            © {clinic.established}-2026 {clinic.legalName}
          </p>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
            {clinic.social.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="u-tap u-underline u-label text-ink-mute transition-colors duration-[350ms] hover:text-ink"
                rel="noreferrer noopener"
                target="_blank"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>

        <p className="u-block u-prose text-body-s text-ink-mute">
          Демонстрационный сайт. {clinic.name}{" "}
          {ru("не существует: название, адрес, номера телефонов, врачи и отзывы пациентов придуманы. ")}
          {ru(`${legal.join(", ")} в демоверсию не входят.`)}
        </p>
      </div>
    </footer>
  );
}
