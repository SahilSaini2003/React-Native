import { View, SectionList, Text, TouchableOpacity, Image } from 'react-native'
import { useState } from 'react';
import _ from 'underscore';

function listViewMultipleSelect({ data, selectedData, arrayData, fetchSelectedData }) {
    // console.log(selectedData);
    // console.log(Object.keys(selectedData).length);
    if (arrayData.length == 0) {
        var [dataArray, setDataArray] = useState([]);
    }
    else {
        var [dataArray, setDataArray] = useState(arrayData);
    }
    if (Object.keys(selectedData).length === 0) {
        var [dataSelected, setDataSelected] = useState({'All': true});
    }
    else {
        var [dataSelected, setDataSelected] = useState(selectedData);
    }
    const dataPush = async (data) => {
        if (data == 'All') {
            if (dataSelected['All'] == false) {
                setDataArray([]);
                return setDataSelected({'All': true});
            }
        }
        const updateDataSelected =  { ...dataSelected, 'All': false };
        updateDataSelected[data] = !dataSelected[data];
        // console.log(updateDataSelected);
        setDataSelected(updateDataSelected);
        if (updateDataSelected[data] == true) {
            setDataArray(item => [...item, data]);
        }
        if (updateDataSelected[data] == false) {
                setDataSelected(updateDataSelected);
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
        let allChecker =  _.filter(updateDataSelected, (item)=>{
            return item == true;
        })
        if (allChecker.length === 0) {
            setDataSelected({'All': true})
        }
    }

    const sendData = () => {
        fetchSelectedData(dataArray, dataSelected);
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