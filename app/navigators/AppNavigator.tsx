/**
 * The app navigator (formerly "AppNavigator" and "MainNavigator") is used for the primary
 * navigation flows of your app.
 * Generally speaking, it will contain an auth flow (registration, login, forgot password)
 * and a "main" flow which the user will use once logged in.
 */
import { ComponentProps } from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";

import Config from "@/config";
import { navigationRef, useBackButtonHandler } from "./navigationUtilities";
import AuthScreen from "@/screens/auth/AuthScreen";
import DashboardScreen from "@/screens/dashboard/DashboardScreen";

/**
 * Define as rotas do app e seus parâmetros.
 */
export type AppStackParamList = {
  Welcome: undefined;
  Login: undefined;

  // 🔥 Suas novas rotas vão aqui
  // IGNITE_GENERATOR_ANCHOR_APP_STACK_PARAM_LIST
};

/**
 * Rotas nas quais o botão de voltar sai do app (Android).
 */
const exitRoutes = Config.exitRoutes;

export type AppStackScreenProps<T extends keyof AppStackParamList> =
  NativeStackScreenProps<AppStackParamList, T>;

const Stack = createNativeStackNavigator<AppStackParamList>();

const AppStack = () => {
  const isAuthenticated = true;

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        navigationBarColor: "red",
        contentStyle: {
          backgroundColor: "red",
        },
      }}
      initialRouteName={isAuthenticated ? "Welcome" : "Login"}
    >
      {isAuthenticated ? (
        <>
          <Stack.Screen name="Welcome" component={DashboardScreen} />
        </>
      ) : (
        <>
          <Stack.Screen name="Login" component={AuthScreen} />
        </>
      )}

      {/** 🔥 Suas novas rotas vão aqui */}
      {/* IGNITE_GENERATOR_ANCHOR_APP_STACK_SCREENS */}
    </Stack.Navigator>
  );
};

/**
 * Props para o componente AppNavigator.
 */
export type NavigationProps = Partial<
  ComponentProps<typeof NavigationContainer<AppStackParamList>>
>;

export const AppNavigator = (props: NavigationProps) => {
  useBackButtonHandler((routeName) => exitRoutes.includes(routeName));

  return (
    <NavigationContainer ref={navigationRef} {...props}>
      <AppStack />
    </NavigationContainer>
  );
};
