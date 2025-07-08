import { ExpoConfig, ConfigContext } from "@expo/config";
import "ts-node/register";

const config = ({ config }: ConfigContext): Partial<ExpoConfig> => {
  const existingPlugins = config.plugins ?? [];

  return {
    ...config,
    ios: {
      ...config.ios,
      privacyManifests: {
        NSPrivacyAccessedAPITypes: [
          {
            NSPrivacyAccessedAPIType:
              "NSPrivacyAccessedAPICategoryUserDefaults",
            NSPrivacyAccessedAPITypeReasons: ["CA92.1"],
          },
        ],
      },
    },
    plugins: [
      ...existingPlugins,
      require.resolve("./plugins/withSplashScreen"),
    ],
  };
};

export default config;
