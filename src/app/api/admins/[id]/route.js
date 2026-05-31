import { supabase } from "@/lib/supabase";
import { rateLimit } from "@/lib/rateLimit";
import { requireSuperadmin } from "@/lib/auth";

export async function DELETE(request, context) {
  if (!rateLimit(request)) {
    return Response.json(
      {
        success: false,
        message: "Terlalu banyak request. Coba lagi nanti.",
      },
      { status: 429 }
    );
  }

  const { id } = await context.params;

  const user = await requireSuperadmin();

  if (!user) {
    return Response.json(
      {
        success: false,
        message: "Forbidden: hanya superadmin.",
      },
      { status: 403 }
    );
  }

  const { data: targetAdmin } = await supabase
    .from("admins")
    .select("*")
    .eq("id", id)
    .single();

  if (!targetAdmin) {
    return Response.json(
      {
        success: false,
        message: "Admin tidak ditemukan",
      },
      { status: 404 }
    );
  }

  if (targetAdmin.email === user.email) {
    return Response.json(
      {
        success: false,
        message: "Tidak bisa menghapus akun sendiri",
      },
      { status: 400 }
    );
  }

  const { error } = await supabase
    .from("admins")
    .delete()
    .eq("id", id);

  if (error) {
    console.log(error);

    return Response.json(
      {
        success: false,
        message: "Gagal hapus admin",
        error,
      },
      { status: 500 }
    );
  }

  await supabase.from("audit_logs").insert([
    {
      user_email: user.email,
      action: "DELETE_ADMIN",
      property_name: targetAdmin.email,
    },
  ]);

  return Response.json({
    success: true,
  });
}