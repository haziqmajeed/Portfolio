const withTM = require("next-transpile-modules")(["gsap"]);

module.exports = withTM({
  reactStrictMode: true,
  images: {
    domains: ['cms.thinkbound.com'],
  },
});