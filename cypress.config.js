const { defineConfig } = import("cypress");

module.exports = {
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    // Set default viewport size
    viewportWidth: 1600, // Adjust width as needed
    viewportHeight: 800, // Adjust height as needed
  },
};
