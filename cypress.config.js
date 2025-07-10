const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      const version = config.env.version || 'hml'; // Default to 'hml' if not specified
      // Load environment variables from the specified JSON file
      config.env = require(`./cypress/config/${version}.json`);
      config.baseUrl = config.env.baseUrl;
      return config;
    },
  },
});
