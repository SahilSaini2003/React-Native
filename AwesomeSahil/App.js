import React, {useState} from 'react';
import {View, Text, StyleSheet, Modal, ImageBackground} from 'react-native';

import Header from './components/header';
import Textarea from './components/textArea';
import ListNote from './components/listNote';
import CustomButton from './components/customButton';

const App = () => {
  let [note, setNote] = useState('');
  let [list, setList] = useState([]);
  let [model, setModel] = useState(false);

  function addNote(text) {
    setNote(text);
  }

  function addOnList() {
    let temp = Math.floor(Math.random() * 10000);
    setList(currentList => [...currentList, {text: note, id: temp}]);
    changeModelFalse();
  }

  function deleteNote(id) {
    setList(List => {
      return List.filter(function (item) {
        return item.id != id;
      });
    });
  }

  function changeModelTrue() {
    setModel(true);
  }
  function changeModelFalse() {
    setModel(false);
  }

  return (
    <View style={styles.main}>
      <View style={styles.header}>
        <Header title="Notes Gallary" />
      </View>
      <Modal visible={model}>
        <View style={styles.textArea}>
          <Textarea
            newNote={addNote}
            newList={addOnList}
            changeModelFalse={changeModelFalse}
          />
        </View>
      </Modal>
      <ImageBackground
        source={require('./asset/main.png')}
        style={styles.bgImg}
        imageStyle={styles.img}>
        <View style={styles.display}>
          <ListNote list={list} id={list.id} deleteNote={deleteNote} />
        </View>
        <CustomButton changeModelTrue={changeModelTrue} />
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#993399',
  },
  header: {
    borderBottomWidth: 1,
    marginBottom: 15,
  },
  textArea: {
    flex: 1,
    backgroundColor: '#993399',
  },
  bgImg: {
    flex: 1,
  },
  img: {
    resizeMode: 'stretch',
    marginVertical: 80,
    // marginTop: 150,
    // elevation: 2
    opacity: 0.4
  },
});

export default App;
