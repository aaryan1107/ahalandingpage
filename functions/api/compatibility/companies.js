import { json, ncv2Request, results } from "./_shared.js";

export async function onRequestGet(context) {
  try {
    const payload = await ncv2Request("company-list/", context.env);
    const companies = results(payload)
      .map(({ uid, name, icon }) => ({ uid, name, icon }))
      .filter((item) => item.uid && item.name)
      .sort((a, b) => a.name.localeCompare(b.name));
    return json({ source: "NCV2", companies }, 200, "public, max-age=900, s-maxage=3600");
  } catch (error) {
    return json({ error: error.message || "Unable to load vehicle companies." }, 502);
  }
}
