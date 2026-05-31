import { supabase } from "@/lib/supabase";
import bcrypt from "bcryptjs";
import { rateLimit } from "@/lib/rateLimit";
import { requireSuperadmin } from "@/lib/auth";

export async function POST(request) {
  if (!rateLimit(request)) {
    return Response.json(
      {
        success: false,
        message: "Terlalu banyak request. Coba lagi nanti.",
      },
      { status: 429 }
    );
  }

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

  const body = await request.json();
  const { admin } = body;

  const hashedPassword = await bcrypt.hash(admin.password, 10);

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