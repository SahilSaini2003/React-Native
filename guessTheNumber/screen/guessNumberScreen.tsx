import {View, Text, StyleSheet, FlatList} from 'react-native';
import React, {useState} from 'react';

import TextInput from '../components/textInput';

type guessNumberScreen = {
  randNum: number;
  changeScreen: () => void;
};

function guessNumberScreen({
  randNum,
  changeScreen,
}): React.FC<guessNumberScreen> {
  let [userNum, setUserNum] = useState('');
  let [warning, setWarning] = useState('');
  let [color, setColor] = useState([styles.text]);
  let [nums, setNums]: any = useState([]);

  function changeInput(num: any) {
    setUserNum(num);
  }

  const onPressSubmit = () => {
    console.log('Im running');
    setNums((nums: any) => [...nums, {text: userNum}]);
    if (userNum == randNum) {
      console.log('Equal');

      changeScreen();
      console.log(randNum);
    } else if (userNum > randNum) {
      setColor([styles.blue]);
      setWarning('Lower Number Plzz!!');
    } else if (userNum < randNum) {
      setColor([styles.red]);
      setWarning('Higher Number Plzz!!');
    }
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
    backgroundColor: 'black',
  },
  warning: {
    fontFamily: 'Merriweather-Bold',
    fontSize: 30,
  },
  warningView: {
    marginTop: 20,
    backgroundColor: 'black',
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
    backgroundColor: '#bd7dbd',
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
    backgroundColor: 'black',
  },
});

export default guessNumberScreen;
