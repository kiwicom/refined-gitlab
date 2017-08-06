module.exports = {
  env: {
    browser: true,
  },
  extends: ["airbnb-base", "prettier"],
  rules: {
    "no-alert": ["off"],
  },
  globals: {
    $: false,
  },
};
