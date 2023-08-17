import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';

const App = props => {
  return (
    <View style={styles.bottom}>
      <View style={styles.container}>
        <View style={styles.cardContainer}>
          <Pressable 
          onPress={props.changeModelTrue}
          android_ripple={{color: '#F08000', borderless: true}} 
          style={styles.roundshape}>
            <Text style={styles.item}>+</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bottom: {
    flexDirection: 'column-reverse',
    flex: 3,
    alignItems: 'flex-end',
  },
  container: {
    marginBottom: 40,
    marginRight: 35,
  },
  cardContainer: {
    backgroundColor: 'black',
    borderRadius: 40,
    overflow: 'hidden',
    height: 62,
    width: 62,
  },
  item: {
    alignSelf: 'center',
    color: 'black',
    fontSize: 40,
  },
  roundshape: {
    backgroundColor: '#9951ff',
    height: 60,
    width: 60,
    justifyContent: 'center',
    borderRadius: 50,
  },
});

export default App;