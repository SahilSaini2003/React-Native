import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native'

function GraphScreen({ route, navigation }) {

    let { mainData } = route.params;
    const x = () => {
        console.log(mainData);
    }
    return (
        <View style={styles.mainBox}>
            <TouchableOpacity style={styles.filterBox}>
                <Text style={styles.filterText}>Filters</Text>
            </TouchableOpacity>
            <View style={styles.graphBox}>
                <Image source={require('../assets/images/javascript-line-charts-graphs.png')} style={{width: '95%', height: 200}} />
            </View>
            <View style={styles.compareButton}>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.filterText}>Compare Data</Text>
                </TouchableOpacity>
            </View>
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
        marginTop: 30,
        borderRadius: 30,
        elevation: 25,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center'
    },
    filterText: {
        color: 'black',
        fontSize: 30,
        fontWeight: '500'
    },
    graphBox: {
        flex: 3,
        // backgroundColor: 'black',
        marginTop: 30,
        alignItems:'center',
        justifyContent: 'center'
    },
    compareButton: {
        flex: 2
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        backgroundColor: '#EFDC75',
        width: '80%',
        height: 50,
        borderWidth: 2,
        marginTop: 30,
        borderRadius: 30,
        elevation: 25,
    }
})

export default GraphScreen;