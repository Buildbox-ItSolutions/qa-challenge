const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://qastage.buildbox.one/',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
