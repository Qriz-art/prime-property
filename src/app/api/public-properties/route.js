import { supabase } from "@/lib/supabase";

export async function GET(request) {
  const { searchParams } = new URL(request.url);

  const search = searchParams.get("search") || "";
  const kawasan = searchParams.get("kawasan") || "All";
  const tipe = searchParams.get("tipe") || "All";
  const status = searchParams.get("status") || "in_stock";
  const hadap = searchParams.get("hadap") || "All";
  const carport = searchParams.get("carport") || "All";
  const hargaMax = searchParams.get("hargaMax") || "";

  let query = supabase
    .from("properties")
    .select("*")
    .is("deleted_at", null)
    .order("created_at", { ascending: false })
    .limit(6);

  if (status !== "All") {
    query = query.eq("status", status);
  }

  if (kawasan !== "All") {
    query = query.eq("kawasan", kawasan);
  }

  if (tipe !== "All") {
    query = query.eq("tipe", tipe);
  }

  if (hadap !== "All") {
    query = query.eq("hadap", hadap);
  }

  if (carport !== "All") {
    query = query.eq("carport", carport === "true");
  }

  if (hargaMax) {
    query = query.lte("price", Number(hargaMax));
  }

  if (search) {
    query = query.or(
      `nama_property.ilike.%${search}%,group.ilike.%${search}%,kawasan.ilike.%${search}%`
    );
  }

  const { data, error } = await query;

  if (error) {
    return Response.json(
      {
        success: false,
        message: "Gagal mengambil properti publik",
        error,
      },
      { status: 500 }
    );
  }

  return Response.json({
    success: true,
    data: data || [],
  });
}