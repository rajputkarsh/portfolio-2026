/** Renders one or more JSON-LD objects as a script tag. */
export function StructuredData({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      // Built from local, trusted content.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
