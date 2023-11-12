import { View, SectionList, Text, TouchableOpacity, Image } from 'react-native'
import { useState } from 'react';

function listView(props) {

    const [dataSelected = [], setDataSelected = []] = useState([false]);
    const dataList = [];
    const selectedDataArray = [];
    const dataPush = (data) => {
        dataList[data] = !dataList[data];
        setDataSelected[data] = dataList[data];
        if (dataList[data] == true) {
            selectedDataArray.push(data);
        } 
        if (dataList[data] == false) {
            selectedDataArray.pop(data);
        } 
        console.log(data);
        console.log(dataList[data]);
        console.log(dataSelected);
        console.log(selectedDataArray);
        // selectedMonth.push(data)
    }

    return (
        <View style={{ borderTopWidth: 2 }}>
            <SectionList
                sections={props.data}
                renderItem={({ item }) => <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between' }} onPress={()=>{dataPush(item)}} >
                    <Text style={{ color: 'black', fontSize: 15, marginVertical: 2, marginHorizontal: 5, alignSelf: 'center' }}>{item}</Text>
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