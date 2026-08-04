"use client";

import { motion } from "motion/react";
import { clinic } from "@/content/clinic";
import { useReducedMotionSafe } from "@/components/motion/use-reduced-motion";
import { ButtonLink } from "@/components/ui/button";
import { Photo } from "@/components/ui/photo";
import { ease } from "@/lib/motion";
import { cn } from "@/lib/cn";
import { ru } from "@/lib/typo";

/**
 * Единственный риск во всём макете: при загрузке «без спешки» отпускает
 * межбуквенное расстояние с -0.03em до 0.015em за 1.4 секунды. Строка
 * буквально замедляется, пока её читают.
 *
 * Диапазон мягче, чем в английской версии: кириллица шире и ровнее латиницы,
 * и сильный отрицательный трекинг на ней читается как дефект набора.
 *
 * При prefers-reduced-motion строка просто появляется в конечном виде.
 */
export function Hero() {
  const reduced = useReducedMotionSafe();

  const rise = (delay: number) => ({
    "data-reveal": "",
    ...(reduced
      ? { initial: false as const, animate: { opacity: 1, y: 0 } }
      : {
          initial: { opacity: 0, y: 14 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8, ease, delay },
        }),
  });

  return (
    <section id="opening" className="u-gutter scroll-mt-24 pt-32 pb-16 md:pt-40 md:pb-20">
      <div className="grid items-end gap-x-12 gap-y-14 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <motion.p {...rise(0.1)} className="u-label text-ink-mute">
            {clinic.address.city} · {clinic.address.metro} · с {clinic.established} года
          </motion.p>

          <h1 className="mt-8 text-display-xl font-display text-ink">
            <motion.span {...rise(0.2)} className="block">
              Стоматология
            </motion.span>
            <motion.span
              data-reveal=""
              className="block"
              initial={reduced ? false : { opacity: 0, y: 14, letterSpacing: "-0.03em" }}
              animate={{ opacity: 1, y: 0, letterSpacing: "0.015em" }}
              transition={
                reduced
                  ? { duration: 0 }
                  : {
                      opacity: { duration: 0.8, ease, delay: 0.34 },
                      y: { duration: 0.8, ease, delay: 0.34 },
                      letterSpacing: { duration: 1.4, ease, delay: 0.34 },
                    }
              }
            >
              без спешки.
            </motion.span>
          </h1>

          <motion.div
            aria-hidden
            data-reveal=""
            initial={reduced ? false : { scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={reduced ? { duration: 0 } : { duration: 1, ease, delay: 0.5 }}
            className="u-block h-px w-full origin-left bg-ink/12"
          />

          <div className="u-block grid gap-x-12 gap-y-8 md:grid-cols-2">
            <motion.p {...rise(0.62)} className="text-body-l text-ink-soft">
              {ru(
                "Приём гигиениста здесь длится час. Первичная консультация занимает полтора часа, и в ней не делают ничего, кроме осмотра и разговора. Всё остальное следует уже из этого."
              )}
            </motion.p>
            <motion.div {...rise(0.72)} className="flex flex-wrap items-stretch gap-4 [&>*]:min-w-[13rem] [&>*]:flex-1">
              <ButtonLink href="/contact">Записаться</ButtonLink>
              <ButtonLink href={clinic.phone.href} variant="outline" arrow={false}>
                {clinic.phone.display}
              </ButtonLink>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={reduced ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={reduced ? { duration: 0 } : { duration: 1.1, ease, delay: 0.3 }}
          className="lg:col-span-4 lg:col-start-9"
        >
          <Photo
            name="heroPortrait"
            priority
            className="aspect-4/5 w-full"
            sizes="(min-width: 1024px) 33vw, 100vw"
            width={1200}
          />
          <p className="mt-4 u-label text-ink-mute">Зона ожидания · {clinic.address.street}</p>
        </motion.div>
      </div>

      <motion.dl
        data-reveal=""
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={reduced ? { duration: 0 } : { duration: 0.9, ease, delay: 0.9 }}
        className="u-close grid grid-cols-2 gap-x-8 border-t border-ink/12 md:grid-cols-4 md:gap-x-12"
      >
        {clinic.figures.map((figure, index) => (
          <div
            key={figure.label}
            /* Линия слева, а не справа, и с таким же отступом слева — ровно так
               же, как в такой же плашке на /about. Раньше здесь стояла
               border-r без всякого padding-left: справа от линии оставалось
               24px воздуха, слева ноль, и вторая, третья и четвёртая цифры
               липли к черте, будто колонка обрезана.

               Нижняя линия только у первого ряда: с ней у всех четырёх плашка
               закрывалась второй линией, и дальше шло полторы сотни пикселей
               пустоты до линии следующего раздела — две параллельные черты
               вокруг ничего. */
            className={cn(
              "py-7 md:border-l md:border-ink/12 md:py-8 md:pl-6 md:first:border-l-0 md:first:pl-0",
              index < clinic.figures.length - 2 && "border-b border-ink/12 md:border-b-0"
            )}
          >
            <dt className="text-display-s font-display tabular-nums text-ink">{figure.value}</dt>
            <dd className="mt-2 max-w-[22ch] text-body-s text-ink-mute">{ru(figure.label)}</dd>
          </div>
        ))}
      </motion.dl>
    </section>
  );
}
