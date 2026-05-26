import { supabase } from "@/lib/supabase";

export async function PATCH(request, context) {
  const { id } = await context.params;
  const body = await request.json();

  const { user, property } = body;

  if (!user || user.role !== "superadmin") {
    return Response.json(
      {
        success: false,
        message: "Forbidden: hanya superadmin yang boleh update property",
      },
      { status: 403 }
    );
  }

  const { data, error } = await supabase
    .from("properties")
    .update(property)
    .eq("id", id)
    .select();

  if (error) {
    console.log(error);

    return Response.json(
      {
        success: false,
        message: "Gagal update property",
        error,
      },
      { status: 500 }
    );
  }

  await supabase.from("audit_logs").insert([
    {
      user_email: user.email,
      action: "UPDATE_PROPERTY",
      property_name: property.nama_property,
    },
  ]);

  return Response.json({
    success: true,
    data: data[0],
  });
}

export async function DELETE(request, context) {
  const { id } = await context.params;
  const body = await request.json();

  const { user, propertyName } = body;

  if (!user || user.role !== "superadmin") {
    return Response.json(
      {
        success: false,
        message: "Forbidden: hanya superadmin yang boleh delete property",
      },
      { status: 403 }
    );
  }

  const { error } = await supabase
    .from("properties")
    .delete()
    .eq("id", id);

  if (error) {
    console.log(error);

    return Response.json(
      {
        success: false,
        message: "Gagal hapus property",
        error,
      },
      { status: 500 }
    );
  }

  await supabase.from("audit_logs").insert([
    {
      user_email: user.email,
      action: "DELETE_PROPERTY",
      property_name: propertyName || "-",
    },
  ]);

  return Response.json({
    success: true,
  });
}