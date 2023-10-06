/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import AppStack from './src/routes/AppStack';
import AuthStack from './src/routes/AuthStack';


AppRegistry.registerComponent(appName, () => AuthStack);
