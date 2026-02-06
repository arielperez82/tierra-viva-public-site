import { readFileSync, mkdirSync, writeFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { execSync } from "node:child_process";
import {
  getLighthouseConfig,
  type LighthouseThresholds,
} from "../lighthouse.config";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

type LighthouseCategory = {
  title?: string;
  score?: number | null;
};

type LighthouseAudit = {
  id: string;
  title?: string;
  description?: string;
  score?: number | null;
};

type LighthouseReport = {
  categories?: Record<string, LighthouseCategory>;
  audits?: Record<string, LighthouseAudit>;
};

function loadReport(jsonPath: string): LighthouseReport | null {
  if (!existsSync(jsonPath)) return null;
  return JSON.parse(readFileSync(jsonPath, "utf8")) as LighthouseReport;
}

function writeMdSummary(data: LighthouseReport, mdPath: string): void {
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

function checkThresholds(
  data: LighthouseReport,
  thresholds: LighthouseThresholds
): void {
  const categories = data.categories ?? {};
  const failures: { id: string; score: number; min: number; title: string }[] =
    [];
  for (const [id, minScore] of Object.entries(thresholds)) {
    const cat = categories[id];
    const score = cat?.score;
    if (score != null && score < minScore) {
      failures.push({
        id,
        score,
        min: minScore,
        title: cat?.title ?? id,
      });
    }
  }
  if (failures.length === 0) return;
  console.error("Lighthouse thresholds not met:");
  for (const f of failures) {
    console.error(
      `  ${f.title}: ${Math.round(f.score * 100)} (min ${Math.round(f.min * 100)})`
    );
  }
  process.exit(1);
}

const LIGHTHOUSE_DOCS = "https://developer.chrome.com/docs/lighthouse";

function writeImprovements(data: LighthouseReport, outPath: string): void {
  const audits = data.audits ?? {};
  const failed = Object.values(audits).filter(
    (a) => a.score != null && a.score < 1
  );
  if (failed.length === 0) {
    const header = [
      "# Lighthouse improvements",
      "",
      "No failed audits. Re-run the audit to refresh this file.",
      "",
    ].join("\n");
    writeFileSync(outPath, header, "utf8");
    return;
  }
  const sections = [
    "# Lighthouse improvements",
    "",
    "Action items from failed or partial audits. Fix and re-run `pnpm lighthouse:audit`.",
    "",
    ...failed.map(
      (a) =>
        `## ${a.title ?? a.id}\n\n${a.description ?? ""}\n\n**Audit id:** \`${a.id}\`  \n**Docs:** ${LIGHTHOUSE_DOCS}\n`
    ),
  ];
  writeFileSync(outPath, sections.join("\n\n"), "utf8");
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
const data = loadReport(jsonPath);
if (data) {
  writeMdSummary(data, mdPath);
  if (config.thresholds) checkThresholds(data, config.thresholds);
  let improvementsPath: string | null = null;
  if (config.improvementsPath !== null) {
    improvementsPath = config.improvementsPath
      ? join(root, config.improvementsPath)
      : join(root, config.reportDir, "lighthouse-improvements.md");
  }
  if (improvementsPath !== null) writeImprovements(data, improvementsPath);
}
