import {
    Text,
    View,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Image,
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
    /**
     * Need to add a logic which will set other state false and will set relative and zIndex 1 for selected dropdown box // done
     */

    let type = ['Both', 'CREDIT', 'DEBIT'];

    const [countIsClicked, setCountIsClicked] = useState(false);
    const [countData, setCountData] = useState('Select Count');
    let countHeight = countIsClicked ? count.length * 30 + 50 : 40;

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

    const [dropDownStyleOpener, setDropDownStyleOpener] = useState(true);

    ContentDecider = () => {
        if (countData == 'Single(One)') {
            return (
                <>
                    {/* Type DropDown */}
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
                            />
                        </View>
                    </View>
                    {/* Year DropDown */}
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
                            />
                        </View>
                    </View>
                    {/* Month DropDown */}
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
                            />
                        </View>
                    </View>
                    {/* Date DropDown */}
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
                            />
                        </View>
                    </View>
                </>
            );
        } else if (countData == 'Range(From)') {
            return (
                <>
                    {/* Type DropDown */}
                    <View
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
                            />
                        </View>
                    </View>
                    {/* Year DropDown */}
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
                            />
                        </View>
                    </View>
                    {/* Month DropDown */}
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
                            />
                        </View>
                    </View>
                    {/* Date DropDown */}
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
                            />
                        </View>
                    </View>
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
                        />
                    </View>
                </View>
                {/* TimeLine DropDown  */}
                <View style={[styles.dropDownContainer, { alignItems: 'center' }]}>
                    <View
                        style={
                            timeLineIsClicked == false
                                ? [styles.dropDownBox, { height: timeLineHeight }]
                                : [
                                    styles.dropDownBox,
                                    { height: timeLineHeight, position: 'relative', zIndex: 1 },
                                ]
                        }>
                        <DropDown
                            data={timeLine}
                            state={timeLineIsClicked}
                            setState={setTimeLineIsClicked}
                            textData={timeLineData}
                            setTextData={setTimeLineData}
                        />
                    </View>
                </View>
                {ContentDecider()}
                <TouchableOpacity
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
