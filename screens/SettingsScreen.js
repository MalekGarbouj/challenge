import React from 'react';
import Settings from '../components/Settings'

export default function SettingsScreen() {
  /**
   * Go ahead and delete ExpoConfigView and replace it with your content;
   * we just wanted to give you a quick view of your config.
   */
  return <Settings/>;
}

SettingsScreen.navigationOptions = {
  title: 'app.json',
};
