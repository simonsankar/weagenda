import React from 'react';
import {StyleService, Tab, TabBar, useStyleSheet} from '@ui-kitten/components';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import TopBar from '../components/TopBar';
import AgendaHOC from '../../controllers/AgendaHOC';
import Agenda from '../components/Agenda';
import BacklogHOC from '../../controllers/BacklogHOC';
import Backlog from '../components/Backlog';

export default (props) => {
  const styles = useStyleSheet(themedStyles);

  const {navigation} = props;
  //setup tabs for current task list and backlog
  const Tabs = createMaterialTopTabNavigator();

  const TopTabBar = ({navigation, state}) => (
    <TabBar
      style={styles.topBar}
      indicatorStyle={styles.indicator}
      selectedIndex={state.index}
      onSelect={(index) => navigation.navigate(state.routeNames[index])}>
      <Tab title="TODAY" />
      <Tab title="BACKLOG" />
    </TabBar>
  );

  const WrappedAgenda = (props) => AgendaHOC(Agenda, props);
  const WrappedBacklog = (props) => BacklogHOC(Backlog, props);
  return (
    <>
      <TopBar navigation={navigation} />
      <Tabs.Navigator
        tabBar={(props) => <TopTabBar {...props} />}
        screenOptions={{gestureEnabled: false}}>
        <Tabs.Screen name="Today" component={WrappedAgenda} />
        <Tabs.Screen name="Backlog" component={WrappedBacklog} />
      </Tabs.Navigator>
    </>
  );
};

const themedStyles = StyleService.create({
  topBar: {
    paddingTop: 15,
    paddingBottom: 10,
    shadowColor: '#777',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.1,
    shadowRadius: 7,
  },
  indicator: {
    height: 2,
    borderRadius: 0,
  },
});
