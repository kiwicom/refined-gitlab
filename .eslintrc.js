module.exports = {
  env: {
    browser: true,
    mocha: true,
  },
  extends: ["airbnb-base", "prettier"],
  rules: {
    "no-alert": ["off"],
  },
  globals: {
    $: false,
    cy: false,
    Cypress: false,
  },
};
