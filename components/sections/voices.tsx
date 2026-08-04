import { testimonials } from "@/content/patients";
import { SectionHeader } from "@/components/ui/primitives";
import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { ru } from "@/lib/typo";

export function Voices() {
  return (
    <section id="voices" className="u-gutter u-section scroll-mt-24">
      <SectionHeader
        eyebrow="Отзывы"
        title="Что говорят те, кто ходит сюда не первый год."
        align="stack"
      />

      <Stagger as="ul" className="u-lede grid gap-x-12 gap-y-12 md:grid-cols-3">
        {testimonials.map((item) => (
          <StaggerItem as="li" key={item.name} className="border-t border-ink/12 pt-8">
            <figure>
              <blockquote className="text-display-s font-display text-ink">
                {ru(`«${item.quote}»`)}
              </blockquote>
              <figcaption className="mt-7 u-label text-ink-mute">
                {item.name}
                <span className="mx-2 text-ink/30">/</span>
                {item.detail}
              </figcaption>
            </figure>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
