import assert from "node:assert/strict";
import test from "node:test";
import { onRequestGet as listCompanies } from "../functions/api/compatibility/companies.js";
import { onRequestGet as listOptions } from "../functions/api/compatibility/options.js";
import { onRequestPost as checkCompatibility } from "../functions/api/compatibility/check.js";

const companyUid = "010fbdb8-6fc1-48c6-91ad-127d0bb4cf0e";
const modelUid = "11111111-2222-4333-8444-555555555555";

function fitmentPayload() {
  return {
    data: {
      fuel_types: [{ fuel_type__type: "all" }],
      transmissions: [{ transmission__name: "all" }],
      years: [{ year: 2024 }, { year: 2023 }]
    }
  };
}

test("company catalog is normalized by the server", async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () => Response.json({ results: [{ uid: companyUid, name: "Tata", icon: "tata.png" }] });
  try {
    const response = await listCompanies({ env: {} });
    const result = await response.json();
    assert.equal(response.status, 200);
    assert.deepEqual(result.companies, [{ uid: companyUid, name: "Tata", icon: "tata.png" }]);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("model fitment options expand NCV2 all-values for the customer", async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () => Response.json(fitmentPayload());
  try {
    const response = await listOptions({
      request: new Request(`https://ahanexcruise.com/api/compatibility/options?modelUid=${modelUid}`),
      env: {}
    });
    const result = await response.json();
    assert.deepEqual(result.fuelOptions, ["Petrol", "Diesel", "CNG", "Electric"]);
    assert.deepEqual(result.transmissionOptions, ["Manual", "AMT / AGS", "CVT", "Automatic"]);
    assert.deepEqual(result.years, [2024, 2023]);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("compatibility is decided server-side against NCV2 firmware filters", async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () => Response.json(fitmentPayload());
  try {
    const request = new Request("https://ahanexcruise.com/api/compatibility/check", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ modelUid, fuel: "Petrol", transmission: "Manual", year: "2024" })
    });
    const response = await checkCompatibility({ request, env: {} });
    const result = await response.json();
    assert.equal(result.status, "compatible");
    assert.equal(result.compatible, true);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("compatibility rejects a year absent from NCV2", async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () => Response.json(fitmentPayload());
  try {
    const request = new Request("https://ahanexcruise.com/api/compatibility/check", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ modelUid, fuel: "Petrol", transmission: "Manual", year: "2022" })
    });
    const response = await checkCompatibility({ request, env: {} });
    const result = await response.json();
    assert.equal(result.status, "not_listed");
    assert.deepEqual(result.mismatches, ["year"]);
  } finally {
    globalThis.fetch = originalFetch;
  }
});
