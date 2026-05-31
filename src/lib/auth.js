import { cookies } from "next/headers";

export async function getSessionUser() {
  const cookieStore = await cookies();
  const session = cookieStore.get("prime_session");

  if (!session) {
    return null;
  }

  try {
    return JSON.parse(session.value);
  } catch {
    return null;
  }
}

export async function requireSuperadmin() {
  const user = await getSessionUser();

  if (!user || user.role !== "superadmin") {
    return null;
  }

  return user;
}