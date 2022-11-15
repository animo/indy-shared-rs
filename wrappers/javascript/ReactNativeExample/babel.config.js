const path = require('path')

const rootDir = path.join(__dirname, '..')

const indyCredxReactNative = require('../react-native/package.json')
const indyCredxShared = require('../shared/package.json')

module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        extensions: ['.tsx', '.ts', '.js', '.json'],
        alias: {
          [indyCredxReactNative.name]: path.join(rootDir, 'react-native', indyCredxReactNative.source),
          [indyCredxShared.name]: path.join(rootDir, 'shared', indyCredxShared.source),
        },
      },
    ],
  ],
}
