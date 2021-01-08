const path = require('path')
const util = require('util')
const withCss = require('@zeit/next-css')
const withSass = require('@zeit/next-sass')

const BG_IMAGES_DIRNAME = 'bgimages'

const withTM = require('next-transpile-modules')([
  '@patternfly/react-core',
  '@patternfly/react-icons',
  '@patternfly/react-styles',
  '@patternfly/react-table',
  '@patternfly/react-tokens',
], { debug: false })

module.exports = withSass(withCss(
  withTM({
    // Webpack config from https://github.com/patternfly/patternfly-react-seed/blob/master/webpack.common.js
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
      config.module.rules.push({
        test: /\.(svg|ttf|eot|woff|woff2)$/,
        // only process modules with this loader
        // if they live under a 'fonts' or 'pficon' directory
        include: [
          path.resolve(__dirname, 'node_modules/patternfly/dist/fonts'),
          path.resolve(__dirname, 'node_modules/@patternfly/react-core/dist/styles/assets/fonts'),
          path.resolve(__dirname, 'node_modules/@patternfly/react-core/dist/styles/assets/pficon'),
          path.resolve(__dirname, 'node_modules/@patternfly/patternfly/assets/fonts'),
          path.resolve(__dirname, 'node_modules/@patternfly/patternfly/assets/pficon')
        ],
        use: {
          loader: 'file-loader',
          options: {
            // Limit at 50k. larger files emitted into separate files
            limit: 5000,
            publicPath: '/_next/static/fonts/',
            outputPath: 'static/fonts/',
            name: '[name].[ext]',
            esModule: false,
          },
        },
      })

      config.module.rules.push({
        test: /\.svg$/,
        include: (input) => input.indexOf('background-filter.svg') > 1,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 5000,
              publicPath: '/_next/static/svgs/',
              outputPath: 'static/svgs/',
              name: '[name].[ext]',
            },
          },
        ],
      })

      config.module.rules.push({
        test: /\.svg$/,
        // only process SVG modules with this loader if they live under a 'bgimages' directory
        // this is primarily useful when applying a CSS background using an SVG
        include: (input) => input.indexOf(BG_IMAGES_DIRNAME) > -1,
        use: {
          loader: 'svg-url-loader',
          options: {},
        },
      })

      config.module.rules.push({
        test: /\.svg$/,
        // only process SVG modules with this loader when they don't live under a 'bgimages',
        // 'fonts', or 'pficon' directory, those are handled with other loaders
        include: (input) =>
          input.indexOf(BG_IMAGES_DIRNAME) === -1 &&
          input.indexOf('fonts') === -1 &&
          input.indexOf('background-filter') === -1 &&
          input.indexOf('pficon') === -1,
        use: {
          loader: 'raw-loader',
          options: {},
        },
      })

      config.module.rules.push({
        test: /\.(jpg|jpeg|png|gif)$/i,
        include: [
          path.resolve(__dirname, 'src'),
          path.resolve(__dirname, 'node_modules/patternfly'),
          path.resolve(__dirname, 'node_modules/@patternfly/patternfly/assets/images'),
          path.resolve(__dirname, 'node_modules/@patternfly/react-styles/css/assets/images'),
          path.resolve(__dirname, 'node_modules/@patternfly/react-core/dist/styles/assets/images'),
          path.resolve(__dirname, 'node_modules/@patternfly/react-core/node_modules/@patternfly/react-styles/css/assets/images'),
          path.resolve(__dirname, 'node_modules/@patternfly/react-table/node_modules/@patternfly/react-styles/css/assets/images'),
          path.resolve(__dirname, 'node_modules/@patternfly/react-inline-edit-extension/node_modules/@patternfly/react-styles/css/assets/images')
        ],
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 5000,
              publicPath: '/_next/static/images/',
              outputPath: 'static/images/',
              name: '[name].[ext]',
            },
          },
        ],
      })

      return config
    },
  })
))