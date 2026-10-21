import { notFound } from "next/navigation"; import { db } from "@/lib/db"; import ListedLocos from "@/components/ListedLocos";
export async function generateMetadata({ params }: { params: { code: string } }) { return { title: `Sheds: ${params.code}` }; }
export default async function Detail({ params, searchParams }: { params: { code: string }; searchParams: { page?: string } }) {
  const { data: r } = await db.from("sheds").select("*").eq("code", params.code).maybeSingle();
  if (!r) notFound();
  return <><h1>{r.name ?? r.code}</h1><p className="mb-3 text-sm">Code: {r.code}</p>
    <ListedLocos base={`/sheds/${params.code}`} filters={{ shed: r.code, page: Number(searchParams.page) || 1 }} /></>;
}
