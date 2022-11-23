/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
  api: {
    externalResolver: true,
  },
};
module.exports = nextConfig;

const withAntdLess = require("next-plugin-antd-less");

module.exports = withAntdLess({
  modifyVars: {
    "@primary-color": "#072773",
    "@text-color": "#000",
    "@text-color-secondary": "#000",
    "@disabled-color": "#000",
  },
  lessVarsFilePath: "./styles/variables.less",
  lessVarsFilePathAppendToEndOfContent: false,
  cssLoaderOptions: {},

  webpack(config) {
    return config;
  },
});
