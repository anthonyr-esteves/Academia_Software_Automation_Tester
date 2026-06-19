const { defineConfig } = require("cypress");

module.exports = defineConfig({
  allowCypressEnv: false,
  projectId: "begqq1",
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
