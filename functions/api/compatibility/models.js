import { assertUid, json, ncv2Request, results } from "./_shared.js";

function firstImageUrl(item) {
  const keys = [
    "image",
    "image_url",
    "photo",
    "photo_url",
    "thumbnail",
    "thumbnail_url",
    "picture",
    "picture_url"
  ];
  for (const key of keys) {
    const value = item?.[key];
    if (typeof value === "string" && /^https?:\/\//i.test(value.trim())) return value.trim();
  }
  return "";
}

export async function onRequestGet(context) {
  try {
    const companyUid = assertUid(new URL(context.request.url).searchParams.get("companyUid"), "vehicle brand");
    const payload = await ncv2Request(`vehicle-models/${companyUid}/`, context.env);
    const models = results(payload)
      .map((item) => ({
        uid: item.uid,
        name: item.name,
        yearStart: item.yearStart,
        yearEnd: item.yearEnd,
        image: firstImageUrl(item)
      }))
      .filter((item) => item.uid && item.name)
      .sort((a, b) => a.name.localeCompare(b.name));
    return json({ source: "NCV2", companyUid, models }, 200, "public, max-age=900, s-maxage=3600");
  } catch (error) {
    return json({ error: error.message || "Unable to load vehicle models." }, error.status === 404 ? 404 : 400);
  }
}
