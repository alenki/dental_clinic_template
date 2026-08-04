import { clinic } from "@/content/clinic";
import { SectionHeader } from "@/components/ui/primitives";
import { Reveal } from "@/components/motion/reveal";
import { Photo, Caption } from "@/components/ui/photo";
import { TextLink } from "@/components/ui/button";
import { ru } from "@/lib/typo";

export function Philosophy() {
  return (
    <section id="philosophy" className="u-section scroll-mt-24">
      <div className="u-gutter">
        <SectionHeader
          eyebrow="Подход"
          title="Почти всё, что отличает хорошую клинику, следует из того, сколько времени в ней отводят на приём."
          lede="Спешка меняет не столько уровень лечения, сколько сами решения. Быстрый ответ, удаление вместо реставрации, то, что укладывается в отведённые полчаса."
        />
      </div>

      <div className="u-gutter u-lede grid gap-x-12 gap-y-14 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <Photo
            name="philosophyInterior"
            className="aspect-3/4 w-full"
            sizes="(min-width: 1024px) 40vw, 100vw"
          />
          <Caption>
            Второй кабинет · <span className="whitespace-nowrap">{clinic.address.street}</span>
          </Caption>
        </Reveal>

        <div className="lg:col-span-6 lg:col-start-7 lg:pt-10">
          <Reveal>
            <p className="text-body-l text-ink-soft">
              {ru(
                "«Покровку» открыла в 2011 году врач, у которой за плечами было девять лет сетевой практики: тридцать минут на приём гигиениста и пятнадцать на первичный осмотр. Замысел был простой. Делать ту же клиническую работу в том темпе, которого она требует, и посмотреть, что изменится."
              )}
            </p>
          </Reveal>

          <Reveal delay={0.06}>
            <p className="mt-7 text-body-l text-ink-soft">
              {ru(
                "Меняется в основном диагностика. Проблемы находятся, пока они ещё настолько малы, что лечатся сменой техники чистки. А вопрос, с которым пациенты на самом деле пришли, звучит обычно минут через восемь после того, как их в другом месте уже проводили бы до двери."
              )}
            </p>
          </Reveal>

          <Reveal delay={0.12}>
            <figure className="u-block border-l border-scrub pl-6 sm:pl-8">
              <blockquote className="text-display-m font-display text-ink">
                {ru("«Ещё никто не вернулся сказать спасибо за то, что я закончила пораньше».")}
              </blockquote>
              <figcaption className="mt-6 u-label text-ink-mute">
                Осипова Анна Ильинична · основатель
              </figcaption>
            </figure>
          </Reveal>

          <Reveal delay={0.18}>
            <p className="u-block u-prose text-body text-ink-mute">
              <TextLink href="/about" className="text-ink">
                Подробнее о клинике
              </TextLink>
              {ru(": как всё начиналось, кто здесь работает и как устроено само место.")}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
