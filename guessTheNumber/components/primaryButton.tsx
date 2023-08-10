import {View, StyleSheet, Pressable, Text} from 'react-native';

function primaryButton(props: any) {
  return (
    <View style={styles.center}>
    <View style={styles.border}>
      <Pressable android_ripple={{color: '#F08000', borderless: true}} onPress={props.onPressStart}>
        <Text style={styles.text}>{props.title}</Text>
      </Pressable>
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 40,
    fontFamily: 'Pacifico-Regular',
    color: 'black'
  },
  border: {
    borderWidth: 2,
    width: "85%",
    alignItems: 'center',
    borderRadius: 50,
    backgroundColor: '#FFC300',
    elevation: 25,
    borderColor: 'white'
},
center: {
    alignItems: 'center',
    borderRadius: 50,
  }
});

export default primaryButton;
