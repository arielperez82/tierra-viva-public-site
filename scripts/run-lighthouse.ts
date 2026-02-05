import { readFileSync, mkdirSync, writeFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { execSync } from "node:child_process";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

type LighthouseConfig = {
  port: number;
  basePath: string;
  reportDir: string;
};

type LighthouseCategory = {
  title?: string;
  score?: number;
};

type LighthouseReport = {
  categories?: Record<string, LighthouseCategory>;
};

const defaultConfig: LighthouseConfig = {
  port: 4321,
  basePath: "/tierra-viva-public-site/",
  reportDir: "test-reports",
};

function loadConfig(): LighthouseConfig {
  const configPath = join(root, "lighthouse.config.json");
  let fileConfig: Partial<LighthouseConfig> = {};
  if (existsSync(configPath)) {
    fileConfig = JSON.parse(
      readFileSync(configPath, "utf8")
    ) as Partial<LighthouseConfig>;
  }
  const basePath = (
    process.env.LIGHTHOUSE_BASE_PATH ??
    fileConfig.basePath ??
    defaultConfig.basePath
  ).replace(/\/?$/, "/");
  return {
    port: Number(
      process.env.LIGHTHOUSE_PORT ?? fileConfig.port ?? defaultConfig.port
    ),
    basePath,
    reportDir:
      process.env.LIGHTHOUSE_REPORT_DIR ??
      fileConfig.reportDir ??
      defaultConfig.reportDir,
  };
}

function writeMdSummary(jsonPath: string, mdPath: string): void {
  if (!existsSync(jsonPath)) return;
  const data = JSON.parse(readFileSync(jsonPath, "utf8")) as LighthouseReport;
  const categories = data.categories ?? {};
  const lines = [
    "# Lighthouse report summary",
    "",
    "| Category | Score |",
    "|----------|-------|",
    ...Object.entries(categories).map(
      ([id, c]) => `| ${c.title ?? id} | ${Math.round((c.score ?? 0) * 100)} |`
    ),
  ];
  writeFileSync(mdPath, lines.join("\n") + "\n", "utf8");
}

const config = loadConfig();
const url =
  process.env.LIGHTHOUSE_URL ??
  `http://localhost:${config.port}${config.basePath}`;
const reportStem = join(root, config.reportDir, "lighthouse-report");

mkdirSync(join(root, config.reportDir), { recursive: true });

if (process.env.LIGHTHOUSE_URL) {
  execSync(
    `npx lighthouse ${url} --output=html --output=json --output-path=${reportStem} --chrome-flags=--headless`,
    { cwd: root, stdio: "inherit" }
  );
} else {
  execSync("pnpm build", { cwd: root, stdio: "inherit" });
  const startCmd = `astro preview --port ${config.port}`;
  const lighthouseCmd = `npx lighthouse ${url} --output=html --output=json --output-path=${reportStem} --chrome-flags=--headless`;
  execSync(
    `npx start-server-and-test "${startCmd}" ${url} "${lighthouseCmd}"`,
    {
      cwd: root,
      stdio: "inherit",
    }
  );
}

const jsonPath = `${reportStem}.report.json`;
const mdPath = join(root, config.reportDir, "lighthouse-report.md");
writeMdSummary(jsonPath, mdPath);
