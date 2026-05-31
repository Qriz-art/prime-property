import { Resend } from "resend";
import { rateLimit } from "@/lib/rateLimit";

const resend = new Resend(process.env.RESEND_API_KEY);

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
  try {
    const body = await request.json();

    const { nama, email, phone, pesan } = body;

    if (!nama || !email || !phone || !pesan) {
      return Response.json(
        {
          success: false,
          message: "Semua field wajib diisi",
        },
        { status: 400 }
      );
    }

    if (!email.includes("@")) {
      return Response.json(
        {
          success: false,
          message: "Format email tidak valid",
        },
        { status: 400 }
      );
    }

    if (phone.length < 10) {
      return Response.json(
        {
          success: false,
          message: "Nomor HP minimal 10 digit",
        },
        { status: 400 }
      );
    }

    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: process.env.CONTACT_TO_EMAIL,
      subject: `Pesan Baru dari ${nama}`,
      html: `
        <h2>Pesan Baru Website Prime Property</h2>

        <p><b>Nama:</b> ${nama}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>No HP:</b> ${phone}</p>

        <hr/>

        <p>${pesan}</p>
      `,
    });

    return Response.json({
      success: true,
      message:
        "Pesan terkirim, tim kami akan menghubungi Anda.",
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        success: false,
        message: "Server error",
      },
      { status: 500 }
    );
  }
}