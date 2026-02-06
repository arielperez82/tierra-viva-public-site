export type LighthouseConfig = {
  port: number;
  basePath: string;
  reportDir: string;
};

const defaults: LighthouseConfig = {
  port: 4321,
  basePath: "/tierra-viva-public-site/",
  reportDir: "test-reports",
};

export function getLighthouseConfig(): LighthouseConfig {
  const basePath = (
    process.env.LIGHTHOUSE_BASE_PATH ?? defaults.basePath
  ).replace(/\/?$/, "/");
  return {
    port: Number(process.env.LIGHTHOUSE_PORT ?? defaults.port),
    basePath,
    reportDir: process.env.LIGHTHOUSE_REPORT_DIR ?? defaults.reportDir,
  };
}
