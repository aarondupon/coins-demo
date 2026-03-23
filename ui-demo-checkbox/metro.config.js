const { getDefaultConfig } = require('expo/metro-config');
const { withStorybook } = require('@storybook/react-native/metro/withStorybook');

const config = getDefaultConfig(__dirname);
const { resolver } = config;

config.transformer.babelTransformerPath = require.resolve('react-native-svg-transformer');
config.resolver.assetExts = resolver.assetExts.filter((ext) => ext !== 'svg');
config.resolver.sourceExts = [...resolver.sourceExts, 'svg'];

module.exports = withStorybook(config, {
  enabled: true,
  configPath: './.rnstorybook',
});
