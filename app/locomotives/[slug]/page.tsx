import type { ReactNode } from "react"; import { notFound } from "next/navigation"; import { db } from "@/lib/db"; import ListedLocos from "@/components/ListedLocos";
export async function generateMetadata({ params }: { params: { slug: string } }) { return { title: `Class ${params.slug.toUpperCase()}` }; }
export default async function ClassPage({ params, searchParams }: { params: { slug: string }; searchParams: { page?: string } }) {
  const { data: c } = await db.from("loco_classes").select("code,traction,gauge,service_type,overview,history,specs").eq("slug", params.slug).maybeSingle();
  if (!c) notFound();
  const na = (v: unknown): ReactNode => v === null || v === undefined || v === ""
    ? <span className="text-gray-500">Not available</span>
    : typeof v === "string" || typeof v === "number" ? String(v)
    : <span className="text-gray-500">Not available</span>;
  const specs = Object.entries((c.specs ?? {}) as Record<string, unknown>);
  return <><h1>Indian Railways class {c.code}</h1>
    <table className="mb-4 max-w-xl"><tbody><tr><th>Traction</th><td>{na(c.traction)}</td></tr><tr><th>Gauge</th><td>{na(c.gauge)}</td></tr><tr><th>Service</th><td>{na(c.service_type)}</td></tr>
      {specs.map(([k, v]) => <tr key={k}><th>{k}</th><td>{na(v)}</td></tr>)}</tbody></table>
    <h2>Overview and history</h2><p>{na(c.overview)} {na(c.history)}</p>
    <h2>Locomotives listed in this class</h2><ListedLocos base={`/locomotives/${params.slug}`} filters={{ cls: c.code, page: Number(searchParams.page) || 1 }} />
    <p className="text-xs text-gray-600 mt-4">Source: user-provided shed allocation sheet (unverified against official records).</p></>;
}
