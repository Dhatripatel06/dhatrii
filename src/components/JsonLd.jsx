/**
 * Renders one or more JSON-LD graphs as a single script tag.
 *
 * `<` is escaped so a stray angle bracket inside any string value cannot close
 * the script element early — the standard precaution when serialising JSON into
 * inline markup.
 */
export default function JsonLd({ schema }) {
  const payload = Array.isArray(schema) ? schema : [schema]

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(payload.length === 1 ? payload[0] : payload).replace(
          /</g,
          '\\u003c',
        ),
      }}
    />
  )
}
