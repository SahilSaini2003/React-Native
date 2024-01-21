import {
    Text,
    View,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Image,
} from 'react-native';
import { useState, useEffect } from 'react';
import _ from 'underscore';
import { ScrollView } from 'react-native-virtualized-view';
import { scale } from 'react-native-size-matters';

import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';

import DropDown from './dropDown.js';
import { useDataContext } from '../context/dataContext';

function compareDataModel({
    timeLine,
    setCompareDataModelVisible,
    evaluateCompareDataGraphData
}) {
    let { manageAdvancedData } = useDataContext();

    const [year1Data, setYear1Data] = useState([]);
    const [year2Data, setYear2Data] = useState([]);
    const [month1Data, setMonth1Data] = useState([]);
    const [month2Data, setMonth2Data] = useState([]);
    const [day1Data, setDay1Data] = useState([]);
    const [day2Data, setDay2Data] = useState([]);
    const [type1Data, setType1Data] = useState([]);
    const [type2Data, setType2Data] = useState(['Both', 'CREDIT', 'DEBIT']);

    const [timeLineIsClicked, setTimeLineIsClicked] = useState(false);
    const [timeLineData, setTimeLineData] = useState('Select TimeLine');
    let timeLineHeight = timeLineIsClicked ? timeLine.length * 30 + 40 : 40;

    const [type1LineIsClicked, setType1LineIsClicked] = useState(false);
    const [type1LineData, setType1LineData] = useState('Select Type');
    let type1LineHeight = type1LineIsClicked ? type1Data.length * 35 + 40 : 40;

    const [type2LineIsClicked, setType2LineIsClicked] = useState(false);
    const [type2LineData, setType2LineData] = useState('Select Type');
    let type2LineHeight = type2LineIsClicked ? type2Data.length * 35 + 40 : 40;

    const [year1LineIsClicked, setYear1LineIsClicked] = useState(false);
    const [year1LineData, setYear1LineData] = useState('Select Year');
    let year1LineHeight = year1LineIsClicked ? year1Data.length * 35 + 40 : 40;

    const [year2LineIsClicked, setYear2LineIsClicked] = useState(false);
    const [year2LineData, setYear2LineData] = useState('Select Year');
    let year2LineHeight = year2LineIsClicked ? year2Data.length * 35 + 40 : 40;

    const [month1LineIsClicked, setMonth1LineIsClicked] = useState(false);
    const [month1LineData, setMonth1LineData] = useState('Select Month');
    let month1LineHeight = month1LineIsClicked ? month1Data.length * 35 + 40 : 40;

    const [month2LineIsClicked, setMonth2LineIsClicked] = useState(false);
    const [month2LineData, setMonth2LineData] = useState('Select Month');
    let month2LineHeight = month2LineIsClicked ? month2Data.length * 35 + 40 : 40;

    const [day1LineIsClicked, setDay1LineIsClicked] = useState(false);
    const [day1LineData, setDay1LineData] = useState('Select Date');
    let day1LineHeight = day1LineIsClicked ? day1Data.length * 35 + 40 : 40;

    const [day2LineIsClicked, setDay2LineIsClicked] = useState(false);
    const [day2LineData, setDay2LineData] = useState('Select Date');
    let day2LineHeight = day2LineIsClicked ? day2Data.length * 35 + 40 : 40;

    let handelFilterDropdown = data => {
        if (data == timeLine) {
            setType1LineIsClicked(false);
            setType2LineIsClicked(false);
            setYear1LineIsClicked(false);
            setMonth1LineIsClicked(false);
            setMonth2LineIsClicked(false);
            setDay1LineIsClicked(false);
            setDay2LineIsClicked(false);
        } else if (data == type1Data || data == type2Data) {
            setTimeLineIsClicked(false);
            setYear1LineIsClicked(false);
            setMonth1LineIsClicked(false);
            setMonth2LineIsClicked(false);
            setDay1LineIsClicked(false);
            setDay2LineIsClicked(false);
        } else if (data == year1Data || data == year2Data) {
            setTimeLineIsClicked(false);
            setType1LineIsClicked(false);
            setType2LineIsClicked(false);
            setMonth1LineIsClicked(false);
            setMonth2LineIsClicked(false);
            setDay1LineIsClicked(false);
            setDay2LineIsClicked(false);
        } else if (data == month1Data || data == month2Data) {
            setTimeLineIsClicked(false);
            setType1LineIsClicked(false);
            setType2LineIsClicked(false);
            setYear1LineIsClicked(false);
            setDay1LineIsClicked(false);
            setDay2LineIsClicked(false);
        } else if (data == day1Data || data == day2Data) {
            setTimeLineIsClicked(false);
            setType1LineIsClicked(false);
            setType2LineIsClicked(false);
            setYear1LineIsClicked(false);
            setMonth1LineIsClicked(false);
            setMonth2LineIsClicked(false);
        }
    };

    let manageData = async (data, id) => {
        if (timeLine.includes(data)) {
            let res = manageAdvancedData(data);
            setYear1Data(res.year);
            setYear2Data(res.year);
            return 'success';
        }
        switch (id) {
            case 'Y1': {
                if (timeLineData == 'Year By Year') {
                    let res = manageAdvancedData(timeLineData);
                    let years = _.filter(res.year, item => {
                        return item != data;
                    });
                    setYear2Data(years);
                }
                let res2 = manageAdvancedData('', data);
                setMonth1Data(res2.month);
                setType1Data(res2.type);
                return 'success';
            }
            case 'Y2': {
                if (timeLineData == 'Year By Year') {
                    let res = manageAdvancedData(timeLineData);
                    let years = _.filter(res.year, item => {
                        return item != data;
                    });
                    setYear1Data(years);
                }

                let res2 = manageAdvancedData('', data);
                setMonth2Data(res2.month);
                setType2Data(res2.type);
                return 'success';
            }
            case 'M1': {
                if (
                    timeLineData == 'Month By Month' &&
                    year1LineData == year2LineData
                ) {
                    let res = manageAdvancedData('', year1LineData);
                    let months = _.filter(res.month, item => {
                        return item != data;
                    });
                    setMonth2Data(months);
                }
                let res = manageAdvancedData('', year1LineData, data);
                setDay1Data(res.day);
                setType1Data(res.type);
                return 'success';
            }
            case 'M2': {
                if (
                    timeLineData == 'Month By Month' &&
                    year1LineData == year2LineData
                ) {
                    let res = manageAdvancedData('', year2LineData);
                    let months = _.filter(res.month, item => {
                        return item != data;
                    });
                    setMonth1Data(months);
                }
                let res = manageAdvancedData('', year2LineData, data);
                setDay2Data(res.day);
                setType2Data(res.type);
                return 'success';
            }
            case 'D1': {
                if (
                    year1LineData == year2LineData &&
                    month1LineData == month2LineData
                ) {
                    let res = manageAdvancedData('', year1LineData, month1LineData);
                    let months = _.filter(res.day, item => {
                        return item != data;
                    });
                    setDay2Data(months);
                }
                let res = manageAdvancedData('', year1LineData, month1LineData, data);
                setType1Data(res.type);
                return 'success';
            }
            case 'D2': {
                if (
                    year1LineData == year2LineData &&
                    month1LineData == month2LineData
                ) {
                    let res = manageAdvancedData('', year1LineData, month1LineData);
                    let months = _.filter(res.day, item => {
                        return item != data;
                    });
                    setDay1Data(months);
                }
                let res = manageAdvancedData('', year2LineData, month2LineData, data);
                setType2Data(res.type);
                return 'success';
            }
            default:
                break;
        }
        return 'success';
    };

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
        }
    }, [timeLineData]);

    useEffect(() => {
        if (year1LineData != 'Select Year') {
            setType1LineData('Select Type');
            setMonth1LineData('Select Month');
            setDay1LineData('Select Date');
        }
    }, [year1LineData]);

    useEffect(() => {
        if (year2LineData != 'Select Year') {
            setType2LineData('Select Type');
            setMonth2LineData('Select Month');
            setDay2LineData('Select Date');
        }
    }, [year2LineData]);

    useEffect(() => {
        if (month1LineData != 'Select Month') {
            setType1LineData('Select Type');
            setDay1LineData('Select Date');
        }
    }, [month1LineData]);

    useEffect(() => {
        if (month2LineData != 'Select Month') {
            setType2LineData('Select Type');
            setDay2LineData('Select Date');
        }
    }, [month2LineData]);

    useEffect(() => {
        if (day1LineData != 'Select Date') {
            setType1LineData('Select Type');
        }
    }, [day1LineData]);

    useEffect(() => {
        if (day2LineData != 'Select Date') {
            setType2LineData('Select Type');
        }
    }, [day2LineData]);

    return (
        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
            <View style={styles.modelCustomFilterView}>
                {/* Heading */}
                <View
                    style={[styles.center, {alignItems: 'center'}]}>
                    <Text style={{ fontSize: scale(28), color: 'black', marginVertical: scale(10) }}>
                        Compare Data
                    </Text>
                    <TouchableOpacity
                        style={{ left: scale(35) }}
                        onPress={() => {
                            setCompareDataModelVisible(false);
                        }}>
                        <Entypo name="cross" size={scale(35)} color={'black'} />
                    </TouchableOpacity>
                </View>
                <View style={{ width: '100%', borderWidth: 1, marginBottom: 10 }}></View>
                <ScrollView style={{width:'100%'}}>
                    {/* TimeLine DropDown  */}
                    <View style={[styles.dropDownContainer, { alignItems: 'center'}]}>
                        <View
                            style={
                                timeLineIsClicked == false
                                    ? [
                                        styles.dropDownBox,
                                        { height: timeLineHeight, overflow: 'hidden', width: '60%' },
                                    ]
                                    : [
                                        styles.dropDownBox,
                                        {
                                            height: timeLineHeight,
                                            overflow: 'scroll',
                                            position: 'relative',
                                            zIndex: 1,
                                            width: '60%',
                                        },
                                    ]
                            }>
                            <DropDown
                                data={timeLine}
                                state={timeLineIsClicked}
                                setState={setTimeLineIsClicked}
                                textData={timeLineData}
                                setTextData={setTimeLineData}
                                handelFilterDropdown={handelFilterDropdown}
                                manageData={manageData}
                            />
                        </View>
                    </View>
                    {/* Year DropDown */}
                    {timeLineData != 'Select TimeLine' && (
                        <View
                            style={[
                                styles.dropDownContainer,
                                styles.center
                            ]}>
                            <View
                                style={
                                    year1LineIsClicked == false
                                        ? [
                                            styles.dropDownBox,
                                            {
                                                height: year1LineHeight,
                                                marginHorizontal: scale(10),
                                            },
                                        ]
                                        : [
                                            styles.dropDownBox,
                                            {
                                                height: year1LineHeight,
                                                marginHorizontal: scale(10),
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
                                    handelFilterDropdown={handelFilterDropdown}
                                    manageData={manageData}
                                />
                            </View>
                            <Ionicons name="git-compare" size={30} color={'black'} />
                            <View
                                style={
                                    year2LineIsClicked == false
                                        ? [
                                            styles.dropDownBox,
                                            {
                                                height: year2LineHeight,
                                                marginHorizontal: scale(10),
                                            },
                                        ]
                                        : [
                                            styles.dropDownBox,
                                            {
                                                height: year2LineHeight,
                                                marginHorizontal: scale(10),
                                                position: 'relative',
                                                zIndex: 1,
                                            },
                                        ]
                                }>
                                <DropDown
                                    id={'Y2'}
                                    data={year2Data}
                                    state={year2LineIsClicked}
                                    setState={setYear2LineIsClicked}
                                    textData={year2LineData}
                                    setTextData={setYear2LineData}
                                    handelFilterDropdown={handelFilterDropdown}
                                    manageData={manageData}
                                />
                            </View>
                        </View>
                    )}
                    {/* Month DropDown */}
                    {timeLineData != 'Select TimeLine' &&
                        (timeLineData == 'Month By Month' || timeLineData == 'Day By Day') &&
                        year1LineData != 'Select Year' &&
                        year2LineData != 'Select Year' && (
                            <View
                                style={[
                                    styles.dropDownContainer,
                                    styles.center
                                ]}>
                                <View
                                    style={
                                        month1LineIsClicked == false
                                            ? [
                                                styles.dropDownBox,
                                                {
                                                    height: month1LineHeight,
                                                    maxHeight: 150,
                                                    marginHorizontal: scale(10),
                                                    overflow: 'hidden',
                                                },
                                            ]
                                            : [
                                                styles.dropDownBox,
                                                {
                                                    height: month1LineHeight,
                                                    maxHeight: 150,
                                                    marginHorizontal: scale(10),
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
                                        handelFilterDropdown={handelFilterDropdown}
                                        manageData={manageData}
                                    />
                                </View>
                                <Ionicons name="git-compare" size={30} color={'black'} />
                                <View
                                    style={
                                        month2LineIsClicked == false
                                            ? [
                                                styles.dropDownBox,
                                                {
                                                    height: month2LineHeight,
                                                    maxHeight: 150,
                                                    marginHorizontal: scale(10),
                                                    overflow: 'hidden',
                                                },
                                            ]
                                            : [
                                                styles.dropDownBox,
                                                {
                                                    height: month2LineHeight,
                                                    maxHeight: 150,
                                                    marginHorizontal: scale(10),
                                                    overflow: 'hidden',
                                                    position: 'relative',
                                                    zIndex: 1,
                                                },
                                            ]
                                    }>
                                    <DropDown
                                        id={'M2'}
                                        data={month2Data}
                                        state={month2LineIsClicked}
                                        setState={setMonth2LineIsClicked}
                                        textData={month2LineData}
                                        setTextData={setMonth2LineData}
                                        handelFilterDropdown={handelFilterDropdown}
                                        manageData={manageData}
                                    />
                                </View>
                            </View>
                        )}
                    {/* Date DropDown */}
                    {timeLineData != 'Select TimeLine' &&
                        timeLineData == 'Day By Day' &&
                        month1LineData != 'Select Month' &&
                        month2LineData != 'Select Month' && (
                            <View
                                style={[
                                    styles.dropDownContainer,
                                    styles.center
                                ]}>
                                <View
                                    style={
                                        day1LineIsClicked == false
                                            ? [
                                                styles.dropDownBox,
                                                {
                                                    height: day1LineHeight,
                                                    maxHeight: 150,
                                                    marginHorizontal: scale(10),
                                                    overflow: 'hidden',
                                                },
                                            ]
                                            : [
                                                styles.dropDownBox,
                                                {
                                                    height: day1LineHeight,
                                                    maxHeight: 150,
                                                    marginHorizontal: scale(10),
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
                                        handelFilterDropdown={handelFilterDropdown}
                                        manageData={manageData}
                                    />
                                </View>
                                <Ionicons name="git-compare" size={30} color={'black'} />
                                <View
                                    style={
                                        day2LineIsClicked == false
                                            ? [
                                                styles.dropDownBox,
                                                {
                                                    height: day2LineHeight,
                                                    maxHeight: 150,
                                                    marginHorizontal: scale(10),
                                                    overflow: 'hidden',
                                                },
                                            ]
                                            : [
                                                styles.dropDownBox,
                                                {
                                                    height: day2LineHeight,
                                                    maxHeight: 150,
                                                    marginHorizontal: scale(10),
                                                    overflow: 'hidden',
                                                    position: 'relative',
                                                    zIndex: 1,
                                                },
                                            ]
                                    }>
                                    <DropDown
                                        id={'D2'}
                                        data={day2Data}
                                        state={day2LineIsClicked}
                                        setState={setDay2LineIsClicked}
                                        textData={day2LineData}
                                        setTextData={setDay2LineData}
                                        handelFilterDropdown={handelFilterDropdown}
                                        manageData={manageData}
                                    />
                                </View>
                            </View>
                        )}
                    {/* Type DropDown */}
                    {timeLineData != 'Select TimeLine' &&
                        ((timeLineData == 'Year By Year' &&
                            year1LineData != 'Select Year' &&
                            year2LineData != 'Select Year') ||
                            (timeLineData == 'Month By Month' &&
                                month1LineData != 'Select Month' &&
                                month2LineData != 'Select Month') ||
                            (timeLineData == 'Day By Day' &&
                                day1LineData != 'Select Date' &&
                                day2LineData != 'Select Date')) && (
                            <View
                                style={[
                                    styles.dropDownContainer,
                                    styles.center
                                ]}>
                                <View
                                    style={
                                        type1LineIsClicked == false
                                            ? [
                                                styles.dropDownBox,
                                                {
                                                    height: type1LineHeight,
                                                    marginHorizontal: scale(10),
                                                },
                                            ]
                                            : [
                                                styles.dropDownBox,
                                                {
                                                    height: type1LineHeight,
                                                    marginHorizontal: scale(10),
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
                                        handelFilterDropdown={handelFilterDropdown}
                                        manageData={manageData}
                                    />
                                </View>
                                <Ionicons name="git-compare" size={30} color={'black'} />
                                <View
                                    style={
                                        type2LineIsClicked == false
                                            ? [
                                                styles.dropDownBox,
                                                {
                                                    height: type2LineHeight,
                                                    marginHorizontal: scale(10),
                                                },
                                            ]
                                            : [
                                                styles.dropDownBox,
                                                {
                                                    height: type2LineHeight,
                                                    marginHorizontal: scale(10),
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
                                        handelFilterDropdown={handelFilterDropdown}
                                        manageData={manageData}
                                    />
                                </View>
                            </View>
                        )}
                    <TouchableOpacity
                        disabled={
                            timeLineData == 'Year By Year'
                                ? year1LineData != 'Select Year' &&
                                    year2LineData != 'Select Year' &&
                                    type1LineData != 'Select Type' &&
                                    type2LineData != 'Select Type'
                                    ? false
                                    : true
                                : timeLineData == 'Month By Month'
                                    ? month1LineData != 'Select Year' &&
                                        month2LineData != 'Select Year' &&
                                        type1LineData != 'Select Type' &&
                                        type2LineData != 'Select Type'
                                        ? false
                                        : true
                                    : day1LineData != 'Select Year' &&
                                        day2LineData != 'Select Year' &&
                                        type1LineData != 'Select Type' &&
                                        type2LineData != 'Select Type'
                                        ? false
                                        : true
                        }
                        style={{
                            backgroundColor: '#00BF00',
                            width: '70%',
                            height: scale(60),
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 50,
                            borderWidth: 2,
                            borderColor: 'white',
                            alignSelf: 'center'
                        }}
                        onPress={async () => {
                            let res = await evaluateCompareDataGraphData(year1LineData, year2LineData, month1LineData, month2LineData, day1LineData, day2LineData, type1LineData, type2LineData);
                            if (res == 'success') {
                                setCompareDataModelVisible(false);
                            }
                        }}>
                        <Text style={{ fontSize: scale(40), color: 'white', fontWeight: 'bold' }}>
                            A P P L Y
                        </Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    modelCustomFilterView: {
        height: '70%',
        backgroundColor: '#F7D560',
        width: '100%',
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        borderWidth: 2,
        alignItems: 'center',
    },
    dropDownBox: {
        width: '40%',
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        borderRadius: 5,
    },
    dropDownContainer: {
        width: '100%',
        height: scale(35),
        marginBottom: scale(25),
    },
    center: {
        flexDirection: 'row',
    }
});

export default compareDataModel;
