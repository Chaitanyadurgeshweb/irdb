import Link from "next/link"; import { db } from "@/lib/db";
export const metadata = { title: "Locomotive classes" }; export const revalidate = 3600;
export default async function Classes() {
  const { data } = await db.from("loco_classes").select("code,slug,locomotives(count)").order("code");
  return <><h1>Locomotive classes</h1><div className="overflow-x-auto"><table><thead><tr><th>Class</th><th>Listed locomotives</th></tr></thead><tbody>
    {(data ?? []).map((c: any) => <tr key={c.slug}><td><Link href={`/locomotives/${c.slug}`}>{c.code}</Link></td><td>{c.locomotives[0]?.count ?? 0}</td></tr>)}</tbody></table></div></>;
}
