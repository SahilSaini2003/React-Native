const {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
} = require('react-native');
const { useState, useEffect } = require('react');
import Icon from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { useDataContext } from '../context/dataContext';
import { scale, verticalScale } from 'react-native-size-matters';

function DataBreifScreen({ route, navigation }) {
  const { itemData } = route.params;
  const { verifyData, deleteData } = useDataContext();

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
    } else {
      let dataCheck = verifyData(amount, title, description, type.toUpperCase(), date, 2, itemData[0].id);
      if (dataCheck == 'success') {
        setUpdateSave({ color: '#0000FF', text: 'UPDATE' });
        setTextEditable(false);
        navigation.navigate('History');
      }
    }
  }

  const [descriptionHeight, setDescriptionHeight] = useState(100);
  useEffect(() => {
    const descriptionHeight =
      description != null
        ? description.length > 50
          ? description.length > 100
            ? 200
            : 150
          : 100
        : null;
    setDescriptionHeight(descriptionHeight);
  }, [description])

  const typeColor =
    type == 'Debit' || type == 'DEBIT'
      ? '#FF0000'
      : '#0CF107';
  return (
    <View style={styles.mainBox}>
      <ScrollView>
        <View style={styles.container}>
          <View style={[styles.typeView, { backgroundColor: textEditable == true ? '#FFFDD0' : typeColor }]}>
            <TextInput style={[styles.typeTextInput, { color: textEditable == true ? 'black' : 'white' }]} editable={textEditable}
              maxLength={6}
              textAlign='center'
              onChangeText={(text) => {
                setType(text);
              }}>
              {type}
            </TextInput>
          </View>
          <View style={styles.textView}>
            <View>
              <Text style={styles.textTitle}>Date of Transaction :</Text>
            </View>
            <View>
              <TextInput
                style={[styles.textArea, { fontSize: scale(14) }]}
                defaultValue={date}
                editable={textEditable}
                maxLength={19}
                onChangeText={(text) => {
                  setDate(text);
                }}
              />
            </View>
          </View>
          <View style={styles.textView}>
            <Text style={styles.textTitle}>Transacted Amount : </Text>
            <TextInput
              style={styles.textArea}
              editable={textEditable}
              keyboardType='number-pad'
              maxLength={8}
              onChangeText={(text) => {
                setAmount(parseInt(text));
              }}>
              {amount}
            </TextInput>
          </View>
          <View style={[styles.textView, { flexDirection: 'column', height: verticalScale(90) }]}>
            <Text style={styles.textTitle}>Transacted Reason</Text>
            <TextInput
              style={styles.textArea}
              editable={textEditable}
              maxLength={15}
              onChangeText={(text) => {
                setTitle(text);
              }}>
              {title}
            </TextInput>
          </View>
          {textEditable == true && description == null ? (
            <View
              style={[
                styles.textView,
                { flexDirection: 'column', height: scale(200) },
              ]}>
              <Text style={[styles.textTitle, { marginTop: scale(10) }]}>
                Transaction Description
              </Text>
              <ScrollView nestedScrollEnabled={true}>
                <TextInput
                  style={[styles.textArea, { alignItems: 'center' }]}
                  editable={textEditable}
                  maxLength={150}
                  numberOfLines={5}
                  placeholder='Enter Description(If Needed)'
                  placeholderTextColor={'#666362'}
                  onChangeText={(text) => {
                    setDescription(text);
                  }}
                  multiline={true}>
                </TextInput>
              </ScrollView>
            </View>
          )
            : description != null ? (
              <View
                style={[
                  styles.textView,
                  { flexDirection: 'column', height: scale(descriptionHeight) },
                ]}>
                <Text style={[styles.textTitle, { marginTop: scale(10) }]}>
                  Transaction Description
                </Text>
                <ScrollView nestedScrollEnabled={true}>
                  <TextInput
                    style={[styles.textArea, { alignItems: 'center' }]}
                    editable={textEditable}
                    maxLength={150}
                    onChangeText={(text) => {
                      setDescription(text);
                    }}
                    multiline={true}>
                    {description}
                  </TextInput>
                </ScrollView>
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
            style={[styles.textView, { backgroundColor: '#B22222', height: 50 }]}
            onPress={async () => {
              let dataCheck = await deleteData(itemData[0].id);
              if (dataCheck == 'success') {
                navigation.navigate('History');
              }
            }}>
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
    margin: scale(8),
    borderRadius: 20,
    borderWidth: 2,
  },
  container: {
    alignItems: 'center',
  },
  textView: {
    backgroundColor: '#FFFDD0',
    width: '90%',
    marginTop: verticalScale(20),
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    height: scale(50),
    borderRadius: 10,
    borderWidth: 1,
  },
  textTitle: {
    fontSize: scale(14),
    color: '#676767',
  },
  textArea: {
    fontSize: scale(20),
    color: 'black',
  },
  typeView: {
    width: scale(140),
    height: scale(50),
    marginTop: scale(10),
    borderRadius: 50,
    borderWidth: 2,
  },
  typeTextInput: {
    fontSize: scale(20),
    fontWeight: 'bold',
    width: '100%',
    height: '100%',
    alignItems: 'center'
  }
});

export default DataBreifScreen;
