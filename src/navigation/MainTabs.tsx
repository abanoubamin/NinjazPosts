import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';

import {colors} from '../theme/colors';
import {globalStyles} from '../theme/styles';
import ComingSoon from '../screens/ComingSoon';
import Posts from '../screens/Posts';

const Tab = createBottomTabNavigator();

const App: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarIconStyle: {display: 'none'},
        tabBarInactiveTintColor: colors.secondary,
        tabBarLabelStyle: globalStyles.tabLabel,
      }}>
      <Tab.Screen name="Posts" component={Posts} />
      <Tab.Screen name="Tab2" component={ComingSoon} />
      <Tab.Screen name="Tab3" component={ComingSoon} />
    </Tab.Navigator>
  );
};

export default App;
