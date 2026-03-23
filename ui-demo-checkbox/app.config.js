const appJson = require("./app.json");

module.exports = () => ({
  ...appJson.expo,
  extra: {
    ...appJson.expo.extra,
    storybookEnabled: process.env.STORYBOOK_ENABLED,
  },
});
