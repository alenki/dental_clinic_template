import type { Metadata } from "next";
import { DataRow, SectionHeader, PageHeader } from "@/components/ui/primitives";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { Photo, Caption } from "@/components/ui/photo";
import { ButtonLink, TextLink } from "@/components/ui/button";
import { clinic } from "@/content/clinic";
import { team } from "@/content/team";
import { patientFaqs } from "@/content/patients";
import type { ImageKey } from "@/lib/images";
import { cn } from "@/lib/cn";
import { ru } from "@/lib/typo";

export const metadata: Metadata = {
  title: "О клинике",
  description:
    "Стоматологическая студия «Покровка» работает с 2011 года: три кресла и пять человек. Как всё начиналось, кто здесь принимает, как устроено помещение и чего мы не делаем.",
};

/** Ответ про доступную среду уже есть в вопросах пациентов: он цитируется, а не переписывается. */
const accessFaq = patientFaqs.find((faq) => faq.q.toLowerCase().includes("доступной средой"));

const limits = [
  {
    title: "Без процента с плана",
    body: "Ни у кого здесь нет процента от вылеченного. У врачей оклад, и строчки в вашем плане лечения не меняют того, сколько кто получит в конце месяца.",
  },
  {
    title: "Без подписи в тот же день",
    body: "План лечения мы отдаём на бумаге, и вы уносите его с собой. Если что-то действительно срочно, мы скажем, насколько срочно. Этим всё и ограничится.",
  },
  {
    title: "Без эстетики вдогонку",
    body: "Тому, кто записался на чистку, никто не заводит разговор про виниры. Такой разговор начинаете вы, и тогда на отбеливание или виниры отведут отдельное время.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="О клинике"
        title="Клиника на три кресла со своим расписанием."
        lede="Три кресла, пять человек и расписание, которое с 2011 года устроено одинаково. Дальше рассказано, как всё начиналось, кто здесь работает, как устроено помещение и чего мы решили не делать."
      />

      {/* ----------------------------------------------------------------- Начало */}
      <section id="story" className="scroll-mt-24">
        <div className="u-gutter">
          <SectionHeader
            eyebrow="Начало"
            title="Всё началось с расписания, которое не сходилось."
            lede="На приём гигиениста тридцать минут, на осмотр нового пациента пятнадцать. Клинику открыли, чтобы изменить именно эту арифметику."
          />
        </div>

        <div className="u-gutter u-lede grid gap-x-12 gap-y-14 lg:grid-cols-12">
          <div className="lg:col-span-6 lg:col-start-1 lg:row-start-1">
            <Reveal>
              <p className="u-prose text-body-l text-ink-soft">
                «{clinic.shortName}» открылась в {clinic.established}{" "}
                {ru(
                  "году в одной комнате: одно кресло, гигиенист на полставки и список пациентов, которые обзванивали знакомых, выясняя, куда пропал их врач."
                )}
              </p>
            </Reveal>

            <Reveal delay={0.06}>
              <p className="mt-7 u-prose text-body-l text-ink-soft">
                {ru(
                  "Дальше клиника росла медленно и намеренно. Второе кресло появилось в 2016 году, когда хирургия перешла внутрь клиники, а третье в 2019-м, под ортодонтию. На этом всё. Три кресла это тот размер, при котором гигиенист ещё помнит, как выглядели ваши дёсны в феврале прошлого года."
                )}
              </p>
            </Reveal>

            <Reveal delay={0.12}>
              <p className="mt-7 u-prose text-body-l text-ink-soft">
                {ru(
                  "Клинический уклон тоже не менялся. Многое из того, что здесь восстанавливают, в другом месте уже предложили удалить, а примерно треть случаев с имплантами приходит за вторым мнением. Мы такой роли себе не выбирали. Так выходит, когда есть время посмотреть внимательно, прежде чем отвечать."
                )}
              </p>
            </Reveal>
          </div>

          <Reveal className="lg:col-span-5 lg:col-start-8 lg:row-start-1" delay={0.08}>
            <Photo
              name="aboutStory"
              className="aspect-4/5 w-full"
              sizes="(min-width: 1024px) 38vw, 100vw"
              width={1200}
            />
            <Caption>
              Приёмная · <span className="whitespace-nowrap">{clinic.address.street}</span>
            </Caption>
          </Reveal>
        </div>

        {/* Спокойная полоса цифр. Числа вместо прилагательных. */}
        <div className="u-close border-y border-ink/12 bg-enamel">
          <Stagger
            as="dl"
            className="u-gutter grid grid-cols-2 gap-x-8 gap-y-10 py-12 md:grid-cols-4 md:gap-x-12 md:py-14"
          >
            {clinic.figures.map((figure) => (
              <StaggerItem
                as="div"
                key={figure.label}
                className="md:border-l md:border-ink/12 md:pl-6 md:first:border-l-0 md:first:pl-0"
              >
                <dt className="text-display-s font-display tabular-nums text-ink">{figure.value}</dt>
                <dd className="mt-2 max-w-[22ch] text-body-s text-ink-mute">{ru(figure.label)}</dd>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ------------------------------------------------------------------ Врачи */}
      <section id="people" className="u-section scroll-mt-24">
        <div className="u-gutter">
          <SectionHeader
            eyebrow="Врачи"
            title="Пять человек, и с 2019 года список не менялся."
            lede="Все они здесь каждую неделю. Приходящих врачей по сменам нет, поэтому в марте вас смотрит тот же человек, что и в сентябре."
          />
        </div>

        <div className="u-gutter u-lede flex flex-col gap-16 lg:gap-24">
          {team.map((member, index) => {
            const flip = index % 2 === 1;

            return (
              <article
                key={member.name}
                className="grid gap-x-12 gap-y-8 border-t border-ink/12 pt-10 lg:grid-cols-12 lg:pt-14"
              >
                <Reveal
                  className={cn(
                    "lg:col-span-4 lg:row-start-1",
                    flip ? "lg:col-start-9" : "lg:col-start-1"
                  )}
                >
                  <Photo
                    name={member.imageKey as ImageKey}
                    className="aspect-3/4 w-full sm:max-w-80 lg:max-w-none"
                    sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                    width={900}
                  />
                </Reveal>

                <Reveal
                  className={cn(
                    "lg:col-span-7 lg:row-start-1",
                    flip ? "lg:col-start-1" : "lg:col-start-6"
                  )}
                  delay={0.08}
                >
                  <h3 className="text-display-s font-display text-ink">
                    {member.name}
                    {member.credentials ? (
                      <span className="text-ink-mute"> {member.credentials}</span>
                    ) : null}
                  </h3>

                  {/* Без разделителя. Должности здесь длинные и на телефоне
                      переносятся, а косая черта между двумя кусками при
                      переносе всегда где-то повисает: отдельным элементом
                      флекса — в конце строки после должности, приклеенная к
                      стажу — в начале следующей. Разделять их ей и не нужно:
                      должность набрана цветом scrub, стаж приглушённым, и на
                      одной строке между ними и так стоит зазор. */}
                  {/* На телефоне стаж всегда отдельной строкой. Раньше пары
                      «должность + стаж» вставали то в строку, то в столбик — у
                      кого как позволяла длина должности, и пять карточек шли
                      пятью разными ритмами. */}
                  <p className="mt-4 flex flex-col items-start gap-y-1 u-label sm:flex-row sm:flex-wrap sm:items-baseline sm:gap-x-3">
                    <span className="text-scrub">{member.role}</span>
                    <span className="text-ink-mute">В клинике с {member.since} года</span>
                  </p>

                  {member.bio.map((paragraph) => (
                    <p key={paragraph} className="mt-6 u-prose text-body text-ink-soft">
                      {ru(paragraph)}
                    </p>
                  ))}

                  {/* Живая деталь. Она стоит за тонкой линией scrub, чтобы читалась
                      как заметка на полях, а не как продолжение биографии. */}
                  <p className="mt-8 border-l border-scrub pl-6 u-prose text-body-s italic text-ink-mute">
                    {ru(member.aside)}
                  </p>
                </Reveal>
              </article>
            );
          })}
        </div>
      </section>

      {/* -------------------------------------------------------------- Помещение */}
      <section id="building" className="u-section scroll-mt-24 border-y border-ink/12 bg-enamel">
        <div className="u-gutter">
          <SectionHeader
            eyebrow="Помещение"
            title="Дорога до кресла не должна быть самой трудной частью приёма."
            lede={accessFaq?.a}
          />
        </div>

        <div className="u-gutter u-lede grid gap-x-12 gap-y-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <Photo
              name="aboutFacilityOne"
              className="aspect-4/3 w-full"
              sizes="(min-width: 1024px) 56vw, 100vw"
              width={1600}
            />
            <Caption>Зона ожидания · окна на бульвар</Caption>
          </Reveal>

          <Reveal className="lg:col-span-4 lg:col-start-9 lg:pt-16" delay={0.08}>
            <Photo
              name="aboutFacilityTwo"
              className="aspect-3/4 w-full"
              sizes="(min-width: 1024px) 30vw, 100vw"
              width={900}
            />
            <Caption>Коридор ко второму и третьему кабинетам</Caption>
          </Reveal>
        </div>

        <div className="u-gutter u-lede grid gap-x-16 gap-y-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <Reveal>
              <p className="u-prose text-body-l text-ink-soft">
                {ru(
                  "Почти все заходят со двора, а не с бульвара. От машины до двери нет ни одной ступени, лифт сразу за ней. Парковка во дворе бесплатная: ни талона под лобовое стекло, ни отметки на стойке администратора."
                )}
              </p>
            </Reveal>
            <Reveal delay={0.06}>
              <p className="mt-7 u-prose text-body-l text-ink-soft">
                {ru(
                  "На этаже три кабинета. Третий оборудован для маломобильных пациентов и заодно самый тихий, поэтому длинные приёмы обычно ставят в него. В зоне ожидания восемь мест, и заняты бывают редко больше трёх: расписание собрано так, чтобы приёмы не накладывались один на другой."
                )}
              </p>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-7 u-prose text-body text-ink-mute">
                <TextLink href="/contact" className="text-ink">
                  Как доехать и карта
                </TextLink>{" "}
                {ru("на странице контактов. Там же сказано, через какую арку заезжать во двор.")}
              </p>
            </Reveal>
          </div>

          <Reveal className="lg:col-span-5 lg:col-start-8" delay={0.06}>
            <dl className="border-b border-ink/12">
              <DataRow label="Вход" value="Со двора, без ступеней" />
              <DataRow label="Лифт" value="От входа до этажа клиники" />
              <DataRow label="Кабинеты" value="Три, из них один для маломобильных" />
              <DataRow label="Парковка" value="Бесплатная, во дворе" />
              <DataRow
                label="Адрес"
                value={`${clinic.address.street}, ${clinic.address.unit}`}
              />
            </dl>
          </Reveal>
        </div>
      </section>

      {/* ---------------------------------------------------------------- Границы */}
      <section id="limits" className="u-gutter u-section scroll-mt-24">
        <SectionHeader
          eyebrow="Границы"
          title="Чего мы не делаем."
          lede="Три пункта, названные прямо: их проще проверить, чем обещание."
        />

        <Stagger as="ul" className="u-lede grid gap-x-12 gap-y-10 md:grid-cols-3">
          {limits.map((item) => (
            <StaggerItem as="li" key={item.title} className="border-t border-ink/12 pt-6">
              <h3 className="text-display-s font-display text-ink">{item.title}</h3>
              <p className="mt-3 u-prose text-body-s text-ink-mute">{ru(item.body)}</p>
            </StaggerItem>
          ))}
        </Stagger>

        {/* Четвёртый пункт вынесен из сетки: в три колонки он попадал во вторую
            строку один, оставляя рядом два пустых столбца, и этим рваным
            обрывком заканчивалась вся страница. Теперь страница закрывается так
            же, как /services и /patients: линия, абзац, действие. */}
        <Reveal className="u-close border-t border-ink/12 pt-10">
          <p className="u-prose text-body text-ink-mute">
            {ru(
              "Об этих трёх спрашивают чаще всего. Четвёртый пункт письменно до записи можно попросить у Евгении Викторовны: всё, что оказывается на бумаге, проходит через неё."
            )}
          </p>
          <div className="mt-9">
            <ButtonLink href="/contact" variant="outline">
              Задать вопрос до записи
            </ButtonLink>
          </div>
        </Reveal>
      </section>
    </>
  );
}
