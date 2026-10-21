import Link from "next/link"; import { db } from "@/lib/db";
export const metadata = { title: "Sheds" }; export const revalidate = 3600;
export default async function Index() {
  const { data } = await db.from("sheds").select("code,name,location").order("code");
  return <><h1>Sheds</h1><div className="overflow-x-auto"><table><thead><tr><th>Code</th><th>Shed</th><th>Location</th></tr></thead><tbody>
    {(data ?? []).map((r: any) => <tr key={r.code}><td><Link href={`/sheds/${r.code}`}>{r.code}</Link></td><td>{r.name}</td><td>{r.location}</td></tr>)}</tbody></table></div></>;
}
