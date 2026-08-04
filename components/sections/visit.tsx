import { firstVisit, insurance } from "@/content/patients";
import { SectionHeader } from "@/components/ui/primitives";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { ButtonLink } from "@/components/ui/button";
import { ru } from "@/lib/typo";

export function Visit() {
  return (
    <section id="visit" className="scroll-mt-24 border-y border-ink/12 bg-enamel">
      <div className="u-gutter u-section">
        <SectionHeader
          eyebrow="Приём"
          title={firstVisit.title}
          lede={firstVisit.body}
        />

        {/* С номерами, потому что это и правда последовательность: по порядку, за один приём. */}
        <Stagger as="ol" className="u-lede grid gap-x-12 gap-y-12 sm:grid-cols-2">
          {firstVisit.steps.map((step, index) => (
            <StaggerItem as="li" key={step.title} className="border-t border-ink/12 pt-6">
              <span className="u-label tabular-nums text-scrub">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 text-display-s font-display text-ink">{step.title}</h3>
              <p className="mt-3 u-prose text-body-s text-ink-mute">{ru(step.body)}</p>
            </StaggerItem>
          ))}
        </Stagger>

        <div className="u-close grid gap-x-16 gap-y-10 border-t border-ink/12 pt-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <h3 className="u-label text-ink-mute">ДМС-партнёры</h3>
          </Reveal>
          <Reveal className="lg:col-span-8" delay={0.06}>
            <ul className="flex flex-wrap gap-x-8 gap-y-3">
              {insurance.accepted.map((name) => (
                <li key={name} className="text-body text-ink-soft">
                  {name}
                </li>
              ))}
            </ul>
            <p className="mt-8 u-prose text-body-s text-ink-mute">{ru(insurance.note)}</p>
            <div className="mt-9">
              <ButtonLink href="/patients" variant="outline">
                Бланки, оплата и вопросы
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
