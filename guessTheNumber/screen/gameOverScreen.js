import {View, StyleSheet, Image, Text} from 'react-native';

import PrimaryButton from '../components/primaryButton';

function gameOverScreen(props) {
  return (
    <View style={styles.center}>
      <View>
        <Text style={styles.overtext}>~GAME OVER~</Text>
      </View>
      <View>
        <Image
          style={styles.image}
          source={require('../assets/image/success.png')}
        />
      </View>
      <View>
        <Text style={styles.finalText}>
          You Guessed <Text style={styles.finalTextBold}>{props.randNum}</Text>{' '}
          in <Text style={styles.finalTextBold}>{props.rounds}</Text> tries.
        </Text>
      </View>
      <View style={styles.button}>
        <PrimaryButton
          title="Start New Game"
          onPressStart={props.onPressStart}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: 'center',
    marginTop: 30,
  },
  overtext: {
    fontSize: 50,
    fontFamily: 'Merriweather-Bold',
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 150,
    borderWidth: 2,
    borderColor: 'white',
    marginTop: 20,
  },
  finalTextBold: {
    fontSize: 33,
  },
  finalText: {
    fontSize: 28,
    fontFamily: 'Merriweather-LightItalic',
    color: 'black',
    padding: 20,
    marginVertical: 30,
  },
  button: {
    width: 420,
  },
});

export default gameOverScreen;
