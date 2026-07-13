import { assertUid, evaluateFitment, json, ncv2Request, normalizeFitment, readBody } from "./_shared.js";

export async function onRequestPost(context) {
  try {
    const body = await readBody(context.request);
    const modelUid = assertUid(body.modelUid, "vehicle model");
    if (!body.fuel || !body.transmission || !body.year) throw new Error("Complete the fuel, transmission, and manufacture year.");
    const fitment = normalizeFitment(await ncv2Request(`firmware/filters/${modelUid}/`, context.env));
    const evaluation = evaluateFitment(fitment, body);

    if (!fitment.hasFitment) {
      return json({ status: "review", compatible: false, message: "NCV2 has this model, but no complete firmware fitment record is published yet. AHA must verify it manually." });
    }
    if (!evaluation.compatible) {
      const mismatches = Object.entries(evaluation)
        .filter(([key, value]) => key.endsWith("Allowed") && !value)
        .map(([key]) => key.replace("Allowed", "").toLowerCase());
      return json({ status: "not_listed", compatible: false, mismatches, message: `NCV2 does not list this exact ${mismatches.join(", ")} combination for the selected model.` });
    }
    return json({ status: "compatible", compatible: true, message: "This exact model, fuel, transmission, and manufacture year is listed in the NCV2 fitment database." });
  } catch (error) {
    return json({ error: error.message || "Unable to check compatibility." }, error.status === 404 ? 404 : 400);
  }
}
