export function sanitizeText(value) {
  if (typeof value !== "string") return value;

  return value
    .replace(/<script.*?>.*?<\/script>/gi, "")
    .replace(/<[^>]*>/g, "")
    .trim();
}

export function sanitizeProperty(property) {
  return {
    ...property,
    nama_property: sanitizeText(property.nama_property),
    group: sanitizeText(property.group),
    hadap: sanitizeText(property.hadap),
    tipe: sanitizeText(property.tipe),
    status: sanitizeText(property.status),
    siap: sanitizeText(property.siap),
    maps_link: sanitizeText(property.maps_link),
    kawasan: sanitizeText(property.kawasan),
    unit: sanitizeText(property.unit),
  };
}