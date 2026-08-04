"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";

/**
 * useReducedMotion, безопасный для гидратации.
 *
 * Родной хук на сервере возвращает false, а на клиенте с включённым
 * prefers-reduced-motion — true уже в первом рендере. Разметка расходится, и
 * React пишет об этом ошибку на каждой странице: сервер отдал opacity:0, клиент
 * ожидает opacity:1.
 *
 * Здесь первый клиентский рендер совпадает с серверным (false), а настоящее
 * значение приходит эффектом сразу после монтирования. Пока скрипты не
 * загрузились, читателя со сниженной анимацией страхует CSS-правило
 * [data-reveal] в globals.css: оно перебивает серверные inline-стили и держит
 * контент видимым.
 */
export function useReducedMotionSafe(): boolean {
  const reduced = useReducedMotion();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  return hydrated ? Boolean(reduced) : false;
}
