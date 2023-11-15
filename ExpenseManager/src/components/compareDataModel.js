import { Text, View, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { useState } from 'react';

function compareDataModel({ timeLine }) {

    const [timeLineIsClicked, setTimeLineIsClicked] = useState(false);
    const [timeLineData, setTimeLineData] = useState('Select TimeLine');
    let timeLineHeight = timeLineIsClicked ? timeLine.length * 30 + 50 : 40;

    let type = ['Both','Credit', 'Debit']

    return (
        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
            <View style={styles.modelCustomFilterView}>
                <Text style={{ fontSize: 30, color: 'black', marginVertical: 10 }}>Compare Data</Text>
                <View style={{ width: '100%', borderWidth: 1, marginBottom: 10 }}></View>
                <View style={styles.dropDownContainer}>
                    <View style={[styles.dropDownBox, { height: timeLineHeight, position: 'relative', zIndex: 1 }]}>
                        <TouchableOpacity style={{ height: 40, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }} onPress={() => { setTimeLineIsClicked(!timeLineIsClicked) }}>
                            <Text style={{ color: '#676767', fontSize: 20, marginLeft: 10 }}>{timeLineData}</Text>
                            {timeLineIsClicked ? (<Image source={require('../assets/images/down-arrow.png')} style={{ width: 20, height: 20, marginLeft: 20, marginTop: 6 }} />) : (<Image source={require('../assets/images/up-arrow.png')} style={{ width: 20, height: 20, marginLeft: 20, marginTop: 6 }} />)}
                        </TouchableOpacity>
                        {timeLineIsClicked ?
                            (<View style={{ width: '100%', borderTopWidth: 1 }}>
                                <FlatList
                                    data={timeLine}
                                    renderItem={({ item }) =>
                                        <TouchableOpacity style={{ width: '100%', alignItems: 'center' }} onPress={() => { setTimeLineData(item); setTimeLineIsClicked(!timeLineIsClicked); }}>
                                            <Text style={{ fontSize: 16, color: 'black', marginVertical: 5 }}>{item}</Text>
                                        </TouchableOpacity>
                                    }
                                    keyExtractor={(item, index) => index}
                                />
                            </View>) : null}
                    </View>
                </View>
                <View style={[styles.dropDownContainer,{ justifyContent:'space-between', flexDirection: 'row'}]}>
                    <View style={[styles.dropDownBox, { height: 40, width:'40%', marginHorizontal: 10}]}></View>
                    <View style={[styles.dropDownBox, { height: 40, width:'40%', marginHorizontal: 10}]}></View>
                </View>
                
                {/* <View style={{flex: 1, backgroundColor: 'blue', width:100, height:'100%'}}></View> */}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    modelCustomFilterView: {
        height: '70%',
        backgroundColor: '#F7D560',
        width: '100%',
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        borderWidth: 2,
        alignItems: 'center'
    },
    dropDownBox: {
        width: '60%',
        // height: 140,
        backgroundColor: '#FFFFFF',
        // position: 'relative',
        alignItems: 'center',
        borderRadius: 5,
        // zIndex: 1
    }, 
    dropDownContainer:{ 
        width: '100%', 
        height: 60, 
        alignItems: 'center', 
        // backgroundColor:'black', 
        // justifyContent:'center',
        marginBottom: 10,
    }
})

export default compareDataModel;