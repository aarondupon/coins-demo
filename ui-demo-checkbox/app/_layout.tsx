import Constants from "expo-constants";
import { Stack } from "expo-router";

import StorybookUIRoot from "../.rnstorybook";

export default function RootLayout() {
  if (Constants.expoConfig?.extra?.storybookEnabled === "true") {
    return <StorybookUIRoot />;
  }
  return <Stack />;
}
