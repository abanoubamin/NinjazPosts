import {NavigationContainer} from '@react-navigation/native';
import React from 'react';

import MainTabs from './navigation/MainTabs';
import RealmContext from './contexts/RealmContext';

const {RealmProvider} = RealmContext;

const App: React.FC = () => {
  return (
    <RealmProvider>
      <NavigationContainer>
        <MainTabs />
      </NavigationContainer>
    </RealmProvider>
  );
};

export default App;
