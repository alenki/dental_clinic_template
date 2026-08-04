import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { clinic } from "@/content/clinic";
import { getService, relatedServices, serviceSlugs } from "@/content/services";
import { DataRow, PageHeader, SectionHeader } from "@/components/ui/primitives";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { Photo, Caption } from "@/components/ui/photo";
import { ButtonLink, TextLink } from "@/components/ui/button";
import type { ImageKey } from "@/lib/images";
import { cn } from "@/lib/cn";
import { ru } from "@/lib/typo";

type RouteProps = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return serviceSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: RouteProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);

  if (!service) {
    return {
      title: "Услуга не найдена",
      description: `Такой страницы на сайте нет. Все шесть услуг, которые есть в клинике «${clinic.shortName}», перечислены на странице «Услуги».`,
    };
  }

  return {
    title: service.name,
    description: service.summary,
    openGraph: {
      title: `${service.name} · ${clinic.shortName}`,
      description: service.summary,
    },
  };
}

export default async function ServicePage({ params }: RouteProps) {
  const { slug } = await params;
  const service = getService(slug);

  if (!service) notFound();

  const related = relatedServices(slug, 3);

  return (
    <>
      <PageHeader eyebrow="Услуги" title={service.name} lede={service.summary} />

      {/* Full-bleed: deliberately outside the page gutter, captioned like every
          other photograph on the site. */}
      <Reveal>
        <Photo
          name={service.imageKey as ImageKey}
          priority
          className="aspect-4/3 w-full sm:aspect-2/1 lg:aspect-16/6"
          sizes="100vw"
          width={2400}
        />
      </Reveal>
      <div className="u-gutter">
        {/* Разреженная капительная подпись ломалась посреди «Покровский
            бульвар»; перенос допустим только по разделителю «·». */}
        <Caption>
          <span className="whitespace-nowrap">{service.name}</span> ·{" "}
          <span className="whitespace-nowrap">{clinic.address.street}</span>
        </Caption>
      </div>

      {/* Intro. The long read on the left, the numbers you came for on the right.
          Заголовок раздела скрыт визуально, но присутствует в структуре: без
          него первым после h1 шёл h3 «На практике», и в оглавлении страницы
          возникал провал через уровень. */}
      {/* Нижний отступ повторяет шаг u-section: без него линия следующего
          раздела стояла к тексту вдвое ближе, чем все остальные линии страницы. */}
      <section
        aria-labelledby="intro-heading"
        className="u-gutter pb-[clamp(3.75rem,9vw,9rem)] pt-16 md:pt-24"
      >
        <h2 id="intro-heading" className="sr-only">
          Коротко об услуге
        </h2>
        <div className="grid gap-x-16 gap-y-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            {service.intro.map((paragraph, index) => (
              <Reveal key={paragraph} delay={index * 0.06}>
                <p className={cn("u-prose text-body-l text-ink-soft", index > 0 && "mt-7")}>
                  {ru(paragraph)}
                </p>
              </Reveal>
            ))}
          </div>

          <Reveal className="lg:col-span-4 lg:col-start-9" delay={0.12}>
            <h3 className="u-label text-ink-mute">На практике</h3>
            <dl className="mt-6 border-b border-ink/12">
              {service.facts.map((fact) => (
                <DataRow key={fact.label} label={fact.label} value={fact.value} />
              ))}
            </dl>
            <p className="mt-8 u-prose text-body-s text-ink-mute">
              {ru(
                "Это время, которое мы закладываем в расписание, а не время, на которое надеемся. Там, где стоит диапазон, письменный план, с которым вы уйдёте, называет вашу цифру."
              )}
            </p>
            <div className="mt-9">
              <ButtonLink href="/contact">
                Записаться
              </ButtonLink>
            </div>
            <p className="mt-6 u-prose text-body-s text-ink-mute">
              {ru("Или позвоните по номеру ")}
              <TextLink href={clinic.phone.href} className="text-ink-soft">
                {clinic.phone.display}
              </TextLink>{" "}
              {ru("и спросите, прежде чем на что-то записываться.")}
            </p>
          </Reveal>
        </div>
      </section>

      {/* A list, not a sequence, so it is not numbered. */}
      <section aria-label="Кому это нужно" className="u-gutter u-section">
        <SectionHeader
          eyebrow="Кому это нужно"
          title="С чем сюда приходят."
          lede="Здесь жалобы, а не разделы прайса: приходят обычно именно с ними. Если того, что привело вас, в списке нет, спросить всё равно стоит."
        />

        <Stagger as="ul" className="u-lede grid gap-x-16 sm:grid-cols-2">
          {service.treats.map((item) => (
            <StaggerItem
              as="li"
              key={item}
              className="border-t border-ink/12 py-5 text-body text-ink-soft"
            >
              {ru(item)}
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* This one genuinely is a sequence, in order, so it takes the numerals. */}
      <section aria-label="Как проходит приём" className="u-gutter u-section">
        <SectionHeader
          eyebrow="Как проходит приём"
          title="Что происходит и в каком порядке."
          lede="Ничего не начинается, пока это не объяснили, и остановить нас можно в любую секунду. Так на каждом приёме, а не только на первом."
        />

        <Stagger as="ol" className="u-lede">
          {service.visit.map((step, index) => (
            <StaggerItem
              as="li"
              key={step.title}
              className="grid gap-x-12 gap-y-3 border-t border-ink/12 py-8 md:grid-cols-12 md:py-10"
            >
              <span className="u-label tabular-nums text-scrub md:col-span-2">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="text-display-s font-display text-ink md:col-span-3">{step.title}</h3>
              <p className="u-prose text-body text-ink-mute md:col-span-7">{ru(step.body)}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* Native disclosure. No JavaScript, and the marker turns from + to ×. */}
      <section aria-label="Вопросы" className="u-gutter u-section">
        <SectionHeader
          eyebrow="Вопросы"
          title="Те, что задают чаще всего."
          lede="Собрали их здесь, чтобы они не съедали время приёма. Хотя переспросить в кабинете всё равно лучше, чем гадать."
        />

        <Stagger as="ul" className="u-lede">
          {service.faqs.map((faq) => (
            <StaggerItem as="li" key={faq.q} className="border-t border-ink/12">
              <details className="group">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-7 sm:gap-10 [&::-webkit-details-marker]:hidden">
                  <h3 className="min-w-0 text-display-s font-display text-ink transition-colors duration-[350ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:text-scrub group-open:text-scrub">
                    {ru(faq.q)}
                  </h3>
                  <span
                    aria-hidden
                    className="relative mt-2 block size-3.5 shrink-0 transition-transform duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-open:rotate-45"
                  >
                    <span className="absolute left-0 top-1/2 block h-px w-full -translate-y-1/2 bg-ink-mute transition-colors duration-[350ms] group-hover:bg-scrub group-open:bg-scrub" />
                    <span className="absolute left-1/2 top-0 block h-full w-px -translate-x-1/2 bg-ink-mute transition-colors duration-[350ms] group-hover:bg-scrub group-open:bg-scrub" />
                  </span>
                </summary>
                <p className="u-prose pb-9 text-body text-ink-soft">{ru(faq.a)}</p>
              </details>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <section aria-label="Смотрите также" className="u-gutter u-section">
        <SectionHeader eyebrow="Смотрите также" title="Ещё три услуги из шести." align="stack" />

        <Stagger as="ul" className="u-lede">
          {related.map((item) => (
            <StaggerItem as="li" key={item.slug} className="border-t border-ink/12">
              <Link
                href={`/services/${item.slug}`}
                className="group flex items-baseline justify-between gap-6 py-7 transition-[padding-left] duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:pl-4 focus-visible:pl-4 sm:gap-10"
              >
                <span className="text-display-s font-display text-ink">{item.name}</span>
                <span
                  aria-hidden
                  className="shrink-0 text-ink/30 transition-all duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1 group-hover:text-scrub group-focus-visible:text-scrub"
                >
                  →
                </span>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal delay={0.1}>
          <p className="u-block u-prose text-body text-ink-mute">
            <TextLink href="/services" className="text-ink">
              Все шесть услуг
            </TextLink>{" "}
            {ru(
              "расписаны так же, как эта: сроки и всё, чем приходится жертвовать, вынесены на страницу, а не оставлены на разговор в кабинете."
            )}
          </p>
        </Reveal>
      </section>
    </>
  );
}
