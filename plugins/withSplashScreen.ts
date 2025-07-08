import {
  ConfigPlugin,
  withStringsXml,
  AndroidConfig,
  withAndroidStyles,
} from "expo/config-plugins";

/**
 * Expo Config Plugin to help address the double splash screen issue with `expo-splash-screen`
 * See more information about this issue here: https://github.com/expo/expo/issues/16084
 */
const withSplashScreen: ConfigPlugin = (config) => {
  config = withAndroidSplashScreen(config);
  return config;
};

const withAndroidSplashScreen: ConfigPlugin = (config) => {
  config = withCustomStylesXml(config);
  config = withCustomStringsXml(config);
  return config;
};

const withCustomStringsXml: ConfigPlugin = (config) =>
  withStringsXml(config, (modConfig) => {
    modConfig.modResults = AndroidConfig.Strings.setStringItem(
      [
        {
          _: "true",
          $: {
            name: "expo_splash_screen_status_bar_translucent",
            translatable: "false",
          },
        },
      ],
      modConfig.modResults,
    );
    return modConfig;
  });

const withCustomStylesXml: ConfigPlugin = (config) =>
  withAndroidStyles(config, async (modConfig) => {
    modConfig.modResults = AndroidConfig.Styles.assignStylesValue(
      modConfig.modResults,
      {
        add: true,
        name: "android:windowIsTranslucent",
        value: "true",
        parent: {
          name: "Theme.App.SplashScreen",
          parent: "AppTheme",
        },
      },
    );
    return modConfig;
  });

export default withSplashScreen;
