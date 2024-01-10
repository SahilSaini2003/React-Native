import { Text, View, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useEffect, useState } from 'react';
import _ from 'underscore';
import moment from 'moment-timezone';

import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';

import DropDown from './dropDown.js';
import { useDataContext } from '../context/dataContext';

function advancedFilterModel({
    timeLine,
    setAdvancedFilterModelVisible,
    evaluateAdvancedFilterGraphData
}) {
    const count = ['Single(One)', 'Range(From)'];
    let type = ['BOTH', 'CREDIT', 'DEBIT'];
    let months = [1,2,3,4,5,6,7,8,9,10,11,12];
    let dates = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];

    let { manageAdvancedData } = useDataContext();

    const [year1Data, setYear1Data] = useState([]);
    const [month1Data, setMonth1Data] = useState([]);
    const [month2Data, setMonth2Data] = useState([]);
    const [day1Data, setDay1Data] = useState([]);
    const [day2Data, setDay2Data] = useState([]);
    const [type1Data, setType1Data] = useState([]);
    const [type2Data, setType2Data] = useState(['Both', 'CREDIT', 'DEBIT']);
    
    const [countIsClicked, setCountIsClicked] = useState(false);
    const [countData, setCountData] = useState('Select Count');
    let countHeight = countIsClicked ? count.length * 30 + 50 : 40;

    const [timeLineIsClicked, setTimeLineIsClicked] = useState(false);
    const [timeLineData, setTimeLineData] = useState('Select TimeLine');
    let timeLineHeight = timeLineIsClicked ? timeLine[0].length * 30 + 50 : 40;

    const [type1LineIsClicked, setType1LineIsClicked] = useState(false);
    const [type1LineData, setType1LineData] = useState('Select Type');
    let type1LineHeight = type1LineIsClicked ? type1Data.length * 30 + 50 : 40;

    const [type2LineIsClicked, setType2LineIsClicked] = useState(false);
    const [type2LineData, setType2LineData] = useState('Select Type');
    let type2LineHeight = type2LineIsClicked ? type.length * 30 + 50 : 40;

    const [year1LineIsClicked, setYear1LineIsClicked] = useState(false);
    const [year1LineData, setYear1LineData] = useState('Select Year');
    let year1LineHeight = year1LineIsClicked ? year1Data.length * 30 + 50 : 40;

    const [year2LineData, setYear2LineData] = useState('Select Year');

    const [month1LineIsClicked, setMonth1LineIsClicked] = useState(false);
    const [month1LineData, setMonth1LineData] = useState('Select Month');
    let month1LineHeight = month1LineIsClicked ? month1Data.length * 30 + 50 : 40;

    const [month2LineIsClicked, setMonth2LineIsClicked] = useState(false);
    const [month2LineData, setMonth2LineData] = useState('Select Month');
    let month2LineHeight = month2LineIsClicked ? month2Data.length * 30 + 50 : 40;

    const [day1LineIsClicked, setDay1LineIsClicked] = useState(false);
    const [day1LineData, setDay1LineData] = useState('Select Date');
    let day1LineHeight = day1LineIsClicked ? day1Data.length * 30 + 50 : 40;

    const [day2LineIsClicked, setDay2LineIsClicked] = useState(false);
    const [day2LineData, setDay2LineData] = useState('Select Date');
    let day2LineHeight = day2LineIsClicked ? day2Data.length * 30 + 50 : 40;

    const [year1Check, setYear1Check] = useState(false);
    const [year2Check, setYear2Check] = useState(false);

    function setApplyButtonActive() {
        if (countData == 'Select Count') {
            return true;
        } else {
            if (countData == 'Single(One)') {
                if (timeLineData == 'Year') {
                    if (
                        type1LineData != 'Select Type' &&
                        year1LineData != 'Select Year'
                    ) {
                        return false;
                    } else return true;
                } else if (timeLineData == 'Month') {
                    if (
                        type1LineData != 'Select Type' &&
                        year1LineData != 'Select Year' &&
                        month1LineData != 'Select Month'
                    ) {
                        return false;
                    } else return true;
                } else if (timeLineData == 'Day') {
                    if (
                        type1LineData != 'Select Type' &&
                        year1LineData != 'Select Year' &&
                        month1LineData != 'Select Month' &&
                        day1LineData != 'Select Date'
                    ) {
                        return false;
                    } else return true;
                } else return true;
            } else {
                if (timeLineData == 'Year By Year') {
                    if (
                        type2LineData != 'Select Type' &&
                        year1LineData != 'Select Year' &&
                        year2LineData != 'Select Year'
                    ) {
                        return false;
                    } else return true;
                } else if (timeLineData == 'Month By Month') {
                    if (
                        type2LineData != 'Select Type' &&
                        year1LineData != 'Select Year' &&
                        year2LineData != 'Select Year' &&
                        month1LineData != 'Select Month' &&
                        month2LineData != 'Select Month'
                    ) {
                        return false;
                    } else return true;
                } else if (timeLineData == 'Day By Day') {
                    if (
                        type2LineData != 'Select Type' &&
                        year1LineData != 'Select Year' &&
                        year2LineData != 'Select Year' &&
                        month1LineData != 'Select Month' &&
                        month2LineData != 'Select Month' &&
                        day1LineData != 'Select Date' &&
                        day2LineData != 'Select Date'
                    ) {
                        return false;
                    } else return true;
                } else return true;
            }
        }
    }

    let handelFilterDropdown = (data) => {
        console.log('handelFilterDropdown', data);
        if (data == count) {
            setTimeLineIsClicked(false);
            setType1LineIsClicked(false);
            setType2LineIsClicked(false);
            setYear1LineIsClicked(false);
            setMonth1LineIsClicked(false);
            setMonth2LineIsClicked(false);
            setDay1LineIsClicked(false);
            setDay2LineIsClicked(false);
        } else if (data == timeLine[0] || data == timeLine[1]) {
            setCountIsClicked(false);
            setType1LineIsClicked(false);
            setType2LineIsClicked(false);
            setYear1LineIsClicked(false);
            setMonth1LineIsClicked(false);
            setMonth2LineIsClicked(false);
            setDay1LineIsClicked(false);
            setDay2LineIsClicked(false);
        } else if (data == type1Data || data == type2Data) {
            setCountIsClicked(false);
            setTimeLineIsClicked(false);
            setYear1LineIsClicked(false);
            setMonth1LineIsClicked(false);
            setMonth2LineIsClicked(false);
            setDay1LineIsClicked(false);
            setDay2LineIsClicked(false);
        }
        else if (data == year1Data) {
            setCountIsClicked(false);
            setTimeLineIsClicked(false);
            setType1LineIsClicked(false);
            setType2LineIsClicked(false);
            setMonth1LineIsClicked(false);
            setMonth2LineIsClicked(false);
            setDay1LineIsClicked(false);
            setDay2LineIsClicked(false);
        }
        else if (data == month1Data || data == month2Data) {
            setCountIsClicked(false);
            setTimeLineIsClicked(false);
            setType1LineIsClicked(false);
            setType2LineIsClicked(false);
            setYear1LineIsClicked(false);
            setDay1LineIsClicked(false);
            setDay2LineIsClicked(false);
        }
        else if (data == day1Data || data == day2Data) {
            setCountIsClicked(false);
            setTimeLineIsClicked(false);
            setType1LineIsClicked(false);
            setType2LineIsClicked(false);
            setYear1LineIsClicked(false);
            setMonth1LineIsClicked(false);
            setMonth2LineIsClicked(false);
        }
    }

    let manageData = (data, id) => {
        console.log('manageData', data, id);
        if (timeLine[1].includes(data)) {
            let res = manageAdvancedData(data);
            setYear1Data(res.year);
            return 'success';
        }
        switch (id) {
            case 'Y1':
                {
                    console.log('Y1');
                    let res = manageAdvancedData('', data);
                    setMonth1Data(res.month);
                    setType1Data(res.type);
                    return 'success';
                }
            // case 'Y2':
            //     {
            //         console.log('Y2');
            //         let res = manageAdvancedData('', data);
            //         setMonth2Data(res.month);
            //         setType2Data(res.type);
            //         return 'success';
            //     }
            case 'M1':
                {
                    console.log('M1');
                    let res = manageAdvancedData('', year1LineData, data);
                    setDay1Data(res.day);
                    setType1Data(res.type);
                    return 'success';
                }
            // case 'M2':
            //     {
            //         console.log('M2');
            //         let res = manageAdvancedData('', year2LineData, data);
            //         setDay2Data(res.day);
            //         setType2Data(res.type);
            //         return 'success';
            //     }
            case 'D1':
                {
                    console.log('D1');
                    let res = manageAdvancedData('', year1LineData, month1LineData, data);
                    setType1Data(res.type);
                    return 'success';
                }

            default:
                break;
        }
        return 'success';
    }

    // CountDataChecks
    useEffect(() => {
        if (countData == 'Single(One)') {
            setTimeLineData('Select TimeLine');
            setType1LineData('Select Type');
            setYear1LineData('Select Year');
            setMonth1LineData('Select Month');
            setDay1LineData('Select Date');
        } else if (countData == 'Range(From)') {
            setTimeLineData('Select TimeLine');
            setType1LineData('Select Type');
            setType2LineData('Select Type');
            setYear1LineData('Select Year');
            setYear2LineData('Select Year');
            setMonth1LineData('Select Month');
            setMonth2LineData('Select Month');
            setDay1LineData('Select Date');
            setDay2LineData('Select Date');
        }
    }, [countData]);

    //TimeLineDataChecks
    useEffect(() => {
        if (timeLineData != 'Select TimeLine') {
            setType1LineData('Select Type');
            setType2LineData('Select Type');
            setYear1LineData('Select Year');
            setYear2LineData('Select Year');
            setMonth1LineData('Select Month');
            setMonth2LineData('Select Month');
            setDay1LineData('Select Date');
            setDay2LineData('Select Date');
            if (countData == 'Range(From)') {
                this.year1Input.clear();
                this.year2Input.clear();
                setYear1Check(false);
                setYear2Check(false);
            }
        }
    }, [timeLineData]);

    useEffect(() => {
        if (year1LineData != 'Select Year') {
            setType1LineData('Select Type');
            setMonth1LineData('Select Month');
            setDay1LineData('Select Date');
        }
        if (year1LineData.length == 4 && countData == 'Range(From)') {
            let res = verifyData('Y1');
            if (res == 'success') {
                if (year1LineData == moment.tz(moment(), 'Asia/Kolkata').format('YYYY')) {
                    setMonth1Data(months.slice(0, moment.tz(moment(), 'Asia/Kolkata').format('MM')));
                }
                else{
                    setMonth1Data(months);
                }
                setYear1Check(true);
            }
            else{
                setYear1Check(false);
            }
        }
    }, [year1LineData])

    useEffect(() => {
        if (year2LineData != 'Select Year') {
            setType2LineData('Select Type');
            setMonth2LineData('Select Month');
            setDay2LineData('Select Date');
        }
        if (year2LineData.length == 4 && countData == 'Range(From)') {
            let res = verifyData('Y2');
            if (res == 'success') {
                if (year2LineData == moment.tz(moment(), 'Asia/Kolkata').format('YYYY')) {
                    setMonth2Data(months.slice(0, moment.tz(moment(), 'Asia/Kolkata').format('MM')));
                }
                else{
                    setMonth2Data(months);
                }
                setYear2Check(true);
            }
            else{
                setYear2Check(false);
            }
        }
    }, [year2LineData])

    useEffect(() => {
        if (month1LineData != 'Select Month') {
            setType1LineData('Select Type');
            setDay1LineData('Select Date');
        }
        if (month1LineData != 'Select Month' &&  countData == 'Range(From)') {
            if (year1LineData == year2LineData) {
                let filteredMonth = _.filter(months, (data) => {
                    if (timeLineData == 'Month By Month') {
                        return data > month1LineData;
                    }
                    return data == month1LineData || data > month1LineData;
                })
                setMonth2Data(filteredMonth);
            }
            if(month1LineData == 1 || month1LineData == 3 || month1LineData == 5 || month1LineData == 7 || month1LineData == 8 || month1LineData == 10 || month1LineData == 12){
                setDay1Data(dates);
            }
            if (month1LineData == 4 || month1LineData == 6 || month1LineData == 9 || month1LineData == 11) {
                setDay1Data(dates.slice(0,30));
            }
            if (month1LineData == 2) {
                if (year1LineData % 4 == 0) {
                    setDay1Data(dates.slice(0,29));
                }
                if (year1LineData % 4 != 0) {
                    setDay1Data(dates.slice(0,28));
                }
            }
        }
    }, [month1LineData])

    useEffect(() => {
        if (month2LineData != 'Select Month') {
            setType2LineData('Select Type');
            setDay2LineData('Select Date');
        }
        if (month2LineData != 'Select Month' &&  countData == 'Range(From)') {
            if (year1LineData == year2LineData) {
                let filteredMonth = _.filter(months, (data) => {
                    if (timeLineData == 'Month By Month') {
                        return data < month2LineData;
                    }
                    return data == month2LineData || data < month2LineData;
                })
                setMonth1Data(filteredMonth);
            }
            if(month2LineData == 1 || month2LineData == 3 || month2LineData == 5 || month2LineData == 7 || month2LineData == 8 || month2LineData == 10 || month2LineData == 12){
                setDay2Data(dates);
            }
            if (month2LineData == 4 || month2LineData == 6 || month2LineData == 9 || month2LineData == 11) {
                setDay2Data(dates.slice(0,30));
            }
            if (month2LineData == 2) {
                if (year2LineData % 4 == 0) {
                    setDay2Data(dates.slice(0,29));
                }
                if (year2LineData % 4 != 0) {
                    setDay2Data(dates.slice(0,28));
                }
            }
        }
    }, [month2LineData])

    useEffect(() => {
        if (day1LineData != 'Select Date') {
            setType1LineData('Select Type');
        }
        if (day1LineData != 'Select Date' && countData == 'Range(From)') {
            if (year1LineData == year2LineData && month1LineData == month2LineData) {
                let filteredDate = _.filter(dates, (data) => {
                    return data > day1LineData;
                })
                setDay2Data(filteredDate);
            }
        }
    }, [day1LineData])

    useEffect(() => {
        if (day2LineData != 'Select Date') {
            setType2LineData('Select Type');
        }
        if (day2LineData != 'Select Date' && countData == 'Range(From)') {
            if (year1LineData == year2LineData && month1LineData == month2LineData) {
                let filteredDate = _.filter(dates, (data) => {
                    return data < day2LineData;
                })
                setDay1Data(filteredDate);
            }
        }
    }, [day2LineData])

    function verifyData( id ) {
        if (year1LineData.length == 4 && id == 'Y1') {
            if (year1LineData < '2000') {
                Alert.alert(
                    'Invalid Year!',
                    'Sorry! We only allow Transaction Till 2000 Year.',
                    [{ text: 'Okay!' }],
                );
                return;
            }
            if (year1LineData > moment.tz(moment(), 'Asia/Kolkata').format('YYYY')) {
                Alert.alert(
                    'Invalid Year!',
                    'Future Year Not Allowded!',
                    [{ text: 'Okay!' }],
                );
                return;
            }
            if (year2LineData < year1LineData) {
                Alert.alert(
                    'Invalid Year!',
                    `Enter a Year Smaller or Equal to ${year2LineData}!`,
                    [{ text: 'Okay!' }],
                );
                return;
            }
            if (timeLineData == 'Year By Year') {
                console.log(1);
                if (year2LineData == year1LineData) {
                    Alert.alert(
                        'Invalid Year!',
                        `Enter a Year Smaller than ${year2LineData}!`,
                        [{ text: 'Okay!' }],
                    );
                    return;
                }
            }
            return 'success';
        }
        if (year2LineData.length == 4 && id == 'Y2') {
            if (year2LineData < '2000') {
                Alert.alert(
                    'Invalid Year!',
                    'Sorry! We only allow Transaction Till 2000 Year.',
                    [{ text: 'Okay!' }],
                );
                return;
            }
            if (year2LineData > moment.tz(moment(), 'Asia/Kolkata').format('YYYY')) {
                Alert.alert(
                    'Invalid Year!',
                    'Future Year Not Allowded!',
                    [{ text: 'Okay!' }],
                );
                return;
            }
            if (year2LineData < year1LineData) {
                Alert.alert(
                    'Invalid Year!',
                    `Enter a Year Greater or Equal ${year1LineData}!`,
                    [{ text: 'Okay!' }],
                );
                return;
            }
            if (timeLineData == 'Year By Year') {
                console.log(1);
                if (year2LineData == year1LineData) {
                    Alert.alert(
                        'Invalid Year!',
                        `Enter a Year Greater than ${year2LineData}!`,
                        [{ text: 'Okay!' }],
                    );
                    return;
                }
            }
            return 'success';
        }
        return false;
    }

    ContentDecider = () => {
        if (countData == 'Single(One)') {
            return (
                <>
                    {/* Year DropDown */}
                    {countData != 'Select Count' && timeLineData != 'Select TimeLine' && (
                        <View
                            style={[
                                styles.dropDownContainer,
                                { justifyContent: 'center', flexDirection: 'row' },
                            ]}>
                            <View
                                style={
                                    year1LineIsClicked == false
                                        ? [
                                            styles.dropDownBox,
                                            {
                                                height: year1LineHeight,
                                                marginHorizontal: 10,
                                            },
                                        ]
                                        : [
                                            styles.dropDownBox,
                                            {
                                                height: year1LineHeight,
                                                marginHorizontal: 10,
                                                position: 'relative',
                                                zIndex: 1,
                                            },
                                        ]
                                }>
                                <DropDown
                                    id={'Y1'}
                                    data={year1Data}
                                    state={year1LineIsClicked}
                                    setState={setYear1LineIsClicked}
                                    textData={year1LineData}
                                    setTextData={setYear1LineData}
                                    handelFilterDropdown={handelFilterDropdown.bind(5)}
                                    manageData={manageData}
                                />
                            </View>
                        </View>
                    )}
                    {/* Month DropDown */}
                    {year1LineData != 'Select Year' &&
                        (timeLineData == 'Month' || timeLineData == 'Day') && (
                            <View
                                style={[
                                    styles.dropDownContainer,
                                    { justifyContent: 'center', flexDirection: 'row' },
                                ]}>
                                <View
                                    style={
                                        month1LineIsClicked == false
                                            ? [
                                                styles.dropDownBox,
                                                {
                                                    height: month1LineHeight,
                                                    maxHeight: 150,
                                                    marginHorizontal: 10,
                                                    overflow: 'hidden',
                                                },
                                            ]
                                            : [
                                                styles.dropDownBox,
                                                {
                                                    height: month1LineHeight,
                                                    maxHeight: 150,
                                                    marginHorizontal: 10,
                                                    overflow: 'hidden',
                                                    position: 'relative',
                                                    zIndex: 1,
                                                },
                                            ]
                                    }>
                                    <DropDown
                                        id={'M1'}
                                        data={month1Data}
                                        state={month1LineIsClicked}
                                        setState={setMonth1LineIsClicked}
                                        textData={month1LineData}
                                        setTextData={setMonth1LineData}
                                        handelFilterDropdown={handelFilterDropdown.bind(7)}
                                        manageData={manageData}
                                    />
                                </View>
                            </View>
                        )}
                    {/* Date DropDown */}
                    {month1LineData != 'Select Month' && timeLineData == 'Day' && (
                        <View
                            style={[
                                styles.dropDownContainer,
                                { justifyContent: 'center', flexDirection: 'row' },
                            ]}>
                            <View
                                style={
                                    day1LineIsClicked == false
                                        ? [
                                            styles.dropDownBox,
                                            {
                                                height: day1LineHeight,
                                                maxHeight: 150,
                                                marginHorizontal: 10,
                                                overflow: 'hidden',
                                            },
                                        ]
                                        : [
                                            styles.dropDownBox,
                                            {
                                                height: day1LineHeight,
                                                maxHeight: 150,
                                                marginHorizontal: 10,
                                                overflow: 'hidden',
                                                position: 'relative',
                                                zIndex: 1,
                                            },
                                        ]
                                }>
                                <DropDown
                                    id={'D1'}
                                    data={day1Data}
                                    state={day1LineIsClicked}
                                    setState={setDay1LineIsClicked}
                                    textData={day1LineData}
                                    setTextData={setDay1LineData}
                                    handelFilterDropdown={handelFilterDropdown.bind(9)}
                                    manageData={manageData}
                                />
                            </View>
                        </View>
                    )}
                    {/* Type DropDown */}
                    {((timeLineData == 'Year' && year1LineData != 'Select Year') ||
                        (timeLineData == 'Month' &&
                            year1LineData != 'Select Year' &&
                            month1LineData != 'Select Month') ||
                        (timeLineData == 'Day' &&
                            year1LineData != 'Select Year' &&
                            month1LineData != 'Select Month' &&
                            day1LineData != 'Select Date')) && (
                            <View
                                style={[
                                    styles.dropDownContainer,
                                    { justifyContent: 'center', flexDirection: 'row' },
                                ]}>
                                <View
                                    style={
                                        type1LineIsClicked == false
                                            ? [
                                                styles.dropDownBox,
                                                {
                                                    height: type1LineHeight,
                                                    marginHorizontal: 10,
                                                },
                                            ]
                                            : [
                                                styles.dropDownBox,
                                                {
                                                    height: type1LineHeight,
                                                    marginHorizontal: 10,
                                                    position: 'relative',
                                                    zIndex: 1,
                                                },
                                            ]
                                    }>
                                    <DropDown
                                        data={type1Data}
                                        state={type1LineIsClicked}
                                        setState={setType1LineIsClicked}
                                        textData={type1LineData}
                                        setTextData={setType1LineData}
                                        handelFilterDropdown={handelFilterDropdown.bind(3)}
                                        manageData={manageData}
                                    />
                                </View>
                            </View>
                        )}
                </>
            );
        } else if (countData == 'Range(From)') {
            return (
                <>
                    {/* Year DropDown */}
                    {countData != 'Select Count' &&
                        timeLineData != 'Select TimeLine' && (
                            <View
                                style={[
                                    styles.dropDownContainer,
                                    { justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' },
                                ]}>
                                <View
                                    style={[
                                        styles.dropDownBox,
                                        {
                                            height: 50,
                                            width: '40%',
                                            marginHorizontal: 10,
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        },
                                    ]}>
                                    <TextInput
                                        style={{
                                            color: 'black',
                                            fontSize: 20,
                                            marginLeft: 10,
                                        }}
                                        ref={input => { this.year1Input = input }}
                                        maxLength={4}
                                        textAlign="center"
                                        keyboardType="number-pad"
                                        placeholder={'Enter Year'}
                                        placeholderTextColor={'#676767'}
                                        onChangeText={text => {
                                            setYear1LineData(text);
                                        }}></TextInput>
                                </View>
                                <Ionicons
                                    name="arrow-forward-sharp"
                                    size={30}
                                    color={'black'}
                                />
                                <View
                                    style={[
                                        styles.dropDownBox,
                                        {
                                            height: 50,
                                            width: '40%',
                                            marginHorizontal: 10,
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        },
                                    ]}>
                                    <TextInput
                                        style={{
                                            color: 'black',
                                            fontSize: 20,
                                            marginLeft: 10,
                                        }}
                                        ref={input => { this.year2Input = input }}
                                        maxLength={4}
                                        textAlign="center"
                                        keyboardType="number-pad"
                                        placeholder={'Enter Year'}
                                        placeholderTextColor={'#676767'}
                                        onChangeText={text => {
                                            setYear2LineData(text);
                                        }}></TextInput>
                                </View>
                            </View>
                        )}
                    {/* Month DropDown */}
                    {year1LineData != 'Select Year' &&
                        year2LineData != 'Select Year' && year1Check && year2Check &&
                        (timeLineData == 'Month By Month' ||
                            timeLineData == 'Day By Day') && (
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
                                                    height: month1LineHeight + 10,
                                                    maxHeight: 150,
                                                    width: '40%',
                                                    marginHorizontal: 10,
                                                    overflow: 'hidden',
                                                    justifyContent: 'center'
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
                                                    justifyContent: 'center'
                                                },
                                            ]
                                    }>
                                    <DropDown
                                        data={month1Data}
                                        state={month1LineIsClicked}
                                        setState={setMonth1LineIsClicked}
                                        textData={month1LineData}
                                        setTextData={setMonth1LineData}
                                        handelFilterDropdown={handelFilterDropdown.bind(7)}
                                        manageData={manageData}
                                    />
                                </View>
                                <Ionicons
                                    name="arrow-forward-sharp"
                                    size={30}
                                    color={'black'}
                                    style={{alignSelf: 'center'}}
                                />
                                <View
                                    style={
                                        month2LineIsClicked == false
                                            ? [
                                                styles.dropDownBox,
                                                {
                                                    height: month2LineHeight + 10,
                                                    maxHeight: 150,
                                                    width: '40%',
                                                    marginHorizontal: 10,
                                                    justifyContent:'center'
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
                                                    justifyContent: 'center'
                                                },
                                            ]
                                    }>
                                    <DropDown
                                        data={month2Data}
                                        state={month2LineIsClicked}
                                        id={'M2'}
                                        setState={setMonth2LineIsClicked}
                                        textData={month2LineData}
                                        setTextData={setMonth2LineData}
                                        handelFilterDropdown={handelFilterDropdown.bind(8)}
                                        manageData={manageData}
                                    />
                                </View>
                            </View>
                        )}
                    {/* Date DropDown */}
                    {month1LineData != 'Select Month' &&
                        month2LineData != 'Select Month' &&
                        timeLineData == 'Day By Day' && (
                            <View
                                style={[
                                    styles.dropDownContainer,
                                    { justifyContent: 'space-between', flexDirection: 'row' },
                                ]}>
                                <View
                                    style={
                                        day1LineIsClicked == false
                                            ? [
                                        styles.dropDownBox,
                                        {
                                            height: day1LineHeight,
                                                    maxHeight: 150,
                                            width: '40%',
                                            marginHorizontal: 10,
                                            overflow: 'hidden',
                                        },
                                    ]
                                            : [
                                                styles.dropDownBox,
                                                {
                                                    height: day1LineHeight,
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
                                        data={day1Data}
                                        state={day1LineIsClicked}
                                        setState={setDay1LineIsClicked}
                                        textData={day1LineData}
                                        setTextData={setDay1LineData}
                                        handelFilterDropdown={handelFilterDropdown.bind(9)}
                                        manageData={manageData}
                                    />
                                </View>
                                <Ionicons
                                    name="arrow-forward-sharp"
                                    size={30}
                                    color={'black'}
                                />
                                <View
                                    style={
                                        day2LineIsClicked == false
                                            ? [
                                        styles.dropDownBox,
                                        {
                                            height: day2LineHeight,
                                                    maxHeight: 150,
                                            width: '40%',
                                            marginHorizontal: 10,
                                            },
                                            ]
                                            : [
                                                styles.dropDownBox,
                                                {
                                                    height: day2LineHeight,
                                                    maxHeight: 150,
                                                    width: '40%',
                                                    marginHorizontal: 10,
                                                    position: 'relative',
                                                    zIndex: 1,
                                                },
                                            ]
                                    }>
                                    <DropDown
                                        data={day2Data}
                                        state={day2LineIsClicked}
                                        setState={setDay2LineIsClicked}
                                        textData={day2LineData}
                                        setTextData={setDay2LineData}
                                        handelFilterDropdown={handelFilterDropdown.bind(10)}
                                        manageData={manageData}
                                    />
                                </View>
                            </View>
                        )}
                    {/* Type DropDown */}
                    {(year1Check && year2Check && (timeLineData == 'Year By Year' &&
                        year1LineData != 'Select Year' &&
                        year2LineData != 'Select Year') ||
                        (timeLineData == 'Month By Month' &&
                            year1LineData != 'Select Year' &&
                            year2LineData != 'Select Year' &&
                            month1LineData != 'Select Month' &&
                            month2LineData != 'Select Month') ||
                        (timeLineData == 'Day By Day' &&
                            year1LineData != 'Select Year' &&
                            year2LineData != 'Select Year' &&
                            month1LineData != 'Select Month' &&
                            month2LineData != 'Select Month' &&
                            day1LineData != 'Select Date' &&
                            day2LineData != 'Select Date')) && (
                                <View
                                style={[
                                    styles.dropDownContainer,
                                    { justifyContent: 'center', flexDirection: 'row' },
                                ]}>
                                <View
                                    style={
                                        type2LineIsClicked == false
                                            ? [
                                                styles.dropDownBox,
                                                {
                                                    height: type2LineHeight,
                                                    marginHorizontal: 10,
                                                },
                                            ]
                                            : [
                                                styles.dropDownBox,
                                                {
                                                    height: type2LineHeight,
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
                                        handelFilterDropdown={handelFilterDropdown.bind(3)}
                                        manageData={manageData}
                                    />
                                </View>
                            </View>
                        )}
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
                            manageData={manageData}
                        />
                    </View>
                </View>
                {/* TimeLine DropDown  */}
                {countData != 'Select Count' && (
                    <View style={[styles.dropDownContainer, { alignItems: 'center' }]}>
                        <View
                            style={
                                timeLineIsClicked == false
                                    ? [
                                        styles.dropDownBox,
                                        { height: timeLineHeight, overflow: 'hidden' },
                                    ]
                                    : [
                                        styles.dropDownBox,
                                        {
                                            height: timeLineHeight,
                                            overflow: 'scroll',
                                            position: 'relative',
                                            zIndex: 1,
                                        },
                                    ]
                            }>
                            <DropDown
                                data={countData == 'Single(One)' ? timeLine[1] : timeLine[0]}
                                state={timeLineIsClicked}
                                setState={setTimeLineIsClicked}
                                textData={timeLineData}
                                setTextData={setTimeLineData}
                                handelFilterDropdown={handelFilterDropdown.bind(2)}
                                manageData={manageData}
                            />
                        </View>
                    </View>
                )}
                {ContentDecider()}
                <TouchableOpacity
                    disabled={setApplyButtonActive()}
                    onPress={() => {
                        console.log('press');
                        evaluateAdvancedFilterGraphData(year1LineData, year2LineData, month1LineData, month2LineData, day1LineData, day2LineData, type1LineData, type2LineData);
                        setAdvancedFilterModelVisible(false);
                    }}
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
