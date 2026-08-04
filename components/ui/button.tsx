import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * `solidOnDark` and `outlineOnDark` exist as real variants rather than as
 * className overrides. `cn` is a plain join, not a Tailwind merge, so an
 * override like `bg-bone` does not beat the variant's `bg-scrub`. The winner
 * is decided by stylesheet order, and the override silently loses. Anything
 * that needs to sit on the `chair` band gets a variant of its own.
 */
type Variant = "solid" | "outline" | "quiet" | "solidOnDark" | "outlineOnDark";

/* На телефоне каждая кнопка занимает свою колонку целиком: узкая плашка в
   пустой строке читается как оборванный элемент, а единый строй полос держит
   ритм длинной одноколоночной страницы. С sm ширина снова по содержимому. */
const base =
  "group relative inline-flex w-full items-center justify-center gap-3 overflow-hidden u-label transition-colors duration-[350ms] ease-[cubic-bezier(0.22,1,0.36,1)] disabled:opacity-40 disabled:pointer-events-none sm:w-auto";

/* The text colour flips on focus-visible as well as hover: the sweep fires on
   both, so binding the colour to hover alone leaves a keyboard user with ink
   lettering on an ink fill, an invisible label on the main call to action. */
const variants: Record<Variant, string> = {
  solid: "border border-transparent bg-scrub text-bone px-8 py-4.5 hover:text-bone focus-visible:text-bone",
  outline:
    "border border-ink-mute text-ink px-8 py-4.5 hover:border-ink hover:text-ink focus-visible:text-ink",
  quiet: "text-ink-soft hover:text-ink px-0 py-1",
  solidOnDark: "border border-transparent bg-bone text-ink px-8 py-4.5 hover:text-bone focus-visible:text-bone",
  outlineOnDark:
    "border border-bone-soft text-bone px-8 py-4.5 hover:border-bone focus-visible:border-bone",
};

type SweepTone = "dark" | "light" | "onDark";

const sweepTone: Record<Variant, SweepTone | null> = {
  solid: "dark",
  outline: "light",
  quiet: null,
  solidOnDark: "dark",
  outlineOnDark: "onDark",
};

/** The fill sweep that runs left-to-right under solid and outline buttons. */
function Sweep({ tone }: { tone: SweepTone }) {
  return (
    <span
      aria-hidden
      className={cn(
        "absolute inset-0 -translate-x-[101%] transition-transform duration-[450ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0 group-focus-visible:translate-x-0",
        tone === "dark" && "bg-ink",
        tone === "light" && "bg-ink/5",
        // A 5%-black wash is invisible on the chair band; this one has to lift.
        tone === "onDark" && "bg-bone/10"
      )}
    />
  );
}

function Inner({ children, arrow }: { children: ReactNode; arrow: boolean }) {
  return (
    <span className="relative z-10 inline-flex items-center gap-3">
      {children}
      {arrow ? (
        <span
          aria-hidden
          className="inline-block transition-transform duration-[350ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1"
        >
          →
        </span>
      ) : null}
    </span>
  );
}

type SharedProps = {
  variant?: Variant;
  arrow?: boolean;
  className?: string;
  children: ReactNode;
};

export function ButtonLink({
  href,
  variant = "solid",
  arrow = true,
  className,
  children,
  ...rest
}: SharedProps & { href: string } & Omit<ComponentPropsWithoutRef<"a">, "href" | "className" | "children">) {
  const external = href.startsWith("http") || href.startsWith("tel:") || href.startsWith("mailto:");
  const tone = sweepTone[variant];
  const content = (
    <>
      {tone ? <Sweep tone={tone} /> : null}
      <Inner arrow={arrow}>{children}</Inner>
    </>
  );

  if (external) {
    return (
      <a href={href} className={cn(base, variants[variant], className)} {...rest}>
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={cn(base, variants[variant], className)} {...rest}>
      {content}
    </Link>
  );
}

export function Button({
  variant = "solid",
  arrow = true,
  className,
  children,
  ...rest
}: SharedProps & ComponentPropsWithoutRef<"button">) {
  return (
    <button className={cn(base, variants[variant], className)} {...rest}>
      {sweepTone[variant] ? <Sweep tone={sweepTone[variant]!} /> : null}
      <Inner arrow={arrow}>{children}</Inner>
    </button>
  );
}

/** A text link with the drawing underline. The site's default inline link. */
export function TextLink({
  href,
  className,
  children,
  ...rest
}: { href: string; className?: string; children: ReactNode } & Omit<
  ComponentPropsWithoutRef<"a">,
  "href" | "className" | "children"
>) {
  const external = href.startsWith("http") || href.startsWith("tel:") || href.startsWith("mailto:");
  const classes = cn("u-underline", className);

  if (external) {
    return (
      <a href={href} className={classes} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={classes} {...rest}>
      {children}
    </Link>
  );
}
