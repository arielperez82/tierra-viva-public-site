import {
  captureAttribution,
  parseStoredAttribution,
  type Attribution,
} from "../lib/lead-form";

const STORAGE_KEY = "tv-attribution";

const readStored = (): string | null => {
  try {
    return window.sessionStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
};

const store = (attribution: Attribution): void => {
  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(attribution));
  } catch {
    return;
  }
};

export const rememberAttribution = (): Attribution => {
  const attribution = captureAttribution({
    search: window.location.search,
    href: window.location.href,
    referrer: document.referrer,
    existing: parseStoredAttribution(readStored()),
  });
  store(attribution);
  return attribution;
};

rememberAttribution();
