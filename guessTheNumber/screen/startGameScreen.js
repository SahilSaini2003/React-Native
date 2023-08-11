import {View, Text, StyleSheet} from 'react-native';

import PrimaryButton from '../components/primaryButton';

function startGameScreen(props) {
  return (
    <View>
      <View style={styles.textContainer}>
        <View style={styles.view}>
          <Text style={styles.text}>Guess</Text>
        </View>
        <View style={styles.view}>
          <Text style={styles.text}>The</Text>
        </View>
        <View style={styles.view}>
          <Text style={styles.text}>Number</Text>
        </View>
      </View>
      <View style={styles.buttonView}>
        <PrimaryButton
          title="Start the Game"
          onPressStart={props.onPressStart}
        />
      </View>
    </View>
  );
}

export default startGameScreen;

let styles = StyleSheet.create({
  text: {
    fontSize: 60,
    fontFamily: 'Merriweather-Italic',
  },
  view: {
    alignItems: 'center',
  },
  textContainer: {
    borderBottomColor: 'white',
    borderBottomWidth: 2,
    borderBottomStartRadius: 20,
    borderBottomEndRadius: 20,
    paddingTop: 20,
  },
  buttonView:{
    marginTop: "50%",
  }
});
