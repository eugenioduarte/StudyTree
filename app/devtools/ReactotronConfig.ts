import { Platform, NativeModules } from "react-native";
import { ArgType } from "reactotron-core-client";
import { ReactotronReactNative } from "reactotron-react-native";
import mmkvPlugin from "reactotron-react-native-mmkv";

import { goBack, resetRoot, navigate } from "@/navigators/navigationUtilities";
import { storage } from "@/utils/storage";

import { Reactotron } from "./ReactotronClient";

let appName = "StudyTree"; // fallback
try {
  // dynamic import to avoid require()
  const pkg = await import("../../package.json");
  appName = pkg.name;
} catch {
  console.warn("Could not load package.json name for Reactotron config.");
}

const reactotron = Reactotron.configure({
  name: appName,
  onConnect: () => {
    Reactotron.clear();
  },
});

reactotron.use(mmkvPlugin<ReactotronReactNative>({ storage }));

if (Platform.OS !== "web") {
  reactotron.useReactNative({
    networking: {
      ignoreUrls: /symbolicate/,
    },
  });
}

reactotron.onCustomCommand({
  title: "Show Dev Menu",
  description: "Opens the React Native dev menu",
  command: "showDevMenu",
  handler: () => {
    Reactotron.log("Showing React Native dev menu");
    NativeModules.DevMenu.show();
  },
});

reactotron.onCustomCommand({
  title: "Reset Navigation State",
  description: "Resets the navigation state",
  command: "resetNavigation",
  handler: () => {
    Reactotron.log("resetting navigation state");
    resetRoot({ index: 0, routes: [] });
  },
});

reactotron.onCustomCommand<[{ name: "route"; type: ArgType.String }]>({
  command: "navigateTo",
  handler: (args) => {
    const { route } = args ?? {};
    if (route) {
      Reactotron.log(`Navigating to: ${route}`);

      navigate(route as string);
    } else {
      Reactotron.log("Could not navigate. No route provided.");
    }
  },
  title: "Navigate To Screen",
  description: "Navigates to a screen by name.",
  args: [{ name: "route", type: ArgType.String }],
});

reactotron.onCustomCommand({
  title: "Go Back",
  description: "Goes back",
  command: "goBack",
  handler: () => {
    Reactotron.log("Going back");
    goBack();
  },
});

console.tron = reactotron;

declare global {
  interface Console {
    tron: typeof reactotron;
  }
}

reactotron.connect();
