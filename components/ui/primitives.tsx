import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { DrawRule, Reveal } from "@/components/motion/reveal";
import { ruNode } from "@/lib/typo";

/**
 * Small uppercase label opening a section. The site's only eyebrow.
 *
 * Раньше перед надзаголовком стоял квадрат 5×5 цвета scrub. Он повторялся у
 * каждого раздела на каждом маршруте и не значил ничего: не маркер списка, не
 * иконка, не часть знака. Надзаголовок и так отбит разрядкой, кеглем и
 * линией над ним — квадрат добавлял к этому только пятно.
 */
export function Eyebrow({
  children,
  className,
  tone = "light",
}: {
  children: ReactNode;
  className?: string;
  tone?: "light" | "dark";
}) {
  return (
    <span
      className={cn(
        "u-label inline-flex items-center",
        tone === "light" ? "text-ink-mute" : "text-bone-soft",
        className
      )}
    >
      {children}
    </span>
  );
}

/**
 * Section opener: a rule that draws in, an eyebrow, a display heading, and an
 * optional lede set beside it on wide screens.
 */
export function SectionHeader({
  eyebrow,
  title,
  lede,
  tone = "light",
  className,
  align = "split",
}: {
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
  tone?: "light" | "dark";
  className?: string;
  align?: "split" | "stack";
}) {
  return (
    <div className={className}>
      <DrawRule className={cn("h-px w-full origin-left", tone === "light" ? "bg-ink/12" : "bg-bone/15")} />
      <Reveal className="pt-6">
        <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
      </Reveal>

      <div
        className={cn(
          "mt-8",
          align === "split" && lede
            ? "grid gap-x-16 gap-y-8 lg:grid-cols-12"
            : ""
        )}
      >
        <Reveal className={align === "split" && lede ? "lg:col-span-7" : ""} delay={0.05}>
          <h2
            className={cn(
              "text-display-l font-display",
              tone === "light" ? "text-ink" : "text-bone"
            )}
          >
            {ruNode(title)}
          </h2>
        </Reveal>

        {lede ? (
          <Reveal
            className={cn(
              align === "split" ? "lg:col-span-4 lg:col-start-9 lg:pt-3" : "mt-6"
            )}
            delay={0.12}
          >
            <p
              className={cn(
                "text-body-l u-prose",
                tone === "light" ? "text-ink-soft" : "text-bone-soft"
              )}
            >
              {ruNode(lede)}
            </p>
          </Reveal>
        ) : null}
      </div>
    </div>
  );
}

/** Label / value pair used for facts, hours, and figures. */
export function DataRow({
  label,
  value,
  tone = "light",
}: {
  label: string;
  value: ReactNode;
  tone?: "light" | "dark";
}) {
  return (
    <div
      className={cn(
        "flex items-baseline justify-between gap-6 border-t py-4",
        tone === "light" ? "border-ink/12" : "border-bone/15"
      )}
    >
      <dt className={cn("u-label", tone === "light" ? "text-ink-mute" : "text-bone-soft")}>{label}</dt>
      <dd
        className={cn(
          "text-body-s text-right",
          tone === "light" ? "text-ink" : "text-bone"
        )}
      >
        {value}
      </dd>
    </div>
  );
}

/** Page-level opener used by every route except the home page. */
export function PageHeader({
  eyebrow,
  title,
  lede,
}: {
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
}) {
  return (
    <header className="u-gutter pt-36 pb-16 md:pt-44 md:pb-24">
      <Reveal>
        <Eyebrow>{eyebrow}</Eyebrow>
      </Reveal>
      <Reveal delay={0.06}>
        <h1 className="mt-7 max-w-[16ch] text-display-xl font-display text-ink">{ruNode(title)}</h1>
      </Reveal>
      {lede ? (
        <Reveal delay={0.14}>
          <p className="u-block u-prose text-body-l text-ink-soft">{ruNode(lede)}</p>
        </Reveal>
      ) : null}
    </header>
  );
}
