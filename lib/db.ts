import { createClient } from "@supabase/supabase-js";
const url = process.env.SUPABASE_URL, key = process.env.SUPABASE_ANON_KEY;
if (!url || !key) throw new Error("SUPABASE_URL and SUPABASE_ANON_KEY must be set (see .env.example)");
export const db = createClient(url, key, { auth: { persistSession: false } });
export const PAGE_SIZE = 50;
export type LocoRow = { number: number; kavach_make: string | null; loco_classes: { code: string; slug: string };
  sheds: { code: string; name: string }; zones: { code: string }; manufacturers: { code: string } | null };
export type Filters = { q?: string; cls?: string; zone?: string; shed?: string; mfr?: string; page?: number };

export async function searchLocos(f: Filters) {
  let q = db.from("locomotives").select(
    "number,kavach_make,loco_classes!inner(code,slug),sheds!inner(code,name),zones!inner(code),manufacturers(code)", { count: "exact" });
  if (f.cls) q = q.eq("loco_classes.code", f.cls);
  if (f.shed) q = q.eq("sheds.code", f.shed);
  if (f.zone) q = q.eq("zones.code", f.zone);
  if (f.mfr) q = q.eq("manufacturers.code", f.mfr);
  const digits = f.q?.replace(/\D/g, "");
  if (digits && /^\d{1,5}$/.test(digits)) {            // partial loco-number match = numeric range
    const p = 10 ** (5 - digits.length), lo = Number(digits) * p;
    q = q.gte("number", Math.max(lo, 10000)).lt("number", lo + p);
  }
  const page = Math.max(1, f.page ?? 1), from = (page - 1) * PAGE_SIZE;
  const { data, count, error } = await q.order("number").range(from, from + PAGE_SIZE - 1);
  if (error) throw new Error(error.message);
  return { rows: (data ?? []) as unknown as LocoRow[], total: count ?? 0, page };
}
export async function textMatches(term: string) {
  const t = term.replace(/[%,()]/g, "").trim();
  const [c, s] = await Promise.all([
    db.from("loco_classes").select("code,slug").ilike("code", `%${t.replace(/[-\s]/g, "")}%`).limit(20),
    db.from("sheds").select("code,name").or(`name.ilike.%${t}%,code.ilike.%${t}%`).limit(20)]);
  return { classes: c.data ?? [], sheds: s.data ?? [] };
}
export async function options() {
  const [c, z, m] = await Promise.all([db.from("loco_classes").select("code,slug").order("code"),
    db.from("zones").select("code,name").order("code"), db.from("manufacturers").select("code").order("code")]);
  return { classes: c.data ?? [], zones: z.data ?? [], mfrs: m.data ?? [] };
}
