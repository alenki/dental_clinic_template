import { SectionHeader } from "@/components/ui/primitives";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { Photo, Caption } from "@/components/ui/photo";
import { ru } from "@/lib/typo";

const method = [
  {
    title: "КЛКТ",
    body: "Трёхмерный снимок делается до того, как названа цена импланта. План строится по вашей кости, а не по той, что бывает у большинства.",
  },
  {
    title: "Внутриротовое сканирование",
    body: "Тридцать секунд сканирования вместо ложки со слепочной массой. Без рвотного рефлекса, а на выходе получается файл, который можно отправить вам на почту.",
  },
  {
    title: "Керамика за один приём",
    body: "Коронку моделируют и вытачивают здесь же, примерно за час. В большинстве случаев временная коронка на две недели просто не нужна.",
  },
  {
    title: "Работа под увеличением",
    body: "С каналами и краями коронок работаем при увеличении от 4× и выше. Разница между реставрацией на пять лет и реставрацией на пятнадцать по большей части видна только на таком увеличении.",
  },
  {
    title: "Снимки и карта принадлежат вам",
    body: "Сканы, снимки и записи в карте остаются вашими. Попросите, и мы отправим их в тот же день, в формате, который откроет любая другая клиника.",
  },
];

export function Method() {
  return (
    <section id="method" className="u-section scroll-mt-24">
      <div className="u-gutter">
        <SectionHeader
          eyebrow="Метод"
          title="Техника интересна только тем, что она убирает."
          lede="Каждый пункт здесь избавляет приём от чего-то неприятного: от повторного приёма, от полного рта слепочной массы, от догадки."
        />
      </div>

      <Reveal className="u-lede">
        <Photo
          name="methodPrimary"
          className="aspect-4/3 w-full sm:aspect-2/1 lg:aspect-16/6"
          sizes="100vw"
          width={2400}
        />
      </Reveal>

      <div className="u-gutter">
        <Stagger as="ul" className="u-lede grid gap-x-12 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {method.map((item) => (
            <StaggerItem as="li" key={item.title} className="border-t border-ink/12 pt-6">
              <h3 className="text-display-s font-display text-ink">{item.title}</h3>
              <p className="mt-3 u-prose text-body-s text-ink-mute">{ru(item.body)}</p>
            </StaggerItem>
          ))}
        </Stagger>

        {/* Замечание вынесено из списка. Шестым <li> оно шло с той же линией,
            тем же отступом и тем же кеглем, что пять настоящих пунктов, только
            без заголовка, — и читалось как пункт, у которого не отрисовался
            заголовок. Тонкий scrub вместо ink на линии такую разницу не
            вытягивает. */}
        <Reveal className="u-close border-t border-scrub pt-6">
          <p className="u-prose text-body text-ink-mute">
            {ru(
              "Для больничного отделения всё это обычное дело. Необычно оно для клиники на три кресла. В этом и смысл."
            )}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
