import { describe, expect, it } from "vitest";
import {
  buildSubmission,
  captureAttribution,
  interestFromQuery,
  leadHref,
  parseStoredAttribution,
  readHubSpotConfig,
  submissionEndpoint,
  validateLead,
  type Attribution,
  type HubSpotConfig,
  type LeadValues,
} from "./lead-form";

const PORTAL_ID = "12345678";
const FORM_ID = "0f1e2d3c-4b5a-6978-8a9b-0c1d2e3f4a5b";

const configEnv = (
  overrides: Record<string, string | undefined> = {}
): Record<string, string | undefined> => ({
  PUBLIC_HUBSPOT_PORTAL_ID: PORTAL_ID,
  PUBLIC_HUBSPOT_FORM_ID: FORM_ID,
  ...overrides,
});

const config = (overrides: Partial<HubSpotConfig> = {}): HubSpotConfig => ({
  portalId: PORTAL_ID,
  formId: FORM_ID,
  region: "na1",
  ...overrides,
});

const lead = (overrides: Partial<LeadValues> = {}): LeadValues => ({
  firstName: "Ana",
  lastName: "Diaz",
  email: "ana@example.com",
  company: "Example Family Office",
  role: "",
  interest: "capital",
  message: "",
  wantsUpdates: false,
  website: "",
  ...overrides,
});

const attribution = (overrides: Partial<Attribution> = {}): Attribution => ({
  utm_source: "naa-2026",
  utm_medium: "print",
  utm_campaign: "naa-miami-2026",
  utm_content: "deck",
  utm_term: "",
  landingPage: "https://tierravivainvestments.com/contact",
  referrer: "",
  ...overrides,
});

describe("readHubSpotConfig", () => {
  it("stays disabled until both IDs are configured", () => {
    expect(readHubSpotConfig({})).toBeUndefined();
    expect(
      readHubSpotConfig(configEnv({ PUBLIC_HUBSPOT_FORM_ID: "" }))
    ).toBeUndefined();
  });

  it("enables the US data center by default", () => {
    expect(readHubSpotConfig(configEnv())).toEqual(config());
  });

  it("accepts the EU data center", () => {
    expect(
      readHubSpotConfig(configEnv({ PUBLIC_HUBSPOT_REGION: "eu1" }))
    ).toEqual(config({ region: "eu1" }));
  });

  it("fails closed on malformed values", () => {
    expect(
      readHubSpotConfig(configEnv({ PUBLIC_HUBSPOT_PORTAL_ID: "abc" }))
    ).toBeUndefined();
    expect(
      readHubSpotConfig(configEnv({ PUBLIC_HUBSPOT_FORM_ID: "not-a-guid" }))
    ).toBeUndefined();
    expect(
      readHubSpotConfig(configEnv({ PUBLIC_HUBSPOT_REGION: "ap1" }))
    ).toBeUndefined();
  });

  it("keeps an optional subscription type for email updates", () => {
    expect(
      readHubSpotConfig(
        configEnv({ PUBLIC_HUBSPOT_SUBSCRIPTION_TYPE_ID: "987654" })
      )
    ).toEqual(config({ subscriptionTypeId: 987654 }));
  });
});

describe("submissionEndpoint", () => {
  it("targets the region's Forms API", () => {
    expect(submissionEndpoint(config())).toBe(
      `https://api.hsforms.com/submissions/v3/integration/submit/${PORTAL_ID}/${FORM_ID}`
    );
    expect(submissionEndpoint(config({ region: "eu1" }))).toBe(
      `https://api-eu1.hsforms.com/submissions/v3/integration/submit/${PORTAL_ID}/${FORM_ID}`
    );
  });
});

describe("leadHref", () => {
  it("falls back to email while the form is disabled", () => {
    expect(
      leadHref({
        enabled: false,
        interest: "capital",
        subject: "Capital partnership",
      })
    ).toBe("mailto:info@tierravivainvest.com?subject=Capital%20partnership");
  });

  it("routes to the contact form with the interest preselected", () => {
    expect(
      leadHref({
        enabled: true,
        interest: "capital",
        subject: "Capital partnership",
      })
    ).toBe("/contact?interest=capital");
  });

  it("carries extra tracking parameters to the form", () => {
    expect(
      leadHref({
        enabled: true,
        interest: "event",
        subject: "NAA follow-up",
        params: { utm_source: "naa-2026", utm_medium: "web" },
      })
    ).toBe("/contact?interest=event&utm_source=naa-2026&utm_medium=web");
  });
});

describe("interestFromQuery", () => {
  it("preselects a known interest", () => {
    expect(interestFromQuery("?interest=education")).toBe("education");
  });

  it("ignores unknown or missing interests", () => {
    expect(interestFromQuery("?interest=<script>")).toBe("");
    expect(interestFromQuery("")).toBe("");
  });
});

describe("captureAttribution", () => {
  const visit = {
    search:
      "?utm_source=naa-2026&utm_medium=print&utm_campaign=naa-miami-2026&utm_content=deck",
    href: "https://tierravivainvestments.com/contact?utm_source=naa-2026",
    referrer: "https://l.instagram.com/",
  };

  it("records UTM parameters, landing page and referrer on first touch", () => {
    expect(captureAttribution({ ...visit, existing: undefined })).toEqual({
      utm_source: "naa-2026",
      utm_medium: "print",
      utm_campaign: "naa-miami-2026",
      utm_content: "deck",
      utm_term: "",
      landingPage: visit.href,
      referrer: visit.referrer,
    });
  });

  it("keeps the first touch when the visitor browses on", () => {
    const first = attribution();
    expect(
      captureAttribution({
        search: "?utm_source=newsletter",
        href: "https://tierravivainvestments.com/team",
        referrer: "",
        existing: first,
      })
    ).toEqual(first);
  });

  it("truncates oversized values", () => {
    const long = "x".repeat(600);
    expect(
      captureAttribution({
        ...visit,
        search: `?utm_source=${long}`,
        existing: undefined,
      }).utm_source
    ).toHaveLength(255);
  });
});

describe("validateLead", () => {
  it("accepts a complete lead", () => {
    expect(validateLead(lead())).toEqual({});
  });

  it("flags missing required fields and a malformed email", () => {
    expect(
      validateLead(
        lead({
          firstName: " ",
          lastName: "",
          email: "ana@",
          company: "",
          interest: "",
        })
      )
    ).toEqual({
      firstName: "Enter your first name.",
      lastName: "Enter your last name.",
      email: "Enter a valid email address.",
      company: "Enter your company or firm.",
      interest: "Choose what you're interested in.",
    });
  });
});

describe("buildSubmission", () => {
  const page = {
    pageUri: "https://tierravivainvestments.com/contact",
    pageName: "Connect",
  };

  it("maps the lead and attribution to HubSpot contact properties", () => {
    const submission = buildSubmission({
      config: config(),
      values: lead({ role: "CIO", message: "Tell me more" }),
      attribution: attribution(),
      page,
    });
    expect(submission.fields).toEqual([
      { objectTypeId: "0-1", name: "firstname", value: "Ana" },
      { objectTypeId: "0-1", name: "lastname", value: "Diaz" },
      { objectTypeId: "0-1", name: "email", value: "ana@example.com" },
      { objectTypeId: "0-1", name: "company", value: "Example Family Office" },
      { objectTypeId: "0-1", name: "jobtitle", value: "CIO" },
      { objectTypeId: "0-1", name: "tvi_interest", value: "capital" },
      { objectTypeId: "0-1", name: "message", value: "Tell me more" },
      { objectTypeId: "0-1", name: "utm_source", value: "naa-2026" },
      { objectTypeId: "0-1", name: "utm_medium", value: "print" },
      { objectTypeId: "0-1", name: "utm_campaign", value: "naa-miami-2026" },
      { objectTypeId: "0-1", name: "utm_content", value: "deck" },
      {
        objectTypeId: "0-1",
        name: "tvi_landing_page",
        value: "https://tierravivainvestments.com/contact",
      },
    ]);
    expect(submission.context).toEqual(page);
    expect(submission.legalConsentOptions).toBeUndefined();
  });

  it("records email-update consent when a subscription type is configured", () => {
    const submission = buildSubmission({
      config: config({ subscriptionTypeId: 987654 }),
      values: lead({ wantsUpdates: true }),
      attribution: attribution(),
      page,
    });
    expect(submission.legalConsentOptions?.consent.communications).toEqual([
      expect.objectContaining({ value: true, subscriptionTypeId: 987654 }),
    ]);
    expect(submission.legalConsentOptions?.consent.consentToProcess).toBe(true);
  });
});

describe("parseStoredAttribution", () => {
  it("restores a stored first touch", () => {
    const stored = attribution();
    expect(parseStoredAttribution(JSON.stringify(stored))).toEqual(stored);
  });

  it("ignores missing, corrupt or tampered storage", () => {
    expect(parseStoredAttribution(null)).toBeUndefined();
    expect(parseStoredAttribution("{not json")).toBeUndefined();
    expect(
      parseStoredAttribution(
        JSON.stringify({ ...attribution(), utm_source: 42 })
      )
    ).toBeUndefined();
    expect(
      parseStoredAttribution(JSON.stringify(["utm_source"]))
    ).toBeUndefined();
  });
});
