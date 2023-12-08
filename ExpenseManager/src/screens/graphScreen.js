import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    Image,
    Modal,
    Dimensions,
} from 'react-native';
import { BarChart, LineChart } from 'react-native-chart-kit';
import { useState } from 'react';
import _ from 'underscore';
import moment from 'moment-timezone';

import CustomFilterModel from '../components/customFilterModel.js';
import CompareDataModel from '../components/compareDataModel.js';
import AdvancedFilterModel from '../components/advancedFilterModel.js';
import { useDataContext } from '../context/dataContext';

function GraphScreen({ route, navigation }) {
    let { mainData } = useDataContext();

    const type = [{ data: ['All', 'CREDIT', 'DEBIT'] }];
    const time = [
        {
            data: [
                'Overall',
                'Today',
                'Yesterday',
                'Last 15 Days',
                'Last 30 Days',
                'This Month',
                'This Year',
            ],
        },
    ];
    const timeLine = ['Year By Year', 'Month By Month', 'Day By Day'];
    const year = ['2023', '2003'];
    const month = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ];
    const date = [1, 2, 3, 4];
    const count = ['Single(One)', 'Range(From)'];

    const [customFilterModelVisible, setCustomFilterModelVisible] =
        useState(false);
    const [advancedFilterModelVisible, setAdvancedFilterModelVisible] =
        useState(false);
    const [compareDataModelVisible, setCompareDataModelVisible] = useState(false);

    //ccustomfilter
    const [selectedTime, setSelectedTime] = useState();
    const [selectedTimeValue, setSelectedTimeValue] = useState({});
    const [selectedType, setSelectedType] = useState();
    const [selectedTypeValue, setSelectedTypeValue] = useState({});

    const x = () => {
        console.log(mainData);
    };

    customCalculator = (data, labelDecider) => {
        // console.log('custonc', data);
        let gData = {};
        let label;
        let dataArray = [];
        switch (labelDecider) {
            case 1:
                label = Object.keys(data);
                break;
            case 2:
                label = _.map(Object.keys(data), (item) => {
                    return `${data[item][0]['date'].split(' ')[0]}`;
                });
                break;
            case 3:
                label = _.map(Object.keys(data), (item) => {
                    return `${item}.00 Hour`;
                });
                break;
            case 4:
                label = _.map(Object.keys(data), (item) => {
                    return `${data[item][0]['dateHour']}:${item}`;
                });
                break;
            case 5:
                label = _.map(Object.keys(data), (item) => {
                    return `${data[item][0]['date'].split(' ')[1]}`;
                });
                break;

            default:
                break;
        }
        // for (let i = 0; i < Object.keys(data).length; i++) {
        //     const element = Object.keys(data)[i];
        //     label.push(element);
        // }
        _.map(data, context => {
            let totalAmount = 0;
            _.map(context, data => {
                if (data.type == 'DEBIT') {
                    totalAmount = totalAmount - data.amount;
                } else if (data.type == 'CREDIT') {
                    totalAmount = totalAmount + data.amount;
                }
            });
            dataArray.push(totalAmount);
        });
        gData.labels = label;
        gData.datasets = [];
        let minValue = Math.min(...dataArray);
        let maxValue = Math.max(...dataArray);
        minValue = minValue > 0 ? minValue - (0.1 * minValue) : minValue + (0.1 * minValue);
        maxValue = maxValue > 0 ? maxValue + (0.1 * maxValue) : maxValue - (0.1 * maxValue);
        gData.datasets.push({ data: dataArray });
        // gData.datasets.push({ data: [100], withDots: false, });
        // gData.datasets.push({ data: [500], withDots: false, });
        gData.datasets.push({ data: [minValue], withDots: false });
        gData.datasets.push({ data: [maxValue], withDots: false });
        console.log(gData.datasets);
        return gData;
    }

    customDataChecker = (mainData) => {
        let finalData;
        let dummy = _.groupBy(mainData, 'dateYear');
        if (Object.keys(dummy).length > 1) {
            finalData = customCalculator(dummy, 1);
            return finalData;
        }
        else {
            console.log('month');
            dummy = _.groupBy(mainData, 'dateMonthString');
            if (Object.keys(dummy).length > 1) {
                finalData = customCalculator(dummy, 1);
                return finalData;
            }
            else {
                console.log('day');
                dummy = _.groupBy(mainData, 'dateDay');
                if (Object.keys(dummy).length > 1) {
                    finalData = customCalculator(dummy, 2);
                    return finalData;
                }
                else {
                    console.log('hour');
                    dummy = _.groupBy(mainData, 'dateHour');
                    if (Object.keys(dummy).length > 1) {
                        finalData = customCalculator(dummy, 3);
                        return finalData;
                    }
                    else {
                        console.log('minute');
                        dummy = _.groupBy(mainData, 'dateMinute');
                        if (Object.keys(dummy).length > 1) {
                            finalData = customCalculator(dummy, 4);
                            return finalData;
                        }
                        else {
                            console.log('second');
                            dummy = _.groupBy(mainData, 'dateSecond');
                            if (Object.keys(dummy).length >= 1) {
                                finalData = customCalculator(dummy, 5);
                                return finalData;
                            }
                            else {

                            }
                        }
                    }
                }
            }
        }
    }

    function evaluateCustomFilterGraphData(filter, type) {
        if (selectedTime == undefined && selectedType == undefined) {
            return customDataChecker(mainData);
        }
        else {
            let data = mainData;
            console.log(selectedTime, selectedType);
            if (selectedTime != undefined) {
                switch (selectedTime) {
                    case 'Today':
                        console.log('selectedTime', selectedTime);
                        data = _.filter(data, (item) => {
                            return `${item.dateYear}-${item.dateMonth}-${item.dateDay}` == moment.tz(moment(), 'Asia/Kolkata').format('YYYY-MM-DD');
                        })
                        console.log(data);
                        break;
                    case 'Yesterday':
                        console.log('selectedTime', selectedTime);
                        data = _.filter(data, (item) => {
                            return `${item.dateYear}-${item.dateMonth}-${item.dateDay}` == moment.tz(moment(), 'Asia/Kolkata').subtract(1, 'd').format('YYYY-MM-DD');
                        })
                        break;
                    case 'Last 15 Days':
                        console.log('selectedTime', selectedTime);
                        data = _.filter(data, (item) => {
                            return `${item.dateYear}-${item.dateMonth}-${item.dateDay}` >= moment.tz(moment(), 'Asia/Kolkata').subtract(15, 'd').format('YYYY-MM-DD');
                        })
                        break;
                    case 'Last 30 Days':
                        console.log('selectedTime', selectedTime);
                        data = _.filter(data, (item) => {
                            return `${item.dateYear}-${item.dateMonth}-${item.dateDay}` >= moment.tz(moment(), 'Asia/Kolkata').subtract(30, 'd').format('YYYY-MM-DD');
                        })
                        break;
                    case 'This Month':
                        console.log('selectedTime', selectedTime);
                        data = _.filter(data, (item) => {
                            return `${item.dateYear}-${item.dateMonth}` == moment.tz(moment(), 'Asia/Kolkata').format('YYYY-MM');
                        })
                        break;
                    case 'This Year':
                        console.log('selectedTime', selectedTime);
                        data = _.filter(data, (item) => {
                            return `${item.dateYear}` == moment.tz(moment(), 'Asia/Kolkata').format('YYYY');
                        })
                        break;
                    default:
                        break;
                }
            }
            if (selectedType != undefined) {
                switch (selectedType) {
                    case 'CREDIT':
                        console.log('selectedType', selectedType);
                        data = _.filter(data, (item) => {
                            return item.type == 'CREDIT';
                        })
                        break;
                    case 'DEBIT':
                        console.log('selectedType', selectedType);
                        data = _.filter(data, (item) => {
                            return item.type == 'DEBIT';
                        })
                        break;
                    default:
                        break;
                }
            }
            return customDataChecker(data);
        }
    }

    const [graphData, setGraphData] = useState(evaluateCustomFilterGraphData());
    const [messageFlag, setMessageFlag] = useState(false);
    const [message, setMessage] = useState('');

    function updateGraphData() {
        let data = evaluateCustomFilterGraphData();
        console.log('data',data);
        
        if (data == undefined) {
            setMessage('* Noo Data Find for the Selected Match.');
        }
        else if (data.labels.length == 1) {
            setMessage('* Only Single Entry Found For the Data\n(Required at least two Entries for a Graph).');
        }
        else if (data.labels.length > 1) {
            setGraphData(data);
            return 'success';
        }
        setSelectedTime();
        setSelectedTimeValue({});
        setSelectedType();
        setSelectedTypeValue({});
        setMessageFlag(true);
        setTimeout(() => {
            setMessageFlag(false);
        }, 10000);
        return 'success';
    }

    return (
        <View style={styles.mainBox}>
            <View style={styles.graphBox}>
                {/* <Image source={require('../assets/images/javascript-line-charts-graphs.png')} style={{ width: '95%', height: 200 }} /> */}
                <Text>Bezier Line Chart</Text>
                <LineChart
                    data={graphData}
                    // data={{
                    //     labels: ["January", "February", "March", "April", "May", "June"],
                    //     datasets: [
                    //         {
                    //             data: [
                    //                 Math.random() * 100,
                    //                 Math.random() * 100,
                    //                 Math.random() * 100,
                    //                 Math.random() * 100,
                    //                 Math.random() * 100,
                    //                 Math.random() * 100
                    //             ]
                    //         },
                    //         {
                    //             data: [
                    //                 Math.random() * 100,
                    //                 Math.random() * 100,
                    //                 Math.random() * 100,
                    //                 Math.random() * 100,
                    //                 Math.random() * 100,
                    //                 Math.random() * 100
                    //             ]
                    //         }
                    //     ]
                    // }}
                    width={Dimensions.get('window').width - 30} // from react-native
                    // width={700} // from react-native
                    height={300}
                    // yAxisLabel='₹'
                    yLabelsOffset={10}
                    // yAxisInterval={10}
                    // formatYLabel={₹}
                    formatYLabel={value =>
                        value.toString()[0] != '-' ?
                            (value.toString().length > 4
                                ? value.toString().length > 6
                                    ? value.toString().length > 8
                                        ? `₹${value.toString().slice(-value.toString().length, value.toString().length - 7)}Cr`
                                        : `₹${value.toString().slice(-value.toString().length, value.toString().length == 7 ? 2 : 3)}L`
                                    : `₹${value.toString().slice(-value.toString().length, value.toString().length == 5 ? 2 : 3)}K`
                                : `₹${value}`)
                            : (value.toString().replace('-', '').length > 4
                                ? value.toString().replace('-', '').length > 6
                                    ? value.toString().replace('-', '').length > 8
                                        ? `-₹${value.toString().replace('-', '').slice(-value.toString().replace('-', '').length, value.toString().replace('-', '').length - 7)}Cr`
                                        : `-₹${value.toString().replace('-', '').slice(-value.toString().length, value.toString().replace('-', '').length == 7 ? 2 : 3)}L`
                                    : `-₹${value.toString().replace('-', '').slice(-value.toString().replace('-', '').length, value.toString().replace('-', '').length == 5 ? 2 : 3)}K`
                                : `-₹${value}`)
                    }
                    // yAxisSuffix="k"
                    // yAxisInterval={5} // optional, defaults to 1
                    chartConfig={{
                        backgroundColor: 'black',
                        backgroundGradientFrom: '#fb8c00',
                        backgroundGradientTo: '#ffa726',
                        decimalPlaces: 0, // optional, defaults to 2dp
                        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                        // labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        style: {
                            // borderRadius: 16
                        },
                        propsForDots: {
                            // r: "6",
                            // strokeWidth: "2",
                            stroke: '#ffa726',
                        },
                    }}
                    // formatYLabel={() => yLabelIterator.next().value}
                    verticalLabelRotation={0}
                    bezier
                    style={{
                        marginVertical: 8,
                        borderRadius: 16,
                    }}
                />
                {messageFlag ? <Text style={{alignSelf:'center', color:'red',fontSize: 15}}>{message}</Text>: null}
            </View>
            <View style={{ flexDirection: 'row', flex: 1 }}>
                <TouchableOpacity
                    style={styles.filterBox}
                    onPress={() => {
                        setCustomFilterModelVisible(!customFilterModelVisible);
                    }}>
                    <Text style={styles.filterText}>Custom Filters</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.filterBox}
                    onPress={() => {
                        setAdvancedFilterModelVisible(!advancedFilterModelVisible);
                    }}>
                    <Text style={styles.filterText}>Advanced Filters</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.compareButton}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        setCompareDataModelVisible(!compareDataModelVisible);
                    }}>
                    <Text style={styles.filterText}>Compare Data</Text>
                </TouchableOpacity>
            </View>
            {/* Custom Filter Model */}
            <Modal
                visible={customFilterModelVisible}
                animationType="slide"
                transparent={true}
                onPress={() => {
                    setCustomFilterModelVisible(!customFilterModelVisible);
                }}>
                <CustomFilterModel
                    timeData={time}
                    typeData={type}
                    setCustomFilterModelVisible={setCustomFilterModelVisible}
                    selectedTime={selectedTime}
                    setSelectedTime={setSelectedTime}
                    selectedTimeValue={selectedTimeValue}
                    setSelectedTimeValue={setSelectedTimeValue}
                    selectedType={selectedType}
                    setSelectedType={setSelectedType}
                    selectedTypeValue={selectedTypeValue}
                    setSelectedTypeValue={setSelectedTypeValue}
                    updateGraphData={updateGraphData}
                />
            </Modal>
            {/* Advanced Filter Model */}
            <Modal
                visible={advancedFilterModelVisible}
                animationType="slide"
                transparent={true}>
                <AdvancedFilterModel
                    timeLine={timeLine}
                    year={year}
                    month={month}
                    date={date}
                    count={count}
                    setAdvancedFilterModelVisible={setAdvancedFilterModelVisible}
                />
            </Modal>
            {/* Compare Data Model */}
            <Modal
                visible={compareDataModelVisible}
                animationType="fade"
                transparent={true}>
                <CompareDataModel
                    timeLine={timeLine}
                    year={year}
                    month={month}
                    date={date}
                    setCompareDataModelVisible={setCompareDataModelVisible}
                />
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    mainBox: {
        flex: 1,
        margin: 10,
        borderRadius: 20,
        borderWidth: 2,
        backgroundColor: '#FFF49C',
        // alignItems: 'center'
    },
    filterBox: {
        backgroundColor: '#FFF49C',
        width: '50%',
        height: 50,
        borderWidth: 2,
        // marginTop: 30,
        borderRadius: 30,
        elevation: 25,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
    },
    filterText: {
        color: 'black',
        fontSize: 20,
        fontWeight: '500',
    },
    graphBox: {
        flex: 2,
        marginTop: 0,
        alignItems: 'center',
        // justifyContent: 'center'
    },
    compareButton: {
        flex: 1,
        marginTop: 50,
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        backgroundColor: '#EFDC75',
        width: '80%',
        height: 50,
        borderWidth: 2,
        // marginTop: 30,
        borderRadius: 30,
        elevation: 25,
    },
});

export default GraphScreen;
