const path = require('path')

const workspaceRoot = path.resolve(__dirname, '..')
const projectRoot = __dirname

module.exports = {
  transformer: {
    getTransformOptions: () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
  resolver: {
    nodeModulesPaths: [path.resolve(projectRoot, 'node_modules'), path.resolve(workspaceRoot, 'node_modules')],
  },
  watchFolders: [workspaceRoot],
}
