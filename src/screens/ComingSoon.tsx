import {Text, View} from 'react-native';
import React from 'react';

import {globalStyles} from '../theme/styles';

const ComingSoon: React.FC = () => {
  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Coming Soon</Text>
      <Text style={globalStyles.text}>
        This feature is under development. Stay tuned!
      </Text>
    </View>
  );
};

export default ComingSoon;
