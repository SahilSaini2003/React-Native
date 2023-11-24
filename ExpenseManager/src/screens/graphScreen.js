import { Text, View, StyleSheet, TouchableOpacity, Image, Modal } from 'react-native';

import CustomFilterModel from '../components/customFilterModel.js';
import CompareDataModel from '../components/compareDataModel.js'
import AdvancedFilterModel from '../components/advancedFilterModel.js'

function GraphScreen({ route, navigation }) {

    let { mainData } = route.params;
    const type = [{data :['All', 'Credit', 'Debit']}];
    const time = [{data :['Overall', 'Today', 'Tomarrow', 'Last 15 Days', 'Last 30 Days', 'This Month', 'This Year']}];
    const timeLine = ['Year By Year', 'Month By Month', 'Day By Day']
    const year = ['2023', '2003'];
    const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const date = [1,2,3,4];
    const count =['Single(One)', 'Range(From)'];

    const x = () => {
        console.log(mainData);
    }
    return (
        <View style={styles.mainBox}>
            <View style={styles.graphBox}>
                <Image source={require('../assets/images/javascript-line-charts-graphs.png')} style={{ width: '95%', height: 200 }} />
            </View>
            <View style={{ flexDirection: 'row', flex: 1 }}>
                <TouchableOpacity style={styles.filterBox}>
                    <Text style={styles.filterText}>Custom Filters</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.filterBox}>
                    <Text style={styles.filterText}>Advanced Filters</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.compareButton}>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.filterText}>Compare Data</Text>
                </TouchableOpacity>
            </View>
            {/* Custom Filter Model */}
            <Modal visible={false} animationType='slide' transparent={true}>
                <CustomFilterModel timeData={time} typeData={type}/>
            </Modal>
            {/* Advanced Filter Model */}
            <Modal visible={true} animationType='slide' transparent={true}>
                <AdvancedFilterModel timeLine={timeLine} year={year} month={month} date={date} count={count}/>
            </Modal>
            {/* Compare Data Model */}
            <Modal visible={false} animationType='fade' transparent={true}>
                <CompareDataModel timeLine={timeLine} year={year} month={month} date={date}/>
            </Modal>
        </View>
    )
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
        alignSelf: 'center'
    },
    filterText: {
        color: 'black',
        fontSize: 20,
        fontWeight: '500'
    },
    graphBox: {
        flex: 2,
        marginTop: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    compareButton: {
        flex: 1,
        marginTop: 50
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
    
})

export default GraphScreen;