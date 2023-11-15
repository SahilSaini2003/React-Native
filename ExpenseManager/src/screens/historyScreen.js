const { Text, View, StyleSheet, TouchableOpacity, Image, SectionList } = require("react-native");
import { useState } from 'react';

import ListViewMultipleSelect from '../components/listViewMultipleSelect.js';
import HistoryData from '../components/historyData.js'

function HistoryScreen({route, navigation}) {
  //Main data
  let {mainData}= route.params;

  callDataBreifScreen = (id) => {
    let itemData = mainData.filter((item)=>{
      return item.id == id;
    });
    console.log(itemData);
    navigation.navigate('Data - Breif', {itemData});
  }

  //States for activating and closing filter
  const [monthIsClicked, setMonthIsClicked] = useState(false);
  const [yearIsClicked, setYearIsClicked] = useState(false);
  const [transactionTypeIsClicked, setTransactionTypeIsClicked] = useState(false);

  //Data for Filters
  const month = [{ data: ['All', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'] }];
  const year = [{ data: ['All', '2022', '2023'] }]
  const transactionType = [{ data: ['All', 'Debit', 'Credit'] }]

  //Height of Filter Box
  const monthDilogBoxHeight = monthIsClicked ? ((month[0].data.length * 25) + 75) : 35;
  const yearDilogBoxHeight = yearIsClicked ? ((year[0].data.length * 25) + 75) : 35;
  const transactionTypeDilogBoxHeight = transactionTypeIsClicked ? ((transactionType[0].data.length * 25) + 75) : 35;

  //Function for fetching selected data
  fetchSelectedMonth = (monthArray) => {
    console.log(monthArray);
    setMonthIsClicked(false);
  }
  fetchSelectedYear = (yearArray) => {
    console.log(yearArray);
    setYearIsClicked(false);
  }
  fetchSelectedTransactionType = (transactionTypeArray) => {
    console.log(transactionTypeArray);
    setTransactionTypeIsClicked(false);
  }

  return (
    // <Text>HistoryScreen</Text>
    <View style={styles.main}>
      <View style={styles.mainBox}>
        <View style={styles.filterBox}>
          <View style={[styles.filterButton, { height: monthDilogBoxHeight }]}>
            <TouchableOpacity style={{ width: 100, height: 30, flexDirection: 'row', justifyContent: 'center' }} onPress={() => { setMonthIsClicked(!monthIsClicked) }}>
              <Text style={{ color: 'black', alignSelf: 'flex-start', fontSize: 20, marginLeft: 10 }}>Month</Text>
              {monthIsClicked ? (<Image source={require('../assets/images/down-arrow.png')} style={{ width: 20, height: 20, marginLeft: 6, marginTop: 6 }} />) : (<Image source={require('../assets/images/up-arrow.png')} style={{ width: 20, height: 20, marginLeft: 6, marginTop: 6 }} />)}
            </TouchableOpacity>
            {monthIsClicked ? (<ListViewMultipleSelect data={month} fetchSelectedData={this.fetchSelectedMonth}></ListViewMultipleSelect>) : null}
          </View>
          <View style={[styles.filterButton, { height: yearDilogBoxHeight }]}>
            <TouchableOpacity style={{ width: 100, height: 30, flexDirection: 'row', justifyContent: 'center' }} onPress={() => { setYearIsClicked(!yearIsClicked) }}>
              <Text style={{ color: 'black', alignSelf: 'flex-start', fontSize: 20, marginLeft: 10 }}>Year</Text>
              {yearIsClicked ? (<Image source={require('../assets/images/down-arrow.png')} style={{ width: 20, height: 20, marginLeft: 6, marginTop: 6 }} />) : (<Image source={require('../assets/images/up-arrow.png')} style={{ width: 20, height: 20, marginLeft: 6, marginTop: 6 }} />)}
            </TouchableOpacity>
            {yearIsClicked ? (<ListViewMultipleSelect data={year} fetchSelectedData={this.fetchSelectedYear}></ListViewMultipleSelect>) : null}
          </View>
          <View style={[styles.filterButton, { height: transactionTypeDilogBoxHeight }]}>
            <TouchableOpacity style={{ width: 100, height: 30, flexDirection: 'row', justifyContent: 'center' }} onPress={() => { setTransactionTypeIsClicked(!transactionTypeIsClicked) }}>
              <Text style={{ color: 'black', alignSelf: 'flex-start', fontSize: 20, marginLeft: 10 }}>T-Type</Text>
              {transactionTypeIsClicked ? (<Image source={require('../assets/images/down-arrow.png')} style={{ width: 20, height: 20, marginLeft: 6, marginTop: 6 }} />) : (<Image source={require('../assets/images/up-arrow.png')} style={{ width: 20, height: 20, marginLeft: 6, marginTop: 6 }} />)}
            </TouchableOpacity>
            {transactionTypeIsClicked ? (<ListViewMultipleSelect data={transactionType} fetchSelectedData={this.fetchSelectedTransactionType}></ListViewMultipleSelect>) : null}
          </View>
        </View>
        {/* <View style={styles.filterBreifBox}></View> */}
        <View style={styles.contentBox}>
          <HistoryData mainData={mainData} callDataBreifScreen={this.callDataBreifScreen}/>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  mainBox: {
    width: '95%',
    height: '95%',
    // margin: 10,
    backgroundColor: '#F3E0AC',
    borderWidth: 2,
    borderRadius: 10
  },
  filterBox: {
    flexDirection: 'row',
    // alignContent: 'space-between',
    // alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute'
  },
  filterButton: {
    backgroundColor: '#FFF49C',
    width: 110,
    // height: undefined,
    margin: 5,
    borderRadius: 10,
    borderWidth: 2,
    // justifyContent: 'space-between',
    // alignItems:'center',
    // flexDirection: 'row',
    // display: 'none'#F3E0AC
    zIndex: 1,
    // position: 'absolute'
  },
  filterBreifBox: {
    width: 15,
    height: 15,
    backgroundColor: 'blue',
    position: 'absolute',
    right: 10,
    left: 100,
    top: 100
  },
  contentBox: {
    flex: 1,
    borderTopWidth: 2,
    marginTop: 45,
    // backgroundColor: 'black'
  }

});

export default HistoryScreen;