import type { Metadata } from "next";
import { services } from "@/content/services";
import { clinic } from "@/content/clinic";
import { DataRow, PageHeader, SectionHeader } from "@/components/ui/primitives";
import { DrawRule, Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { Photo, Caption } from "@/components/ui/photo";
import { ButtonLink } from "@/components/ui/button";
import type { ImageKey } from "@/lib/images";
import { cn } from "@/lib/cn";
import { ru } from "@/lib/typo";

export const metadata: Metadata = {
  title: "Услуги",
  description: `Профилактика, имплантация, элайнеры, эстетика, лечение и седация. ${clinic.address.city}, ${clinic.address.metro}. Что входит в каждую услугу, сколько идёт приём и сколько времени займёт весь курс.`,
};

/**
 * The cases that leave the building. Written as a plain statement of the
 * practice's edges rather than as a disclaimer.
 */
const referrals = [
  {
    title: "Детское лечение",
    body: "Детей с трёх лет мы смотрим и берём на гигиену, но на этом детский приём здесь заканчивается. Пломбы под седацией, ранняя ортодонтия и все, кто младше трёх, идут в детскую клинику неподалёку. Мы звоним туда сами и в тот же день передаём карту и снимки.",
  },
  {
    title: "Челюстно-лицевая хирургия",
    body: "Когда неправильно стоят сами челюсти, никакие элайнеры не сдвинут зубы настолько, чтобы исправить прикус. Это совместная работа ортодонта и челюстно-лицевого хирурга, рассчитанная на год и дольше. Вы услышите это на первичной консультации, а не после года в капах.",
  },
  {
    title: "Сложные случаи ВНЧС",
    body: "Бруксизм, ночная капа, прикус, который надо пришлифовать, это обычная здешняя работа. А вот с суставом, который заклинивает, и с болью, не ушедшей за месяцы консервативного лечения, надо идти к специалисту по лицевой боли. Лучше сказать об этом в первый месяц, чем в двенадцатый.",
  },
];

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Услуги"
        title="Шесть услуг, и каждая расписана целиком."
        lede="У каждой своя страница: что входит в лечение, как на самом деле идёт приём, сколько длится весь курс и сколько времени он у вас займёт. Ничего из этого не написано так, чтобы работа выглядела короче, чем она есть."
      />

      {/* Full-bleed: deliberately outside the page gutter. */}
      <Reveal>
        <Photo
          name="servicesIndex"
          className="aspect-4/3 w-full sm:aspect-2/1 lg:aspect-16/6"
          sizes="100vw"
          width={2400}
          priority
        />
      </Reveal>
      <div className="u-gutter">
        {/* Обе части подписи неразрывны: разреженный капительный набор ломался
            посреди названия бульвара, а перенос здесь допустим только по «·». */}
        <Caption>
          <span className="whitespace-nowrap">Кресла у стойки</span> ·{" "}
          <span className="whitespace-nowrap">{clinic.address.street}</span>
        </Caption>
      </div>

      <section aria-label="Все услуги" className="u-gutter u-section">
        <div className="flex flex-col gap-y-24 md:gap-y-32 lg:gap-y-40">
          {services.map((service, index) => {
            const imageRight = index % 2 === 1;

            return (
              <article key={service.slug} id={service.slug} className="scroll-mt-24">
                <DrawRule className="h-px w-full origin-left bg-ink/12" />

                <div className="u-block grid gap-x-12 gap-y-10 lg:grid-cols-12 lg:gap-x-16">
                  <Reveal
                    className={cn(
                      "lg:col-span-5 lg:row-start-1",
                      imageRight ? "lg:col-start-8" : "lg:col-start-1"
                    )}
                  >
                    <Photo
                      name={service.imageKey as ImageKey}
                      className="aspect-4/5 w-full"
                      sizes="(min-width: 1024px) 40vw, 100vw"
                      width={1200}
                    />
                  </Reveal>

                  <div
                    className={cn(
                      "lg:col-span-6 lg:row-start-1 lg:pt-4",
                      imageRight ? "lg:col-start-1" : "lg:col-start-7"
                    )}
                  >
                    <Reveal>
                      <h2 className="text-display-l font-display text-ink">{service.name}</h2>
                      <p className="mt-6 u-prose text-body-l text-ink-soft">
                        {ru(service.summary)}
                      </p>
                    </Reveal>

                    <Reveal delay={0.06}>
                      <h3 className="u-block u-label text-ink-mute">Кому это нужно</h3>
                      {/* border-b на контейнере: без него список обрывался
                          открытым прямо над закрытой линией таблицы «На
                          практике», и в одном экране жили два разных финала. */}
                      <ul className="mt-6 grid gap-x-10 border-b border-ink/12 sm:grid-cols-2">
                        {service.treats.slice(0, 4).map((item) => (
                          <li
                            key={item}
                            className="border-t border-ink/12 py-4 text-body-s text-ink-soft"
                          >
                            {ru(item)}
                          </li>
                        ))}
                      </ul>
                    </Reveal>

                    {/* Заголовок обязателен: без него таблица цифр набрана
                        ровно теми же линиями и отступами, что список «Кому это
                        нужно» над ней, и на телефоне семь строк читались как
                        одна таблица, которая с пятой строки почему-то начала
                        выравнивать значения вправо. Название то же, что на
                        странице услуги. */}
                    <Reveal delay={0.12}>
                      <h3 className="u-block u-label text-ink-mute">На практике</h3>
                      <dl className="mt-6 border-b border-ink/12">
                        {service.facts.slice(0, 3).map((fact) => (
                          <DataRow key={fact.label} label={fact.label} value={fact.value} />
                        ))}
                      </dl>
                    </Reveal>

                    <Reveal delay={0.18} className="u-block">
                      <ButtonLink href={`/services/${service.slug}`} variant="outline">
                        {service.short} · подробнее
                      </ButtonLink>
                    </Reveal>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="border-y border-ink/12 bg-enamel">
        <div className="u-gutter u-section">
          {/* «…которые мы отправляем дальше» на 390px оставляло «дальше.»
              одинокой строкой display-l. Более короткий глагол собирает
              заголовок в две ровные строки. */}
          <SectionHeader
            eyebrow="Направляем"
            title="Три случая, которые уходят дальше."
            lede="Клиника на три кресла может либо сама назвать свои границы, либо дать пациенту наткнуться на них посреди лечения. Вот случаи, которые уходят из этих стен, и то, куда именно."
          />

          <Stagger as="ul" className="u-lede grid gap-x-12 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
            {referrals.map((item) => (
              <StaggerItem as="li" key={item.title} className="border-t border-ink/12 pt-6">
                <h3 className="text-display-s font-display text-ink">{item.title}</h3>
                <p className="mt-3 u-prose text-body-s text-ink-mute">{ru(item.body)}</p>
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal className="u-close border-t border-ink/12 pt-10">
            <p className="u-prose text-body text-ink-mute">
              {ru(
                "Если вы не уверены, относится ли к вам что-то из этого, скажите об этом при звонке, и мы ответим. Спросить ничего не стоит, в том числе когда в ответ вы услышите название другой клиники."
              )}
            </p>
            <div className="mt-9">
              <ButtonLink href="/contact" variant="outline">
                Спросить, с чего начать
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
