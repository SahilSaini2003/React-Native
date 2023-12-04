import { View, SectionList, Text, TouchableOpacity, Image } from 'react-native'
import { useState } from 'react';

function listViewSingleSelect({ data, setData, selectedData, setSelectedData }) {
    if (Object.keys(selectedData).length === 0) {
        var [dataSelected, setDataSelected] = useState({'All':true, 'Overall':true});
    }
    else {
        var [dataSelected, setDataSelected] = useState(selectedData);
    }
    // const [dataArray, setDataArray] = useState();
    const dataPush = async (data) => {
        let updateDataSelected = {};
        updateDataSelected[data] = !dataSelected[data];
        setDataSelected(updateDataSelected);
        if (updateDataSelected[data] == true) {
            if(data == 'Overall' && data == 'All'){
                return setData();
            }
            setSelectedData(updateDataSelected);
            setData(data);
        }
        if (updateDataSelected[data] == false) {
            // setDataArray();
            setSelectedData({});
            setData();
            setDataSelected({'All':true, 'Overall':true});
        }
        console.log(dataSelected);
        // console.log(dataArray, updateDataSelected);
    }

    return (
        <View>
            <SectionList
                sections={data}
                renderItem={({ item }) => <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between' }} onPress={() => { dataPush(item) }} >
                    <Text style={{ color: 'black', fontSize: 20, marginTop: 20, marginHorizontal: 10, alignSelf: 'center' }}>{item}</Text>
                    {dataSelected[item] ? (<Image source={require('../assets/images/checkmark.png')} style={{ height: 20, width: 20, marginTop: 25, marginHorizontal: 10 }} />):
                    (<Image source={require('../assets/images/blank-check-box.png')} style={{ height: 20, width: 20, marginTop: 25, marginHorizontal: 10 }} />)}
                </TouchableOpacity>
                }
                keyExtractor={(item, index) => index}
            />
        </View>
    )
}

export default listViewSingleSelect;