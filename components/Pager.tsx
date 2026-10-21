import Link from "next/link"; import { PAGE_SIZE } from "@/lib/db";
export default function Pager({ base, params, page, total }: { base: string; params: Record<string,string|undefined>; page: number; total: number }) {
  const pages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const href = (p: number) => { const u = new URLSearchParams(); Object.entries(params).forEach(([k, v]) => v && u.set(k, v)); u.set("page", String(p)); return `${base}?${u}`; };
  return <nav className="flex gap-4 items-center my-3 text-sm" aria-label="Pagination"><span>{total.toLocaleString()} results — page {page} of {pages}</span>
    {page > 1 && <Link href={href(page - 1)}>← Previous</Link>}{page < pages && <Link href={href(page + 1)}>Next →</Link>}</nav>;
}
