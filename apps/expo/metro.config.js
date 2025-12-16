// Learn more https://docs.expo.dev/guides/monorepos
// Learn more https://docs.expo.io/guides/customizing-metro
/**
 * @type {import('expo/metro-config')}
 */
const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");
const {
  withStorybook,
} = require("@storybook/react-native/metro/withStorybook");
const path = require("node:path");

// Only enable Storybook when explicitly requested via env var
const STORYBOOK_ENABLED = process.env.EXPO_PUBLIC_STORYBOOK_ENABLED === "true";

// biome-ignore lint/correctness/noGlobalDirnameFilename: CommonJS file requires __dirname, not import.meta.dirname
const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, "../..");

const config = getDefaultConfig(projectRoot);

config.watchFolders = [workspaceRoot];
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, "node_modules"),
  path.resolve(workspaceRoot, "node_modules"),
];
config.resolver.disableHierarchicalLookup = true;

config.transformer.getTransformOptions = async () => ({
  transform: {
    experimentalImportSupport: false,
    inlineRequires: true,
  },
});

const nativeWindConfig = withNativeWind(config, {
  input: "./global.css",
  inlineRem: 16,
});

// Always apply withStorybook, but with enabled option
// When enabled: false, it stubs out Storybook files (no bundling overhead)
// See: https://github.com/storybookjs/react-native/discussions/535
module.exports = withStorybook(nativeWindConfig, {
  enabled: STORYBOOK_ENABLED,
});
