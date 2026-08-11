// bndy-website · Astro static build
// Spec: BUILD-SPEC-bndy-website.md v1.0. Every page must render full copy in static HTML.
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://www.bndy.co.uk',
  output: 'static',
  trailingSlash: 'never',
  integrations: [sitemap()],
  build: {
    format: 'file',
    inlineStylesheets: 'auto',
  },
});
