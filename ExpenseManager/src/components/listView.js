import { View, SectionList, Text, TouchableOpacity, Image } from 'react-native'
import { useState } from 'react';

function listView(props) {

    const [dataSelected, setDataSelected] = useState({});
    const [dataArray, setDataArray] = useState([]);
    const dataPush = async (data) => {

        const updateDataSelected =  { ...dataSelected };
        updateDataSelected[data] = !dataSelected[data];
        setDataSelected(updateDataSelected);
        if (updateDataSelected[data] == true) {
            console.log('Push', data);
            setDataArray(item => [...item, data]);
        }
        if (updateDataSelected[data] == false) {
            console.log('pop', data);
            setDataArray(item => {
                item.filter(function(item) {
                    return item != data;
                })
            })
        }
        // console.log(dataSelected);
        console.log(dataArray);
        console.log(updateDataSelected);
        console.log(updateDataSelected[data]);
    }

    return (
        <View style={{ borderTopWidth: 2 }}>
            <SectionList
                sections={props.data}
                renderItem={({ item }) => <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between' }} onPress={() => { dataPush(item) }} >
                    <Text style={{ color: 'black', fontSize: 15, marginVertical: 2, marginHorizontal: 3, alignSelf: 'center' }}>{item}</Text>
                    {dataSelected[item] ? (<Image source={require('../assets/images/checkmark.png')} style={{ height: 15, width: 15, marginTop: 5, marginHorizontal: 5 }} />):
                    (<Image source={require('../assets/images/blank-check-box.png')} style={{ height: 15, width: 15, marginTop: 5, marginHorizontal: 5 }} />)}
                </TouchableOpacity>
                }
                keyExtractor={(item, index) => index}
            />
        </View>
    )
}

export default listView;