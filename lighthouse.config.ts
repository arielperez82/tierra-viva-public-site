/**
 * Minimum score per category (0–1). If any category score is below its threshold, the audit fails.
 * Category ids: performance, accessibility, best-practices, seo, pwa.
 */
export type LighthouseThresholds = Partial<
  Record<
    "performance" | "accessibility" | "best-practices" | "seo" | "pwa",
    number
  >
>;

export type LighthouseConfig = {
  port: number;
  basePath: string;
  reportDir: string;
  /** Optional. If set, audit fails (exit 1) when a category score is below the given value (0–1). */
  thresholds?: LighthouseThresholds;
  /**
   * Path (relative to project root) to write improvement suggestions. Omit or null to skip.
   * Default: "<reportDir>/lighthouse-improvements.md"
   */
  improvementsPath?: string | null;
};

const defaults: LighthouseConfig = {
  port: 4321,
  basePath: "/tierra-viva-public-site/",
  reportDir: "test-reports",
};

/** Set in this file to fail the audit when category scores are below these values (0–1). */
const defaultThresholds: LighthouseThresholds | undefined = undefined;

/** Set to a path (relative to project root) to write improvements; null to disable; undefined = use reportDir/lighthouse-improvements.md */
const defaultImprovementsPath: string | null | undefined = undefined;

export function getLighthouseConfig(): LighthouseConfig {
  const env = {
    port: process.env.LIGHTHOUSE_PORT,
    basePath: process.env.LIGHTHOUSE_BASE_PATH,
    reportDir: process.env.LIGHTHOUSE_REPORT_DIR,
    thresholds: process.env.LIGHTHOUSE_THRESHOLDS,
    improvementsPath: process.env.LIGHTHOUSE_IMPROVEMENTS_PATH,
  };

  const basePath = (env.basePath ?? defaults.basePath).replace(/\/?$/, "/");
  const thresholds: LighthouseConfig["thresholds"] =
    env.thresholds === undefined
      ? defaultThresholds
      : (JSON.parse(env.thresholds) as LighthouseConfig["thresholds"]);
  const improvementsPath: string | null | undefined =
    env.improvementsPath === undefined
      ? defaultImprovementsPath
      : env.improvementsPath || null;

  return {
    port: Number(env.port ?? defaults.port),
    basePath,
    reportDir: env.reportDir ?? defaults.reportDir,
    thresholds,
    improvementsPath,
  };
}
