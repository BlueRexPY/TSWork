/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images : {
    domains : ["localhost","storage.googleapis.com", "storage.cloud.google.com"] 
  },
}
module.exports = nextConfig

const withAntdLess = require('next-plugin-antd-less');

module.exports = withAntdLess({

  modifyVars: { 
    '@primary-color': '#141414',
    '@text-color': '#fff',
    '@text-color-secondary': '#bdbdbd', 
    "@disabled-color": "#bdbdbd",
},
  lessVarsFilePath: './styles/variables.less',
  lessVarsFilePathAppendToEndOfContent: false,
  cssLoaderOptions: {},

  webpack(config) {
    return config;
  },

});