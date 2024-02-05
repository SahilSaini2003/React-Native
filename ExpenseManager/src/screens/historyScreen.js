const {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
} = require('react-native');
import {useState} from 'react';
import _ from 'underscore';
import { scale, moderateScale, verticalScale } from 'react-native-size-matters';

import ListViewMultipleSelect from '../components/listViewMultipleSelect.js';
import HistoryData from '../components/historyData.js';
import {useDataContext} from '../context/dataContext';

function HistoryScreen({route, navigation}) {
  //Main data
  let {mainData, yearData = [], monthData = [], typeData = []} = useDataContext();

  callDataBreifScreen = id => {
    let itemData = mainData.filter(item => {
      return item.id == id;
    });
    navigation.navigate('Data - Breif', {itemData});
  };

  //States for activating and closing filter
  const [monthIsClicked, setMonthIsClicked] = useState(false);
  const [yearIsClicked, setYearIsClicked] = useState(false);
  const [transactionTypeIsClicked, setTransactionTypeIsClicked] =
    useState(false);

  //Data for Filters
  const month = [{data: ['All', ...monthData]}];
  const year = [{data: ['All', ...yearData]}];
  const transactionType = [{data: ['All', ...typeData]}];

  //Height of Filter Box
  const monthDilogBoxHeight = monthIsClicked
    ? month[0].data.length * 24 + 75
    : 35;
  const yearDilogBoxHeight = yearIsClicked ? year[0].data.length * 24 + 75 : 35;
  const transactionTypeDilogBoxHeight = transactionTypeIsClicked
    ? transactionType[0].data.length * 24 + 75
    : 35;

  //Function for fetching selected data
  const [monthSelectedData, setMonthSelectedData] = useState({});
  const [yearSelectedData, setYearSelectedData] = useState({});
  const [typeSelectedData, setTypeSelectedData] = useState({});

  const [monthArrayData, setMonthArrayData] = useState([]);
  const [yearArrayData, setYearArrayData] = useState([]);
  const [typeArrayData, setTypeArrayData] = useState([]);

  fetchSelectedMonth = (monthArray, selectedData) => {
    setMonthSelectedData({...selectedData});
    setMonthArrayData(monthArray);
    setMonthIsClicked(false);
    filterData(1, monthArray);
  };
  fetchSelectedYear = (yearArray, selectedData) => {
    setYearSelectedData({...selectedData});
    setYearArrayData(yearArray);
    setYearIsClicked(false);
    filterData(2, yearArray);
  };
  fetchSelectedTransactionType = (transactionTypeArray, selectedData) => {
    setTypeSelectedData({...selectedData});
    setTypeArrayData(transactionTypeArray);
    setTransactionTypeIsClicked(false);
    filterData(3, transactionTypeArray);
  };

  let [filteredData, setFilteredData] = useState([]);

  let filterData = (id, data) => {
    let dummyVariable = [];
    if (id === 1) {
      let dummyVariable2 = filterMonth(mainData, data);
      if (yearArrayData.length != 0) {
        dummyVariable2 = filterYear(
          data.length == 0 ? mainData : dummyVariable2,
          yearArrayData,
        );
      }
      if (typeArrayData.length != 0) {
        dummyVariable2 = filterType(
          data.length == 0
            ? dummyVariable2.length == 0
              ? mainData
              : dummyVariable2
            : dummyVariable2,
          typeArrayData,
        );
      }
      dummyVariable = dummyVariable2;
      setFilteredData(dummyVariable);
    }
    if (id === 2) {
      let dummyVariable2 = filterYear(mainData, data);
      if (monthArrayData.length != 0) {
        dummyVariable2 = filterMonth(
          data.length == 0 ? mainData : dummyVariable2,
          monthArrayData,
        );
      }
      if (typeArrayData.length != 0) {
        dummyVariable2 = filterType(
          data.length == 0
            ? dummyVariable2.length == 0
              ? mainData
              : dummyVariable2
            : dummyVariable2,
          typeArrayData,
        );
      }
      dummyVariable = dummyVariable2;
      setFilteredData(dummyVariable);
    }
    if (id === 3) {
      let dummyVariable2 = filterType(mainData, data);
      if (yearArrayData.length != 0) {
        dummyVariable2 = filterYear(
          data.length == 0 ? mainData : dummyVariable2,
          yearArrayData,
        );
      }
      if (monthArrayData.length != 0) {
        dummyVariable2 = filterMonth(
          data.length == 0
            ? dummyVariable2.length == 0
              ? mainData
              : dummyVariable2
            : dummyVariable2,
          monthArrayData,
        );
      }
      dummyVariable = dummyVariable2;
      setFilteredData(dummyVariable);
    }
  };

  function filterYear(mainData, data) {
    let dummyVariable = [];
    _.map(mainData, item => {
      _.map(data, filter => {
        if (item.dateYear == filter) {
          dummyVariable.push(item);
        }
      });
    });
    return dummyVariable;
  }

  function filterType(mainData, data) {
    let dummyVariable = [];
    _.map(mainData, item => {
      _.map(data, filter => {
        if (item.type == filter) {
          dummyVariable.push(item);
        }
      });
    });
    return dummyVariable;
  }

  function filterMonth(mainData, data) {
    let dummyVariable = [];
    _.map(mainData, item => {
      _.map(data, filter => {
        if (item.dateMonthString == filter) {
          dummyVariable.push(item);
        }
      });
    });
    return dummyVariable;
  }

  // History Data Screen Handler
  function HistoryDataSetter() {
    if(mainData.length == 0) {
      return (
        <Image
          source={require('../assets/images/emptyMainData.png')}
          style={{height: '100%', width: '100%'}}
        />
      );
    }
    else if (
      (monthArrayData.length != 0 ||
        yearArrayData.length != 0 ||
        typeArrayData.length != 0) &&
      filteredData.length == 0
    ) {
      return (
        <Image
          source={require('../assets/images/emptyData.png')}
          style={{height: '100%', width: '100%'}}
        />
      );
    } 
    else {
      return (
        <HistoryData
          mainData={filteredData.length != 0 ? filteredData : mainData}
          callDataBreifScreen={this.callDataBreifScreen}
        />
      );
    }
  }

  //Filter Model Handler
  const handelFilterDropdown = id => {
    if (id === 1) {
      setYearIsClicked(false);
      setTransactionTypeIsClicked(false);
    } else if (id === 2) {
      setMonthIsClicked(false);
      setTransactionTypeIsClicked(false);
    } else if (id === 3) {
      setMonthIsClicked(false);
      setYearIsClicked(false);
    }
  };

  return (
    <View style={styles.main}>
      <View style={styles.mainBox}>
        <View style={styles.filterBox}>
          <View style={[styles.filterButton, {height: monthDilogBoxHeight}]}>
            <TouchableOpacity
              style={styles.touchable}
              onPress={() => {
                setMonthIsClicked(!monthIsClicked);
                handelFilterDropdown(1);
              }}>
              <Text style={styles.text}>
                Month
              </Text>
              {monthIsClicked ? (
                <Image
                  source={require('../assets/images/down-arrow.png')}
                  style={styles.arrow}
                />
              ) : (
                <Image
                  source={require('../assets/images/up-arrow.png')}
                  style={styles.arrow}
                />
              )}
            </TouchableOpacity>
            {monthIsClicked ? (
              <ListViewMultipleSelect
                data={month}
                selectedData={monthSelectedData}
                arrayData={monthArrayData}
                fetchSelectedData={
                  this.fetchSelectedMonth
                }></ListViewMultipleSelect>
            ) : null}
          </View>
          <View style={[styles.filterButton, {height: yearDilogBoxHeight}]}>
            <TouchableOpacity
              style={styles.touchable}
              onPress={() => {
                setYearIsClicked(!yearIsClicked);
                handelFilterDropdown(2);
              }}>
              <Text style={styles.text}>
                Year
              </Text>
              {yearIsClicked ? (
                <Image
                  source={require('../assets/images/down-arrow.png')}
                  style={styles.arrow}
                />
              ) : (
                <Image
                  source={require('../assets/images/up-arrow.png')}
                  style={styles.arrow}
                />
              )}
            </TouchableOpacity>
            {yearIsClicked ? (
              <ListViewMultipleSelect
                data={year}
                selectedData={yearSelectedData}
                arrayData={yearArrayData}
                fetchSelectedData={
                  this.fetchSelectedYear
                }></ListViewMultipleSelect>
            ) : null}
          </View>
          <View
            style={[
              styles.filterButton,
              {height: transactionTypeDilogBoxHeight},
            ]}>
            <TouchableOpacity
              style={styles.touchable}
              onPress={() => {
                setTransactionTypeIsClicked(!transactionTypeIsClicked);
                handelFilterDropdown(3);
              }}>
              <Text
                style={styles.text}>
                T-Type
              </Text>
              {transactionTypeIsClicked ? (
                <Image
                  source={require('../assets/images/down-arrow.png')}
                  style={styles.arrow}
                />
              ) : (
                <Image
                  source={require('../assets/images/up-arrow.png')}
                  style={styles.arrow}
                />
              )}
            </TouchableOpacity >
            {transactionTypeIsClicked ? (
              <ListViewMultipleSelect
                data={transactionType}
                selectedData={typeSelectedData}
                arrayData={typeArrayData}
                fetchSelectedData={
                  this.fetchSelectedTransactionType
                }></ListViewMultipleSelect>
            ) : null}
          </View>
        </View>
        <View style={styles.contentBox}>
          <HistoryDataSetter />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainBox: {
    width: '95%',
    height: '95%',
    backgroundColor: '#F3E0AC',
    borderWidth: 2,
    borderRadius: 10,
  },
  filterBox: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    height: scale(40),
    position: 'relative',
    zIndex: 1
  },
  filterButton: {
    backgroundColor: '#FFF49C',
    width: scale(95),
    margin: scale(3),
    borderRadius: 10,
    borderWidth: 2,
  },
  contentBox: {
    flex: 1,
    borderTopWidth: 2,
  },
  arrow: {
    width: scale(20), 
    height: scale(20), 
    alignSelf: 'center'
  },
  touchable: {
    width: scale(95),
    height: scale(30),
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  text: {
    color: 'black',
    alignSelf: 'flex-start',
    fontSize: scale(20),
  }
});

export default HistoryScreen;
