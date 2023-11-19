const { Text, View, StyleSheet, Modal, Image, TouchableOpacity, Pressable, TextInput, KeyboardAvoidingView, Platform, Keyboard, Alert } = require("react-native");
import { useEffect, useState } from 'react';
import moment from 'moment-timezone';

import { useDataContext } from '../context/dataContext'



function HomeScreen({ route, navigation }) {

    let { insertData, deleteData } = useDataContext();
    // Used to check weather keyboard is active or not
    const [isKeyboardActive, setKeyboardActive] = useState(false);
    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => {
                setKeyboardActive(true);
            }
        );
        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                setKeyboardActive(false);
            }
        );
        //Clean up listeners when the component unmounts
        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);

    callGraphScreen = () => {
        navigation.navigate('Progress');
    }

    let verifyData = () => {
        // setAmount(text);
        // let date = '18-10-2023';
        let maxAllowdedDate = moment().subtract(5,'Y').format('DD-MM-YYYY');

        /**
         * Date Should Not be greater than current date
         * Max 5 year data entry is allowded
         * jan march may july august octber decmber - 31
         * feb - 28 & 29
         * april june september nov - 30 
         */
        const dateParts = date.split('-');
        const formattedDate = new Date(`${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`);
        console.log(formattedDate);
        if (condition) {
            
        }
        
        if (!!isNaN(formattedDate.getTime())) {
            // This will run When Date is incorrect
            Alert.alert('Invalid Date!', 'Please Enter Date in Format(DD-MM-YYYY)!', [
                { text: 'Okay!' },
            ]);
            return;
        }
        if (!amount) {
            Alert.alert('Invalid Amount!', 'Amount can be of Type Number Only!', [
                { text: 'Okay!' },
            ]);
            return;
        }
        if (title.length < 5) {
            Alert.alert('Title Required!', 'Min Length :- 5 & Max Lenght :- 15', [
                { text: 'Okay!' },
            ]);
            return;
        }
        console.log(amount, title, description, type, date, dateParts[0], formattedDate.toLocaleString('en-US', {month: 'long'}), dateParts[2]);
        // insertData: (amount: number, title: string, description: string | null, type: string, date: string, dateDay: string, dateMonth: string, dateYear: string) => void;
        // insertData()
    }

    const [modelIsVisible, setModelIsVisible] = useState(false);
    const [type, setType] = useState();
    const [date, setDate] = useState(moment().format('DD-MM-YYYY'));
    const [amount, setAmount] = useState();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState();

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
                    <Pressable style={[styles.pressable, { backgroundColor: '#FF0000' }]} android_ripple={{ color: 'white', borderless: true }} onPress={() => { setType('DEBIT'); setModelIsVisible(true); }}>
                        <Text style={{ fontSize: 40, fontWeight: 'bold', color: 'white' }}>DEBIT</Text>
                    </Pressable>
                </View>
                <View style={styles.pressableView}>
                    <Pressable style={[styles.pressable, { backgroundColor: '#0CF107' }]} android_ripple={{ color: 'white', borderless: true }} onPress={() => { setType('CREDIT'); setModelIsVisible(true); }}>
                        <Text style={{ fontSize: 40, fontWeight: 'bold', color: 'black' }}>CREDIT</Text>
                    </Pressable>
                </View>
            </View>
            <Modal visible={modelIsVisible} animationType='slide' transparent={true}>
                <KeyboardAvoidingView
                    style={{ flex: 1, justifyContent: 'flex-end' }}
                    behavior={'padding'}
                    keyboardVerticalOffset={-1000}>
                    <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                        <View style={isKeyboardActive ? [styles.modelView, { flex: 1 }] : styles.modelView}>
                            {type == 'DEBIT' ?
                                (<View style={[styles.typeButton, { backgroundColor: 'red' }]}>
                                    <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>DEBIT</Text>
                                </View>) :
                                (<View style={[styles.typeButton, { backgroundColor: '#0CF107' }]}>
                                    <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>Credit</Text>
                                </View>)}
                            <View style={[styles.dataBox, styles.date]}>
                                <TextInput placeholder='Date' placeholderTextColor={'#666362'} textAlign='center' maxLength={10} style={{ fontSize: 20, color: 'black' }} defaultValue={date} onChangeText={(text) => { setDate(text); }}></TextInput>
                            </View>
                            <View style={[styles.dataBox, styles.amount]}>
                                <TextInput placeholder='Enter Amount' placeholderTextColor={'#666362'} textAlign='center' keyboardType='number-pad' maxLength={8} style={{ fontSize: 20, color: 'black' }} onChangeText={(text) => { setAmount(parseInt(text)); }}></TextInput>
                                {/* <Icon name='rupee-sign' size={30} color={'black'} /> */}
                            </View>
                            <View style={[styles.dataBox, styles.title]}>
                                <TextInput placeholder='Enter Transacted Reason' placeholderTextColor={'#666362'} textAlign='center' maxLength={15} style={{ fontSize: 20, color: 'black' }} onChangeText={(text) => { setTitle(text); }}></TextInput>
                            </View>
                            <View style={[styles.dataBox, styles.description]}>
                                <TextInput multiline numberOfLines={5} placeholder='Enter Description(If needed)' placeholderTextColor={'#666362'} textAlign='center' maxLength={150} style={{ fontSize: 20, color: 'black', textAlignVertical: 'top' }} onChangeText={(text) => { setDescription(text); }}></TextInput>
                            </View>
                            <View style={{ flex: 1, flexDirection: 'row', marginTop: 20 }}>
                                <TouchableOpacity onPress={() => { setModelIsVisible(false); }}>
                                    <Image source={require('../assets/images/cross.png')} style={{ width: 100, height: 100, borderRadius: 20, marginHorizontal: 20 }} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => { verifyData() }}>
                                    <Image source={require('../assets/images/tick.png')} style={{ width: 100, height: 100, borderRadius: 20, marginHorizontal: 20 }} />
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
        // backgroundColor: 'black',
        // overflow: 'scroll'
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
    },
    typeButton: {
        width: 120,
        height: 35,
        alignItems: "center",
        marginTop: 10,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: 'black'
    }
})

export default HomeScreen;