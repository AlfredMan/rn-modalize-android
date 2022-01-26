/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { BaoUser } from "./models/BaoUser";
import { Join1Model } from "./screens/UserScreens/model";

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Auth: undefined;

  Login: undefined;
  Join1: { authErrorMessage?: string | null } | undefined;
  Join2: { join1Data: Join1Model };
  ForgotPassword1: undefined;
  ForgotPassword2: undefined;

  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  Menu: undefined;
  Modal: undefined;
  NotFound: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

export type RootTabParamList = {
  Auth: undefined;

  Login: undefined;
  Join1: { authErrorMessage?: string | null } | undefined;
  Join2: { join1Data: Join1Model };
  ForgotPassword1: undefined;
  ForgotPassword2: undefined;

  // TabOne: undefined;
  // TabTwo: undefined;
  // TabStripeCard: undefined;
  // TabStripeApplePay: undefined;
  // TabPoints: undefined;
  // TabPATT: undefined;

  TabModalScreen: undefined;
  TabMap: undefined;
  TabModal: undefined;
  TabWallet: undefined;
  TabPassport: undefined;
  TabTrade: undefined;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<RootTabParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>
  >;

export type PassportStackParamList = {
  Profile: { baoUser: BaoUser; handleOpen: (dest: any) => void } | undefined;
  ProfilePicture:
    | { baoUser: BaoUser; handleOpen: (dest: any) => void }
    | undefined;
};

export type PassportStackScreenProps<
  Screen extends keyof PassportStackParamList
> = NativeStackScreenProps<PassportStackParamList, Screen>;

// export type LoginScreenProps<Screen extends keyof RootTabParamList> =
// CompositeScreenProps<
//   BottomTabScreenProps<RootTabParamList, Screen>,
//   NativeStackScreenProps<RootStackParamList>
// >;
