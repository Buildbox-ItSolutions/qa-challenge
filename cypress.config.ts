import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    setupNodeEvents() {
      // implement node event listeners here
    },
    reporter: 'mochawesome',
    reporterOptions: {
      charts: true,
      reportDir: 'cypress/results',
      reportFilename: 'report',
      overwrite: true,
      html: true,
      json: true,
    },
    viewportWidth: 1920,
    viewportHeight: 1080,
    baseUrl: 'https://qastage.buildbox.one/18',
  },
});
