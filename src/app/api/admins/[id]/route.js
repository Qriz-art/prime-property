import { supabase } from "@/lib/supabase";

export async function DELETE(request, context) {
  const { id } = await context.params;

  const body = await request.json();

  const { user } = body;

  if (!user || user.role !== "superadmin") {
    return Response.json(
      {
        success: false,
        message: "Forbidden",
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