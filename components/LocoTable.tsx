import Link from "next/link"; import { LocoRow } from "@/lib/db";
export default function LocoTable({ rows }: { rows: LocoRow[] }) {
  if (!rows.length) return <p className="p-4 bg-gray-50 border">No locomotives match these filters. Try removing a filter or checking the number.</p>;
  return <div className="overflow-x-auto"><table className="w-full"><thead><tr><th>Number</th><th>Class</th><th>Shed</th><th>Zone</th><th>Builder</th><th>Kavach</th></tr></thead><tbody>
    {rows.map(r => <tr key={r.number}><td><Link href={`/locos/${r.number}`}>{r.number}</Link></td>
      <td><Link href={`/locomotives/${r.loco_classes.slug}`}>{r.loco_classes.code}</Link></td>
      <td><Link href={`/sheds/${r.sheds.code}`}>{r.sheds.code}</Link> <span className="text-gray-500">{r.sheds.name}</span></td>
      <td><Link href={`/zones/${r.zones.code}`}>{r.zones.code}</Link></td>
      <td>{r.manufacturers?.code ?? "—"}</td><td>{r.kavach_make ?? "—"}</td></tr>)}</tbody></table></div>;
}
