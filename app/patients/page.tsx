import type { Metadata } from "next";
import { clinic } from "@/content/clinic";
import { firstVisit, insurance, financing, patientFaqs } from "@/content/patients";
import { PageHeader, SectionHeader, DataRow } from "@/components/ui/primitives";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { Photo, Caption } from "@/components/ui/photo";
import { TextLink } from "@/components/ui/button";
import { ru } from "@/lib/typo";

export const metadata: Metadata = {
  title: "Пациентам",
  description:
    "Как проходит первичная консультация в «Покровке», какие бланки заполнить заранее, с какими страховыми компаниями мы работаем напрямую, как оплатить лечение и о чём чаще всего спрашивают новые пациенты.",
};

/**
 * Бумаги. На рабочем сайте каждая строка вела бы к актуальному PDF; здесь
 * ссылки пустые, и об этом сказано в примечании под списком.
 */
const forms = [
  { name: "Регистрационная анкета", meta: "PDF · 2 страницы · 148 КБ" },
  { name: "Анкета о здоровье", meta: "PDF · 3 страницы · 210 КБ" },
  { name: "Согласие на обработку персональных данных", meta: "PDF · 1 страница · 96 КБ" },
  { name: "Положение об оплате", meta: "PDF · 2 страницы · 132 КБ" },
];

export default function PatientsPage() {
  return (
    <>
      <PageHeader eyebrow="Пациентам" title={firstVisit.title} lede={firstVisit.body} />

      <Reveal>
        <Photo
          name="patientsPrimary"
          className="aspect-4/3 w-full sm:aspect-2/1 lg:aspect-16/6"
          sizes="100vw"
          width={2400}
          priority
        />
      </Reveal>
      <div className="u-gutter">
        <Caption>
          Зона ожидания · <span className="whitespace-nowrap">{clinic.address.street}</span>
        </Caption>
      </div>

      {/* Нумерация здесь по делу: это последовательность, от записи до выхода. */}
      <section className="u-gutter u-section">
        <SectionHeader
          eyebrow="Первичный приём"
          title="Четыре части: от письма до плана, с которым вы уходите."
          lede="Две из четырёх проходят до того, как вы сядете в кресло. Во многом поэтому все полтора часа в кабинете уходят на осмотр и разговор."
        />

        <Stagger as="ol" className="u-lede">
          {firstVisit.steps.map((step, index) => (
            <StaggerItem
              as="li"
              key={step.title}
              /* Та же сетка, что у шагов приёма на странице услуги: колонки идут
                 подряд, без пустого столбца между заголовком и текстом, и
                 раскладываются с md, а не с lg. */
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

      <section className="u-gutter u-section">
        <SectionHeader
          eyebrow="Бланки"
          title="Четыре бланка приходят на почту сразу после записи."
          lede="Заполнение занимает минут пятнадцать, и дома они не съедают время приёма. Среди бланков есть согласие на обработку персональных данных по 152-ФЗ. Если удобнее от руки, распечатайте и принесите с собой."
        />

        {/* Это перечень, а не список загрузок. Бланки приходят на почту после
            записи — так и написано в заголовке раздела, — поэтому строки не
            ссылки. Раньше каждая была <a href="#"> со стрелкой вниз: самая
            крупная цель на всём разделе, и нажатие на неё плавно уносило
            страницу обратно к первому экрану, дописав «#» в адрес. */}
        <Stagger as="ul" className="u-lede">
          {forms.map((form) => (
            <StaggerItem as="li" key={form.name} className="border-t border-ink/12">
              <div className="flex flex-col gap-2 py-7 sm:flex-row sm:items-baseline sm:justify-between sm:gap-10">
                <span className="text-display-s font-display text-ink">{form.name}</span>
                <span className="u-label shrink-0 text-ink-mute">{form.meta}</span>
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal>
          <p className="u-block u-prose text-body-s text-ink-mute">
            {ru(
              "Сайт демонстрационный: сами файлы к нему не подключены. На рабочем сайте эти четыре бланка уходили бы вам на почту сразу после записи."
            )}
          </p>
        </Reveal>
      </section>

      <section id="insurance" className="scroll-mt-24 border-y border-ink/12 bg-enamel">
        <div className="u-gutter u-section">
          <SectionHeader
            eyebrow="ДМС"
            title={`Напрямую работаем с ${insurance.accepted.length} страховыми компаниями.`}
            lede={insurance.note}
          />

          <Stagger as="ul" className="u-lede grid gap-x-12 sm:grid-cols-2 lg:grid-cols-4">
            {insurance.accepted.map((name) => (
              <StaggerItem
                as="li"
                key={name}
                className="border-t border-ink/12 py-4 text-body text-ink-soft"
              >
                {name}
              </StaggerItem>
            ))}
          </Stagger>

          <div className="u-close grid gap-x-16 gap-y-10 lg:grid-cols-12">
            <Reveal className="lg:col-span-5">
              <h3 className="text-display-s font-display text-ink">Как идут расчёты</h3>
              <p className="mt-4 u-prose text-body-s text-ink-mute">
                {ru(
                  "Евгения Викторовна проверяет покрытие до приёма, подаёт документы после и спорит со страховой, если пришёл отказ. Эта работа остаётся на клинике, а не возвращается вам."
                )}
              </p>
            </Reveal>
            <Reveal className="lg:col-span-6 lg:col-start-7" delay={0.06}>
              <dl className="border-b border-ink/12">
                <DataRow label="Согласование" value="До приёма, а не после" />
                <DataRow label="Другие страховые" value="Документы готовим сами" />
                <DataRow label="Смета" value="Письменно на всё дороже 20 000 ₽" />
                <DataRow label="Отказ страховой" value="Оспариваем сами" />
              </dl>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="u-gutter u-section">
        <SectionHeader
          eyebrow="Оплата"
          title="Пять способов оплатить большой план лечения."
          lede="Все пять указаны в смете сразу, а не достаются потом, чтобы спасти сумму, на которую вы уже сказали «нет»."
        />

        <Stagger as="ul" className="u-lede grid gap-x-12 gap-y-10 sm:grid-cols-2">
          {financing.map((option) => (
            <StaggerItem as="li" key={option.title} className="border-t border-ink/12 pt-6">
              <h3 className="text-display-s font-display text-ink">{option.title}</h3>
              <p className="mt-3 u-prose text-body-s text-ink-mute">{ru(option.body)}</p>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal className="u-close border-t border-ink/12 pt-10">
          <p className="u-prose text-body text-ink-mute">
            {ru("Выбранный вариант расписан в самом плане, рядом с расчётом по ДМС. ")}
            <TextLink href="/contact" className="text-ink">
              Попросите посчитать
            </TextLink>{" "}
            {ru("заранее, прежде чем вы на что-то согласитесь.")}
          </p>
        </Reveal>
      </section>

      <section className="u-gutter u-section">
        <SectionHeader
          eyebrow="Вопросы"
          title="О чём спрашивают новые пациенты. Коротко и по делу."
          lede="Если вашего вопроса здесь нет, спросите по телефону: ответ будет тот же, что и в кабинете."
        />

        <Stagger as="ul" className="u-lede">
          {patientFaqs.map((faq) => (
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

        {/* Страница закрывается фразой, а не захлопнутой строкой вопроса,
            как /services, /services/[slug] и /about. */}
        <Reveal className="u-close border-t border-ink/12 pt-10">
          <p className="u-prose text-body text-ink-mute">
            {ru("Вопрос, которого здесь нет, можно задать до записи. ")}
            <TextLink href="/contact" className="text-ink">
              Напишите нам
            </TextLink>{" "}
            или позвоните{" "}
            <TextLink href={clinic.phone.href} className="text-ink">
              {clinic.phone.display}
            </TextLink>
            {ru(": на такие вопросы отвечает администратор, а не автоответчик.")}
          </p>
        </Reveal>
      </section>
    </>
  );
}
