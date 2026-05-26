import { supabase } from "@/lib/supabase";
import bcrypt from "bcryptjs";

export async function POST(request) {
  try {
    const body = await request.json();

    const { email, password } = body;

    const { data, error } = await supabase
      .from("admins")
      .select("*")
      .eq("email", email)
      .single();

    if (error || !data) {
      return Response.json({
        success: false,
        message: "Email tidak ditemukan",
      });
    }

    const isValidPassword = await bcrypt.compare(
      password,
      data.password
    );

    if (!isValidPassword) {
      return Response.json({
        success: false,
        message: "Password salah",
      });
    }

    return Response.json({
      success: true,
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        role: data.role,
      },
    });

  } catch (error) {
    return Response.json({
      success: false,
      message: "Server error",
    });
  }
}