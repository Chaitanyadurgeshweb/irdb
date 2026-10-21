import "./globals.css"; import Link from "next/link"; import type { Metadata } from "next";
export const metadata: Metadata = { title: { default: "Indian Railways Loco Reference", template: "%s | Loco Reference" }, description: "Independent reference database of Indian Railways locomotives, sheds and zones. Not affiliated with Indian Railways or IRFCA." };
const nav = [["Locomotives","/locomotives"],["Sheds","/sheds"],["Zones","/zones"],["Manufacturers","/manufacturers"],["Sources","/sources"],["About","/about"]];
export default function Root({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body><header className="bg-navy text-white"><div className="max-w-6xl mx-auto px-4 py-3 flex flex-wrap gap-4 items-center">
    <Link href="/" className="font-bold text-white">Indian Railways Loco Reference</Link>
    <nav className="flex flex-wrap gap-3 text-sm">{nav.map(([n, h]) => <Link key={h} href={h} className="text-gray-200">{n}</Link>)}</nav>
    <form action="/search" className="ml-auto flex gap-1" role="search"><label htmlFor="q" className="sr-only">Search</label>
      <input id="q" name="q" placeholder="Loco no., class or shed" className="px-2 py-1 text-black text-sm rounded" /><button className="bg-rail px-3 text-sm rounded">Search</button></form></div></header>
    <main className="max-w-6xl mx-auto px-4 py-6">{children}</main>
    <footer className="border-t mt-8 py-4 text-xs text-gray-600 text-center">Independent project, not affiliated with Indian Railways or IRFCA. Data listed as “source listed” is not independently verified.</footer></body></html>;
}
