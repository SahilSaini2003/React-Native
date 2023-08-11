import {View, Text, StyleSheet, FlatList, Alert} from 'react-native';
import React, {useState} from 'react';

import TextInput from '../components/textInput';

function guessNumberScreen({randNum, changeScreen}) {
  let [userNum, setUserNum] = useState('');
  let [warning, setWarning] = useState('');
  let [color, setColor] = useState([styles.text]);
  let [nums, setNums] = useState([]);

  function changeInput(num) {
    setUserNum(num);
  }

  const onPressSubmit = () => {
    if (userNum == randNum) {
      changeScreen(nums.length);
    } else if (userNum > randNum) {
      setColor([styles.blue]);
      setWarning('Lower Number Plzz!!');
    } else if (userNum <= 0) {
      Alert.alert('Invalid Input!', 'Enter a Number between 1 to 99.', [
        {text: 'Okay!'},
      ]);
      return;
    } else if (userNum < randNum) {
      setColor([styles.red]);
      setWarning('Higher Number Plzz!!');
    }
    setNums(nums => [...nums, {text: userNum}]);
    setTimeout(() => {
      setWarning('');
    }, 2000);
  };

  return (
    <View style={styles.center}>
      <View>
        <View style={styles.textView}>
          <Text style={styles.text}>Guess a Number</Text>
        </View>
        <View style={styles.inputView}>
          <TextInput changeInput={changeInput} onPressSubmit={onPressSubmit} />
        </View>
      </View>
      <View style={styles.warningView}>
        <Text style={color}>{warning}</Text>
      </View>
      <View style={styles.flatList}>
        <FlatList
          data={nums}
          renderItem={newList => {
            return (
              <View style={styles.listView}>
                <Text style={styles.textList}>#{newList.index + 1}</Text>
                <Text style={styles.textList}>{newList.item.text}</Text>
              </View>
            );
          }}
        />
      </View>
    </View>
  );
}

let styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: 'center',
  },
  text: {
    fontSize: 40,
    fontFamily: 'Merriweather-Italic',
  },
  textView: {
    marginTop: 40,
  },
  inputView: {
    backgroundColor: '#ffc4009a',
    borderRadius: 100,
  },
  warning: {
    fontFamily: 'Merriweather-Bold',
    fontSize: 33,
  },
  warningView: {
    marginTop: 20,
  },
  red: {
    fontSize: 30,
    fontFamily: 'Merriweather-Italic',
    color: 'red',
  },
  blue: {
    fontSize: 30,
    fontFamily: 'Merriweather-Italic',
    color: 'blue',
  },
  listView: {
    borderWidth: 1,
    marginTop: 10,
    marginHorizontal: 4,
    borderRadius: 10,
    backgroundColor: '#ff88009a',
    width: 300,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textList: {
    fontSize: 25,
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  flatList: {
    flex: 1,
    marginTop: 10,
    marginBottom: 2,
  },
});

export default guessNumberScreen;
