import React, { useState } from 'react';
import 'react-native-gesture-handler';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { navigationRef, navigate  } from './src/rootNavigation/rootNavigation';
import moment from 'moment-timezone';

import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Entypo from 'react-native-vector-icons/Entypo';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

import HomeScreen from './src/screens/homeScreen';
import HistoryScreen from './src/screens/historyScreen';
import DataBreifScreen from './src/screens/dataBreifScreen';
import GraphScreen from './src/screens/graphScreen';
import BackupScreen from './src/screens/backupScreen';
import { DataProvider } from './src/context/dataContext';


function App(): JSX.Element {
  const Stack = createStackNavigator();
  const Tab = createBottomTabNavigator()


  function MainScreen() {
    return (<Tab.Navigator initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'black',
        tabBarInactiveBackgroundColor: '#F4BA94',
        tabBarActiveBackgroundColor: '#ffb07d',
        tabBarStyle: {
          height: 75,
          borderColor: 'black',
        },
        headerStyle: {
          backgroundColor: '#ffb07d',
          borderColor: 'black',
          borderBottomWidth: 1,
          height: 60,
        },
        headerTitleStyle: {
          fontSize: 25,
          fontWeight: 'bold',
        },
        headerTitleAlign: 'center'
      }}
      sceneContainerStyle={{ backgroundColor: '#FFFDD0' }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabelStyle: {
            fontSize: 15,
            fontWeight: 'bold',
            color: '#000000',
            paddingBottom: 5,
          },
          tabBarIcon: ({ color, size }) => (
            <Image source={require('./src/assets/images/home.png')} style={{ width: 45, height: 45, marginTop: 5 }} />
          ),
          headerRight(props): any {
              return (
                <TouchableOpacity style={{ paddingRight: scale(10) }} onPress={() => { navigate('Back-up') }}>
                  <Entypo name='menu' size={scale(30)} color={'black'} />
                </TouchableOpacity>)
          },
        }} />
      <Tab.Screen
        name="History"
        component={HistoryScreen}
        options={{
          tabBarLabelStyle: {
            fontSize: 15,
            fontWeight: 'bold',
            color: '#000000',
            paddingBottom: 5
          },
          tabBarIcon: ({ color, size }) => (
            <Image source={require('./src/assets/images/wall-clock.png')} style={{ width: 45, height: 45, marginTop: 5 }} />
          )
        }} />
    </Tab.Navigator>)
  }

  return (
    <DataProvider>
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator initialRouteName='MainScreen'
        >
          <Stack.Screen
            name="MainScreen"
            component={MainScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Data - Breif"
            component={DataBreifScreen}
            options={{
              headerStyle: {
                backgroundColor: '#ffb07d',
                borderColor: 'black',
                borderBottomWidth: 1,
                height: 60,
              },
              headerTitleStyle: {
                fontSize: 25,
                fontWeight: 'bold',
              },
              headerTitleAlign: 'center',
              cardStyle: { backgroundColor: '#FFFDD0' }
            }}
          />
          <Stack.Screen
            name="Progress"
            component={GraphScreen}
            options={{
              headerStyle: {
                backgroundColor: '#ffb07d',
                borderColor: 'black',
                borderBottomWidth: 1,
                height: 60,
              },
              headerTitleStyle: {
                fontSize: 25,
                fontWeight: 'bold',
              },
              headerTitleAlign: 'center',
              cardStyle: { backgroundColor: '#FFFDD0' }
            }}
          />
          <Stack.Screen
            name="Back-up"
            component={BackupScreen}
            options={{
              headerStyle: {
                backgroundColor: '#ffb07d',
                borderColor: 'black',
                borderBottomWidth: 1,
                height: 60,
              },
              headerTitleStyle: {
                fontSize: 25,
                fontWeight: 'bold',
              },
              headerTitleAlign: 'center',
              cardStyle: { backgroundColor: '#FFFDD0' }
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </DataProvider>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#FFFDD0'
  }
});

export default App;
// export default createIconSetFromIcoMoon(icoMoonConfig);
