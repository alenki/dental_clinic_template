"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "motion/react";
import { services } from "@/content/services";
import { useReducedMotionSafe } from "@/components/motion/use-reduced-motion";
import { SectionHeader } from "@/components/ui/primitives";
import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { Photo } from "@/components/ui/photo";
import type { ImageKey } from "@/lib/images";
import { ru } from "@/lib/typo";

/**
 * Услуги как редакционный список, а не сетка карточек. При наведении на строку
 * в соседней колонке перекрёстно проявляется её фотография. Список остаётся
 * тихим, работу берёт на себя изображение.
 */
export function Care() {
  const reduced = useReducedMotionSafe();
  const [active, setActive] = useState(0);

  return (
    <section id="care" className="u-gutter u-section scroll-mt-24">
      <SectionHeader
        eyebrow="Услуги"
        title="Шесть направлений и честное описание каждого."
        lede="Общая стоматология, а вместе с ней хирургия и эстетика, которые клиники такого размера обычно передают коллегам. Если лечение вам не подходит, мы скажем об этом до записи, а не после."
      />

      <div className="u-lede grid gap-x-16 gap-y-12 lg:grid-cols-12">
        <Stagger as="ul" className="lg:col-span-7">
          {services.map((service, index) => (
            <StaggerItem as="li" key={service.slug} className="border-t border-ink/12">
              <Link
                href={`/services/${service.slug}`}
                onMouseEnter={() => setActive(index)}
                onFocus={() => setActive(index)}
                /* Сдвиг через transform, а не padding-left: во-первых, спека
                   просит 8px, а не 16, во-вторых, padding пересобирал строку
                   на каждом кадре. */
                className="group flex items-start justify-between gap-8 py-8 transition-transform duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:translate-x-2 focus-visible:translate-x-2"
              >
                <span className="flex-1">
                  <span className="block text-display-s font-display text-ink">{service.name}</span>
                  <span className="mt-3 block u-prose text-body-s text-ink-mute">
                    {ru(service.summary)}
                  </span>
                </span>
                <span
                  aria-hidden
                  className="mt-2 shrink-0 text-ink/30 transition-all duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1 group-hover:text-scrub group-focus-visible:text-scrub"
                >
                  →
                </span>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>

        <div className="hidden lg:col-span-4 lg:col-start-9 lg:block">
          <div className="sticky top-32">
            <div className="relative aspect-4/5 w-full overflow-hidden bg-dentin/30">
              {services.map((service, index) => (
                <motion.div
                  key={service.slug}
                  aria-hidden={index !== active}
                  initial={false}
                  animate={{ opacity: index === active ? 1 : 0 }}
                  transition={{ duration: reduced ? 0 : 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0"
                >
                  <Photo
                    name={service.imageKey as ImageKey}
                    className="h-full w-full"
                    sizes="33vw"
                    width={900}
                  />
                </motion.div>
              ))}
            </div>
            <p className="mt-4 u-label text-ink-mute">{services[active].name}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
