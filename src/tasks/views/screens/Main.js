import React from 'react';
import List from './List';
import withDetail from '../../controllers/withDetail';
import Detail from './Detail';
import {SafeAreaView} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

const {Navigator, Screen} = createStackNavigator();

const WrappedDetail = withDetail(Detail);

export default () => (
  <SafeAreaView style={{flex: 1}}>
    <Navigator screenOptions={{gestureEnabled: false, headerShown: false}}>
      <Screen name="TaskList" component={List} />
      <Screen
        name="CreateTask"
        component={WrappedDetail}
        initialParams={{id: '', section: 'agenda'}}
      />
      <Screen
        name="UpdateTask"
        component={WrappedDetail}
        initialParams={{id: ''}}
      />
    </Navigator>
  </SafeAreaView>
);
