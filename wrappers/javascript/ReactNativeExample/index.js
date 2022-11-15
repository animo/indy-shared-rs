import { AppRegistry } from 'react-native'

import { App } from './App'
import { name as appName } from './app.json'

// eslint-disable-next-line @typescript-eslint/no-unsafe-return
AppRegistry.registerComponent(appName, () => App)
