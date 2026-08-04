import { team } from "@/content/team";
import { SectionHeader } from "@/components/ui/primitives";
import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { ru } from "@/lib/typo";
import { Photo } from "@/components/ui/photo";
import { ButtonLink } from "@/components/ui/button";
import type { ImageKey } from "@/lib/images";

export function People() {
  return (
    <section id="people" className="u-gutter u-section scroll-mt-24">
      <SectionHeader
        eyebrow="Врачи"
        title="Пять человек, и каждый раз вы видите тех же самых."
        lede="Постоянство это тихое преимущество маленькой клиники. Тот, кто сравнивает ваши дёсны с прошлогодними, был в кабинете и в прошлом году."
      />

      <Stagger className="u-lede grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-6">
        {team.map((member) => (
          <StaggerItem key={member.name} as="article" className="lg:col-span-2">
            <Photo
              name={member.imageKey as ImageKey}
              className="aspect-4/5 w-full sm:aspect-3/4"
              sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
              width={900}
            />
            <h3 className="mt-6 text-display-s font-display text-ink">
              {member.name}
              {member.credentials ? (
                <span className="text-ink-mute"> {member.credentials}</span>
              ) : null}
            </h3>
            <p className="mt-2 u-label text-scrub">{member.role}</p>
            <p className="mt-4 u-prose text-body-s text-ink-mute">{ru(member.line)}</p>
          </StaggerItem>
        ))}

        <StaggerItem className="flex flex-col justify-end sm:col-span-2 lg:col-span-2">
          <div className="border-t border-ink/12 pt-6">
            <p className="u-prose text-body text-ink-mute">
              {ru(
                "Подробные биографии, история клиники и фотографии здания собраны на странице о клинике."
              )}
            </p>
            <div className="mt-8">
              <ButtonLink href="/about" variant="outline">
                О клинике
              </ButtonLink>
            </div>
          </div>
        </StaggerItem>
      </Stagger>
    </section>
  );
}
