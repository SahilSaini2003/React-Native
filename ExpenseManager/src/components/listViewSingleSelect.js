import { View, SectionList, Text, TouchableOpacity, Image } from 'react-native';
import { useState } from 'react';
import { scale } from 'react-native-size-matters';

function listViewSingleSelect({ data, setData, selectedData, setSelectedData }) {
    if (Object.keys(selectedData).length === 0) {
        var [dataSelected, setDataSelected] = useState({ All: true, Overall: true });
    } else {
        var [dataSelected, setDataSelected] = useState(selectedData);
    }
    const dataPush = async data => {
        let updateDataSelected = {};
        updateDataSelected[data] = !dataSelected[data];
        setDataSelected(updateDataSelected);
        if (updateDataSelected[data] == true) {
            if (data == 'Overall' && data == 'All') {
                return setData();
            }
            setSelectedData(updateDataSelected);
            setData(data);
        }
        if (updateDataSelected[data] == false) {
            setSelectedData({});
            setData();
            setDataSelected({ All: true, Overall: true });
        }
    };

    return (
        <View>
            <SectionList
                sections={data}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}
                        onPress={() => {
                            dataPush(item);
                        }}>
                        <View style={{  width: '90%', height: scale(35), margin: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Text
                                style={{
                                    color: 'black',
                                    fontSize: scale(20),
                                }}>
                                {item}
                            </Text>
                            {dataSelected[item] ? (
                                <Image
                                    source={require('../assets/images/checkmark.png')}
                                    style={{
                                        height: scale(18),
                                        width: scale(18),
                                    }}
                                />
                            ) : (
                                <Image
                                    source={require('../assets/images/blank-check-box.png')}
                                    style={{
                                        height: scale(18),
                                        width: scale(18),
                                    }}
                                />
                            )}

                        </View>
                    </TouchableOpacity>
                )}
                keyExtractor={(item, index) => index}
            />
        </View>
    );
}

export default listViewSingleSelect;
