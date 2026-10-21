import Link from "next/link"; import { db } from "@/lib/db";
export const metadata = { title: "Manufacturers" }; export const revalidate = 3600;
export default async function Index() {
  const { data } = await db.from("manufacturers").select("code").order("code");
  return <><h1>Manufacturers</h1><div className="overflow-x-auto"><table><thead><tr><th>Production unit</th></tr></thead><tbody>
    {(data ?? []).map((r: any) => <tr key={r.code}><td><Link href={`/manufacturers/${r.code}`}>{r.code}</Link></td></tr>)}</tbody></table></div></>;
}
