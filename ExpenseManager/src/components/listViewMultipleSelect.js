import { View, SectionList, Text, TouchableOpacity, Image } from 'react-native'
import { useState } from 'react';

function listViewMultipleSelect({ data, fetchSelectedData }) {

    const [dataSelected, setDataSelected] = useState({});
    const [dataArray, setDataArray] = useState([]);
    const dataPush = async (data) => {
        const updateDataSelected =  { ...dataSelected };
        updateDataSelected[data] = !dataSelected[data];
        setDataSelected(updateDataSelected);
        if (updateDataSelected[data] == true) {
            setDataArray(item => [...item, data]);
        }
        if (updateDataSelected[data] == false) {
            setDataArray(item => {
                let a = item.filter(function(item) {
                    return item != data;
                });
                if (a == undefined) {
                    return [];
                } 
                else{
                    return a;
                }  
            })
        }
    }

    const sendData = () => {
        fetchSelectedData(dataArray);
    }

    return (
        <View style={{ borderTopWidth: 2 }}>
            <SectionList
                sections={data}
                renderItem={({ item }) => <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between' }} onPress={() => { dataPush(item) }} >
                    <Text style={{ color: 'black', fontSize: 15, marginVertical: 2, marginHorizontal: 3, alignSelf: 'center' }}>{item}</Text>
                    {dataSelected[item] ? (<Image source={require('../assets/images/checkmark.png')} style={{ height: 15, width: 15, marginTop: 5, marginHorizontal: 5 }} />):
                    (<Image source={require('../assets/images/blank-check-box.png')} style={{ height: 15, width: 15, marginTop: 5, marginHorizontal: 5 }} />)}
                </TouchableOpacity>
                }
                keyExtractor={(item, index) => index}
            />
            <TouchableOpacity style={{height: 30, width: 98, backgroundColor: '#00BF00', alignSelf:'center', marginVertical: 5, borderRadius: 50,borderWidth:2,borderColor: 'white', alignItems: 'center', justifyContent:'center'}} onPress={()=>{sendData()}}>
                <Text style={{fontSize: 20, fontWeight:'bold', color:'white'}}>APPLY</Text>
            </TouchableOpacity>
        </View>
    )
}

export default listViewMultipleSelect;