import { supabase } from "@/lib/supabase";

export async function POST(request) {
  const body = await request.json();

  const { user, property } = body;

  if (!user || user.role !== "superadmin") {
    return Response.json(
      {
        success: false,
        message: "Forbidden: hanya superadmin yang boleh create property",
      },
      { status: 403 }
    );
  }

  const { data, error } = await supabase
    .from("properties")
    .insert([property])
    .select();

  if (error) {
    return Response.json(
      {
        success: false,
        message: "Gagal tambah property",
        error,
      },
      { status: 500 }
    );
  }

  await supabase.from("audit_logs").insert([
    {
      user_email: user.email,
      action: "CREATE_PROPERTY",
      property_name: property.nama_property,
    },
  ]);

  return Response.json({
    success: true,
    data: data[0],
  });
}