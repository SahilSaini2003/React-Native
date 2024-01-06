import { Text, View, StyleSheet, TouchableOpacity, Image, Modal, Dimensions } from 'react-native';
import { BarChart, LineChart } from 'react-native-chart-kit';
import { useState } from 'react';
import _ from 'underscore';
import moment from 'moment-timezone';

import CustomFilterModel from '../components/customFilterModel.js';
import CompareDataModel from '../components/compareDataModel.js';
import AdvancedFilterModel from '../components/advancedFilterModel.js';
import { useDataContext } from '../context/dataContext';
import { ScrollView } from 'react-native-gesture-handler';

function GraphScreen({ route, navigation }) {
    let { mainData } = useDataContext();

    const type = [{ data: ['All', 'CREDIT', 'DEBIT'] }];
    const time = [{ data: ['Overall', 'Today', 'Yesterday', 'Last 15 Days', 'Last 30 Days', 'This Month', 'This Year'] }];
    const timeLine = [['Year By Year', 'Month By Month', 'Day By Day'], ['Year', 'Month', 'Day']];
    const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const dates = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]
    const hours = ['1.00 Hour','2.00 Hour','3.00 Hour','4.00 Hour','5.00 Hour','6.00 Hour','7.00 Hour','8.00 Hour','9.00 Hour', '10.00 Hour', '11.00 Hour', '12.00 Hour', '13.00 Hour', '14.00 Hour', '15.00 Hour', '16.00 Hour', '17.00 Hour', '18.00 Hour', '19.00 Hour', '20.00 Hour', '21.00 Hour', '22.00 Hour', '23.00 Hour', '24.00 Hour']

    const [customFilterModelVisible, setCustomFilterModelVisible] =
        useState(false);
    const [advancedFilterModelVisible, setAdvancedFilterModelVisible] =
        useState(false);
    const [compareDataModelVisible, setCompareDataModelVisible] = useState(false);

    const [selectedTime, setSelectedTime] = useState();
    const [selectedTimeValue, setSelectedTimeValue] = useState({});
    const [selectedType, setSelectedType] = useState();
    const [selectedTypeValue, setSelectedTypeValue] = useState({});

    const [messageFlag, setMessageFlag] = useState(false);
    const [message, setMessage] = useState('');


    customCalculator = (data, labelDecider) => {
        let gData = {};
        let label;
        let dataArray = [];
        switch (labelDecider) {
            case 0:
                label = [];
                _.map(month, (month) => {
                    if (data[month] != undefined) {
                        label.push(`${month}/${data[month][0].dateYear}`);
                    }
                })
                break;
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
        let totalAmount = 0;
        if (labelDecider == 0) {
            _.map(month, (month) => {
                if (data[month] != undefined) {
                    _.map(data[month], data => {
                        if (data.type == 'DEBIT') {
                            totalAmount = totalAmount - data.amount;
                        } else if (data.type == 'CREDIT') {
                            totalAmount = totalAmount + data.amount;
                        }
                    });
                    dataArray.push(totalAmount);
                }
            })
        }
        else {
            _.map(data, context => {
                _.map(context, data => {
                    if (data.type == 'DEBIT') {
                        totalAmount = totalAmount - data.amount;
                    } else if (data.type == 'CREDIT') {
                        totalAmount = totalAmount + data.amount;
                    }
                });
                dataArray.push(totalAmount);
            });
        }
        gData.labels = label;
        gData.datasets = [];
        let minValue = Math.min(...dataArray);
        let maxValue = Math.max(...dataArray);
        minValue = minValue > 0 ? minValue - (0.1 * minValue) : minValue + (0.1 * minValue);
        maxValue = maxValue > 0 ? maxValue + (0.1 * maxValue) : maxValue - (0.1 * maxValue);
        gData.datasets.push({ data: dataArray });
        gData.datasets.push({ data: [minValue], withDots: false });
        gData.datasets.push({ data: [maxValue], withDots: false });
        return gData;
    }

    const customDataChecker = (mainData) => {
        let finalData;
        let dummy = _.groupBy(mainData, 'dateYear');
        if (Object.keys(dummy).length > 1) {
            finalData = customCalculator(dummy, 1);
            return finalData;
        }
        else {
            dummy = _.groupBy(mainData, 'dateMonthString');
            if (Object.keys(dummy).length > 1) {
                finalData = customCalculator(dummy, 0);
                return finalData;
            }
            else {
                dummy = _.groupBy(mainData, 'dateDay');
                if (Object.keys(dummy).length > 1) {
                    finalData = customCalculator(dummy, 2);
                    return finalData;
                }
                else {
                    dummy = _.groupBy(mainData, 'dateHour');
                    if (Object.keys(dummy).length > 1) {
                        finalData = customCalculator(dummy, 3);
                        return finalData;
                    }
                    else {
                        dummy = _.groupBy(mainData, 'dateMinute');
                        if (Object.keys(dummy).length > 1) {
                            finalData = customCalculator(dummy, 4);
                            return finalData;
                        }
                        else {
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
            if (selectedTime != undefined) {
                switch (selectedTime) {
                    case 'Today':
                        data = _.filter(data, (item) => {
                            return `${item.dateYear}-${item.dateMonth}-${item.dateDay}` == moment.tz(moment(), 'Asia/Kolkata').format('YYYY-MM-DD');
                        })
                        break;
                    case 'Yesterday':
                        data = _.filter(data, (item) => {
                            return `${item.dateYear}-${item.dateMonth}-${item.dateDay}` == moment.tz(moment(), 'Asia/Kolkata').subtract(1, 'd').format('YYYY-MM-DD');
                        })
                        break;
                    case 'Last 15 Days':
                        data = _.filter(data, (item) => {
                            return `${item.dateYear}-${item.dateMonth}-${item.dateDay}` >= moment.tz(moment(), 'Asia/Kolkata').subtract(15, 'd').format('YYYY-MM-DD');
                        })
                        break;
                    case 'Last 30 Days':
                        data = _.filter(data, (item) => {
                            return `${item.dateYear}-${item.dateMonth}-${item.dateDay}` >= moment.tz(moment(), 'Asia/Kolkata').subtract(30, 'd').format('YYYY-MM-DD');
                        })
                        break;
                    case 'This Month':
                        data = _.filter(data, (item) => {
                            return `${item.dateYear}-${item.dateMonth}` == moment.tz(moment(), 'Asia/Kolkata').format('YYYY-MM');
                        })
                        break;
                    case 'This Year':
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
                        data = _.filter(data, (item) => {
                            return item.type == 'CREDIT';
                        })
                        break;
                    case 'DEBIT':
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

    function evaluateAdvancedFilterGraphData(year1, year2, month1, month2, day1, day2, type1, type2) {
        //single
        if (year1 != 'Select Year' && year2 == 'Select Year' && month1 == 'Select Month' && month2 == 'Select Month' && day1 == 'Select Date' && day2 == 'Select Date' && type1 != 'Select Type' && type2 == 'Select Type') {
            let data = _.filter(mainData, (data) => {
                if (type1 == 'BOTH') {
                    return data.dateYear == year1;
                }
                return data.dateYear == year1 && data.type == type1;
            })
            let graph = customDataChecker(data);
            setGraphData(graph);
        }
        if (year1 != 'Select Year' && year2 == 'Select Year' && month1 != 'Select Month' && month2 == 'Select Month' && day1 == 'Select Date' && day2 == 'Select Date' && type1 != 'Select Type' && type2 == 'Select Type') {
            let data = _.filter(mainData, (data) => {
                if (type1 == 'BOTH') {
                    return data.dateYear == year1 && data.dateMonthString == month1;
                }
                return data.dateYear == year1 && data.dateMonthString == month1 && data.type == type1;
            })
            let graph = customDataChecker(data);
            setGraphData(graph);
        }
        if (year1 != 'Select Year' && year2 == 'Select Year' && month1 != 'Select Month' && month2 == 'Select Month' && day1 != 'Select Date' && day2 == 'Select Date' && type1 != 'Select Type' && type2 == 'Select Type') {
            let data = _.filter(mainData, (data) => {
                if (type1 == 'BOTH') {
                    return data.dateYear == year1 && data.dateMonthString == month1;
                }
                return data.dateYear == year1 && data.dateMonthString == month1 && data.dateDay == day1 && data.type == type1;
            })
            let graph = customDataChecker(data);
            setGraphData(graph);
        }
        //range
        if (year1 != 'Select Year' && year2 != 'Select Year' && month1 == 'Select Month' && month2 == 'Select Month' && day1 == 'Select Date' && day2 == 'Select Date' && type1 == 'Select Type' && type2 != 'Select Type') {
            let data = _.filter(mainData, (data) => {
                if (type2 == 'BOTH') {
                    return data.dateYear >= year1 && data.dateYear <= year2;
                }
                return data.dateYear >= year1 && data.dateYear <= year2 && data.type == type2;
            })
            let graph = customDataChecker(data);
            setGraphData(graph);
        }
        if (year1 != 'Select Year' && year2 != 'Select Year' && month1 != 'Select Month' && month2 != 'Select Month' && day1 == 'Select Date' && day2 == 'Select Date' && type1 == 'Select Type' && type2 != 'Select Type') {
            // let filter1= `${year1}-${month1}`
            let data = _.filter(mainData, (data) => {
                if (type2 == 'BOTH') {
                    return `${data.dateYear}-${data.dateMonth}` >= `${year1}-${month1}` && `${data.dateYear}-${data.dateMonth}` <= `${year2}-${month2}`;
                }
                return `${data.dateYear}-${data.dateMonth}` >= `${year1}-${month1}` && `${data.dateYear}-${data.dateMonth}` <= `${year2}-${month2}` && data.type == type2;
            })
            let graph = customDataChecker(data);
            setGraphData(graph);
        }
        if (year1 != 'Select Year' && year2 != 'Select Year' && month1 != 'Select Month' && month2 != 'Select Month' && day1 != 'Select Date' && day2 != 'Select Date' && type1 == 'Select Type' && type2 != 'Select Type') {
            let data = _.filter(mainData, (data) => {
                if (type2 == 'BOTH') {
                    return `${data.dateYear}-${data.dateMonth}-${data.dateDay}` >= `${year1}-${month1}-${day1}` && `${data.dateYear}-${data.dateMonth}-${data.dateDay}` <= `${year2}-${month2}-${day2}`;
                }
                return `${data.dateYear}-${data.dateMonth}-${data.dateDay}` >= `${year1}-${month1}-${day1}` && `${data.dateYear}-${data.dateMonth}-${data.dateDay}` <= `${year2}-${month2}-${day2}` && data.type == type2;
            })
            let graph = customDataChecker(data);
            setGraphData(graph);
        }
    }

    function updateGraphData() {
        let data = evaluateCustomFilterGraphData();
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

    function evaluateCompareDataGraphData(year1, year2, month1, month2, day1, day2, type1, type2) {
        if (year1 != 'Select Year' && year2 != 'Select Year' && month1 == 'Select Month' && month2 == 'Select Month' && day1 == 'Select Date' && day2 == 'Select Date' && type1 != 'Select Type' && type2 != 'Select Type') {
            let gData = {};
            gData.labels = month;
            let data = _.filter(mainData, (data) => {
                if (type1 == 'BOTH') {
                    return data.dateYear == year1;
                }
                return data.dateYear == year1 && data.type == type1;
            })
            let graph = customCalculator(_.groupBy(data, 'dateMonthString'), 0);
            gData.datasets = [];
            let values = [];
            let amount = 0;
            _.map(month, (data) => {
                let i = 0;
                _.map(graph.labels, (item) => {
                    if (item.split('/')[0] == data) {
                        amount = graph.datasets[0].data[i]
                    }
                    i++;
                })
                values.push(amount);
            })
            gData.datasets.push({ 'data': values });
            values = [];

            data = _.filter(mainData, (data) => {
                if (type2 == 'BOTH') {
                    return data.dateYear == year2;
                }
                return data.dateYear == year2 && data.type == type2;
            })
            graph = customCalculator(_.groupBy(data, 'dateMonthString'), 0);
            amount = 0;
            _.map(month, (data) => {
                let i = 0;
                _.map(graph.labels, (item) => {
                    if (item.split('/')[0] == data) {
                        amount = graph.datasets[0].data[i]
                    }
                    i++;
                })
                values.push(amount);
            })
            gData.datasets.push({ 'data': values , color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})` });
            setGraphData(gData);
            return 'success'
        }
        if (year1 != 'Select Year' && year2 != 'Select Year' && month1 != 'Select Month' && month2 != 'Select Month' && day1 == 'Select Date' && day2 == 'Select Date' && type1 != 'Select Type' && type2 != 'Select Type') {
            let gData = {};
            gData.labels = dates;
            let data = _.filter(mainData, (data) => {
                if (type1 == 'BOTH') {
                    return data.dateYear == year1 && data.dateMonthString == month1;
                }
                return data.dateYear == year1 && data.dateMonthString == month1 && data.type == type1;
            })
            let graph = customCalculator(_.groupBy(data, 'dateDay'), 2);
            gData.datasets = [];
            let values = [];
            let amount = 0;
            _.map(dates, (data) => {
                let i = 0;
                _.map(graph.labels, (item) => {
                    if (item.split('-')[2] == data) {
                        amount = graph.datasets[0].data[i]
                    }
                    i++;
                })
                values.push(amount);
            })
            gData.datasets.push({ 'data': values });
            values = [];
            data = _.filter(mainData, (data) => {
                if (type2 == 'BOTH') {
                    return data.dateYear == year2 && data.dateMonthString == month2;
                }
                return data.dateYear == year2 && data.dateMonthString == month2 && data.type == type2;
            })
            graph = customCalculator(_.groupBy(data, 'dateDay'), 2);
            amount = 0;
            _.map(dates, (data) => {
                let i = 0;
                _.map(graph.labels, (item) => {
                    if (item.split('-')[2] == data) {
                        amount = graph.datasets[0].data[i]
                    }
                    i++;
                })
                values.push(amount);
            })
            gData.datasets.push({ 'data': values , color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})` });
            setGraphData(gData);
            return 'success'
        }
        if (year1 != 'Select Year' && year2 != 'Select Year' && month1 != 'Select Month' && month2 != 'Select Month' && day1 != 'Select Date' && day2 != 'Select Date' && type1 != 'Select Type' && type2 != 'Select Type') {
            let gData = {};
            gData.labels = hours;
            let data = _.filter(mainData, (data) => {
                if (type1 == 'BOTH') {
                    return data.dateYear == year1 && data.dateMonthString == month1 && data.dateDay == day1;
                }
                return data.dateYear == year1 && data.dateMonthString == month1 && data.dateDay == day1 && data.type == type1;
            })
            let graph = customCalculator(_.groupBy(data, 'dateHour'), 3);
            gData.datasets = [];
            let values = [];
            let amount = 0;
            _.map(hours, (data) => {
                let i = 0;
                _.map(graph.labels, (item) => {
                    if (item == data) {
                        amount = graph.datasets[0].data[i]
                    }
                    i++;
                })
                values.push(amount);
            })
            gData.datasets.push({ 'data': values });
            values = [];
            data = _.filter(mainData, (data) => {
                if (type2 == 'BOTH') {
                    return data.dateYear == year2 && data.dateMonthString == month2 && data.dateDay == day2;
                }
                return data.dateYear == year2 && data.dateMonthString == month2 && data.dateDay == day2 && data.type == type2;
            })
            graph = customCalculator(_.groupBy(data, 'dateHour'), 3);
            amount = 0;
            _.map(hours, (data) => {
                let i = 0;
                _.map(graph.labels, (item) => {
                    if (item == data) {
                        amount = graph.datasets[0].data[i]
                    }
                    i++;
                })
                values.push(amount);
            })
            gData.datasets.push({ 'data': values , color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})` });
            setGraphData(gData);
            return 'success'
        }
    }

    return (
        <View style={styles.mainBox}>
            <View style={styles.graphBox}>
                <Text>Bezier Line Chart</Text>
                <ScrollView horizontal={true}>
                    <LineChart
                        data={graphData}
                        // data={{
                        //         labels: ["January", "February", "March", "April", "May", "June"],
                        //         datasets: [
                        //             {
                        //                 data: [
                        //                     // 0,
                        //                     Math.random() * 100,
                        //                     Math.random() * 100,
                        //                     Math.random() * 100,
                        //                     Math.random() * 100,
                        //                     Math.random() * 100,
                        //                     Math.random() * 100 
                        //                 ],
                        //                 // color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`
                        //             },
                        //             {
                        //                 data: [
                        //                     // null,
                        //                     // null,
                        //                     Math.random() * 100,
                        //                     Math.random() * 100,
                        //                     Math.random() * 100,
                        //                     Math.random() * 100,
                        //                     Math.random() * 100,
                        //                     Math.random() * 100
                        //                 ],
                        //                 color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`
                        //             }
                        //         ]
                        //     }}

                        width={(Dimensions.get('window').width - 30) * 2} // from react-native
                        // width={700} // from react-native
                        height={300}
                        // yAxisLabel='₹'
                        yLabelsOffset={10}
                        // yAxisInterval={10}
                        xLabelsOffset={-10}
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
                        verticalLabelRotation={30}
                        // bezier
                        style={{
                            marginVertical: 8,
                            borderRadius: 16,
                        }}
                    />
                </ScrollView>
                {messageFlag ? <Text style={{ alignSelf: 'center', color: 'red', fontSize: 15 }}>{message}</Text> : null}
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
                    setAdvancedFilterModelVisible={setAdvancedFilterModelVisible}
                    evaluateAdvancedFilterGraphData={evaluateAdvancedFilterGraphData}
                />
            </Modal>
            {/* Compare Data Model */}
            <Modal
                visible={compareDataModelVisible}
                animationType="fade"
                transparent={true}>
                <CompareDataModel
                    timeLine={timeLine[0]}
                    setCompareDataModelVisible={setCompareDataModelVisible}
                    evaluateCompareDataGraphData={evaluateCompareDataGraphData}
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
