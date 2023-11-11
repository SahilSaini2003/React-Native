const { Text, View, StyleSheet, TouchableOpacity,Image } = require("react-native");
import { useState } from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

function HistoryScreen() {
  const [monthIsClicked, setMonthIsClicked] = useState(false);

  return (
    // <Text>HistoryScreen</Text>
    <View style={styles.main}>
      <View style={styles.mainBox}>
        <View style={styles.filterBox}>
          <View style={styles.filterButton}>
            <TouchableOpacity style={{width: 100, height: 30, flexDirection: 'row'}} onPress={()=>{setMonthIsClicked(!monthIsClicked)}}>
            <Text style={{ color: 'black', alignSelf: 'flex-start', fontSize: 20, marginLeft: 10}}>Month</Text>
            {monthIsClicked ? (<Image source={require('../assets/images/down-arrow.png')} style={{width: 20, height:20, marginLeft: 6, marginTop: 6}} />) : (<Image source={require('../assets/images/up-arrow.png')} style={{width: 20, height:20, marginLeft: 6, marginTop: 6}} />)}
            </TouchableOpacity>
            
          </View>
          <View style={styles.filterButton}>

          </View>
          <View style={styles.filterButton}>

          </View>
        </View>
        {/* <View style={styles.filterBreifBox}></View> */}
        <View style={styles.contentBox}>
        <View></View>
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
    alignContent: 'space-between',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute'

  },
  filterButton: {
    backgroundColor: '#FFF49C',
    width: 110,
    height: 100,
    margin: 5,
    borderRadius: 10,
    borderWidth: 2,
    justifyContent: 'space-between',
    // alignItems:'center',
    flexDirection: 'row'
  },
  filterBreifBox:{
    width: 15,
    height: 15,
    backgroundColor: 'blue',
    position:'absolute',
    right:10,
    left: 100,
    top: 100
  },
  contentBox: {
    flex: 1,
    borderTopWidth:2,
    marginTop: 45
    // backgroundColor: 'black'
  }

});

export default HistoryScreen;