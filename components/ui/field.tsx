"use client";

import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { useId } from "react";
import { cn } from "@/lib/cn";
import { ruNode } from "@/lib/typo";

/**
 * Без `focus:outline-none`: он перебивал общее правило :focus-visible из
 * globals.css, и форма (единственная конверсионная поверхность сайта)
 * оставалась без кольца фокуса.
 *
 * Ошибка обозначается толщиной, а не цветом: раньше и фокус, и невалидное поле
 * рисовались одинаковой линией scrub, и различить их было нельзя. Нижний
 * padding уменьшен на пиксель, чтобы утолщение линии не сдвигало базовую линию.
 */
const control =
  "w-full border-b border-ink-mute bg-transparent pb-3 pt-2 text-body text-ink placeholder:text-ink/30 transition-colors duration-[350ms] focus:border-scrub aria-[invalid=true]:border-b-2 aria-[invalid=true]:border-scrub aria-[invalid=true]:pb-[11px]";

/**
 * Подпись под полем — одно место, а не два.
 *
 * Раньше подсказка жила внутри поля, а ошибку форма дорисовывала снаружи, уже
 * после него. Из-за этого между красной чертой невалидного поля и объяснением,
 * что с ним не так, стояла нейтральная серая подсказка, а расстояние от поля до
 * ошибки гуляло от 12px (у поля без подсказки) до 65px (у поля с подсказкой) —
 * в пределах одной формы. Теперь ошибка занимает место подсказки: пока поле в
 * порядке, там подсказка, как только нет — ошибка, и всегда на одном отступе.
 */
function Note({
  id,
  tone,
  children,
}: {
  id?: string;
  tone: "hint" | "error";
  children: ReactNode;
}) {
  if (tone === "hint") {
    return (
      <p id={id} className="mt-2 text-body-s text-ink-mute">
        {ruNode(children)}
      </p>
    );
  }
  /* Ошибку несёт цвет и утолщённая линия под полем, а не квадрат перед
     текстом: квадрат был тем же знаком, что стоял у каждого надзаголовка на
     сайте, и в форме читался как украшение, а не как тревога. */
  return (
    <p id={id} role="alert" className="mt-2 text-body-s text-scrub">
      {ruNode(children)}
    </p>
  );
}

function Shell({
  label,
  htmlFor,
  hint,
  noteId,
  error,
  required,
  children,
  className,
}: {
  label: string;
  htmlFor: string;
  hint?: string;
  noteId?: string;
  error?: string;
  required?: boolean;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col", className)}>
      <label htmlFor={htmlFor} className="u-label text-ink-mute">
        {label}
        {required ? (
          <>
            <span aria-hidden className="text-scrub">
              {" *"}
            </span>
            <span className="sr-only"> (обязательное поле)</span>
          </>
        ) : null}
      </label>
      <div className="mt-2">{children}</div>
      {error ? (
        <Note id={noteId} tone="error">
          {error}
        </Note>
      ) : hint ? (
        <Note id={noteId} tone="hint">
          {hint}
        </Note>
      ) : null}
    </div>
  );
}

type FieldShared = { label: string; hint?: string; error?: string; className?: string };

/** Общая обвязка: один id на поле, один на подпись под ним. */
function useField(hint?: string, error?: string) {
  const id = useId();
  const noteId = error || hint ? `${id}-note` : undefined;
  return {
    id,
    noteId,
    aria: {
      "aria-invalid": error ? (true as const) : undefined,
      "aria-describedby": noteId,
    },
  };
}

export function TextField({
  label,
  hint,
  error,
  className,
  ...rest
}: FieldShared & ComponentPropsWithoutRef<"input">) {
  const { id, noteId, aria } = useField(hint, error);
  return (
    <Shell
      label={label}
      htmlFor={id}
      hint={hint}
      noteId={noteId}
      error={error}
      required={rest.required}
      className={className}
    >
      <input id={id} className={control} {...rest} {...aria} />
    </Shell>
  );
}

export function TextArea({
  label,
  hint,
  error,
  className,
  ...rest
}: FieldShared & ComponentPropsWithoutRef<"textarea">) {
  const { id, noteId, aria } = useField(hint, error);
  return (
    <Shell
      label={label}
      htmlFor={id}
      hint={hint}
      noteId={noteId}
      error={error}
      required={rest.required}
      className={className}
    >
      <textarea id={id} rows={4} className={cn(control, "resize-none")} {...rest} {...aria} />
    </Shell>
  );
}

export function SelectField({
  label,
  hint,
  error,
  options,
  className,
  ...rest
}: FieldShared & {
  options: Array<{ value: string; label: string }>;
} & ComponentPropsWithoutRef<"select">) {
  const { id, noteId, aria } = useField(hint, error);
  return (
    <Shell
      label={label}
      htmlFor={id}
      hint={hint}
      noteId={noteId}
      error={error}
      required={rest.required}
      className={className}
    >
      <div className="relative">
        {/* Пока ничего не выбрано, «Выберите» набрано как placeholder, а не как
            ответ. Иначе два списка — единственные поля формы, которые выглядят
            уже заполненными, потому что текстовые поля просто пустые. */}
        <select
          id={id}
          className={cn(control, "appearance-none pr-8", !rest.value && "text-ink/30")}
          {...rest}
          {...aria}
        >
          {options.map((o) => (
            <option key={o.value} value={o.value} className="text-ink">
              {o.label}
            </option>
          ))}
        </select>
        <span
          aria-hidden
          className="pointer-events-none absolute bottom-4 right-1 text-body-s text-ink-mute"
        >
          ↓
        </span>
      </div>
    </Shell>
  );
}

export function CheckboxField({
  label,
  className,
  ...rest
}: { label: string; className?: string } & ComponentPropsWithoutRef<"input">) {
  const id = useId();
  return (
    <div className={cn("flex items-start gap-3", className)}>
      {/* size-5, а не size-4: 16px — это меньше минимальной цели нажатия, и на
          телефоне в этот квадрат приходилось целиться. */}
      <input
        id={id}
        type="checkbox"
        className="mt-0.5 size-5 shrink-0 appearance-none border border-ink-mute bg-transparent transition-colors checked:border-scrub checked:bg-scrub focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-scrub"
        {...rest}
      />
      <label htmlFor={id} className="text-body-s text-ink-mute">
        {label}
      </label>
    </div>
  );
}
