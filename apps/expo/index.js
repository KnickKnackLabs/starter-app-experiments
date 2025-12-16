// NOTE: You may see a "SafeAreaView has been deprecated" warning in the console.
// This is a known issue with NativeWind's react-native-css-interop package.
// It does not affect functionality. Tracking issues:
// - https://github.com/nativewind/nativewind/issues/1568
// - https://github.com/nativewind/react-native-css/issues/237

import { registerRootComponent } from "expo";

import App from "./app";

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
