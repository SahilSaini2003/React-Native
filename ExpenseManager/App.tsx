import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from './src/screens/homeScreen';
import HistoryScreen from './src/screens/historyScreen';

// import { ReactComponent as CustomIcon } from './src/assets/icons/home.svg+';


// import moduleName from './src/assets/icons'

function App(): JSX.Element {

  let a ='hii';
  let mainData = [
    {'id':1, 'amount': 1200, 'title': 'Bus Fair', 'description': 'Traveled from Home to College', 'type': 'Credit', 'date':'08-11-2023', 'dateDay': '08', 'dateMonth': '11', 'dateYear': '2023'},
    {'id':2, 'amount': 800, 'title': 'Bought Cloth', 'description': 'Bought Shirt and pant for Diwali', 'type': 'Credit', 'date':'10-11-2023', 'dateDay': '10', 'dateMonth': '11', 'dateYear': '2023'},
    {'id':3, 'amount': 500, 'title': 'Mouse', 'description': 'Bought Dell Mouse', 'type': 'Debit', 'date':'13-12-2023', 'dateDay': '13', 'dateMonth': '12', 'dateYear': '2023'},
    {'id':4, 'amount': 200, 'title': 'Cap', 'description': 'Bought a White Cap', 'type': 'Debit', 'date':'15-08-2023', 'dateDay': '15', 'dateMonth': '08', 'dateYear': '2023'},
  ]

  // const navigation = useNavigation();
  // navigation.navigate('HistoryScree', {mainData});
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
              // <FontAwesome5 name='home' size={size} color={color} />
              <Image source={require('./src/assets/images/home.png')} style={{width: 45, height:45, marginTop: 5}} />
            ),
              // tab
          
          }} />
        <Tab.Screen
          name="History"
          component={HistoryScreen}
          initialParams={{mainData}}
          options={{
            tabBarLabelStyle: {
              fontSize: 15,
              fontWeight: 'bold',
              color: '#000000',
              paddingBottom: 5
            },
            tabBarIcon: ({ color, size }) => (
              // <FontAwesome5 name='clock' size={size} color={color} />
              <Image source={require('./src/assets/images/wall-clock.png')} style={{width: 45, height:45, marginTop: 5}} />
            ),
            // header(props) {
            //   <Image source={require('./src/assets/images/home.png')} style={{width:50, height: 50, marginLeft: 100}} />
            // },
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
