const { Text, View, StyleSheet, Pressable } = require("react-native");
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

function HomeScreen() {

    return (
        <View style={style.main}>
            <View style={style.portfolioBox}>
                {/* // My portfolio */}
                <View style={style.portfolioMainBox}>
                    <Text>My Portfolio</Text>
                    <FontAwesome5 name='search' size={50} color='black' />
                    <Text>5000</Text>
                </View>
            </View>
            <View style={style.debitCreditBox}>
                {/* // Debit Credit */}
                <View style={style.debitCreditMainBox}>
                    <Text>Overall Credit</Text>
                    <Text>5000</Text>
                </View>
                <View style={style.debitCreditMainBox}>
                    <Text>Overall Debit</Text>
                    <Text>5000</Text>
                </View>
            </View>
            <View style={style.buttonBox}>
                {/* //Buttons */}
                {/* <View style={style.pressableView}>
                <Pressable android_ripple={{ color: '#F08000', radius: 100,foreground: true}} style={style.pressable}>
                    <View style={style.buttonMainBox}> */}
                {/* <Text style={styles.text}>{props.title}</Text> */}
                {/* </View>
                </Pressable>
                </View> */}
                {/* <Pressable android_ripple={{ color: '#F08000', borderless: true }} style={style.pressable}>
                    <View style={style.buttonMainBox}>
                        {/* <Text style={styles.text}>{props.title}</Text> */}
                {/* </View>
                </Pressable> */}
                <View style={{
                    flex: 1,
                    // position: 'absolute',
                    bottom: 250,
                    borderRadius: 100,
                    overflow: 'hidden',
                    alignSelf: 'center',
                    width: '90%'
                }}>
                    <Pressable
                        style={{
                            height: 100,
                            width: '90%',
                            borderRadius: 50,
                            backgroundColor: 'red',
                            justifyContent: 'center',
                            alignItems: 'center',
                            elevation: 4,
                        }}
                        android_ripple={{
                            color: 'black',
                        }}
                        onPress={() => { console.log('om') }}>
                        <Text>O</Text>
                    </Pressable>
                </View>
                <View style={{
                    flex: 1,
                    // position: 'absolute',
                    bottom: 250,
                    borderRadius: 50,
                    overflow: 'hidden',
                    alignSelf: 'center',
                    width: '100%'
                }}>
                    <Pressable
                        style={{
                            height: 100,
                            width: '100%',
                            borderRadius: 50,
                            backgroundColor: 'red',
                            justifyContent: 'center',
                            alignItems: 'center',
                            elevation: 4,
                        }}
                        android_ripple={{
                            color: 'black',
                        }}
                        onPress={() => { console.log('om') }}>
                        <Text>O</Text>
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
        justifyContent: 'space-betweem',
        flexDirection: 'row-reverse',
        // backgroundColor: 'blue'
    },
    pressableView: {
        width: '95%',
        height: '80%',
        borderRadius: 200
    },
    pressable: {
        // flex:1,
        width: '45%',
        height: '60%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'black',
        borderRadius: 25
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