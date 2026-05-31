export function verifyCsrf(request) {
  const csrfCookie = request.cookies.get("prime_csrf")?.value;
  const csrfHeader = request.headers.get("x-csrf-token");

  if (!csrfCookie || !csrfHeader) {
    return false;
  }

  return csrfCookie === csrfHeader;
}