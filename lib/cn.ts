/**
 * Склеивает классы. Это НЕ tailwind-merge: конфликтующие утилиты не
 * схлопываются, поэтому `cn("bg-scrub", "bg-bone")` оставит обе, и победит та,
 * что стоит позже в самом CSS, а не та, что передана последней.
 *
 * Практическое следствие: цвет, фон и отступы компонента нельзя переопределить
 * через `className`. Если нужен другой вид кнопки или поля, добавляйте вариант
 * в сам компонент (см. `solidOnDark` в components/ui/button.tsx), а не правьте
 * его снаружи.
 */
export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}
