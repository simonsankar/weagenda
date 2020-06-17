import React from 'react';
import {View, SafeAreaView} from 'react-native';
import {
  Avatar,
  Divider,
  Drawer,
  DrawerItem,
  Layout,
  Text,
  StyleService,
  useStyleSheet,
} from '@ui-kitten/components';
import {
  AssetCalendarIcon,
  ClockIcon,
  QuestionIcon,
  GridIcon,
  SettingsIcon,
} from './Icons';

let initialRender = true;
export default ({navigation}) => {
  const styles = useStyleSheet(themedStyles);
  const onItemSelect = (index) => {
    switch (index.row) {
      case 0: {
        navigation.toggleDrawer();
        navigation.navigate('Agenda');
        return;
      }
      case 1: {
        navigation.toggleDrawer();
        navigation.navigate('Logs');
        return;
      }
      case 3: {
        navigation.toggleDrawer();
        navigation.navigate('Settings');
        return;
      }
      // case 4: {
      //   navigation.toggleDrawer();
      //   navigation.navigate('Support');
      //   return;
      // }
      case 4: {
        navigation.toggleDrawer();
        navigation.navigate('Customize');
        return;
      }
      case 5: {
        navigation.toggleDrawer();
        navigation.navigate('About');
        return;
      }
    }
  };

  const renderHeader = () => (
    <Layout style={styles.header} level="2">
      <View style={styles.profileContainer}>
        <Avatar
          size="giant"
          shape="rounded"
          source={{
            uri: 'https://cdn.roadmap.space/logos/5ed5164b31d74e9553c4f5eb.png',
          }}
        />
        <Text style={styles.profileName} category="h6">
          Appa Does
        </Text>
      </View>
    </Layout>
  );

  const renderFooter = () => (
    <React.Fragment>
      <Divider />
      <DrawerItem disabled={true} description={'Version 0.0.1'} />
    </React.Fragment>
  );

  if (initialRender) {
    initialRender = false;
    return null;
  } else {
    return (
      <SafeAreaView style={styles.safeArea} insets="top">
        <Drawer
          header={renderHeader}
          footer={renderFooter}
          onSelect={onItemSelect}>
          <DrawerItem title={'Agenda'} accessoryLeft={AssetCalendarIcon} />
          <DrawerItem title={'Time Log'} accessoryLeft={ClockIcon} />
          {/* <DrawerItem title={'Reports'} accessoryLeft={ReportIcon} /> */}
          <Divider />
          <DrawerItem title={'Settings'} accessoryLeft={SettingsIcon} />
          <DrawerItem title={'Customize'} accessoryLeft={GridIcon} />
          <DrawerItem title={'About'} accessoryLeft={QuestionIcon} />
        </Drawer>
      </SafeAreaView>
    );
  }
};

const themedStyles = StyleService.create({
  safeArea: {
    flex: 1,
  },
  header: {
    paddingVertical: 32,
    paddingHorizontal: 16,
    justifyContent: 'center',
    backgroundColor: '$background-basic-color-2',
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileName: {
    // color: '#fff',
    marginHorizontal: 16,
  },
});
