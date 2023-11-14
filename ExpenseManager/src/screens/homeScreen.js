const { Text, View, StyleSheet, Modal, Image, TouchableOpacity, Pressable, TextInput, KeyboardAvoidingView, Platform, Keyboard } = require("react-native");
import { useState } from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Icon from 'react-native-vector-icons/FontAwesome5';



function HomeScreen({ route, navigation }) {

    // componentWillMount = () => {
    //     this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
    //     this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
    // }

    // componentWillUnmount = () => {
    //     this.keyboardDidShowListener.remove();
    //     this.keyboardDidHideListener.remove();
    // }

    // _keyboardDidShow() {
    //     alert('Keyboard Shown');
    // }

    // _keyboardDidHide() {
    //     alert('Keyboard Hidden');
    // }

    callGraphScreen = () => {
        navigation.navigate('Progress');
    }

    const [modelIsVisible, setModelIsVisible] = useState(false);

    return (
        <View style={styles.main}>
            <View style={styles.portfolioBox}>
                {/* // My portfolio */}
                <TouchableOpacity style={styles.portfolioMainBox}>
                    <View style={{ flexDirection: 'row', marginHorizontal: 20, marginVertical: 30 }}>
                        <Text style={{ fontSize: 30, alignSelf: 'flex-start', color: 'black' }}>Overall Portfolio</Text>
                        <TouchableOpacity onPress={() => callGraphScreen()}>
                            <Image source={require('../assets/images/loupe.png')} style={{ width: 50, height: 50, marginHorizontal: 20 }} />
                        </TouchableOpacity>
                    </View>
                    <Text style={{ fontSize: 50, marginHorizontal: 20, alignSelf: 'flex-end', color: '#FF0000' }}>5000</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.debitCreditBox}>
                {/* // Debit Credit */}
                <TouchableOpacity style={styles.debitCreditMainBox}>
                    <Text style={{ fontSize: 20, margin: 15, alignSelf: 'flex-start', color: 'black' }}>Overall Debit</Text>
                    <Text style={{ fontSize: 30, margin: 15, alignSelf: 'flex-end', color: '#FF0000' }}>5000</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.debitCreditMainBox}>
                    <Text style={{ fontSize: 20, margin: 15, alignSelf: 'flex-start', color: 'black' }}>Overall Credit</Text>
                    <Text style={{ fontSize: 30, margin: 15, alignSelf: 'flex-end', color: '#0CF107' }}>5000</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.buttonBox}>
                {/* //Buttons */}
                <View style={styles.pressableView}>
                    <Pressable style={[styles.pressable, { backgroundColor: '#FF0000' }]} android_ripple={{ color: 'white', borderless: true }}>
                        <Text style={{ fontSize: 40, fontWeight: 'bold', color: 'white' }}>DEBIT</Text>
                    </Pressable>
                </View>
                <View style={styles.pressableView}>
                    <Pressable style={[styles.pressable, { backgroundColor: '#0CF107' }]} android_ripple={{ color: 'white', borderless: true }}>
                        <Text style={{ fontSize: 40, fontWeight: 'bold', color: 'black' }}>CREDIT</Text>
                    </Pressable>
                </View>
            </View>
            <Modal visible={true} animationType='slide' transparent={true}>
                <KeyboardAvoidingView
                    style={{ flex: 1, justifyContent: 'flex-end' }}
                    behavior={'padding'}
                    keyboardVerticalOffset={-1000}>
                    <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                        <View style={styles.modelView}>
                            <View style={{ width: 120, height: 35, backgroundColor: 'red', alignItems: "center", marginTop: 10, borderRadius: 20, borderWidth: 2, borderColor: 'black' }}>
                                <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>DEBIT</Text>
                            </View>
                            <View style={[styles.dataBox, styles.date]}>
                                <TextInput placeholder='Date' placeholderTextColor={'#666362'} textAlign='center' maxLength={10} style={{ fontSize: 20, color: 'black' }}></TextInput>
                            </View>
                            <View style={[styles.dataBox, styles.amount]}>
                                <TextInput placeholder='Enter Amount' placeholderTextColor={'#666362'} textAlign='center' keyboardType='number-pad' maxLength={8} style={{ fontSize: 20, color: 'black' }}></TextInput>
                                {/* <Icon name='rupee-sign' size={30} color={'black'} /> */}
                            </View>
                            <View style={[styles.dataBox, styles.title]}>
                                <TextInput placeholder='Enter Transacted Reason' placeholderTextColor={'#666362'} textAlign='center' maxLength={15} style={{ fontSize: 20, color: 'black' }}></TextInput>
                            </View>
                            <View style={[styles.dataBox, styles.description]}>
                                <TextInput multiline numberOfLines={5} placeholder='Enter Description(If needed)' placeholderTextColor={'#666362'} textAlign='center' maxLength={150} style={{ fontSize: 20, color: 'black', textAlignVertical: 'top' }}></TextInput>
                            </View>
                            <View style={{flex: 1, flexDirection: 'row', marginTop: 20}}>
                                <TouchableOpacity>
                                    <Image source={require('../assets/images/cross.png')} style={{width: 100, height: 100, borderRadius: 20, marginHorizontal: 20}} />
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <Image source={require('../assets/images/tick.png')} style={{width: 100, height: 100, borderRadius: 20,marginHorizontal: 20}} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </Modal >
        </View >
    );
}

const styles = StyleSheet.create({
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
    },
    modelView: {
        height: '80%',
        backgroundColor: '#F7D560',
        width: '100%',
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        borderWidth: 2,
        alignItems: 'center',
        flex: 0
    },
    dataBox: {
        backgroundColor: '#FFFDD0',
        width: '80%',
        marginTop: 20,
        borderBottomWidth: 2,
        height: 45,
    },
    date: {
        width: '50%',
        color: 'black',
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,
    },
    amount: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    // title: [

    // ],
    description: {
        // flex: 1
        height: 200,
        // marginBottom: 
    }
})

export default HomeScreen;