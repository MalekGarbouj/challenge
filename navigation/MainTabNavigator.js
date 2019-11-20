import React from 'react';
import { Platform,View } from 'react-native';
import {Button} from 'native-base'
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import RapportScreen from '../screens/RapportScreen';
import ModeleScreen from '../screens/ModeleScreen';
import SettingsScreen from '../screens/SettingsScreen';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const RapportStack = createStackNavigator(
  {
    Home: RapportScreen,
  },
  config
);

RapportStack.navigationOptions = {
  tabBarLabel: 'Mes Rapports',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'}
    />
   
  ),
};

RapportStack.path = '';

const ModelesStack = createStackNavigator(
  {
    modele: ModeleScreen,
  },
  config
);

ModelesStack.navigationOptions = {
  tabBarLabel: 'Modeles',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'} />
  ),
};

ModelesStack.path = '';

const SettingsStack = createStackNavigator(
  {
    Settings: SettingsScreen,
  },
  config
);

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'} />
  ),
};




const tabNavigator = createBottomTabNavigator({
  RapportStack,
  ModelesStack,
  SettingsStack,
  
});

tabNavigator.path = '';

export default tabNavigator;
