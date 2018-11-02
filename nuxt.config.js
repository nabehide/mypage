const routerBase = process.env.DEPLOY_ENV === 'GH_PAGES' ? {
  router: {
    base: '/mypage/',
  },
} : {}

const pluginsBase = process.env.DEPLOY_ENV === 'GH_PAGES' ? {
  plugins: [
    { src: '~plugins/ga.js', ssr: false },
  ],
} : {}

module.exports = {
  ...pluginsBase,
  env: {
    wallpapers: [
      { name: "arabesque" },
      { name: "circlesInLine" },
    ],
  },
  css: [
    'normalize.css',
    '~/assets/css/main.css',
    '@fortawesome/fontawesome-free-webfonts',
    '@fortawesome/fontawesome-free-webfonts/css/fa-brands.css',
    '@fortawesome/fontawesome-free-webfonts/css/fa-regular.css',
    '@fortawesome/fontawesome-free-webfonts/css/fa-solid.css',
  ],
  build: {
    extend(config, { isDev, isClient }) {
      config.module.rules.push({
        test: /\.(glsl|frag|vert)$/,
        loader: 'raw-loader',
        exclude: '/node_modules/',
      })
    },
  },
  ...routerBase,
}
