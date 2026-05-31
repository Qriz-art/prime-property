import { rateLimit } from "@/lib/rateLimit";
import { supabase } from "@/lib/supabase";
import { requireSuperadmin } from "@/lib/auth";
import { sanitizeProperty } from "@/lib/sanitize";
import { verifyCsrf } from "@/lib/csrf";


function validateProperty(property) {
  const errors = {};

  if (!property.nama_property || property.nama_property.trim().length < 3) {
    errors.nama_property = "Nama properti minimal 3 karakter.";
  }

  if (property.nama_property && property.nama_property.trim().length > 100) {
    errors.nama_property = "Nama properti maksimal 100 karakter.";
  }

  if (Number(property.lebar) <= 0 || !/^\d+(\.\d{1,2})?$/.test(String(property.lebar))) {
    errors.lebar = "Lebar harus > 0 dan maksimal 2 desimal.";
  }

  if (Number(property.panjang) <= 0 || !/^\d+(\.\d{1,2})?$/.test(String(property.panjang))) {
    errors.panjang = "Panjang harus > 0 dan maksimal 2 desimal.";
  }

  if (!Number.isInteger(Number(property.price)) || Number(property.price) <= 0) {
    errors.price = "Harga harus integer rupiah dan lebih dari 0.";
  }

  if (
    Number(property.tingkat) < 1 ||
    Number(property.tingkat) > 10 ||
    !/^\d+(\.\d{1})?$/.test(String(property.tingkat))
  ) {
    errors.tingkat = "Tingkat harus 1–10 dan maksimal 1 desimal.";
  }

  if (
    property.maps_link &&
    !property.maps_link.includes("google.com/maps")
  ) {
    errors.maps_link = "Maps link harus URL Google Maps.";
  }

  return errors;
}

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

if (!verifyCsrf(request)) {
  return Response.json(
    {
      success: false,
      message: "CSRF token tidak valid.",
    },
    { status: 403 }
  );
}
const user = await requireSuperadmin();

if (!user) {
  return Response.json(
    {
      success: false,
      message: "Forbidden: hanya superadmin yang boleh create property",
    },
    { status: 403 }
  );
}

const body = await request.json();
const { property } = body;

const cleanProperty = sanitizeProperty(property);

const validationErrors = validateProperty(cleanProperty);

if (Object.keys(validationErrors).length > 0) {
  return Response.json(
    {
      success: false,
      message: "Validasi property gagal",
      errors: validationErrors,
    },
    { status: 400 }
  );
}

const propertyPayload = {
  ...cleanProperty,
  created_by: user.id,
  deleted_at: null,
};

const { data, error } = await supabase
  .from("properties")
  .insert([propertyPayload])
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
     property_name: cleanProperty.nama_property,
    },
  ]);

  return Response.json({
    success: true,
    data: data[0],
  });
}