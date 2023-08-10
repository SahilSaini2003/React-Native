import {View, StyleSheet, TextInput} from 'react-native';

import PrimaryButton from '../components/primaryButton';

function textInput(props: any) {
  return (
    <View style={styles.center}>
      <View style={styles.view}>
        <TextInput
          style={styles.textInput}
          maxLength={2}
          keyboardType="number-pad"
          onChangeText={props.changeInput}
        />
      </View>
      <View style={styles.buttonView}>
        <PrimaryButton title="Submit" onPressStart={props.onPressSubmit} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    width: 140,
    height: 140,
    marginTop: 40,
    backgroundColor: '#ffaa33a1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    borderBottomColor: 'white',
    borderBottomWidth: 5,
    width: 100,
    height: 100,
    padding: 15,
    backgroundColor: '#FFC000',
    fontSize: 60,
    alignItems: 'center',
    color: 'black',
  },
  buttonView: {
    width: 250,
    margin: 30,
  },
  center: {
    alignItems: 'center',
  },
});

export default textInput;
