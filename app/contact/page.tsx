import type { Metadata } from "next";
import { clinic } from "@/content/clinic";
import { ContactForm } from "@/components/contact-form";
import { DataRow, Eyebrow, PageHeader } from "@/components/ui/primitives";
import { ButtonLink, TextLink } from "@/components/ui/button";
import { Caption, Photo } from "@/components/ui/photo";
import { DrawRule, Reveal } from "@/components/motion/reveal";
import { ru } from "@/lib/typo";

export const metadata: Metadata = {
  title: "Контакты и как добраться",
  description: `Запись на приём в стоматологическую студию «${clinic.shortName}», ${clinic.address.street}, ${clinic.address.city}. Часы работы, парковка, вход без ступеней, дорога от метро и дежурный телефон.`,
};

const gettingHere = [
  { label: "Метро", value: `${clinic.address.metro}, 10 минут пешком` },
  { label: "Парковка", value: "Во дворе дома, бесплатно" },
  { label: "Вход", value: "Без ступеней, со стороны двора" },
  { label: "На машине", value: "10 минут от Садового кольца" },
];

/**
 * Кварталы для схемы проезда. Промежутки между ними отведены под улицы, поэтому
 * рисунок собран из волосяных линий и воздуха, как и всё остальное здесь. Два
 * квартала намеренно слиты через проезд: идеальная сетка читается как
 * миллиметровка, а не как место.
 */
const mapBlocks = [
  { x: -12, y: -12, w: 66, h: 55 },
  { x: 66, y: -12, w: 130, h: 55 },
  { x: 204, y: -12, w: 40, h: 55 },
  { x: 260, y: -12, w: 72, h: 55 },
  { x: -12, y: 53, w: 66, h: 79 },
  { x: 66, y: 53, w: 130, h: 79 },
  { x: 204, y: 53, w: 40, h: 79 },
  { x: 260, y: 53, w: 72, h: 79 },
  { x: -12, y: 148, w: 66, h: 57 },
  { x: 66, y: 148, w: 130, h: 57 },
  { x: 204, y: 148, w: 40, h: 104 },
  { x: 260, y: 148, w: 72, h: 57 },
  { x: -12, y: 215, w: 208, h: 37 },
  { x: 260, y: 215, w: 72, h: 37 },
];

const mapLabel = "absolute whitespace-nowrap u-label bg-bone/85 px-1.5 py-1";

/**
 * Нарисованная схема вместо встроенной карты: без ключа API, без чужих тайлов
 * и без единого пятна, спорящего с палитрой. На ней только две нужные улицы,
 * парковка во дворе и место, где дверь.
 */
function MapPlate() {
  return (
    <a
      href={clinic.address.mapsUrl}
      target="_blank"
      rel="noreferrer noopener"
      aria-label={`Открыть ${clinic.address.street}, ${clinic.address.city} в Яндекс Картах. Откроется в новой вкладке.`}
      className="group block"
    >
      <div className="relative aspect-4/3 w-full overflow-hidden border border-ink/12 bg-bone">
        <svg
          viewBox="0 0 320 240"
          className="absolute inset-0 h-full w-full"
          aria-hidden
          focusable="false"
        >
          <g className="text-dentin" fill="currentColor" fillOpacity={0.5}>
            {mapBlocks.map((block) => (
              <rect
                key={`fill-${block.x}-${block.y}`}
                x={block.x}
                y={block.y}
                width={block.w}
                height={block.h}
              />
            ))}
          </g>
          <g className="text-ink" fill="none" stroke="currentColor" strokeOpacity={0.12}>
            {mapBlocks.map((block) => (
              <rect
                key={`edge-${block.x}-${block.y}`}
                x={block.x}
                y={block.y}
                width={block.w}
                height={block.h}
              />
            ))}
          </g>

          {/* Парковка во дворе нарисована пунктиром, как обычно рисуют открытую стоянку. */}
          <rect x={137} y={72} width={46} height={28} className="text-bone" fill="currentColor" />
          <rect
            x={137}
            y={72}
            width={46}
            height={28}
            className="text-ink"
            fill="none"
            stroke="currentColor"
            strokeOpacity={0.25}
            strokeDasharray="3 3"
          />

          {/* Дом 8 фасадом на бульвар, с геодезическим перекрестием на двери. */}
          <rect
            x={137}
            y={104}
            width={46}
            height={28}
            className="text-scrub"
            fill="currentColor"
            fillOpacity={0.12}
          />
          <g className="text-scrub" stroke="currentColor" strokeOpacity={0.4}>
            <line x1={160} y1={100} x2={160} y2={140} />
            <line x1={131} y1={120} x2={189} y2={120} />
          </g>
          <rect x={154} y={114} width={12} height={12} className="text-scrub" fill="currentColor" />
        </svg>

        {/* Подписи набраны текстом, а рисунок под ними тянется вместе с
            колонкой, поэтому ни одну из них нельзя центрировать по фигуре: чем
            уже плашка, тем сильнее подпись её перекрывает. Раньше «Парковка»
            стояла ровно посреди пунктирного прямоугольника и была шире его на
            72%, закрашивая три четверти пунктира; «8» лежала на перекрестии и
            съедала половину его правого луча, задевая заодно название бульвара;
            «Хохловский пер.» упирался в рамку и на 360px обрезался. Теперь
            каждая подпись стоит РЯДОМ со своей фигурой, а не на ней. */}
        <span className={`${mapLabel} text-ink-mute`} style={{ left: "5%", top: "5%" }}>
          ↑ С
        </span>
        {/* Над пунктирной стоянкой: её край на 30% высоты. */}
        <span
          className={`${mapLabel} text-ink-mute`}
          style={{ left: "50%", top: "28%", transform: "translate(-50%, -100%)" }}
        >
          Парковка
        </span>
        {/* Сразу за правым лучом перекрестия (x=189 из 320 ≈ 59%). */}
        <span
          className={`${mapLabel} text-scrub`}
          style={{ left: "60.5%", top: "50%", transform: "translateY(-50%)" }}
        >
          8
        </span>
        <span
          className={`${mapLabel} text-ink-mute`}
          style={{ left: "5%", top: "58.3%", transform: "translateY(-50%)" }}
        >
          Покровский бульвар
        </span>
        {/* Прижат к правому полю тем же отступом 5%, что и остальные: по центру
            переулка подпись не помещалась ни на одной узкой колонке. */}
        <span
          className={`${mapLabel} text-ink-mute`}
          style={{ right: "5%", top: "74%", transform: "translateY(-50%)" }}
        >
          Хохловский пер.
        </span>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-x-6 gap-y-2">
        <span className="u-label text-ink-mute">{clinic.address.street}</span>
        <span
          aria-hidden
          className="u-label inline-flex items-center gap-2 text-ink-mute transition-colors duration-[350ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:text-scrub group-focus-visible:text-scrub"
        >
          На карте
          <span className="transition-transform duration-[350ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1">
            →
          </span>
        </span>
      </div>
    </a>
  );
}

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Контакты"
        title="Запись на приём."
        lede={
          <>
            {ru(
              "Отправьте заявку. Ответим в тот же рабочий день. Это ещё не запись: мы предложим время, и в расписание оно попадёт только после вашего согласия. Если болит сегодня, позвоните "
            )}
            <TextLink href={clinic.phone.href} className="text-ink">
              {clinic.phone.display}
            </TextLink>
            {ru(", так будет быстрее, чем писать.")}
          </>
        }
      />

      <div className="u-gutter u-section pt-0">
        <div className="grid gap-x-16 gap-y-24 lg:grid-cols-12">
          <section aria-labelledby="request-heading" className="lg:col-span-7">
            {/* Раздел открывается так же, как на остальных страницах: линия,
                надзаголовок, крупный заголовок. Без него /contact была
                единственным маршрутом, где после h1 три тысячи пикселей текста
                идут без единого заголовка крупнее 18px. */}
            <DrawRule className="h-px w-full origin-left bg-ink/12" />
            <Reveal className="pt-6">
              <Eyebrow>Ваша заявка</Eyebrow>
            </Reveal>
            <Reveal className="mt-8" delay={0.05}>
              <h2 id="request-heading" className="text-display-m font-display text-ink">
                Опишите, с чем идёте, и мы подберём время под задачу.
              </h2>
            </Reveal>
            <Reveal className="mt-8" delay={0.1}>
              <p className="u-prose text-body text-ink-mute">
                {ru(
                  "Чем подробнее вы напишете, тем точнее мы подберём время нужной длины. Ни к чему это не обязывает: когда мы ответим, всё ещё можно будет изменить."
                )}
              </p>
            </Reveal>

            <div className="u-block">
              <ContactForm />
            </div>
          </section>

          <aside aria-labelledby="practical-heading" className="lg:col-span-4 lg:col-start-9">
            <DrawRule className="h-px w-full origin-left bg-ink/12" />
            <Reveal className="pt-6">
              {/* h3, а не h2: это подпись боковой колонки, а не раздел, равный
                  форме. По правилу сайта заголовок в u-label всегда h3. */}
              <h3 id="practical-heading" className="u-label text-ink-mute">
                Практическая информация
              </h3>
            </Reveal>

            {/* Выделено не рамкой, а волосяной линией цвета scrub в полную силу.
                Это единственный цветной блок в колонке, поэтому его найдёт и тот,
                кто не читает страницу, а пробегает её глазами с острой болью. */}
            <Reveal className="u-block">
              <div className="border-t border-scrub pt-6">
                <h3 className="u-label text-scrub">Если острая боль</h3>
                <a
                  href={clinic.emergency.href}
                  className="u-underline mt-6 inline-block text-display-s font-display text-scrub"
                >
                  {clinic.emergency.line}
                </a>
                <p className="mt-5 u-prose text-body-s text-ink-mute">
                  {ru(clinic.emergency.note)}
                </p>
              </div>
            </Reveal>

            <Reveal className="u-block">
              <div className="border-t border-ink/12 pt-6">
                <h3 className="u-label text-ink-mute">Где мы находимся</h3>
                <address className="mt-6 not-italic text-body-l text-ink">
                  <span className="whitespace-nowrap">{clinic.address.street}</span>
                  <br />
                  {clinic.address.unit}
                  <br />
                  {clinic.address.city}, {clinic.address.zip}
                </address>
                <div className="mt-6 flex flex-col items-start gap-2 text-body">
                  <TextLink href={clinic.phone.href} className="text-ink">
                    {clinic.phone.display}
                  </TextLink>
                  <TextLink href={`mailto:${clinic.email}`} className="text-ink-mute">
                    {clinic.email}
                  </TextLink>
                </div>
                <div className="mt-9">
                  <ButtonLink
                    href={clinic.address.mapsUrl}
                    variant="outline"
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    Открыть в Яндекс Картах
                  </ButtonLink>
                </div>
              </div>
            </Reveal>

            <Reveal className="u-block">
              <Photo
                name="contactExterior"
                className="aspect-4/3 w-full"
                sizes="(min-width: 1024px) 30vw, 100vw"
                width={900}
              />
              <Caption>Вход с бульвара · {clinic.address.unit}</Caption>
            </Reveal>

            <Reveal className="u-block">
              <div className="border-t border-ink/12 pt-6">
                <h3 className="u-label text-ink-mute">Часы работы</h3>
                <dl className="mt-6 border-b border-ink/12">
                  {clinic.hours.map((entry) => (
                    <DataRow key={entry.days} label={entry.days} value={entry.time} />
                  ))}
                </dl>
                <p className="mt-6 u-prose text-body-s text-ink-mute">
                  {ru("Телефон отвечает с 8:45. Всё, что пришло за ночь, разбираем с утра.")}
                </p>
              </div>
            </Reveal>

            <Reveal className="u-block">
              <div className="border-t border-ink/12 pt-6">
                <h3 className="u-label text-ink-mute">Как добраться</h3>
                <div className="mt-6">
                  <MapPlate />
                </div>
                <dl className="mt-8 border-b border-ink/12">
                  {gettingHere.map((row) => (
                    <DataRow key={row.label} label={row.label} value={row.value} />
                  ))}
                </dl>
                <p className="mt-6 u-prose text-body-s text-ink-mute">
                  {ru(
                    "Если нужен кабинет, куда можно заехать на коляске, скажите при записи. Поставим приём именно в него."
                  )}
                </p>
              </div>
            </Reveal>
          </aside>
        </div>
      </div>
    </>
  );
}
