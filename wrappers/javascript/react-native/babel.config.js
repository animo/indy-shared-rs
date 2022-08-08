const path = require('path')

const indyCredxShared = require('../shared/package.json')

module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        extensions: ['.tsx', '.ts', '.js', '.json'],
        alias: {
          [indyCredxShared.name]: path.join(__dirname, '../shared', indyCredxShared.source),
        },
      },
    ],
  ],
}
