import React from 'react';
import {View, Text, StyleSheet, FlatList, Pressable} from 'react-native';

const App = props => {
  return (
    <FlatList
      data={props.list}
      renderItem={newList => {
        return (
          <Pressable onPress={props.deleteNote.bind(this, newList.item.id)}>
            <View style={styles.listView}>
              <Text style={styles.text}>{newList.item.text}</Text>
            </View>
          </Pressable>
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  text: {
    color: 'black',
    fontSize: 23,
    paddingHorizontal: 5,
    paddingVertical: 3,
    color: 'white',
  },
  listView: {
    borderWidth: 1,
    marginTop: 5,
    marginHorizontal: 4,
    borderRadius: 10,
    backgroundColor: '#bd7dbd',
  },
});

export default App;
