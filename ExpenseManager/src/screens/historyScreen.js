const { Text, View, StyleSheet } = require("react-native");
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

function HistoryScreen() {

  return (
    // <Text>HistoryScreen</Text>
    <View style={styles.main}>
      <View style={styles.mainBox}>
        <View style={styles.filterBox}>
          <View style={styles.filterButton}>
            <View>

            <Text style={{color:'black', alignSelf:'flex-start',fontSize:20, marginLeft: 10}}>Month</Text>
            </View>
            <View>

            <FontAwesome5 name='chevron-down' size={10} color={'black'} style={{alignSelf:'flex-end'}} />
            </View>
          </View>
          <View style={styles.filterButton}>

          </View>
          <View style={styles.filterButton}>
            
          </View>
        </View>
        <View style={styles.line}></View>
        <View></View>
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
    height:'95%',
    // margin: 10,
    backgroundColor: '#F3E0AC',
    borderWidth:2,
    borderRadius: 10
  },
  line:{
    // borderTopWidth: '100%'
    width: '100%',
    // height: 100,
    backgroundColor: 'black',
    // marginTop:30,
    borderWidth:1,
  },
  filterBox:{
    flexDirection: 'row',
    alignContent:'space-between',
    alignItems:'center',
    justifyContent:'center'
  },
  filterButton: {
    backgroundColor: '#FFF49C',
    width: 110,
    height: 30,
    margin: 5,
    borderRadius: 50,
    borderWidth: 2,
    // justifyContent: 'center',
    flexDirection: 'row'
  }

});

export default HistoryScreen;