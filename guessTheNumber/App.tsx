import React, {useState} from 'react';
import {View, Text, StyleSheet, ImageBackground} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import StartGameScreen from './screen/startGameScreen';
import GuessNumberScreen from './screen/guessNumberScreen';
import GameOverScreen from './screen/gameOverScreen';

function App():React.FC {
  let [screen, setScreen] = useState(
    <StartGameScreen onPressStart={onPressStart} />,
  );
  let randNum : number;

  function changeGameOverScreen() {
    console.log('here');

    setScreen(<GameOverScreen />);
  }

  function onPressStart() {
    randNum = Math.floor(Math.random() * 99);
    setScreen(
      <GuessNumberScreen
        randNum={randNum}
        changeScreen={changeGameOverScreen}
      />,
    );
    console.log(randNum);
  }

  return (
    <LinearGradient
      colors={['#8B4000', '#FFBF00', '#FFC000']}
      style={styles.bg}>
      <ImageBackground
        source={require('./assets/image/background.jpg')}
        style={styles.bg}
        resizeMode="stretch"
        imageStyle={styles.imageStyle}>
        {screen}
      </ImageBackground>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
  },
  imageStyle: {
    opacity: 0.25,
  },
  text: {
    // fontSize: 50,
    fontFamily: 'Pacifico-Regular',
  },
});

export default App;
