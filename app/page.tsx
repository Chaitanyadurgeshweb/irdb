import Link from "next/link"; import { db, options } from "@/lib/db";
export const revalidate = 3600;
export default async function Home() {
  const [{ classes, zones, mfrs }, { count }] = await Promise.all([options(), db.from("locomotives").select("*", { count: "exact", head: true })]);
  return <><h1>Indian Railways Locomotive Reference</h1>
    <p className="mb-4">{(count ?? 0).toLocaleString()} electric locomotives listed by number, class, shed and zone. Specifications and history are added only where sourced.</p>
    <form action="/search" className="flex gap-2 mb-6"><input name="q" aria-label="Search" placeholder="Search loco number (e.g. 3045), class (WAP-7) or shed" className="border flex-1 px-3 py-2" /><button className="bg-navy text-white px-4">Search</button></form>
    <div className="grid md:grid-cols-3 gap-6"><section><h2>Locomotive classes</h2><p className="text-sm">{classes.map(c => <Link key={c.slug} href={`/locomotives/${c.slug}`} className="mr-2">{c.code}</Link>)}</p></section>
    <section><h2>Zones</h2><p className="text-sm">{zones.map(z => <Link key={z.code} href={`/zones/${z.code}`} className="mr-2">{z.code}</Link>)}</p></section>
    <section><h2>Manufacturers</h2><p className="text-sm">{mfrs.map(m => <Link key={m.code} href={`/manufacturers/${m.code}`} className="mr-2">{m.code}</Link>)}</p></section></div></>;
}
