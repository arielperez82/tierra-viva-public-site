import { readFileSync, mkdirSync, writeFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { execSync } from "node:child_process";
import { getLighthouseConfig } from "../lighthouse.config";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

type LighthouseCategory = {
  title?: string;
  score?: number;
};

type LighthouseReport = {
  categories?: Record<string, LighthouseCategory>;
};

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

const config = getLighthouseConfig();
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
