import Link from "next/link"; import type { ReactNode } from "react"; import { notFound } from "next/navigation"; import { db } from "@/lib/db";
export async function generateMetadata({ params }: { params: { number: string } }) { return { title: `Loco ${params.number}` }; }
export default async function Loco({ params }: { params: { number: string } }) {
  if (!/^\d{5}$/.test(params.number)) notFound();
  const { data: l } = await db.from("locomotives").select("number,kavach_make,service_status,verification,last_verified,loco_classes(code,slug),sheds(code,name,location),zones(code,name),manufacturers(code)").eq("number", Number(params.number)).maybeSingle();
  if (!l) notFound();
  const x = l as any;
  const na = (v: unknown): ReactNode => v === null || v === undefined || v === ""
    ? <span className="text-gray-500">Not available</span>
    : typeof v === "string" || typeof v === "number" ? String(v)
    : <span className="text-gray-500">Not available</span>;
  return <><h1>Locomotive {x.number}</h1><table className="max-w-xl"><tbody>
    <tr><th>Class</th><td><Link href={`/locomotives/${x.loco_classes.slug}`}>{x.loco_classes.code}</Link></td></tr>
    <tr><th>Shed</th><td><Link href={`/sheds/${x.sheds.code}`}>{x.sheds.name}</Link> ({x.sheds.code})</td></tr>
    <tr><th>Zone</th><td><Link href={`/zones/${x.zones.code}`}>{x.zones.name}</Link></td></tr>
    <tr><th>Builder</th><td>{x.manufacturers ? <Link href={`/manufacturers/${x.manufacturers.code}`}>{x.manufacturers.code}</Link> : na(null)}</td></tr>
    <tr><th>Kavach make</th><td>{na(x.kavach_make)}</td></tr><tr><th>Service status</th><td>{na(x.service_status)}</td></tr>
    <tr><th>Verification</th><td>{x.verification.replace("_", " ")}{x.last_verified ? `, ${x.last_verified}` : ""}</td></tr></tbody></table>
    <p className="text-xs text-gray-600 mt-3">Allocation as listed in the user-provided sheet; may be out of date.</p></>;
}
