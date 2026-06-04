import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = join(dirname(fileURLToPath(import.meta.url)), "..");
const seoConfigPath = join(rootDir, "seo.config.json");
const publicDir = join(rootDir, "public");

function normalizeSiteUrl(rawUrl) {
  return rawUrl.trim().replace(/\/+$/, "");
}

function readSeoConfig() {
  const rawConfig = readFileSync(seoConfigPath, "utf8");
  const config = JSON.parse(rawConfig);

  if (!config.siteUrl || typeof config.siteUrl !== "string") {
    throw new Error("seo.config.json must include a valid siteUrl string.");
  }

  return {
    siteUrl: normalizeSiteUrl(config.siteUrl),
    siteName: config.siteName ?? "ServiceRenPar",
  };
}

function buildRobotsTxt(siteUrl) {
  return [
    "User-agent: *",
    "Allow: /",
    "",
    `Sitemap: ${siteUrl}/sitemap.xml`,
    "",
  ].join("\n");
}

function buildSitemapXml(siteUrl) {
  const lastmod = new Date().toISOString().slice(0, 10);

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    "  <url>",
    `    <loc>${siteUrl}/</loc>`,
    `    <lastmod>${lastmod}</lastmod>`,
    "    <changefreq>weekly</changefreq>",
    "    <priority>1.0</priority>",
    "  </url>",
    "</urlset>",
    "",
  ].join("\n");
}

const { siteUrl, siteName } = readSeoConfig();

writeFileSync(join(publicDir, "robots.txt"), buildRobotsTxt(siteUrl), "utf8");
writeFileSync(join(publicDir, "sitemap.xml"), buildSitemapXml(siteUrl), "utf8");

console.log(`SEO files generated for ${siteName}: ${siteUrl}`);
