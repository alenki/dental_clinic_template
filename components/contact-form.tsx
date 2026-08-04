"use client";

import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import { clinic } from "@/content/clinic";
import { services } from "@/content/services";
import { Button, TextLink } from "@/components/ui/button";
import { CheckboxField, SelectField, TextArea, TextField } from "@/components/ui/field";
import { Eyebrow } from "@/components/ui/primitives";
import { ru } from "@/lib/typo";

/**
 * Форма заявки на приём.
 *
 * Сервера за ней нет. Отправка проверяет поля в браузере и подменяет форму
 * подтверждением, а под кнопкой это сказано прямым текстом, а не намёком:
 * форма, которая делает вид, что отправляет, хуже той, что честно признаётся.
 */

const topicOptions = [
  { value: "", label: "Выберите" },
  ...services.map((service) => ({ value: service.slug, label: service.name })),
  { value: "checkup", label: "Гигиена или осмотр" },
  { value: "unsure", label: "Пока не знаю" },
];

const patientOptions = [
  { value: "", label: "Выберите" },
  { value: "yes", label: "Да, уже наблюдаюсь у вас" },
  { value: "no", label: "Нет, это будет первый визит" },
];

const initialValues = {
  name: "",
  email: "",
  phone: "",
  topic: "",
  patient: "",
  times: "",
  message: "",
  sms: false,
};

type Values = typeof initialValues;
type Errors = Partial<Record<"name" | "phone" | "email", string>>;

export function ContactForm() {
  const [values, setValues] = useState<Values>(initialValues);
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  const formRef = useRef<HTMLFormElement>(null);
  const receiptRef = useRef<HTMLDivElement>(null);
  const mounted = useRef(false);

  /* Фокус переезжает вместе с подменой: на подтверждение после отправки и
     обратно в первое поле, когда читатель просит чистую форму. */
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    if (sent) {
      receiptRef.current?.focus();
    } else {
      formRef.current?.querySelector<HTMLInputElement>('input[name="name"]')?.focus();
    }
  }, [sent]);

  function update(patch: Partial<Values>) {
    setValues((prev) => ({ ...prev, ...patch }));
  }

  function clearError(key: keyof Errors) {
    setErrors((prev) => {
      if (prev[key] === undefined) return prev;
      const next: Errors = { ...prev };
      delete next[key];
      return next;
    });
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const next: Errors = {};
    if (!values.name.trim()) {
      next.name = "Напишите, как к вам обращаться.";
    }
    /* Телефон обязателен, а почта нет: время приёма у нас согласуют звонком. */
    const phone = values.phone.trim();
    if (!phone) {
      next.phone = "Оставьте телефон, по нему мы и перезвоним.";
    } else if (phone.replace(/\D/g, "").length < 10) {
      next.phone = "Похоже, в номере не хватает цифр. Проверьте его.";
    }
    const email = values.email.trim();
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      next.email = "Адрес выглядит неполным. Проверьте его и попробуйте снова.";
    }
    setErrors(next);

    const firstInvalid = (Object.keys(next) as Array<keyof Errors>)[0];
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLInputElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }

    setSent(true);
  }

  function reset() {
    setValues(initialValues);
    setErrors({});
    setSent(false);
  }

  if (sent) {
    const firstName = values.name.trim().split(/\s+/)[0];

    return (
      <div
        ref={receiptRef}
        tabIndex={-1}
        role="status"
        aria-live="polite"
        className="border-t border-scrub pt-8"
      >
        <Eyebrow>Заявка принята</Eyebrow>
        <h3 className="mt-7 break-words text-display-s font-display text-ink">
          Спасибо, {firstName}.
        </h3>

        <p className="mt-7 u-prose break-words text-body-l text-ink-soft">
          {ru(
            "Заявки читаем по мере поступления и отвечаем в тот же рабочий день. Перезвоним по номеру "
          )}
          <span className="whitespace-nowrap">{values.phone}</span>
          {values.email ? <>{ru(", а если не дозвонимся, напишем на ")}{values.email}</> : null}
          {ru(". Всё, что пришло после 14:00 в пятницу, разбираем в понедельник утром.")}
        </p>

        <p className="mt-6 u-prose text-body text-ink-mute">
          {ru(
            "Приём пока не назначен. Время появится в расписании только после того, как мы предложим его, а вы подтвердите, что оно подходит."
          )}
        </p>

        <div className="u-block border-t border-ink/12 pt-8">
          <p className="u-prose text-body-s text-ink-mute">
            {ru(
              "Если совсем честно: ничего не отправилось. Это демонстрационный сайт, сервера за формой нет. Написанное проверилось в браузере и дальше не ушло. Чтобы связаться с клиникой по-настоящему, позвоните "
            )}
            <TextLink href={clinic.phone.href} className="text-ink-soft">
              {clinic.phone.display}
            </TextLink>
            .
          </p>
          <div className="mt-8">
            <Button type="button" variant="outline" arrow={false} onClick={reset}>
              Отправить ещё одну заявку
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate>
      <div className="grid gap-x-10 gap-y-10 sm:grid-cols-2 sm:gap-y-12">
        <TextField
          className="sm:col-span-2"
          label="Имя"
          name="name"
          required
          autoComplete="name"
          error={errors.name}
          value={values.name}
          onChange={(event) => {
            update({ name: event.target.value });
            clearError("name");
          }}
        />

        <TextField
          label="Электронная почта"
          name="email"
          type="email"
          autoComplete="email"
          inputMode="email"
          hint="Не обязательно, но пригодится, если нужно прислать план или смету."
          error={errors.email}
          value={values.email}
          onChange={(event) => {
            update({ email: event.target.value });
            clearError("email");
          }}
        />

        <TextField
          label="Телефон"
          name="phone"
          type="tel"
          required
          autoComplete="tel"
          inputMode="tel"
          hint="Самый быстрый способ согласовать время."
          error={errors.phone}
          value={values.phone}
          onChange={(event) => {
            update({ phone: event.target.value });
            clearError("phone");
          }}
        />

        <SelectField
          label="С чем вы обращаетесь?"
          name="topic"
          className="sm:col-span-2"
          options={topicOptions}
          value={values.topic}
          onChange={(event) => update({ topic: event.target.value })}
        />

        <SelectField
          label="Вы уже были у нас?"
          name="patient"
          options={patientOptions}
          value={values.patient}
          onChange={(event) => update({ patient: event.target.value })}
        />

        <TextField
          label="Удобное время"
          name="times"
          hint="Например: будни до обеда или что угодно после 17:00."
          value={values.times}
          onChange={(event) => update({ times: event.target.value })}
        />

        <TextArea
          label="Сообщение"
          name="message"
          rows={5}
          className="sm:col-span-2"
          hint="Всё, что поможет подготовиться: что беспокоит, как давно это длится и чего вы не хотели бы на первом приёме."
          value={values.message}
          onChange={(event) => update({ message: event.target.value })}
        />

        <CheckboxField
          className="sm:col-span-2"
          name="sms"
          checked={values.sms}
          onChange={(event) => update({ sms: event.target.checked })}
          label={ru(
            "Да, можно писать мне в СМС об этой заявке и о времени приёма. Ничего другого мы не пришлём, а по первой просьбе перестанем писать совсем."
          )}
        />
      </div>

      <div className="u-block border-t border-ink/12 pt-8">
        <Button type="submit">Отправить заявку</Button>
        <p className="mt-7 u-prose text-body-s text-ink-mute">
          {ru(
            "Поля со звёздочкой обязательны. На самом деле ничего никуда не отправляется: это демонстрационный сайт, сервера за формой нет. Заявка проверяется в браузере и дальше не уходит. Чтобы записаться по-настоящему, позвоните "
          )}
          <TextLink href={clinic.phone.href} className="text-ink-soft">
            {clinic.phone.display}
          </TextLink>{" "}
          или напишите на{" "}
          <TextLink href={`mailto:${clinic.email}`} className="text-ink-soft">
            {clinic.email}
          </TextLink>
          .
        </p>
      </div>
    </form>
  );
}
