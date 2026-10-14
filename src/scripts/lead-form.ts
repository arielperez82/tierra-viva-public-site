import {
  buildSubmission,
  interestFromQuery,
  readHubSpotConfig,
  submissionEndpoint,
  validateLead,
  type HubSpotConfig,
  type LeadErrors,
  type LeadValues,
} from "../lib/lead-form";
import { rememberAttribution } from "./attribution";

const textValue = (form: HTMLFormElement, name: string): string => {
  const field = form.elements.namedItem(name);
  return field instanceof HTMLInputElement ||
    field instanceof HTMLSelectElement ||
    field instanceof HTMLTextAreaElement
    ? field.value
    : "";
};

const isChecked = (form: HTMLFormElement, name: string): boolean => {
  const field = form.elements.namedItem(name);
  return field instanceof HTMLInputElement && field.checked;
};

const readValues = (form: HTMLFormElement): LeadValues => ({
  firstName: textValue(form, "firstName"),
  lastName: textValue(form, "lastName"),
  email: textValue(form, "email"),
  company: textValue(form, "company"),
  role: textValue(form, "role"),
  interest: textValue(form, "interest"),
  message: textValue(form, "message"),
  wantsUpdates: isChecked(form, "wantsUpdates"),
  website: textValue(form, "website"),
});

const readConfig = (form: HTMLFormElement): HubSpotConfig | undefined =>
  readHubSpotConfig({
    PUBLIC_HUBSPOT_PORTAL_ID: form.dataset.portalId,
    PUBLIC_HUBSPOT_FORM_ID: form.dataset.formId,
    PUBLIC_HUBSPOT_REGION: form.dataset.region,
    PUBLIC_HUBSPOT_SUBSCRIPTION_TYPE_ID: form.dataset.subscriptionTypeId,
  });

const showErrors = (form: HTMLFormElement, errors: LeadErrors): void => {
  form.querySelectorAll<HTMLElement>("[data-error-for]").forEach((slot) => {
    const name = slot.dataset.errorFor ?? "";
    const message =
      Object.entries(errors).find(([field]) => field === name)?.[1] ?? "";
    slot.textContent = message;
    slot.hidden = message === "";
    form
      .querySelector(`[name="${name}"]`)
      ?.setAttribute("aria-invalid", String(message !== ""));
  });
  const firstInvalid = form.querySelector<HTMLElement>('[aria-invalid="true"]');
  firstInvalid?.focus();
};

const showPanel = (root: HTMLElement, selector: string): void => {
  const panel = root.querySelector<HTMLElement>(selector);
  if (!panel) return;
  panel.hidden = false;
  panel.focus();
};

const finish = (root: HTMLElement, form: HTMLFormElement, interest: string) => {
  form.hidden = true;
  root
    .querySelectorAll<HTMLElement>("[data-event-only]")
    .forEach((element) => (element.hidden = interest !== "event"));
  showPanel(root, "[data-lead-success]");
};

const setSending = (form: HTMLFormElement, sending: boolean): void => {
  const button = form.querySelector<HTMLButtonElement>("[data-submit]");
  if (!button) return;
  button.disabled = sending;
  button.textContent = sending ? "Sending…" : "Send";
};

const submit = async (
  root: HTMLElement,
  form: HTMLFormElement,
  config: HubSpotConfig
): Promise<void> => {
  const values = readValues(form);
  if (values.website.trim() !== "") return finish(root, form, values.interest);
  const errors = validateLead(values);
  showErrors(form, errors);
  if (Object.keys(errors).length > 0) return;
  root
    .querySelector<HTMLElement>("[data-lead-error]")
    ?.setAttribute("hidden", "");
  setSending(form, true);
  const submission = buildSubmission({
    config,
    values,
    attribution: rememberAttribution(),
    page: { pageUri: window.location.href, pageName: document.title },
  });
  try {
    const response = await fetch(submissionEndpoint(config), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(submission),
    });
    if (!response.ok) throw new Error(`HubSpot responded ${response.status}`);
    finish(root, form, values.interest);
  } catch (error) {
    console.error("[lead-form]", error);
    showPanel(root, "[data-lead-error]");
  } finally {
    setSending(form, false);
  }
};

const initLeadForm = (root: HTMLElement): void => {
  const form = root.querySelector<HTMLFormElement>("form");
  if (!form) return;
  const config = readConfig(form);
  if (!config) return;
  const interest = form.elements.namedItem("interest");
  const preselected = interestFromQuery(window.location.search);
  if (interest instanceof HTMLSelectElement && preselected !== "")
    interest.value = preselected;
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    void submit(root, form, config);
  });
};

document
  .querySelectorAll<HTMLElement>("[data-lead-form]")
  .forEach(initLeadForm);
