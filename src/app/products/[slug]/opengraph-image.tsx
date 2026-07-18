import { ImageResponse } from "next/og";
import { PRODUCTS, getProduct } from "@/content/products";

export const alt = "Product by Utkarsh";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export default async function OgImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 80,
        background: "#090d19",
        color: "#e7eaf3",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", fontSize: 28, color: "#818cf8" }}>
        const utkarsh — product
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ fontSize: 72, fontWeight: 800, letterSpacing: -2 }}>
          {product?.title ?? "Product"}
        </div>
        {product?.stack?.length ? (
          <div style={{ marginTop: 20, fontSize: 28, color: "#97a0b8" }}>
            {product.stack.slice(0, 5).join("  ·  ")}
          </div>
        ) : null}
      </div>
      <div
        style={{
          display: "flex",
          height: 10,
          width: "100%",
          background: "linear-gradient(90deg,#60a5fa,#818cf8,#a78bfa)",
          borderRadius: 999,
        }}
      />
    </div>,
    { ...size }
  );
}
