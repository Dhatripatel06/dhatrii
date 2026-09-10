import Link from 'next/link'

import { resolveTokens } from '@/data/blog'

/**
 * Renders an article's structured blocks using the site's existing type scale.
 *
 * Deliberately not markdown: keeping the block set small means a post cannot
 * introduce typography the rest of the site does not have, and no parser needs
 * to be added as a dependency. Every string passes through `resolveTokens`, so
 * a price written as {{app.inr}} always matches the pricing card.
 *
 * Server component — an article ships as static HTML with no JS behind it.
 */

/* Splits **bold** runs out of a plain string. Deliberately the only inline
   markup supported: anything richer belongs in a `rich` array. */
function withEmphasis(text, keyPrefix) {
  return resolveTokens(text)
    .split(/(\*\*[^*]+\*\*)/g)
    .filter(Boolean)
    .map((part, index) =>
      part.startsWith('**') && part.endsWith('**') ? (
        <strong key={`${keyPrefix}-${index}`} className="font-semibold text-text">
          {part.slice(2, -2)}
        </strong>
      ) : (
        part
      ),
    )
}

/* A `rich` array interleaves strings with { href, label } link objects. */
function renderRich(nodes, keyPrefix) {
  return nodes.map((node, index) => {
    if (typeof node === 'string') return withEmphasis(node, `${keyPrefix}-${index}`)
    const isInternal = node.href.startsWith('/')
    const className = 'link-underline font-medium text-accent'
    return isInternal ? (
      <Link key={`${keyPrefix}-${index}`} href={node.href} className={className}>
        {node.label}
      </Link>
    ) : (
      <a
        key={`${keyPrefix}-${index}`}
        href={node.href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {node.label}
      </a>
    )
  })
}

const inline = (block, key) =>
  block.rich ? renderRich(block.rich, key) : withEmphasis(block.text, key)

function ListItems({ items, keyPrefix }) {
  return items.map((item, index) => (
    <li key={`${keyPrefix}-${index}`} className="flex items-start gap-3">
      <span aria-hidden="true" className="mt-[0.7em] h-1 w-1 shrink-0 rounded-full bg-accent" />
      <span>
        {typeof item === 'string'
          ? withEmphasis(item, `${keyPrefix}-${index}`)
          : renderRich(item.rich, `${keyPrefix}-${index}`)}
      </span>
    </li>
  ))
}

export default function Prose({ blocks }) {
  return (
    <div className="flex flex-col">
      {blocks.map((block, index) => {
        const key = `b${index}`

        switch (block.type) {
          case 'h2':
            return (
              <h2
                key={key}
                className="mt-12 text-[clamp(1.5rem,4.4vw,2rem)] font-bold leading-[1.15] tracking-[-0.025em] first:mt-0"
              >
                {resolveTokens(block.text)}
              </h2>
            )

          case 'h3':
            return (
              <h3
                key={key}
                className="mt-9 font-display text-[1.15rem] font-bold tracking-[-0.02em] sm:text-[1.25rem]"
              >
                {resolveTokens(block.text)}
              </h3>
            )

          case 'ul':
            return (
              <ul key={key} className="mt-5 flex flex-col gap-3 text-pretty leading-relaxed text-muted">
                <ListItems items={block.items} keyPrefix={key} />
              </ul>
            )

          case 'ol':
            return (
              <ol
                key={key}
                className="mt-5 flex list-none flex-col gap-4 text-pretty leading-relaxed text-muted"
              >
                {block.items.map((item, itemIndex) => (
                  <li key={`${key}-${itemIndex}`} className="flex items-start gap-4">
                    <span
                      aria-hidden="true"
                      className="mt-[0.1em] font-pixel text-lg font-bold leading-none text-accent"
                    >
                      {String(itemIndex + 1).padStart(2, '0')}
                    </span>
                    <span>
                      {typeof item === 'string'
                        ? withEmphasis(item, `${key}-${itemIndex}`)
                        : renderRich(item.rich, `${key}-${itemIndex}`)}
                    </span>
                  </li>
                ))}
              </ol>
            )

          case 'callout':
            return (
              <aside
                key={key}
                className="mt-9 rounded-card border border-accent/35 bg-accent/[0.04] p-6 sm:p-7"
              >
                <p className="font-display font-bold tracking-[-0.02em]">
                  {resolveTokens(block.title)}
                </p>
                <p className="mt-3 text-pretty leading-relaxed text-muted">
                  {withEmphasis(block.text, key)}
                </p>
              </aside>
            )

          case 'table':
            /* The only element allowed to scroll sideways — the page body
               itself must never overflow at 320px. */
            return (
              <div key={key} className="-mx-1 mt-8 overflow-x-auto">
                <table className="w-full min-w-[30rem] border-collapse text-left text-sm">
                  <thead>
                    <tr className="border-b border-line">
                      {block.head.map((heading) => (
                        <th
                          key={heading}
                          scope="col"
                          className="px-3 py-3 text-xs uppercase tracking-[0.14em] text-muted"
                        >
                          {heading}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {block.rows.map((row, rowIndex) => (
                      <tr key={`${key}-r${rowIndex}`} className="border-b border-line/60">
                        {row.map((cell, cellIndex) => (
                          <td
                            key={`${key}-r${rowIndex}c${cellIndex}`}
                            className={`px-3 py-3.5 align-top ${
                              cellIndex === 0 ? 'font-medium text-text' : 'text-muted'
                            }`}
                          >
                            {resolveTokens(cell)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )

          default:
            return (
              <p key={key} className="mt-5 text-pretty leading-relaxed text-muted first:mt-0">
                {inline(block, key)}
              </p>
            )
        }
      })}
    </div>
  )
}
