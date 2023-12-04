import { Text, View, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { useState } from 'react';

import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';

import DropDown from './dropDown.js'

function compareDataModel({ timeLine, year, month, date, setCompareDataModelVisible }) {

    /**
     * Need to add a logic which will set other state false and will set relative and zIndex 1 for selected dropdown box
     */

    let type = ['Both', 'CREDIT', 'DEBIT'];

    const [timeLineIsClicked, setTimeLineIsClicked] = useState(false);
    const [timeLineData, setTimeLineData] = useState('Select TimeLine');
    let timeLineHeight = timeLineIsClicked ? timeLine.length * 30 + 50 : 40;

    const [type1LineIsClicked, setType1LineIsClicked] = useState(false);
    const [type1LineData, setType1LineData] = useState('Select Type');
    let type1LineHeight = type1LineIsClicked ? type.length * 30 + 50 : 40;

    const [type2LineIsClicked, setType2LineIsClicked] = useState(false);
    const [type2LineData, setType2LineData] = useState('Select Type');
    let type2LineHeight = type2LineIsClicked ? type.length * 30 + 50 : 40;

    const [year1LineIsClicked, setYear1LineIsClicked] = useState(false);
    const [year1LineData, setYear1LineData] = useState('Select Year');
    let year1LineHeight = year1LineIsClicked ? year.length * 30 + 50 : 40;

    const [year2LineIsClicked, setYear2LineIsClicked] = useState(false);
    const [year2LineData, setYear2LineData] = useState('Select Year');
    let year2LineHeight = year2LineIsClicked ? year.length * 30 + 50 : 40;

    const [month1LineIsClicked, setMonth1LineIsClicked] = useState(false);
    const [month1LineData, setMonth1LineData] = useState('Select Month');
    let month1LineHeight = month1LineIsClicked ? month.length * 30 + 50 : 40;

    const [month2LineIsClicked, setMonth2LineIsClicked] = useState(false);
    const [month2LineData, setMonth2LineData] = useState('Select Month');
    let month2LineHeight = month2LineIsClicked ? month.length * 30 + 50 : 40;

    const [date1LineIsClicked, setDate1LineIsClicked] = useState(false);
    const [date1LineData, setDate1LineData] = useState('Select Date');
    let date1LineHeight = date1LineIsClicked ? date.length * 30 + 50 : 40;

    const [date2LineIsClicked, setDate2LineIsClicked] = useState(false);
    const [date2LineData, setDate2LineData] = useState('Select Date');
    let date2LineHeight = date2LineIsClicked ? date.length * 30 + 50 : 40;


    return (
        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
            <View style={styles.modelCustomFilterView}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ fontSize: 30, color: 'black', marginVertical: 10 }}>Compare Data</Text>
                    <TouchableOpacity style={{ left: 40 }} onPress={() => { setCompareDataModelVisible(false) }} >
                        <Entypo name='cross' size={40} color={'black'} />
                    </TouchableOpacity>
                </View>
                <View style={{ width: '100%', borderWidth: 1, marginBottom: 10 }}></View>
                {/* TimeLine DropDown  */}
                <View style={[styles.dropDownContainer, { alignItems: 'center' }]}>
                    <View style={[styles.dropDownBox, { height: timeLineHeight }]}>
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
                {/* Type DropDown */}
                <View style={[styles.dropDownContainer, { justifyContent: 'space-between', flexDirection: 'row' }]}>
                    <View style={[styles.dropDownBox, { height: type1LineHeight, width: '40%', marginHorizontal: 10, position: 'relative', zIndex: 1 }]}>
                        <DropDown data={type} state={type1LineIsClicked} setState={setType1LineIsClicked} textData={type1LineData} setTextData={setType1LineData} />
                    </View>
                    <Ionicons name='git-compare' size={30} color={'black'} />
                    <View style={[styles.dropDownBox, { height: type2LineHeight, width: '40%', marginHorizontal: 10 }]}>
                        <DropDown data={type} state={type2LineIsClicked} setState={setType2LineIsClicked} textData={type2LineData} setTextData={setType2LineData} />
                    </View>
                </View>
                {/* Year DropDown */}
                <View style={[styles.dropDownContainer, { justifyContent: 'space-between', flexDirection: 'row' }]}>
                    <View style={[styles.dropDownBox, { height: year1LineHeight, width: '40%', marginHorizontal: 10 }]}>
                        <DropDown data={year} state={year1LineIsClicked} setState={setYear1LineIsClicked} textData={year1LineData} setTextData={setYear1LineData} />
                    </View>
                    <Ionicons name='git-compare' size={30} color={'black'} />
                    <View style={[styles.dropDownBox, { height: year2LineHeight, width: '40%', marginHorizontal: 10 }]}>
                        <DropDown data={year} state={year2LineIsClicked} setState={setYear2LineIsClicked} textData={year2LineData} setTextData={setYear2LineData} />
                    </View>
                </View>
                {/* Month DropDown */}
                <View style={[styles.dropDownContainer, { justifyContent: 'space-between', flexDirection: 'row' }]}>
                    <View style={[styles.dropDownBox, { height: month1LineHeight, maxHeight: 150, width: '40%', marginHorizontal: 10, overflow: 'hidden' }]}>
                        <DropDown data={month} state={month1LineIsClicked} setState={setMonth1LineIsClicked} textData={month1LineData} setTextData={setMonth1LineData} />
                    </View>
                    <Ionicons name='git-compare' size={30} color={'black'} />
                    <View style={[styles.dropDownBox, { height: month2LineHeight, maxHeight: 150, width: '40%', marginHorizontal: 10 }]}>
                        <DropDown data={month} state={month2LineIsClicked} setState={setMonth2LineIsClicked} textData={month2LineData} setTextData={setMonth2LineData} />
                    </View>
                </View>
                {/* Date DropDown */}
                <View style={[styles.dropDownContainer, { justifyContent: 'space-between', flexDirection: 'row' }]}>
                    <View style={[styles.dropDownBox, { height: date1LineHeight, maxHeight: 150, width: '40%', marginHorizontal: 10, overflow: 'hidden' }]}>
                        <DropDown data={date} state={date1LineIsClicked} setState={setDate1LineIsClicked} textData={date1LineData} setTextData={setDate1LineData} />
                    </View>
                    <Ionicons name='git-compare' size={30} color={'black'} />
                    <View style={[styles.dropDownBox, { height: date2LineHeight, maxHeight: 150, width: '40%', marginHorizontal: 10 }]}>
                        <DropDown data={date} state={date2LineIsClicked} setState={setDate2LineIsClicked} textData={date2LineData} setTextData={setDate2LineData} />
                    </View>
                </View>

                <TouchableOpacity style={{ backgroundColor: '#00BF00', width: '70%', height: 60, alignItems: 'center', justifyContent: 'center', borderRadius: 50, borderWidth: 2, borderColor: 'white' }}>
                    <Text style={{ fontSize: 40, color: 'white', fontWeight: 'bold' }}>A P P L Y</Text>
                </TouchableOpacity>
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
    dropDownContainer: {
        width: '100%',
        height: 60,
        // alignItems: 'center', 
        // backgroundColor:'black', 
        // justifyContent:'center',
        marginBottom: 10,
    }
})

export default compareDataModel;