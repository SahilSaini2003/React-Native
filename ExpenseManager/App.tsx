import React from 'react';
import 'react-native-gesture-handler';
import { Image, StyleSheet, View } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';

import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from './src/screens/homeScreen';
import HistoryScreen from './src/screens/historyScreen';
import DataBreifScreen from './src/screens/dataBreifScreen';
import GraphScreen from './src/screens/graphScreen';

function App(): JSX.Element {

  let mainData = [
    { 'id': 1, 'amount': 1200, 'title': 'Bus Fair', 'description': 'We live in an age of science. Science has made uss', 'type': 'Credit', 'date': '08-11-2023', 'dateDay': '08', 'dateMonth': '11', 'dateYear': '2023' },
    { 'id': 2, 'amount': 800, 'title': 'Bought Cloth', 'description': 'We live in an age of science. Science has made us civilized. Every progress in human civilization is', 'type': 'Credit', 'date': '10-11-2023', 'dateDay': '10', 'dateMonth': '11', 'dateYear': '2023' },
    { 'id': 3, 'amount': 500, 'title': 'QQQQQQQQQQQQQQQ', 'description': 'Bought Dell Mouse', 'type': 'Debit', 'date': '13-12-2023', 'dateDay': '13', 'dateMonth': '12', 'dateYear': '2023' },
    { 'id': 4, 'amount': 10000000, 'title': 'Cap', 'description': 'We live in an age of science. Science has made us civilized. Every progress in human civilization is the gift of science. Science has solved our probl', 'type': 'Debit', 'date': '15-08-2023', 'dateDay': '15', 'dateMonth': '08', 'dateYear': '2023' },
  ]

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
        headerTitleAlign: 'center',
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
        }} />
      <Tab.Screen
        name="History"
        component={HistoryScreen}
        initialParams={{ mainData }}
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
    <NavigationContainer>
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
            cardStyle: {backgroundColor: '#FFFDD0'}
          }}
        />
        <Stack.Screen
          name="Progress"
          component={GraphScreen}
          initialParams={{ mainData }}
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
            cardStyle: {backgroundColor: '#FFFDD0'}
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
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
