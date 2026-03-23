import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";

import { view } from "./storybook.requires";

const storage =
  Platform.OS === "web" && typeof localStorage !== "undefined"
    ? {
        getItem: (key: string) =>
          Promise.resolve(localStorage.getItem(key)),
        setItem: (key: string, value: string) => {
          localStorage.setItem(key, value);
          return Promise.resolve();
        },
      }
    : {
        getItem: (key: string) => AsyncStorage.getItem(key),
        setItem: (key: string, value: string) =>
          AsyncStorage.setItem(key, value),
      };

const StorybookUIRoot = view.getStorybookUI({ storage });

export default StorybookUIRoot;
