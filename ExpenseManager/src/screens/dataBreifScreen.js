const {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
} = require('react-native');
const { useState } = require('react');
import Icon from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

function DataBreifScreen({ route }) {
  const { itemData } = route.params;

  const [type, setType] = useState(itemData[0].type);
  const [date, setDate] = useState(itemData[0].date);
  const [amount, setAmount] = useState(itemData[0].amount);
  const [title, setTitle] = useState(itemData[0].title);
  const [description, setDescription] = useState(itemData[0].description);

  const [updateSave, setUpdateSave] = useState({
    color: '#0000FF',
    text: 'UPDATE',
  });
  const [textEditable, setTextEditable] = useState(false);

  function changeUpdateSave() {
    if (updateSave.text == 'UPDATE') {
      setUpdateSave({ color: '#4CBB17', text: 'SAVE' });
      setTextEditable(true);
      console.log(typeof date, typeof amount, typeof title, typeof description);
    } else {
      setUpdateSave({ color: '#0000FF', text: 'UPDATE' });
      setTextEditable(false);
      console.log(date, amount, title, description);
    }
  }

  const typeColor =
    itemData[0].type == 'Debit' || itemData[0].type == 'DEBIT'
      ? '#FF0000'
      : '#0CF107';
  const descriptionHeight =
    itemData[0].description != null
      ? itemData[0].description.length > 50
        ? itemData[0].description.length > 100
          ? 200
          : 150
        : 100
      : null;
  return (
    <View style={styles.mainBox}>
      <ScrollView>
        <View style={styles.container}>
          <View
            style={{
              width: 120,
              height: 35,
              backgroundColor: typeColor,
              alignItems: 'center',
              marginTop: 10,
              borderRadius: 20,
              borderWidth: 2,
              borderColor: 'black',
            }}>
            <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>
              {type}
            </Text>
          </View>
          <View style={styles.textView}>
            <Text style={styles.textTitle}>Date of Transaction :</Text>
            <TextInput
              style={[styles.textArea, { fontSize: 15 }]}
              defaultValue={date}
              editable={textEditable}
              onChange={(text) => {
                console.log(text);
                setDate(text);
              }}
            />
          </View>
          <View style={styles.textView}>
            <Text style={styles.textTitle}>Transacted Amount : </Text>
            <Icon name="rupee-sign" size={25} color={'black'} />
            <TextInput
              style={styles.textArea}
              editable={textEditable}
              onChange={(text) => {
                setAmount(parseInt(text));
              }}>
              {amount}
            </TextInput>
          </View>
          <View style={[styles.textView, { flexDirection: 'column', height: 90 }]}>
            <Text style={styles.textTitle}>Transacted Reason</Text>
            <TextInput
              style={styles.textArea}
              editable={textEditable}
              onChange={(text) => {
                setTitle(text);
              }}>
              {title}
            </TextInput>
          </View>
          {itemData[0].description != null ? (
            <View
              style={[
                styles.textView,
                { flexDirection: 'column', height: descriptionHeight },
              ]}>
              <Text style={[styles.textTitle, { marginBottom: 5 }]}>
                Transaction Description
              </Text>
              {/* <Text style={styles.textArea}>{itemData[0].description}</Text> */}
              <TextInput
                style={[styles.textArea, { alignItems: 'center' }]}
                editable={textEditable}
                onChange={(text) => {
                  setDescription(text);
                }}
                multiline={true}>
                {description}
              </TextInput>
            </View>
          ) : null}
          <TouchableOpacity
            style={[
              styles.textView,
              { backgroundColor: updateSave.color, height: 50 },
            ]}
            onPress={() => {
              changeUpdateSave();
            }}>
            <Text style={{ fontSize: 30, color: 'white', fontWeight: 'bold' }}>
              <Icon name="pencil-alt" size={30} color={'white'} />{' '}
              {updateSave.text}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.textView, { backgroundColor: '#B22222', height: 50 }]}>
            <Text style={{ fontSize: 30, color: 'white', fontWeight: 'bold' }}>
              <MaterialCommunityIcons
                name="delete-empty"
                size={40}
                color={'white'}
              />{' '}
              DELETE
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainBox: {
    flex: 1,
    backgroundColor: '#F3E0D6',
    margin: 10,
    borderRadius: 20,
    borderWidth: 2,
  },
  container: {
    alignItems: 'center',
  },
  textView: {
    backgroundColor: '#FFFDD0',
    width: '90%',
    marginTop: 25,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    borderRadius: 10,
    borderWidth: 1,
  },
  textTitle: {
    fontSize: 15,
    color: '#676767',
    marginHorizontal: 10,
  },
  textArea: {
    fontSize: 20,
    color: 'black',
    marginHorizontal: 10,
  },
});

export default DataBreifScreen;
