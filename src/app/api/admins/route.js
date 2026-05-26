import { supabase } from "@/lib/supabase";
import bcrypt from "bcryptjs";

export async function POST(request) {
  const body = await request.json();

  const { user, admin } = body;

  if (!user || user.role !== "superadmin") {
    return Response.json(
      {
        success: false,
        message: "Forbidden",
      },
      { status: 403 }
    );
  }

  const hashedPassword = await bcrypt.hash(
    admin.password,
    10
  );

  const payload = {
    name: admin.name,
    email: admin.email,
    password: hashedPassword,
    role: admin.role,
  };

  const { data, error } = await supabase
    .from("admins")
    .insert([payload])
    .select();

  if (error) {
    console.log(error);

    return Response.json(
      {
        success: false,
        message: "Gagal tambah admin",
        error,
      },
      { status: 500 }
    );
  }

  await supabase.from("audit_logs").insert([
    {
      user_email: user.email,
      action: "CREATE_ADMIN",
      property_name: admin.email,
    },
  ]);

  return Response.json({
    success: true,
    data: data[0],
  });
}