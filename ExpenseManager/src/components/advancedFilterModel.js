import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { useState } from 'react';

import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';

import DropDown from './dropDown.js';

function advancedFilterModel({
    timeLine,
    year,
    month,
    date,
    count,
    setAdvancedFilterModelVisible,
}) {
    let type = ['Both', 'CREDIT', 'DEBIT'];

    const [countIsClicked, setCountIsClicked] = useState(false);
    const [countData, setCountData] = useState('Select Count');
    let countHeight = countIsClicked ? count.length * 30 + 50 : 40;

    const [timeLineIsClicked, setTimeLineIsClicked] = useState(false);
    const [timeLineData, setTimeLineData] = useState('Select TimeLine');
    let timeLineHeight = timeLineIsClicked ? timeLine[0].length * 30 + 50 : 40;

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

    function handelFilterDropdown(data) {
        console.log('calledd',data);
        if (data == count) {
            setTimeLineIsClicked(false);
            setType1LineIsClicked(false);
            setType2LineIsClicked(false);
            setYear1LineIsClicked(false);
            setYear2LineIsClicked(false);
            setMonth1LineIsClicked(false);
            setMonth2LineIsClicked(false);
            setDate1LineIsClicked(false);
            setDate2LineIsClicked(false);
        }
        else if (data == timeLine[0] || data == timeLine[1]) {
            setCountIsClicked(false);
            setType1LineIsClicked(false);
            setType2LineIsClicked(false);
            setYear1LineIsClicked(false);
            setYear2LineIsClicked(false);
            setMonth1LineIsClicked(false);
            setMonth2LineIsClicked(false);
            setDate1LineIsClicked(false);
            setDate2LineIsClicked(false);
        }
        else if (data == type) {
            setCountIsClicked(false);
            setTimeLineIsClicked(false);
            // setType2LineIsClicked(false);
            setYear1LineIsClicked(false);
            setYear2LineIsClicked(false);
            setMonth1LineIsClicked(false);
            setMonth2LineIsClicked(false);
            setDate1LineIsClicked(false);
            setDate2LineIsClicked(false);
        }
        // else if (id == 4) {
        //     setCountIsClicked(false);
        //     setTimeLineIsClicked(false);
        //     setType1LineIsClicked(false);
        //     setYear1LineIsClicked(false);
        //     setYear2LineIsClicked(false);
        //     setMonth1LineIsClicked(false);
        //     setMonth2LineIsClicked(false);
        //     setDate1LineIsClicked(false);
        //     setDate2LineIsClicked(false);
        // }
        else if (data == year) {
            setCountIsClicked(false);
            setTimeLineIsClicked(false);
            setType1LineIsClicked(false);
            setType2LineIsClicked(false);
            // setYear2LineIsClicked(false);
            setMonth1LineIsClicked(false);
            setMonth2LineIsClicked(false);
            setDate1LineIsClicked(false);
            setDate2LineIsClicked(false);
        }
        // else if (id == 6) {
        //     setCountIsClicked(false);
        //     setTimeLineIsClicked(false);
        //     setType1LineIsClicked(false);
        //     setType2LineIsClicked(false);
        //     setYear1LineIsClicked(false);
        //     setMonth1LineIsClicked(false);
        //     setMonth2LineIsClicked(false);
        //     setDate1LineIsClicked(false);
        //     setDate2LineIsClicked(false);
        // }
        else if (data == month) {
            setCountIsClicked(false);
            setTimeLineIsClicked(false);
            setType1LineIsClicked(false);
            setType2LineIsClicked(false);
            setYear1LineIsClicked(false);
            setYear2LineIsClicked(false);
            // setMonth2LineIsClicked(false);
            setDate1LineIsClicked(false);
            setDate2LineIsClicked(false);
        }
        // else if (id == 8) {
        //     setCountIsClicked(false);
        //     setTimeLineIsClicked(false);
        //     setType1LineIsClicked(false);
        //     setType2LineIsClicked(false);
        //     setYear1LineIsClicked(false);
        //     setYear2LineIsClicked(false);
        //     setMonth1LineIsClicked(false);
        //     setDate1LineIsClicked(false);
        //     setDate2LineIsClicked(false);
        // }
        else if (data == data) {
            setCountIsClicked(false);
            setTimeLineIsClicked(false);
            setType1LineIsClicked(false);
            setType2LineIsClicked(false);
            setYear1LineIsClicked(false);
            setYear2LineIsClicked(false);
            setMonth1LineIsClicked(false);
            setMonth2LineIsClicked(false);
            // setDate2LineIsClicked(false);
        }
        // else if (id == 10) {
        //     setCountIsClicked(false);
        //     setTimeLineIsClicked(false);
        //     setType1LineIsClicked(false);
        //     setType2LineIsClicked(false);
        //     setYear1LineIsClicked(false);
        //     setYear2LineIsClicked(false);
        //     setMonth1LineIsClicked(false);
        //     setMonth2LineIsClicked(false);
        //     setDate1LineIsClicked(false);
        // }
    }

    ContentDecider = () => {
        if (countData == 'Single(One)') {
            return (
                <>
                    {/* Type DropDown */}
                    {countData != 'Select Count' && timeLineData != 'Select TimeLine' &&
                        <View
                            style={[
                                styles.dropDownContainer,
                                { justifyContent: 'center', flexDirection: 'row' },
                            ]}>
                            <View
                                style={type1LineIsClicked == false ? [
                                    styles.dropDownBox,
                                    {
                                        height: type1LineHeight,
                                        marginHorizontal: 10
                                    },
                                ] : [
                                    styles.dropDownBox,
                                    {
                                        height: type1LineHeight,
                                        marginHorizontal: 10,
                                        position: 'relative',
                                        zIndex: 1,
                                    },
                                ]}>
                                <DropDown
                                    data={type}
                                    state={type1LineIsClicked}
                                    setState={setType1LineIsClicked}
                                    textData={type1LineData}
                                    setTextData={setType1LineData}
                                    handelFilterDropdown={handelFilterDropdown.bind(3)}
                                />
                            </View>
                        </View>
                    }
                    {/* Year DropDown */}
                    {type1LineData != 'Select Type' &&
                        <View
                            style={[
                                styles.dropDownContainer,
                                { justifyContent: 'center', flexDirection: 'row' },
                            ]}>
                            <View
                                style={year1LineIsClicked == false ? [
                                    styles.dropDownBox,
                                    {
                                        height: year1LineHeight,
                                        marginHorizontal: 10
                                    },
                                ] : [
                                    styles.dropDownBox,
                                    {
                                        height: year1LineHeight,
                                        marginHorizontal: 10,
                                        position: 'relative',
                                        zIndex: 1,
                                    },
                                ]}>
                                <DropDown
                                    data={year}
                                    state={year1LineIsClicked}
                                    setState={setYear1LineIsClicked}
                                    textData={year1LineData}
                                    setTextData={setYear1LineData}
                                    handelFilterDropdown={handelFilterDropdown.bind(5)}
                                />
                            </View>
                        </View>
                    }
                    {/* Month DropDown */}
                    {year1LineData != 'Select Year' &&
                        <View
                            style={[
                                styles.dropDownContainer,
                                { justifyContent: 'center', flexDirection: 'row' },
                            ]}>
                            <View
                                style={month1LineIsClicked == false ? [
                                    styles.dropDownBox,
                                    {
                                        height: month1LineHeight,
                                        maxHeight: 150,
                                        marginHorizontal: 10,
                                        overflow: 'hidden'
                                    },
                                ] : [
                                    styles.dropDownBox,
                                    {
                                        height: month1LineHeight,
                                        maxHeight: 150,
                                        marginHorizontal: 10,
                                        overflow: 'hidden',
                                        position: 'relative',
                                        zIndex: 1,
                                    },
                                ]}>
                                <DropDown
                                    data={month}
                                    state={month1LineIsClicked}
                                    setState={setMonth1LineIsClicked}
                                    textData={month1LineData}
                                    setTextData={setMonth1LineData}
                                    handelFilterDropdown={handelFilterDropdown.bind(7)}
                                />
                            </View>
                        </View>
                    }
                    {/* Date DropDown */}
                    {month1LineData != 'Select Month' &&
                        <View
                            style={[
                                styles.dropDownContainer,
                                { justifyContent: 'center', flexDirection: 'row' },
                            ]}>
                            <View
                                style={date1LineIsClicked == false ? [
                                    styles.dropDownBox,
                                    {
                                        height: date1LineHeight,
                                        maxHeight: 150,
                                        marginHorizontal: 10,
                                        overflow: 'hidden'
                                    },
                                ] : [
                                    styles.dropDownBox,
                                    {
                                        height: date1LineHeight,
                                        maxHeight: 150,
                                        marginHorizontal: 10,
                                        overflow: 'hidden',
                                        position: 'relative',
                                        zIndex: 1,
                                    },
                                ]}>
                                <DropDown
                                    data={date}
                                    state={date1LineIsClicked}
                                    setState={setDate1LineIsClicked}
                                    textData={date1LineData}
                                    setTextData={setDate1LineData}
                                    handelFilterDropdown={handelFilterDropdown.bind(9)}
                                />
                            </View>
                        </View>
                    }
                </>
            );
        } else if (countData == 'Range(From)') {
            return (
                <>
                    {/* Type DropDown */}
                    {countData != 'Select Count' && timeLineData != 'Select TimeLine' &&
                        (<View
                            style={[
                                styles.dropDownContainer,
                                { justifyContent: 'space-between', flexDirection: 'row' },
                            ]}>
                            <View
                                style={
                                    type1LineIsClicked == false
                                        ? [
                                            styles.dropDownBox,
                                            {
                                                height: type1LineHeight,
                                                width: '40%',
                                                marginHorizontal: 10,
                                            },
                                        ]
                                        : [
                                            styles.dropDownBox,
                                            {
                                                height: type1LineHeight,
                                                width: '40%',
                                                marginHorizontal: 10,
                                                position: 'relative',
                                                zIndex: 1,
                                            },
                                        ]
                                }>
                                <DropDown
                                    data={type}
                                    state={type1LineIsClicked}
                                    setState={setType1LineIsClicked}
                                    textData={type1LineData}
                                    setTextData={setType1LineData}
                                    handelFilterDropdown={handelFilterDropdown.bind(3)}
                                />
                            </View>
                            <Ionicons name="arrow-forward-sharp" size={30} color={'black'} />
                            <View
                                style={
                                    type2LineIsClicked == false
                                        ? [
                                            styles.dropDownBox,
                                            {
                                                height: type2LineHeight,
                                                width: '40%',
                                                marginHorizontal: 10,
                                            },
                                        ]
                                        : [
                                            styles.dropDownBox,
                                            {
                                                height: type2LineHeight,
                                                width: '40%',
                                                marginHorizontal: 10,
                                                position: 'relative',
                                                zIndex: 1,
                                            },
                                        ]
                                }>
                                <DropDown
                                    data={type}
                                    state={type2LineIsClicked}
                                    setState={setType2LineIsClicked}
                                    textData={type2LineData}
                                    setTextData={setType2LineData}
                                    handelFilterDropdown={handelFilterDropdown.bind(4)}
                                />
                            </View>
                        </View>)
                    }
                    {/* Year DropDown */}
                    {type1LineData != 'Select Type' && type2LineData != 'Select Type' &&
                        <View
                            style={[
                                styles.dropDownContainer,
                                { justifyContent: 'space-between', flexDirection: 'row' },
                            ]}>
                            <View
                                style={
                                    year1LineIsClicked == false
                                        ? [
                                            styles.dropDownBox,
                                            {
                                                height: year1LineHeight,
                                                width: '40%',
                                                marginHorizontal: 10,
                                            },
                                        ]
                                        : [
                                            styles.dropDownBox,
                                            {
                                                height: year1LineHeight,
                                                width: '40%',
                                                marginHorizontal: 10,
                                                position: 'relative',
                                                zIndex: 1,
                                            },
                                        ]
                                }>
                                <DropDown
                                    data={year}
                                    state={year1LineIsClicked}
                                    setState={setYear1LineIsClicked}
                                    textData={year1LineData}
                                    setTextData={setYear1LineData}
                                    handelFilterDropdown={handelFilterDropdown.bind(5)}
                                />
                            </View>
                            <Ionicons name="arrow-forward-sharp" size={30} color={'black'} />
                            <View
                                style={
                                    year2LineIsClicked == false
                                        ? [
                                            styles.dropDownBox,
                                            {
                                                height: year2LineHeight,
                                                width: '40%',
                                                marginHorizontal: 10,
                                            },
                                        ]
                                        : [
                                            styles.dropDownBox,
                                            {
                                                height: year2LineHeight,
                                                width: '40%',
                                                marginHorizontal: 10,
                                                position: 'relative',
                                                zIndex: 1,
                                            },
                                        ]
                                }>
                                <DropDown
                                    data={year}
                                    state={year2LineIsClicked}
                                    setState={setYear2LineIsClicked}
                                    textData={year2LineData}
                                    setTextData={setYear2LineData}
                                    handelFilterDropdown={handelFilterDropdown.bind(6)}
                                />
                            </View>
                        </View>
                    }
                    {/* Month DropDown */}
                    {year1LineData != 'Select Year' && year2LineData != 'Select Year' &&
                        <View
                            style={[
                                styles.dropDownContainer,
                                { justifyContent: 'space-between', flexDirection: 'row' },
                            ]}>
                            <View
                                style={
                                    month1LineIsClicked == false
                                        ? [
                                            styles.dropDownBox,
                                            {
                                                height: month1LineHeight,
                                                maxHeight: 150,
                                                width: '40%',
                                                marginHorizontal: 10,
                                                overflow: 'hidden',
                                            },
                                        ]
                                        : [
                                            styles.dropDownBox,
                                            {
                                                height: month1LineHeight,
                                                maxHeight: 150,
                                                width: '40%',
                                                marginHorizontal: 10,
                                                overflow: 'hidden',
                                                position: 'relative',
                                                zIndex: 1,
                                            },
                                        ]
                                }>
                                <DropDown
                                    data={month}
                                    state={month1LineIsClicked}
                                    setState={setMonth1LineIsClicked}
                                    textData={month1LineData}
                                    setTextData={setMonth1LineData}
                                    handelFilterDropdown={handelFilterDropdown.bind(7)}
                                />
                            </View>
                            <Ionicons name="arrow-forward-sharp" size={30} color={'black'} />
                            <View
                                style={
                                    month2LineIsClicked == false
                                        ? [
                                            styles.dropDownBox,
                                            {
                                                height: month2LineHeight,
                                                maxHeight: 150,
                                                width: '40%',
                                                marginHorizontal: 10,
                                            },
                                        ]
                                        : [
                                            styles.dropDownBox,
                                            {
                                                height: month2LineHeight,
                                                maxHeight: 150,
                                                width: '40%',
                                                marginHorizontal: 10,
                                                position: 'relative',
                                                zIndex: 1,
                                            },
                                        ]
                                }>
                                <DropDown
                                    data={month}
                                    state={month2LineIsClicked}
                                    setState={setMonth2LineIsClicked}
                                    textData={month2LineData}
                                    setTextData={setMonth2LineData}
                                    handelFilterDropdown={handelFilterDropdown.bind(8)}
                                />
                            </View>
                        </View>
                    }
                    {/* Date DropDown */}
                    {month1LineData != 'Select Month' && month2LineData != 'Select Month' &&
                        <View
                            style={[
                                styles.dropDownContainer,
                                { justifyContent: 'space-between', flexDirection: 'row' },
                            ]}>
                            <View
                                style={
                                    date1LineIsClicked == false
                                        ? [
                                            styles.dropDownBox,
                                            {
                                                height: date1LineHeight,
                                                maxHeight: 150,
                                                width: '40%',
                                                marginHorizontal: 10,
                                                overflow: 'hidden',
                                            },
                                        ]
                                        : [
                                            styles.dropDownBox,
                                            {
                                                height: date1LineHeight,
                                                maxHeight: 150,
                                                width: '40%',
                                                marginHorizontal: 10,
                                                overflow: 'hidden',
                                                position: 'relative',
                                                zIndex: 1,
                                            },
                                        ]
                                }>
                                <DropDown
                                    data={date}
                                    state={date1LineIsClicked}
                                    setState={setDate1LineIsClicked}
                                    textData={date1LineData}
                                    setTextData={setDate1LineData}
                                    handelFilterDropdown={handelFilterDropdown.bind(9)}
                                />
                            </View>
                            <Ionicons name="arrow-forward-sharp" size={30} color={'black'} />
                            <View
                                style={
                                    date2LineIsClicked == false
                                        ? [
                                            styles.dropDownBox,
                                            {
                                                height: date2LineHeight,
                                                maxHeight: 150,
                                                width: '40%',
                                                marginHorizontal: 10,
                                            },
                                        ]
                                        : [
                                            styles.dropDownBox,
                                            {
                                                height: date2LineHeight,
                                                maxHeight: 150,
                                                width: '40%',
                                                marginHorizontal: 10,
                                                position: 'relative',
                                                zIndex: 1,
                                            },
                                        ]
                                }>
                                <DropDown
                                    data={date}
                                    state={date2LineIsClicked}
                                    setState={setDate2LineIsClicked}
                                    textData={date2LineData}
                                    setTextData={setDate2LineData}
                                    handelFilterDropdown={handelFilterDropdown.bind(10)}
                                />
                            </View>
                        </View>
                    }
                </>
            );
        } else {
            null;
        }
    };

    return (
        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
            <View style={styles.modelCustomFilterView}>
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                    <Text style={{ fontSize: 30, color: 'black', marginVertical: 10 }}>
                        Advanced Filters
                    </Text>
                    <TouchableOpacity
                        style={{ left: 40 }}
                        onPress={() => {
                            setAdvancedFilterModelVisible(false);
                        }}>
                        <Entypo name="cross" size={40} color={'black'} style={{}} />
                    </TouchableOpacity>
                </View>
                <View style={{ width: '100%', borderWidth: 1, marginBottom: 10 }}></View>
                {/* Count DropDown */}
                <View
                    style={[
                        styles.dropDownContainer,
                        { justifyContent: 'center', flexDirection: 'row' },
                    ]}>
                    <View
                        style={
                            countIsClicked == false
                                ? [
                                    styles.dropDownBox,
                                    {
                                        height: countHeight,
                                        maxHeight: 150,
                                        marginHorizontal: 10,
                                        overflow: 'hidden',
                                    },
                                ]
                                : [
                                    styles.dropDownBox,
                                    {
                                        height: countHeight,
                                        maxHeight: 150,
                                        marginHorizontal: 10,
                                        overflow: 'hidden',
                                        position: 'relative',
                                        zIndex: 1,
                                    },
                                ]
                        }>
                        <DropDown
                            data={count}
                            state={countIsClicked}
                            setState={setCountIsClicked}
                            textData={countData}
                            setTextData={setCountData}
                            handelFilterDropdown={handelFilterDropdown.bind(1)}
                        />
                    </View>
                </View>
                {/* TimeLine DropDown  */}
                {countData != 'Select Count' && <View style={[styles.dropDownContainer, { alignItems: 'center' }]}>
                    <View
                        style={
                            timeLineIsClicked == false
                                ? [styles.dropDownBox, { height: timeLineHeight, overflow: 'hidden' }]
                                : [
                                    styles.dropDownBox,
                                    { height: timeLineHeight, overflow:'scroll', position: 'relative', zIndex: 1 },
                                ]
                        }>
                        <DropDown
                            data={countData == 'Single(One)' ? timeLine[1] : timeLine[0]}
                            state={timeLineIsClicked}
                            setState={setTimeLineIsClicked}
                            textData={timeLineData}
                            setTextData={setTimeLineData}
                            handelFilterDropdown={handelFilterDropdown.bind(2)}
                        />
                    </View>
                </View>}
                {ContentDecider()}
                <TouchableOpacity
                disabled={ countData != 'Select Count' ? (countData == 'Single(One)' ? (timeLineData != 'Select TimeLine' && year1LineData != 'Select Year' && type1LineData != 'Select Type' && month1LineData != 'Select Month' && date1LineData != 'Select Date') ? false : true : (timeLineData != 'Select TimeLine' && year1LineData != 'Select Year' && year2LineData != 'Select Year' && type1LineData != 'Select Type' && type2LineData != 'Select Type' && month1LineData != 'Select Month' && month2LineData != 'Select Month' && date1LineData != 'Select Date' && date2LineData != 'Select Date') ? false : true) : true }
                    style={{
                        backgroundColor: '#00BF00',
                        width: '70%',
                        height: 60,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 50,
                        borderWidth: 2,
                        borderColor: 'white',
                    }}>
                    <Text style={{ fontSize: 40, color: 'white', fontWeight: 'bold' }}>
                        A P P L Y
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    modelCustomFilterView: {
        height: '75%',
        backgroundColor: '#F7D560',
        width: '100%',
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        borderWidth: 2,
        alignItems: 'center',
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
    },
});

export default advancedFilterModel;
