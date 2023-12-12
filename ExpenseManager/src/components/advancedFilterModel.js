import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';

import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';

import DropDown from './dropDown.js';
import { useDataContext } from '../context/dataContext';

function advancedFilterModel({
    timeLine,
    year1,
    year2,
    month,
    date,
    count,
    setAdvancedFilterModelVisible,
}) {
    let { manageAdvancedData, year2Data, month2Data, day2Data, type2Data} = useDataContext();
    const [ year1Data , setYear1Data] = useState([]);
    const [ month1Data , setMonth1Data] = useState([]);
    const [day1Data, setDay1Data] = useState();
    const [ type1Data , setType1Data] = useState([]);
    let type = ['Both', 'CREDIT', 'DEBIT'];

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

    const [year2LineIsClicked, setYear2LineIsClicked] = useState(false);
    const [year2LineData, setYear2LineData] = useState('Select Year');
    let year2LineHeight = year2LineIsClicked ? year2.length * 30 + 50 : 40;

    const [month1LineIsClicked, setMonth1LineIsClicked] = useState(false);
    const [month1LineData, setMonth1LineData] = useState('Select Month');
    let month1LineHeight = month1LineIsClicked ? month1Data.length * 30 + 50 : 40;

    const [month2LineIsClicked, setMonth2LineIsClicked] = useState(false);
    const [month2LineData, setMonth2LineData] = useState('Select Month');
    let month2LineHeight = month2LineIsClicked ? month.length * 30 + 50 : 40;

    const [day1LineIsClicked, setDay1LineIsClicked] = useState(false);
    const [day1LineData, setDay1LineData] = useState('Select Date');
    let day1LineHeight = day1LineIsClicked ? day1Data.length * 30 + 50 : 40;

    const [day2LineIsClicked, setDay2LineIsClicked] = useState(false);
    const [day2LineData, setDay2LineData] = useState('Select Date');
    let day2LineHeight = day2LineIsClicked ? date.length * 30 + 50 : 40;

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
                        type1LineData != 'Select Type' &&
                        type2LineData != 'Select Type' &&
                        year1LineData != 'Select Year' &&
                        year2LineData != 'Select Year'
                    ) {
                        return false;
                    } else return true;
                } else if (timeLineData == 'Month By Month') {
                    if (
                        type1LineData != 'Select Type' &&
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
                        type1LineData != 'Select Type' &&
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

    let handelFilterDropdown= (data) => {
        console.log(data);
        if (data == count) {
            setTimeLineIsClicked(false);
            setType1LineIsClicked(false);
            setType2LineIsClicked(false);
            setYear1LineIsClicked(false);
            setYear2LineIsClicked(false);
            setMonth1LineIsClicked(false);
            setMonth2LineIsClicked(false);
            setDay1LineIsClicked(false);
            setDay2LineIsClicked(false);
        } else if (data == timeLine[0] || data == timeLine[1]) {
            setCountIsClicked(false);
            setType1LineIsClicked(false);
            setType2LineIsClicked(false);
            setYear1LineIsClicked(false);
            setYear2LineIsClicked(false);
            setMonth1LineIsClicked(false);
            setMonth2LineIsClicked(false);
            setDay1LineIsClicked(false);
            setDay2LineIsClicked(false);
        } else if (data == type1Data) {
            setCountIsClicked(false);
            setTimeLineIsClicked(false);
            // setType2LineIsClicked(false);
            setYear1LineIsClicked(false);
            setYear2LineIsClicked(false);
            setMonth1LineIsClicked(false);
            setMonth2LineIsClicked(false);
            setDay1LineIsClicked(false);
            setDay2LineIsClicked(false);
        }
        // else if (id == 4) {
        //     setCountIsClicked(false);
        //     setTimeLineIsClicked(false);
        //     setType1LineIsClicked(false);
        //     setYear1LineIsClicked(false);
        //     setYear2LineIsClicked(false);
        //     setMonth1LineIsClicked(false);
        //     setMonth2LineIsClicked(false);
        //     setDay1LineIsClicked(false);
        //     setDay2LineIsClicked(false);
        // }
        else if (data == year1Data) {
            setCountIsClicked(false);
            setTimeLineIsClicked(false);
            setType1LineIsClicked(false);
            setType2LineIsClicked(false);
            // setYear2LineIsClicked(false);
            setMonth1LineIsClicked(false);
            setMonth2LineIsClicked(false);
            setDay1LineIsClicked(false);
            setDay2LineIsClicked(false);
        }
        // else if (id == 6) {
        //     setCountIsClicked(false);
        //     setTimeLineIsClicked(false);
        //     setType1LineIsClicked(false);
        //     setType2LineIsClicked(false);
        //     setYear1LineIsClicked(false);
        //     setMonth1LineIsClicked(false);
        //     setMonth2LineIsClicked(false);
        //     setDay1LineIsClicked(false);
        //     setDay2LineIsClicked(false);
        // }
        else if (data == month1Data) {
            setCountIsClicked(false);
            setTimeLineIsClicked(false);
            setType1LineIsClicked(false);
            setType2LineIsClicked(false);
            setYear1LineIsClicked(false);
            setYear2LineIsClicked(false);
            // setMonth2LineIsClicked(false);
            setDay1LineIsClicked(false);
            setDay2LineIsClicked(false);
        }
        // else if (id == 8) {
        //     setCountIsClicked(false);
        //     setTimeLineIsClicked(false);
        //     setType1LineIsClicked(false);
        //     setType2LineIsClicked(false);
        //     setYear1LineIsClicked(false);
        //     setYear2LineIsClicked(false);
        //     setMonth1LineIsClicked(false);
        //     setDay1LineIsClicked(false);
        //     setDay2LineIsClicked(false);
        // }
        else if (data == day1Data) {
            setCountIsClicked(false);
            setTimeLineIsClicked(false);
            setType1LineIsClicked(false);
            setType2LineIsClicked(false);
            setYear1LineIsClicked(false);
            setYear2LineIsClicked(false);
            setMonth1LineIsClicked(false);
            setMonth2LineIsClicked(false);
            // setDay2LineIsClicked(false);
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
        //     setDay1LineIsClicked(false);
        // }
    }

    let manageData = (data) => {
        console.log(data);
        if (timeLine[1].includes(data)) {
            let res = manageAdvancedData(data);
            setYear1Data(res.year);
            setType1Data(res.type);
            return 'success';
        }
        else if (year1Data.includes(data)) {
            let res = manageAdvancedData('', data);
            setMonth1Data(res.month);
            setType1Data(res.type);
            return 'success';
        }
        else if (month1Data.includes(data)){
            let res = manageAdvancedData('', year1LineData, data);
            setDay1Data(res.day);
            setType1Data(res.type);
            return 'success';
        }
        else if (day1Data.includes(data)){
            let res = manageAdvancedData('', year1LineData, month1LineData, data);
            setType1Data(res.type);
            return 'success';
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
            // let response  = manageAdvancedData(timeLineData);

            // manageAdvancedData(timeLineData)
        }
    }, [timeLineData]);
    
    useEffect(() => {
        if (year1LineData != 'Select Year') {
            setType1LineData('Select Type');
            setMonth1LineData('Select Month');
            setDay1LineData('Select Date');
        }
    },[year1LineData])

    useEffect(() => {
        if (year2LineData != 'Select Year') {
            setType2LineData('Select Type');
            setMonth2LineData('Select Month');
            setDay2LineData('Select Date');
        }
    },[year2LineData])
    
    useEffect(() => {
        if (month1LineData != 'Select Month') {
            setType1LineData('Select Type');
            setDay1LineData('Select Date');
        }
    },[month1LineData])

    useEffect(() => {
        if (month2LineData != 'Select Month') {
            setType2LineData('Select Type');
            setDay2LineData('Select Date');
        }
    },[month2LineData])

    useEffect(() => {
        if (day1LineData != 'Select Date') {
            setType1LineData('Select Type');
        }
    },[day1LineData])

    useEffect(() => {
        if (day2LineData != 'Select Date') {
            setType2LineData('Select Type');
        }
    },[day2LineData])

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
                    {countData != 'Select Count' && timeLineData != 'Select TimeLine' && (
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
                                    data={year1Data}
                                    state={year1LineIsClicked}
                                    setState={setYear1LineIsClicked}
                                    textData={year1LineData}
                                    setTextData={setYear1LineData}
                                    handelFilterDropdown={handelFilterDropdown.bind(5)}
                                    manageData={manageData}
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
                                    data={year2Data}
                                    state={year2LineIsClicked}
                                    setState={setYear2LineIsClicked}
                                    textData={year2LineData}
                                    setTextData={setYear2LineData}
                                    handelFilterDropdown={handelFilterDropdown.bind(6)}
                                    manageData={manageData}
                                />
                            </View>
                        </View>
                    )}
                    {/* Month DropDown */}
                    {year1LineData != 'Select Year' &&
                        year2LineData != 'Select Year' &&
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
                                />
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
                                        data={month2Data}
                                        state={month2LineIsClicked}
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
                    {((timeLineData == 'Year By Year' &&
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
                                            data={type1Data}
                                            state={type1LineIsClicked}
                                            setState={setType1LineIsClicked}
                                            textData={type1LineData}
                                            setTextData={setType1LineData}
                                            handelFilterDropdown={handelFilterDropdown.bind(3)}
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
                                            data={type2Data}
                                            state={type2LineIsClicked}
                                            setState={setType2LineIsClicked}
                                            textData={type2LineData}
                                            setTextData={setType2LineData}
                                            handelFilterDropdown={handelFilterDropdown.bind(4)}
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
