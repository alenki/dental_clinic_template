"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { clinic } from "@/content/clinic";
import { services } from "@/content/services";
import { ease } from "@/lib/motion";
import { cn } from "@/lib/cn";

const nav = [
  { href: "/services", label: "Услуги", children: true },
  { href: "/about", label: "О клинике" },
  { href: "/patients", label: "Пациентам" },
  { href: "/contact", label: "Контакты" },
];

function Wordmark({ tone = "light" }: { tone?: "light" | "dark" }) {
  return (
    <Link href="/" className="flex" aria-label={`${clinic.name}, на главную`}>
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "u-label text-[0.8125rem] tracking-[0.2em]",
            tone === "light" ? "text-ink" : "text-bone"
          )}
        >
          ПОКРОВКА
        </span>
        {/* Единственное отступление от шкалы трекинга: «Стоматологическая студия»
            вдвое длиннее английского Dental Studio, и на 0.22em подпись уезжала
            за пределы блока с названием. 0.1em возвращает её в габарит. */}
        <span
          className={cn(
            "u-label mt-1 text-[0.5625rem] tracking-[0.1em]",
            tone === "light" ? "text-ink-mute" : "text-bone-soft"
          )}
        >
          Стоматологическая студия
        </span>
      </span>
    </Link>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const reduced = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  /* Пока меню открыто, страница под ним не только не прокручивается, но и
     выключена из обхода табом: без этого фокус уходил на ссылки, закрытые
     непрозрачной подложкой, и пользователь листал то, чего не видит. */
  useEffect(() => {
    const behind = document.querySelectorAll<HTMLElement>("main, footer");
    document.body.style.overflow = menuOpen ? "hidden" : "";
    behind.forEach((el) => el.toggleAttribute("inert", menuOpen));
    return () => {
      document.body.style.overflow = "";
      behind.forEach((el) => el.removeAttribute("inert"));
    };
  }, [menuOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape" || !menuOpen) return;
      setMenuOpen(false);
      // Фокус возвращается на кнопку, а не остаётся в размонтированной панели.
      toggleRef.current?.focus();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-[450ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
          scrolled
            ? "border-b border-ink/12 bg-bone/85 backdrop-blur-md"
            : "border-b border-transparent bg-transparent"
        )}
      >
        <div className="u-gutter flex h-20 items-center justify-between gap-8 md:h-24">
          <Wordmark />

          <nav aria-label="Основная навигация" className="hidden items-center gap-9 lg:flex">
            {nav.map((item) => {
              const isCurrent = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <div key={item.href} className="group relative">
                  <Link
                    href={item.href}
                    aria-current={isCurrent ? "page" : undefined}
                    /* Состояние привязано к группе, а не к самой ссылке: иначе
                       при переходе курсора в раскрытую панель заголовок гаснет
                       и подчёркивание уезжает, а панель висит под пунктом, у
                       которого вид «к нему не притрагивались». */
                    className={cn(
                      "u-underline u-label py-2 transition-colors duration-[350ms]",
                      "group-hover:bg-[length:100%_1px] group-focus-within:bg-[length:100%_1px]",
                      isCurrent
                        ? "text-ink"
                        : "text-ink-mute group-hover:text-ink group-focus-within:text-ink"
                    )}
                  >
                    {item.label}
                  </Link>

                  {item.children ? (
                    <div className="pointer-events-none absolute left-0 top-full w-64 pt-4 opacity-0 transition-opacity duration-[350ms] group-focus-within:pointer-events-auto group-focus-within:opacity-100 group-hover:pointer-events-auto group-hover:opacity-100">
                      {/* Без тени: это единственная тень на всём сайте, и она
                          превращает панель в «карточку», которых здесь нет. */}
                      <ul className="border border-ink/12 bg-enamel p-2">
                        {services.map((service) => (
                          <li key={service.slug}>
                            <Link
                              href={`/services/${service.slug}`}
                              className="block px-4 py-3 text-body-s text-ink-soft transition-colors duration-200 hover:bg-bone hover:text-ink"
                            >
                              {service.name}
                            </Link>
                          </li>
                        ))}
                        <li className="mt-1 border-t border-ink/12">
                          <Link
                            href="/services"
                            className="block px-4 py-3 u-label text-scrub transition-colors duration-200 hover:bg-bone"
                          >
                            Все услуги →
                          </Link>
                        </li>
                      </ul>
                    </div>
                  ) : null}
                </div>
              );
            })}
          </nav>

          <div className="hidden items-center gap-7 lg:flex">
            <a
              href={clinic.phone.href}
              className="u-underline u-label text-ink-mute transition-colors duration-[350ms] hover:text-ink"
            >
              {clinic.phone.display}
            </a>
            <Link
              href="/contact"
              className="group relative overflow-hidden bg-scrub px-6 py-3.5 u-label text-bone"
            >
              <span
                aria-hidden
                className="absolute inset-0 -translate-x-[101%] bg-ink transition-transform duration-[450ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0 group-focus-visible:translate-x-0"
              />
              <span className="relative z-10">Записаться</span>
            </Link>
          </div>

          <button
            ref={toggleRef}
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className="-mr-2 flex size-11 items-center justify-center lg:hidden"
          >
            <span className="sr-only">{menuOpen ? "Закрыть меню" : "Открыть меню"}</span>
            {/* Схлопывание полосок задано через translate, а не через top:
                transition-transform не анимирует top, и крестик собирался в два
                приёма: полоски схлопывались рывком, и только потом плавно
                поворачивались. */}
            <span aria-hidden className="relative block h-3 w-6">
              <span
                className={cn(
                  "absolute left-0 top-0 block h-px w-full bg-ink transition-transform duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
                  menuOpen ? "translate-y-[6px] rotate-45" : "translate-y-0"
                )}
              />
              <span
                className={cn(
                  "absolute left-0 top-3 block h-px w-full bg-ink transition-transform duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
                  menuOpen ? "-translate-y-[6px] -rotate-45" : "translate-y-0"
                )}
              />
            </span>
          </button>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            id="mobile-menu"
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, y: -12 }}
            transition={{ duration: 0.4, ease }}
            role="dialog"
            aria-modal="true"
            aria-label="Меню"
            className="fixed inset-0 z-40 flex flex-col overflow-y-auto bg-bone pt-20 pb-8 md:pt-24 md:pb-10 lg:hidden"
          >
            {/* Всё меню обязано умещаться в 360×640 — это самый маленький
                экран, который сайт обещает поддерживать. Раньше не умещалось:
                отступы были подобраны на 390×844, и на 640 по высоте телефон
                клиники уходил под нижний край, а он здесь второе по важности
                действие после «Записаться». */}
            <nav
              aria-label="Мобильная навигация"
              className="u-gutter flex flex-1 flex-col justify-center py-2"
            >
              <ul className="flex flex-col">
                {nav.map((item) => {
                  const isCurrent =
                    pathname === item.href || pathname.startsWith(`${item.href}/`);
                  return (
                    <li key={item.href} className="border-t border-ink/12">
                      <Link
                        href={item.href}
                        aria-current={isCurrent ? "page" : undefined}
                        /* Текущий раздел выделяется акцентом, а остальные
                           остаются в полную силу. Гасить непросмотренные пункты
                           нельзя: на главной ни один из них не активен, и всё
                           меню целиком выглядело бы выключенным. */
                        className={cn(
                          "block py-4 text-display-m font-display transition-colors duration-[350ms] short:py-3 sm:py-5",
                          isCurrent ? "text-scrub" : "text-ink hover:text-scrub"
                        )}
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>

              <ul className="mt-7 grid grid-cols-2 gap-x-6 gap-y-3 border-t border-ink/12 pt-7 short:mt-5 short:pt-5">
                {services.map((service) => (
                  <li key={service.slug}>
                    <Link
                      href={`/services/${service.slug}`}
                      className="u-tap u-underline text-body-s text-ink-mute"
                    >
                      {service.short}
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="mt-7 flex flex-col gap-3">
                <Link
                  href="/contact"
                  className="bg-scrub px-8 py-4.5 text-center u-label text-bone"
                >
                  Записаться
                </Link>
                <a
                  href={clinic.phone.href}
                  className="border border-ink-mute px-8 py-4.5 text-center u-label text-ink"
                >
                  {clinic.phone.display}
                </a>
              </div>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
