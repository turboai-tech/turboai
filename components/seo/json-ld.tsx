type JsonLdProps = {
  id: string
  data: Record<string, unknown> | Record<string, unknown>[]
}

/**
 * Server-rendered JSON-LD.
 * Escape `<` so the payload cannot prematurely close the script tag, and keep
 * this component in Server Components only (not under client islands).
 */
export default function JsonLd({ id, data }: JsonLdProps) {
  return (
    <script
      id={id}
      type="application/ld+json"
      // Prevent React 19 from treating this as an executable client script.
      suppressHydrationWarning
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, '\\u003c'),
      }}
    />
  )
}
