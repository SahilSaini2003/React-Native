import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';


import HomeScreen from './src/screens/homeScreen';
import HistoryScreen from './src/screens/historyScreen';

// import { ReactComponent as CustomIcon } from './src/assets/icons/home.svg+';


// import moduleName from './src/assets/icons'

function App(): JSX.Element {

  let Tab = createBottomTabNavigator()
  // let Tab1 = createIconSetFromIcoMoon()

  // const CustomDrawerIcon = () => {
  //   return <Image source={} style={{ width: 24, height: 24 }} />;
  // }

  return (
    <NavigationContainer >
      <Tab.Navigator initialRouteName="Home"
        screenOptions={{
          tabBarActiveTintColor: 'white',
          tabBarInactiveTintColor: 'black',
          tabBarInactiveBackgroundColor: '#F4BA94',
          tabBarActiveBackgroundColor: '#ffb07d',
          tabBarStyle: {
            height: 70,
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
            fontWeight: 'bold'
          },
          headerTitleAlign: 'center',
          // hel
          // headerLeft: () => (
          //   <FontAwesome5 name='home' size='10' color='black' />
          // )
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
              <FontAwesome5 name='home' size={size} color={color} />
            ),
              // tab
          
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
              <FontAwesome5 name='clock' size={size} color={color} />
            )
          }} />
      </Tab.Navigator>
    </NavigationContainer>
    // <HomeScreen/>
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
