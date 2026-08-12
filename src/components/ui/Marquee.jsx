/**
 * Edge-faded infinite marquee. The track holds two identical copies of the
 * list and slides exactly -50%, so the loop is seamless. The duplicate is
 * hidden from assistive tech and a plain sentence carries the same content.
 */
export default function Marquee({ items, label, renderItem }) {
  return (
    <div className="mask-fade-x overflow-hidden">
      <div className="flex w-max motion-safe:animate-marquee">
        {[0, 1].map((copy) => (
          <ul
            key={copy}
            aria-hidden={copy === 1 ? 'true' : undefined}
            className="flex shrink-0 items-center gap-12 pr-12 sm:gap-20 sm:pr-20"
          >
            {items.map((item) => (
              <li key={`${copy}-${item}`} className="shrink-0">
                {renderItem ? renderItem(item) : item}
              </li>
            ))}
          </ul>
        ))}
      </div>
      {label && <p className="sr-only">{label}</p>}
    </div>
  )
}
