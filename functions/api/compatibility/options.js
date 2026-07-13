import { assertUid, json, ncv2Request, normalizeFitment } from "./_shared.js";

export async function onRequestGet(context) {
  try {
    const modelUid = assertUid(new URL(context.request.url).searchParams.get("modelUid"), "vehicle model");
    const fitment = normalizeFitment(await ncv2Request(`firmware/filters/${modelUid}/`, context.env));
    return json({
      source: "NCV2",
      modelUid,
      fuelOptions: fitment.fuelOptions,
      transmissionOptions: fitment.transmissionOptions,
      years: fitment.years,
      hasFitment: fitment.hasFitment
    }, 200, "public, max-age=300, s-maxage=900");
  } catch (error) {
    return json({ error: error.message || "Unable to load fitment options." }, error.status === 404 ? 404 : 400);
  }
}
