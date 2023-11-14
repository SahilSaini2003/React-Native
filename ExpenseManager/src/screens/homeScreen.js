const { Text, View, StyleSheet, Pressable, Image, TouchableOpacity } = require("react-native");
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';



function HomeScreen({ route, navigation }) {

    callGraphScreen = () => {
        navigation.navigate('Progress');
    }

    return (
        <View style={style.main}>
            <View style={style.portfolioBox}>
                {/* // My portfolio */}
                <TouchableOpacity style={style.portfolioMainBox}>
                    <View style={{ flexDirection: 'row', marginHorizontal: 20, marginVertical: 30 }}>
                        <Text style={{ fontSize: 30, alignSelf: 'flex-start', color: 'black' }}>Overall Portfolio</Text>
                        <TouchableOpacity onPress={() => callGraphScreen()}>
                            <Image source={require('../assets/images/loupe.png')} style={{ width: 50, height: 50, marginHorizontal: 20 }} />
                        </TouchableOpacity>
                    </View>
                    <Text style={{ fontSize: 50, marginHorizontal: 20, alignSelf: 'flex-end', color: '#FF0000' }}>5000</Text>
                </TouchableOpacity>
            </View>
            <View style={style.debitCreditBox}>
                {/* // Debit Credit */}
                <TouchableOpacity style={style.debitCreditMainBox}>
                    <Text style={{ fontSize: 20, margin: 15, alignSelf: 'flex-start', color: 'black' }}>Overall Debit</Text>
                    <Text style={{ fontSize: 30, margin: 15, alignSelf: 'flex-end', color: '#FF0000' }}>5000</Text>
                </TouchableOpacity>
                <TouchableOpacity style={style.debitCreditMainBox}>
                    <Text style={{ fontSize: 20, margin: 15, alignSelf: 'flex-start', color: 'black' }}>Overall Credit</Text>
                    <Text style={{ fontSize: 30, margin: 15, alignSelf: 'flex-end', color: '#0CF107' }}>5000</Text>
                </TouchableOpacity>
            </View>
            <View style={style.buttonBox}>
                {/* //Buttons */}
                <View style={style.pressableView}>
                    <Pressable style={[style.pressable, { backgroundColor: '#FF0000' }]} android_ripple={{ color: 'white', borderless: true }}>
                        <Text style={{ fontSize: 40, fontWeight: 'bold', color: 'white' }}>DEBIT</Text>
                    </Pressable>
                </View>
                <View style={style.pressableView}>
                    <Pressable style={[style.pressable, { backgroundColor: '#0CF107' }]} android_ripple={{ color: 'white', borderless: true }}>
                        <Text style={{ fontSize: 40, fontWeight: 'bold', color: 'black' }}>CREDIT</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    );
}

const style = StyleSheet.create({
    main: {
        flex: 1,
        // backgroundColor: 'black'
    },
    portfolioBox: {
        flex: 2,
        alignItems: 'center',
        // verticalAlign: 'center'
        // backgroundColor: 'black'
    },
    portfolioMainBox: {
        // flex: 2,
        backgroundColor: '#FFF49C',
        width: '90%',
        marginTop: 15,
        height: '90%',
        borderRadius: 20,
        borderWidth: 2,
        elevation: 25
        // borderRadius: '10'
    },
    debitCreditBox: {
        flex: 2,
        justifyContent: 'space-evenly',
        flexDirection: 'row-reverse',
        marginTop: 15
        // backgroundColor: 'white'
    },
    debitCreditMainBox: {
        // flex: 1,
        backgroundColor: '#40E0D0',
        width: '45%',
        height: '60%',
        borderRadius: 25,
        borderWidth: 2,
        elevation: 25

    },
    buttonBox: {
        flex: 1,
        // justifyContent: 'space-betweem',
        flexDirection: 'row-reverse',
        // backgroundColor: 'blue'
    },
    pressableView: {
        width: '45%',
        height: '60%',
        borderRadius: 200,
        margin: 10,
        // marginEnd: 10,
        // backgroundColor: 'black'
    },
    pressable: {
        // flex:1,
        width: '100%',
        height: '95%',
        // margin: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 200,
        borderWidth: 2,
        elevation: 25,
        backgroundColor: 'blue',
        // borderRadius: 25
        // justifyContent: 'space-evenly',
        // flexDirection: 'row-reverse',
        // borderRadius: 25,
    },
    buttonMainBox: {
        backgroundColor: '#40E0D0',
        width: '100%',
        height: '85%',
        borderRadius: 25,
        borderWidth: 2,
        elevation: 25
    }
})

export default HomeScreen;