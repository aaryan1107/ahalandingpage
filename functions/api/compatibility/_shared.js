const DEFAULT_NCV2_API = "https://ncv2.ahacaros.com/api/vehicle";
const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export const ALL_FUELS = ["Petrol", "Diesel", "CNG", "Electric"];
export const ALL_TRANSMISSIONS = ["Manual", "AMT / AGS", "CVT", "Automatic"];

export function json(data, status = 200, cache = "no-store") {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": cache
    }
  });
}

export function assertUid(value, label) {
  const uid = String(value || "").trim();
  if (!UUID_PATTERN.test(uid)) throw new Error(`Choose a valid ${label}.`);
  return uid;
}

export async function readBody(request) {
  if (!(request.headers.get("content-type") || "").includes("application/json")) {
    throw new Error("Expected a JSON request.");
  }
  return request.json();
}

export async function ncv2Request(path, env = {}) {
  const base = String(env.NCV2_API_BASE_URL || DEFAULT_NCV2_API).replace(/\/$/, "");
  const response = await fetch(`${base}/${path.replace(/^\//, "")}`, {
    headers: { Accept: "application/json" }
  });
  if (!response.ok) {
    const detail = await response.json().catch(() => ({}));
    const error = new Error(detail.detail || `NCV2 returned ${response.status}.`);
    error.status = response.status;
    throw error;
  }
  return response.json();
}

export function results(payload) {
  return Array.isArray(payload?.results) ? payload.results : [];
}

function titleCase(value) {
  const normalized = String(value || "").trim().toLowerCase();
  if (normalized === "ev") return "Electric";
  if (normalized === "cng") return "CNG";
  return normalized ? normalized[0].toUpperCase() + normalized.slice(1) : "";
}

export function normalizeFitment(payload) {
  const data = payload?.data || {};
  const fuelRows = Array.isArray(data.fuel_types) ? data.fuel_types : [];
  const transmissionRows = Array.isArray(data.transmissions) ? data.transmissions : [];
  const yearRows = Array.isArray(data.years) ? data.years : [];
  const rawFuels = [...new Set(fuelRows.map((item) => String(item.fuel_type__type || "").toLowerCase()).filter(Boolean))];
  const rawTransmissions = [...new Set(transmissionRows.map((item) => String(item.transmission__name || "").toLowerCase()).filter(Boolean))];
  const years = [...new Set(yearRows.map((item) => Number(item.year)).filter(Number.isInteger))].sort((a, b) => b - a);
  const fuelOptions = rawFuels.includes("all") ? ALL_FUELS : rawFuels.map(titleCase).filter(Boolean);
  const transmissionOptions = rawTransmissions.includes("all")
    ? ALL_TRANSMISSIONS
    : rawTransmissions.map((item) => item === "auto" ? "Automatic" : titleCase(item)).filter(Boolean);

  return {
    fuelOptions,
    transmissionOptions,
    years,
    rawFuels,
    rawTransmissions,
    hasFitment: rawFuels.length > 0 && rawTransmissions.length > 0 && years.length > 0
  };
}

export function evaluateFitment(fitment, selection) {
  const selectedFuel = String(selection.fuel || "").trim().toLowerCase();
  const selectedTransmission = String(selection.transmission || "").trim().toLowerCase();
  const selectedYear = Number(selection.year);
  const fuelKey = selectedFuel === "electric" ? "ev" : selectedFuel;
  const transmissionKey = selectedTransmission === "manual" ? "manual" : "auto";

  const fuelAllowed = fitment.rawFuels.includes("all") || fitment.rawFuels.includes(fuelKey);
  const transmissionAllowed = fitment.rawTransmissions.includes("all") || fitment.rawTransmissions.includes(transmissionKey);
  const yearAllowed = fitment.years.includes(selectedYear);
  return { fuelAllowed, transmissionAllowed, yearAllowed, compatible: fitment.hasFitment && fuelAllowed && transmissionAllowed && yearAllowed };
}
