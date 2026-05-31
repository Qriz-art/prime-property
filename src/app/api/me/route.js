import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = await cookies();
  const session = cookieStore.get("prime_session");

  if (!session) {
    return Response.json({
      success: false,
      user: null,
    });
  }

  try {
    const user = JSON.parse(session.value);

    return Response.json({
      success: true,
      user,
    });
  } catch (error) {
    return Response.json({
      success: false,
      user: null,
    });
  }
}