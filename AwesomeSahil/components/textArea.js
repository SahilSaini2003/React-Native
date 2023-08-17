import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Image
} from 'react-native';

const App = props => {
  return (
    <View style={styles.view}>
      <Image style={{height: 150, width: 150}} source={require('../asset/text.png')} />
      <TextInput
        style={styles.textArea}
        placeholder="Enter Your Note Here..."
        placeholderTextColor="rgba(0, 0, 0, 0.5)"
        onChangeText={props.newNote}
        multiline={true}
        numberOfLines={5}
      />
      <View style={styles.buttons}>
        <Pressable style={styles.button} onPress={props.newList}>
          <Text style={styles.text}>+ Add Note</Text>
        </Pressable>
        <Pressable style={styles.button2} onPress={props.changeModelFalse}>
          <Text style={styles.text}>Cancel</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    alignItems: "center",
    marginTop: "40%",
  },
  textArea: {
    color: 'white',
    borderColor: 'black',
    borderWidth: 2,
    margin: 8,
    padding: 1.5,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 10,
    fontSize: 20,
    width: "85%",
    textAlignVertical: 'top'
  },
  button: {
    marginTop: 10,
    backgroundColor: 'green',
    alignItems: 'center',
    height: 40,
    alignSelf: 'center',
    borderRadius: 5,
    margin:10,
  },
  button2: {
    marginTop: 10,
    backgroundColor: 'red',
    alignItems: 'center',
    height: 40,
    alignSelf: 'center',
    borderRadius: 5,
    margin:10,
  },
  buttons: {
    flexDirection: "row"
  },
  text: {
    fontSize: 20,
    color: 'black',
    paddingVertical: 5,
    paddingHorizontal: 13
  },
});

export default App;
