import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { scale } from 'react-native-size-matters';
import { ScrollView } from 'react-native-virtualized-view';

import ListViewSingleSelect from '../components/listViewSingleSelect.js'

function customFilterModel({ timeData, typeData, setCustomFilterModelVisible, selectedTime, setSelectedTime, selectedTimeValue, setSelectedTimeValue, selectedType, selectedTypeValue, setSelectedTypeValue, setSelectedType, updateGraphData }) {

    return (
        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
            <View style={styles.modelCustomFilterView}>
                <View style={{ height: '100%', borderWidth: 1, position: 'absolute' }}></View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={styles.filterHeader}>Time</Text>
                    <Text style={styles.filterHeader}>Type</Text>
                </View>
                <View style={{ width: '100%', borderWidth: 1, marginTop: scale(8) }}></View>
                <View style={{ justifyContent: 'space-between', width: '100%', flexDirection: 'row' }}>
                    <View style={{ width: '50%', alignItems: 'center' }}>
                        <ScrollView style={{width: '100%'}}>
                            <ListViewSingleSelect data={timeData} setData={setSelectedTime} selectedData={selectedTimeValue} setSelectedData={setSelectedTimeValue} />
                            <View style={{width: '100%', height: 70}}/>
                        </ScrollView>
                    </View>
                    <View style={{ width: '50%', alignItems: 'center' }}>
                        <ScrollView style={{width: '100%'}}>
                            <ListViewSingleSelect data={typeData} setData={setSelectedType} selectedData={selectedTypeValue} setSelectedData={setSelectedTypeValue} />
                            <View style={{width: '100%', height: 70}}/>
                        </ScrollView>
                    </View>
                </View>
                <View style={{ position: 'absolute', width: '100%', height: '100%', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                    <TouchableOpacity onPress={() => { updateGraphData(); setCustomFilterModelVisible(false); }}>
                        <Image source={require('../assets/images/tick.png')} style={{ width: scale(70), height: scale(70), margin: scale(30), borderRadius: 50 }} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    modelCustomFilterView: {
        height: '60%',
        backgroundColor: '#F7D560',
        width: '100%',
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        borderWidth: 2,
        alignItems: 'center'
    },
    filterHeader: {
        fontSize: scale(30),
        color: 'black',
        marginHorizontal: '18%',
        marginTop: scale(10),
        fontWeight: 'bold'
    }
})

export default customFilterModel;