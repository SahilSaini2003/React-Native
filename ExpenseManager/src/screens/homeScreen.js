const { Text, View, StyleSheet, Modal, Image, TouchableOpacity, Pressable, TextInput, KeyboardAvoidingView, Platform, Keyboard, Alert } = require("react-native");
import { useEffect, useState } from 'react';
import moment from 'moment-timezone';

import { useDataContext } from '../context/dataContext';



function HomeScreen({ route, navigation }) {

    let { insertData, mainData } = useDataContext();
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
        let maxAllowdedDate = moment().subtract(5, 'Y').format('DD-MM-YYYY');

        /**
         * Date Should Not be greater than current date
         * Max 5 year data entry is allowded
         * jan march may july august octber decmber - 31
         * feb - 28 & 29
         * april june september nov - 30 
         */
        if (!date) {
            Alert.alert('Invalid Date!', 'Date Required!', [{ text: 'Okay!' },]);
            return;
        }
        const dateParts = date.split('-');

        let day = dateParts[2];
        let month = dateParts[1];
        let textMonth = new Date(date).toLocaleString('en-US', { month: 'long' });
        console.log(textMonth);
        let year = dateParts[0];
        if ( year.length != 4  || month.length != 2 || day.length != 2) {
            Alert.alert('Invalid Date!', 'Please Enter a valid Date! \n\t\t\tFormat(YYYY-MM-DD) \n\t\t\tExample :- 2020-05-02', [{ text: 'Okay!' },]);
            return;
        }
        if (month > 12 || month < 1) {
            Alert.alert('Invalid Month!', 'We only have 1 to 12 Months in a Year!', [{ text: 'Okay!' },]);
            return;
        }
        if (month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12) {
            if (day > 30) {
                let dummyDate = new Date(date);
                dummyDate.setMonth(month - 1);
                Alert.alert('Invalid Date!', `We only have 30 Days in ${dummyDate.toLocaleString('en-US', { month: 'long' })} Month!`, [{ text: 'Okay!' },]);
                return;
            }
        }
        if (month == 2) {
            let dummyDate = new Date(date);
            dummyDate.setMonth(month - 1);
            if (year % 4 == 0 && day > 29) {
                Alert.alert('Invalid Date!', `We only have 29 Days in ${dummyDate.toLocaleString('en-US', { month: 'long' })}/${year}!`, [{ text: 'Okay!' },]);
                return;
            }
            if (year % 4 != 0 && day > 28) {
                Alert.alert('Invalid Date!', `We only have 28 Days in ${dummyDate.toLocaleString('en-US', { month: 'long' })}/${year}!`, [{ text: 'Okay!' },]);
                return;
            }
        }
        if (month == 4 || month == 6 || month == 9 || month == 11) {
            if (day > 31) {
                let dummyDate = new Date(date);
                dummyDate.setMonth(month - 1);
                Alert.alert('Invalid Date!', `We only have 31 Days in ${dummyDate.toLocaleString('en-US', { month: 'long' })} Month!`, [{ text: 'Okay!' },]);
                return;
            }
        }
        if (date > moment().format('YYYY-MM-DD')) {
            Alert.alert('Invalid Date!', 'Sorry! But You can\'t add Future Transactions!', [{ text: 'Okay!' },]);
            return;
        }
        if (!amount) {
            Alert.alert('Invalid Amount!', 'Amount can be of Type Number Only!', [{ text: 'Okay!' },]);
            return;
        }
        if (title.length < 5) {
            Alert.alert('Title Required!', 'Min Length :- 5 & Max Lenght :- 15', [
                { text: 'Okay!' },
            ]);
            return;
        }
        insertData(amount, title, description == undefined ? null : description, type, date, day, textMonth, year);
        // console.log(mainData.length);
        // console.log(mainData);
        // insertData: (amount: number, title: string, description: string | null, type: string, date: string, dateDay: string, dateMonth: string, dateYear: string) => void;
        // insertData()
    }

    const [modelIsVisible, setModelIsVisible] = useState(false);
    const [type, setType] = useState();
    const [date, setDate] = useState(moment().format('YYYY-MM-DD hh:mm:ss'));
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
                                <TextInput placeholder='Date' placeholderTextColor={'#666362'} textAlign='center' maxLength={19} style={{ fontSize: 20, color: 'black' }} defaultValue={date} onChangeText={(text) => { setDate(text); }}></TextInput>
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
        width: '65%',
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