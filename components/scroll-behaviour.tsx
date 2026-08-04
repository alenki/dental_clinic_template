"use client";

import { useEffect } from "react";

/**
 * Держит признак «человек идёт по странице с клавиатуры».
 *
 * Плавная прокрутка нужна при переходах по якорям и по шкале эмали, но мешает
 * при обходе табом: браузер подтягивает элемент в поле зрения анимацией, фокус
 * оказывается впереди, а страница ползёт следом. Пока нажимают Tab, на <html>
 * висит data-keyboard-nav и прокрутка мгновенная; при первом же касании мыши
 * или тачпада признак снимается и плавность возвращается.
 *
 * Ничего не рендерит.
 */
export function ScrollBehaviour() {
  useEffect(() => {
    const root = document.documentElement;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Tab") root.setAttribute("data-keyboard-nav", "");
    };
    const onPointerDown = () => root.removeAttribute("data-keyboard-nav");

    window.addEventListener("keydown", onKeyDown, true);
    window.addEventListener("pointerdown", onPointerDown, true);
    return () => {
      window.removeEventListener("keydown", onKeyDown, true);
      window.removeEventListener("pointerdown", onPointerDown, true);
      root.removeAttribute("data-keyboard-nav");
    };
  }, []);

  return null;
}
