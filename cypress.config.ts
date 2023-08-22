import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },

  reporter: "mochawesome",
  reporterOptions: {
    reportDir: "cypress/reports/mocha",
    reportFilename: "toDoReport",
    overwrite: true,
    html: true,
    json: false
  }
});
