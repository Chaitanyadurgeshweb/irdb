import Link from "next/link"; import { options, textMatches } from "@/lib/db"; import ListedLocos from "@/components/ListedLocos";
export const metadata = { title: "Search" };
type SP = { q?: string; cls?: string; zone?: string; shed?: string; mfr?: string; page?: string };
export default async function Search({ searchParams: sp }: { searchParams: SP }) {
  const { classes, zones, mfrs } = await options();
  const q = sp.q?.trim();
  const isNum = !!q && /^\d{1,5}$/.test(q);
  const text = q && !isNum ? await textMatches(q) : null;
  const sel = (name: string, val: string | undefined, opts: string[]) => <label className="text-sm">{name}<select name={name.toLowerCase()} defaultValue={val ?? ""} className="border ml-1 mr-3 px-1"><option value="">All</option>{opts.map(o => <option key={o}>{o}</option>)}</select></label>;
  return <><h1>Search</h1>
    <form className="mb-4 flex flex-wrap gap-y-2 items-center"><input name="q" defaultValue={q} aria-label="Search" placeholder="Loco no., class or shed" className="border px-2 py-1 mr-3" />
      {sel("Cls", sp.cls, classes.map(c => c.code))}{sel("Zone", sp.zone, zones.map(z => z.code))}{sel("Mfr", sp.mfr, mfrs.map(m => m.code))}
      <input name="shed" defaultValue={sp.shed} placeholder="Shed code" className="border px-2 py-1 w-28 mr-3" aria-label="Shed code" /><button className="bg-navy text-white px-3 py-1">Apply</button></form>
    {text && (text.classes.length > 0 || text.sheds.length > 0) && <p className="mb-3 text-sm">Matches: {text.classes.map(c => <Link key={c.slug} href={`/locomotives/${c.slug}`} className="mr-2">{c.code}</Link>)}{text.sheds.map(s => <Link key={s.code} href={`/sheds/${s.code}`} className="mr-2">{s.name}</Link>)}</p>}
    {text && !text.classes.length && !text.sheds.length ? <p className="p-4 bg-gray-50 border">No class or shed matches “{q}”. Try a loco number or a class like WAP-7.</p>
      : (q && !isNum && !sp.cls && !sp.zone && !sp.shed && !sp.mfr) ? null : <ListedLocos base="/search" filters={{ q: isNum ? q : undefined, cls: sp.cls || undefined, zone: sp.zone || undefined, shed: sp.shed?.toUpperCase() || undefined, mfr: sp.mfr || undefined, page: Number(sp.page) || 1 }} />}</>;
}
