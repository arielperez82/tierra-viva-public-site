import { withBase } from "../utils/with-base";
import { leadHref, readHubSpotConfig, type Interest } from "./lead-form";

export const HUBSPOT = readHubSpotConfig(import.meta.env);

export const LEAD_FORM_ENABLED = HUBSPOT !== undefined;

export const conversationHref = (
  interest: Interest,
  subject: string,
  params?: Readonly<Record<string, string>>
): string => {
  const href = leadHref({
    enabled: LEAD_FORM_ENABLED,
    interest,
    subject,
    params,
  });
  return LEAD_FORM_ENABLED ? withBase(href) : href;
};
