import Link from "next/link"; import { db } from "@/lib/db";
export const metadata = { title: "Zones" }; export const revalidate = 3600;
export default async function Index() {
  const { data } = await db.from("zones").select("code,name").order("code");
  return <><h1>Zones</h1><div className="overflow-x-auto"><table><thead><tr><th>Code</th><th>Zone</th></tr></thead><tbody>
    {(data ?? []).map((r: any) => <tr key={r.code}><td><Link href={`/zones/${r.code}`}>{r.code}</Link></td><td>{r.name}</td></tr>)}</tbody></table></div></>;
}
