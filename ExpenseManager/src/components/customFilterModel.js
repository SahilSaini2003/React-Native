import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useState } from 'react';

import ListViewSingleSelect from '../components/listViewSingleSelect.js'

function customFilterModel({ timeData, typeData, setCustomFilterModelVisible, selectedTime, setSelectedTime, selectedTimeValue, setSelectedTimeValue, selectedType, selectedTypeValue, setSelectedTypeValue, setSelectedType }) {

    return (
        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
            <View style={styles.modelCustomFilterView}>
                <View style={{ height: '100%', borderWidth: 1, position: 'absolute' }}></View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={styles.filterHeader}>Time</Text>
                    <Text style={styles.filterHeader}>Type</Text>
                </View>
                <View style={{ width: '100%', borderWidth: 1, marginTop: 10 }}></View>
                <View style={{ justifyContent: 'space-between', width: '100%', flexDirection: 'row' }}>
                    <View style={{ width: '50%', alignItems: 'center' }}>
                        <ListViewSingleSelect data={timeData} setData={setSelectedTime} selectedData={selectedTimeValue} setSelectedData={setSelectedTimeValue} />
                    </View>
                    <View style={{ width: '50%', alignItems: 'center' }}>
                        <ListViewSingleSelect data={typeData} setData={setSelectedType} selectedData={selectedTypeValue} setSelectedData={setSelectedTypeValue} />
                    </View>
                </View>
                <View style={{ position: 'absolute', width: '100%', height: '100%', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                    <TouchableOpacity  onPress={() => { console.log(selectedTime,selectedType); setCustomFilterModelVisible(false); }}>
                        <Image source={require('../assets/images/tick.png')} style={{ width: 70, height: 70, margin: 30, borderRadius: 50 }} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    modelCustomFilterView: {
        height: '55%',
        backgroundColor: '#F7D560',
        width: '100%',
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        borderWidth: 2,
        alignItems: 'center'
    },
    filterHeader: {
        fontSize: 30,
        color: 'black',
        marginHorizontal: '18%',
        marginTop: 10,
        fontWeight: 'bold'
    }
})

export default customFilterModel;