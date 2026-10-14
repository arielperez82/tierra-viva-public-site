import { contactHref } from "../consts";

export type HubSpotRegion = "na1" | "eu1";

export type HubSpotConfig = {
  readonly portalId: string;
  readonly formId: string;
  readonly region: HubSpotRegion;
  readonly subscriptionTypeId?: number;
};

export const INTERESTS: readonly {
  readonly value: string;
  readonly label: string;
}[] = [
  { value: "capital", label: "Capital partnership" },
  { value: "development", label: "Development or operating partnership" },
  { value: "education", label: "Education or community partnership" },
  {
    value: "event",
    label: "Event follow-up (site visit, New York or briefing)",
  },
  { value: "other", label: "Something else" },
];

export type Interest = (typeof INTERESTS)[number]["value"];

export const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
] as const;

type UtmKey = (typeof UTM_KEYS)[number];

export type Attribution = Readonly<Record<UtmKey, string>> & {
  readonly landingPage: string;
  readonly referrer: string;
};

export type LeadValues = {
  readonly firstName: string;
  readonly lastName: string;
  readonly email: string;
  readonly company: string;
  readonly role: string;
  readonly interest: string;
  readonly message: string;
  readonly wantsUpdates: boolean;
  readonly website: string;
};

export type LeadErrors = Partial<Record<keyof LeadValues, string>>;

type SubmissionField = {
  readonly objectTypeId: "0-1";
  readonly name: string;
  readonly value: string;
};

export type Submission = {
  readonly fields: readonly SubmissionField[];
  readonly context: { readonly pageUri: string; readonly pageName: string };
  readonly legalConsentOptions?: {
    readonly consent: {
      readonly consentToProcess: boolean;
      readonly text: string;
      readonly communications: readonly {
        readonly value: boolean;
        readonly subscriptionTypeId: number;
        readonly text: string;
      }[];
    };
  };
};

const MAX_VALUE_LENGTH = 255;
const PORTAL_ID_PATTERN = /^\d{1,12}$/;
const FORM_ID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const REGIONS: readonly HubSpotRegion[] = ["na1", "eu1"];

export const PROCESSING_CONSENT_TEXT =
  "By submitting, you agree that Tierra Viva may store and use this information to respond to your inquiry, as described in our Privacy Policy.";
export const UPDATES_CONSENT_TEXT =
  "Send me occasional updates about Tierra Viva. You can unsubscribe at any time.";

const isRegion = (value: string): value is HubSpotRegion =>
  REGIONS.some((region) => region === value);

const readSubscriptionTypeId = (raw: string): number | undefined | null => {
  if (raw === "") return undefined;
  return PORTAL_ID_PATTERN.test(raw) ? Number(raw) : null;
};

export const readHubSpotConfig = (
  env: Readonly<Record<string, string | undefined>>
): HubSpotConfig | undefined => {
  const portalId = env.PUBLIC_HUBSPOT_PORTAL_ID?.trim() ?? "";
  const formId = env.PUBLIC_HUBSPOT_FORM_ID?.trim() ?? "";
  const region = env.PUBLIC_HUBSPOT_REGION?.trim() || "na1";
  const subscriptionTypeId = readSubscriptionTypeId(
    env.PUBLIC_HUBSPOT_SUBSCRIPTION_TYPE_ID?.trim() ?? ""
  );
  if (!PORTAL_ID_PATTERN.test(portalId)) return undefined;
  if (!FORM_ID_PATTERN.test(formId)) return undefined;
  if (!isRegion(region)) return undefined;
  if (subscriptionTypeId === null) return undefined;
  return subscriptionTypeId === undefined
    ? { portalId, formId, region }
    : { portalId, formId, region, subscriptionTypeId };
};

export const submissionEndpoint = (config: HubSpotConfig): string => {
  const host =
    config.region === "eu1" ? "api-eu1.hsforms.com" : "api.hsforms.com";
  return `https://${host}/submissions/v3/integration/submit/${config.portalId}/${config.formId}`;
};

export const leadHref = (options: {
  readonly enabled: boolean;
  readonly interest: Interest;
  readonly subject: string;
  readonly params?: Readonly<Record<string, string>>;
}): string => {
  if (!options.enabled) return contactHref(options.subject);
  const query = new URLSearchParams({
    interest: options.interest,
    ...options.params,
  });
  return `/contact?${query.toString()}`;
};

export const interestFromQuery = (search: string): string => {
  const requested = new URLSearchParams(search).get("interest") ?? "";
  return INTERESTS.some((interest) => interest.value === requested)
    ? requested
    : "";
};

const clip = (value: string): string => value.trim().slice(0, MAX_VALUE_LENGTH);

export const captureAttribution = (visit: {
  readonly search: string;
  readonly href: string;
  readonly referrer: string;
  readonly existing: Attribution | undefined;
}): Attribution => {
  if (visit.existing) return visit.existing;
  const params = new URLSearchParams(visit.search);
  const utm = (key: UtmKey): string => clip(params.get(key) ?? "");
  return {
    utm_source: utm("utm_source"),
    utm_medium: utm("utm_medium"),
    utm_campaign: utm("utm_campaign"),
    utm_content: utm("utm_content"),
    utm_term: utm("utm_term"),
    landingPage: clip(visit.href),
    referrer: clip(visit.referrer),
  };
};

const ATTRIBUTION_KEYS: readonly (keyof Attribution)[] = [
  ...UTM_KEYS,
  "landingPage",
  "referrer",
];

const parseJson = (raw: string): unknown => {
  try {
    return JSON.parse(raw);
  } catch {
    return undefined;
  }
};

export const parseStoredAttribution = (
  raw: string | null
): Attribution | undefined => {
  const parsed = raw === null ? undefined : parseJson(raw);
  if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed))
    return undefined;
  const value = (key: keyof Attribution): unknown =>
    Object.getOwnPropertyDescriptor(parsed, key)?.value;
  if (!ATTRIBUTION_KEYS.every((key) => typeof value(key) === "string"))
    return undefined;
  const text = (key: keyof Attribution): string => clip(String(value(key)));
  return {
    utm_source: text("utm_source"),
    utm_medium: text("utm_medium"),
    utm_campaign: text("utm_campaign"),
    utm_content: text("utm_content"),
    utm_term: text("utm_term"),
    landingPage: text("landingPage"),
    referrer: text("referrer"),
  };
};

type LeadCheck = {
  readonly field: keyof LeadErrors;
  readonly message: string;
  readonly isValid: (values: LeadValues) => boolean;
};

const isFilled = (value: string): boolean => value.trim() !== "";

const LEAD_CHECKS: readonly LeadCheck[] = [
  {
    field: "firstName",
    message: "Enter your first name.",
    isValid: (values) => isFilled(values.firstName),
  },
  {
    field: "lastName",
    message: "Enter your last name.",
    isValid: (values) => isFilled(values.lastName),
  },
  {
    field: "email",
    message: "Enter a valid email address.",
    isValid: (values) => EMAIL_PATTERN.test(values.email.trim()),
  },
  {
    field: "company",
    message: "Enter your company or firm.",
    isValid: (values) => isFilled(values.company),
  },
  {
    field: "interest",
    message: "Choose what you're interested in.",
    isValid: (values) => isFilled(values.interest),
  },
];

export const validateLead = (values: LeadValues): LeadErrors =>
  LEAD_CHECKS.filter((check) => !check.isValid(values)).reduce<LeadErrors>(
    (errors, check) => ({ ...errors, [check.field]: check.message }),
    {}
  );

const contactField = (name: string, value: string): SubmissionField => ({
  objectTypeId: "0-1",
  name,
  value,
});

export const buildSubmission = (options: {
  readonly config: HubSpotConfig;
  readonly values: LeadValues;
  readonly attribution: Attribution;
  readonly page: { readonly pageUri: string; readonly pageName: string };
}): Submission => {
  const { config, values, attribution, page } = options;
  const entries: readonly (readonly [string, string])[] = [
    ["firstname", values.firstName],
    ["lastname", values.lastName],
    ["email", values.email],
    ["company", values.company],
    ["jobtitle", values.role],
    ["tvi_interest", values.interest],
    ["message", values.message],
    ...UTM_KEYS.map((key) => [key, attribution[key]] as const),
    ["tvi_landing_page", attribution.landingPage],
    ["tvi_referrer", attribution.referrer],
  ];
  const fields = entries
    .map(([name, value]) => contactField(name, value.trim()))
    .filter((field) => field.value !== "");
  const submission = { fields, context: page };
  if (config.subscriptionTypeId === undefined) return submission;
  return {
    ...submission,
    legalConsentOptions: {
      consent: {
        consentToProcess: true,
        text: PROCESSING_CONSENT_TEXT,
        communications: [
          {
            value: values.wantsUpdates,
            subscriptionTypeId: config.subscriptionTypeId,
            text: UPDATES_CONSENT_TEXT,
          },
        ],
      },
    },
  };
};
