const { Text, View, StyleSheet, Modal, Image, TouchableOpacity, Pressable, TextInput, KeyboardAvoidingView, Platform, Keyboard, Alert } = require("react-native");
import { useEffect, useState } from 'react';
import moment from 'moment-timezone';
import _, { isNull } from 'underscore';

import { useDataContext } from '../context/dataContext';



function HomeScreen({ route, navigation }) {

    let { verifyData, mainData } = useDataContext();

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
        if (mainData.length <= 2) {
            Alert.alert(
                'No Transaction Found!',
                'You require at least Two entries to access this feature.',
                [{ text: 'Okay!' }],
            );
            return;
        }
        navigation.navigate('Progress');
    }

    amountGenerator = (filteredData, type = null) => {
        let totalAmount = 0;
        if (type == null) {
            _.map(filteredData, (data) => {
                if (data.type == 'DEBIT') {
                    totalAmount = totalAmount - data.amount;
                } else if (data.type == 'CREDIT') {
                    totalAmount = totalAmount + data.amount;
                }
            })
        }
        if (type == 'CD') {
            _.map(filteredData, (data) => {
                totalAmount = totalAmount + data.amount;
            })
        }
        if (type == 'C') {
            let dummy = _.filter(filteredData, (data) => {
                return data.type == 'CREDIT'
            });
            _.map(dummy, (data) => {
                totalAmount = totalAmount + data.amount;
            })
        }
        if (type == 'D') {
            let dummy = _.filter(filteredData, (data) => {
                return data.type == 'DEBIT'
            });
            _.map(dummy, (data) => {
                totalAmount = totalAmount + data.amount;
            })
        }
        return totalAmount;
    }

    let resetVariable = () => {
        setType();
        setDate(moment.tz(moment(), 'Asia/Kolkata').format('YYYY-MM-DD hh:mm:ss'));
        setAmount();
        setTitle('');
        setDescription('');
    }

    const [modelIsVisible, setModelIsVisible] = useState(false);
    const [type, setType] = useState();
    const [date, setDate] = useState(moment.tz(moment(), 'Asia/Kolkata').format('YYYY-MM-DD hh-mm-ss'));
    const [amount, setAmount] = useState();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const [mainBoxCounter, setMainBoxCounter] = useState(1);
    const [mainBoxText, setMainBoxText] = useState('Overall');
    const [mainBoxTextFontSize, setMainBoxTextFontSize] = useState(30);
    const [mainBoxAmount, setMainBoxAmount] = useState(amountGenerator(mainData));

    const [creditBoxCounter, setCreditBoxCounter] = useState(1);
    const [creditBoxText, setCreditBoxText] = useState('Overall');
    const [creditBoxTextFontSize, setCreditBoxTextFontSize] = useState(20);
    const [creditBoxAmount, setCreditBoxAmount] = useState(amountGenerator(mainData, 'C'));

    const [debitBoxCounter, setDebitBoxCounter] = useState(1);
    const [debitBoxText, setDebitBoxText] = useState('Overall');
    const [debitBoxTextFontSize, setDebitBoxTextFontSize] = useState(20);
    const [debitBoxAmount, setDebitBoxAmount] = useState(amountGenerator(mainData, 'D'));


    mainBoxDataChanger = (check = null) => {
        let dummyCounter = mainBoxCounter;
        if (isNull(check)) {
            dummyCounter++;
        }
        if (dummyCounter == 1) {
            setMainBoxCounter(dummyCounter);
            setMainBoxText('Overall');
            setMainBoxTextFontSize(30);
            setMainBoxAmount(amountGenerator(mainData));
        }
        if (dummyCounter == 2) {
            setMainBoxCounter(dummyCounter);
            setMainBoxText('Today');
            setMainBoxTextFontSize(30);
            let data = _.filter(mainData, (item) => {
                return `${item.dateYear}-${item.dateMonth}-${item.dateDay}` == moment.tz(moment(), 'Asia/Kolkata').format('YYYY-MM-DD');
            })
            setMainBoxAmount(amountGenerator(data));
        }
        if (dummyCounter == 3) {
            setMainBoxCounter(dummyCounter);
            setMainBoxText('Yesterday');
            setMainBoxTextFontSize(27);
            let data = _.filter(mainData, (item) => {
                return `${item.dateYear}-${item.dateMonth}-${item.dateDay}` == moment.tz(moment(), 'Asia/Kolkata').subtract(1, 'd').format('YYYY-MM-DD');
            })
            setMainBoxAmount(amountGenerator(data));
        }
        if (dummyCounter == 4) {
            setMainBoxCounter(dummyCounter);
            setMainBoxText('Last 15 Days');
            setMainBoxTextFontSize(24);
            let data = _.filter(mainData, (item) => {
                return `${item.dateYear}-${item.dateMonth}-${item.dateDay}` >= moment.tz(moment(), 'Asia/Kolkata').subtract(15, 'd').format('YYYY-MM-DD');
            })
            setMainBoxAmount(amountGenerator(data));
        }
        if (dummyCounter == 5) {
            setMainBoxCounter(dummyCounter);
            setMainBoxText('Last 30 Days');
            setMainBoxTextFontSize(24);
            let data = _.filter(mainData, (item) => {
                return `${item.dateYear}-${item.dateMonth}-${item.dateDay}` >= moment.tz(moment(), 'Asia/Kolkata').subtract(30, 'd').format('YYYY-MM-DD');
            })
            setMainBoxAmount(amountGenerator(data));
        }
        if (dummyCounter == 6) {
            setMainBoxCounter(dummyCounter);
            setMainBoxText('This Month');
            setMainBoxTextFontSize(26);
            let data = _.filter(mainData, (item) => {
                return `${item.dateYear}-${item.dateMonth}` == moment.tz(moment(), 'Asia/Kolkata').format('YYYY-MM');
            })
            setMainBoxAmount(amountGenerator(data));
        }
        if (dummyCounter == 7) {
            setMainBoxCounter(dummyCounter);
            setMainBoxText('Last Month');
            setMainBoxTextFontSize(26);
            let data = _.filter(mainData, (item) => {
                return `${item.dateYear}-${item.dateMonth}` == moment.tz(moment(), 'Asia/Kolkata').subtract(1, 'M').format('YYYY-MM');
            })
            setMainBoxAmount(amountGenerator(data));
        }
        if (dummyCounter == 8) {
            setMainBoxCounter(dummyCounter);
            setMainBoxText('This Year');
            setMainBoxTextFontSize(28);
            let data = _.filter(mainData, (item) => {
                return `${item.dateYear}` == moment.tz(moment(), 'Asia/Kolkata').format('YYYY');
            })
            setMainBoxAmount(amountGenerator(data));
        }
        if (dummyCounter == 9) {
            setMainBoxCounter(0);
            setMainBoxText('Last Year');
            setMainBoxTextFontSize(28);
            let data = _.filter(mainData, (item) => {
                return `${item.dateYear}` == moment.tz(moment(), 'Asia/Kolkata').subtract(1, 'y').format('YYYY');
            })
            setMainBoxAmount(amountGenerator(data));
        }
    }
    crebitBoxDataChanger = (check = null) => {
        let dummyCounter = creditBoxCounter;
        if (isNull(check)) {
            dummyCounter++;
        }
        if (dummyCounter == 1) {
            setCreditBoxCounter(dummyCounter);
            setCreditBoxText('Overall');
            setCreditBoxTextFontSize(20);
            let data = _.filter(mainData, (item) => {
                return item.type == 'CREDIT';
            })
            setCreditBoxAmount(amountGenerator(data, 'CD'));
        }
        if (dummyCounter == 2) {
            setCreditBoxCounter(dummyCounter);
            setCreditBoxText('Today');
            setCreditBoxTextFontSize(20);
            let data = _.filter(mainData, (item) => {
                return item.type == 'CREDIT' && `${item.dateYear}-${item.dateMonth}-${item.dateDay}` == moment.tz(moment(), 'Asia/Kolkata').format('YYYY-MM-DD');
            })
            setCreditBoxAmount(amountGenerator(data, 'CD'));
        }
        if (dummyCounter == 3) {
            setCreditBoxCounter(dummyCounter);
            setCreditBoxText('Yesterday');
            setCreditBoxTextFontSize(18);
            let data = _.filter(mainData, (item) => {
                return item.type == 'CREDIT' && `${item.dateYear}-${item.dateMonth}-${item.dateDay}` == moment.tz(moment(), 'Asia/Kolkata').subtract(1, 'd').format('YYYY-MM-DD');
            })
            setCreditBoxAmount(amountGenerator(data, 'CD'));
        }
        if (dummyCounter == 4) {
            setCreditBoxCounter(dummyCounter);
            setCreditBoxText('Last 15 Days');
            setCreditBoxTextFontSize(15);
            let data = _.filter(mainData, (item) => {
                return item.type == 'CREDIT' && `${item.dateYear}-${item.dateMonth}-${item.dateDay}` >= moment.tz(moment(), 'Asia/Kolkata').subtract(15, 'd').format('YYYY-MM-DD');
            })
            setCreditBoxAmount(amountGenerator(data, 'CD'));
        }
        if (dummyCounter == 5) {
            setCreditBoxCounter(dummyCounter);
            setCreditBoxText('Last 30 Days');
            setCreditBoxTextFontSize(15);
            let data = _.filter(mainData, (item) => {
                return item.type == 'CREDIT' && `${item.dateYear}-${item.dateMonth}-${item.dateDay}` >= moment.tz(moment(), 'Asia/Kolkata').subtract(30, 'd').format('YYYY-MM-DD');
            })
            setCreditBoxAmount(amountGenerator(data, 'CD'));
        }
        if (dummyCounter == 6) {
            setCreditBoxCounter(dummyCounter);
            setCreditBoxText('This Month');
            setCreditBoxTextFontSize(17);
            let data = _.filter(mainData, (item) => {
                return item.type == 'CREDIT' && `${item.dateYear}-${item.dateMonth}` == moment.tz(moment(), 'Asia/Kolkata').format('YYYY-MM');
            })
            setCreditBoxAmount(amountGenerator(data, 'CD'));
        }
        if (dummyCounter == 7) {
            setCreditBoxCounter(dummyCounter);
            setCreditBoxText('Last Month');
            setCreditBoxTextFontSize(17);
            let data = _.filter(mainData, (item) => {
                return item.type == 'CREDIT' && `${item.dateYear}-${item.dateMonth}` == moment.tz(moment(), 'Asia/Kolkata').subtract(1, 'M').format('YYYY-MM');
            })
            setCreditBoxAmount(amountGenerator(data, 'CD'));
        }
        if (dummyCounter == 8) {
            setCreditBoxCounter(dummyCounter);
            setCreditBoxText('This Year');
            setCreditBoxTextFontSize(18);
            let data = _.filter(mainData, (item) => {
                return item.type == 'CREDIT' && `${item.dateYear}` == moment.tz(moment(), 'Asia/Kolkata').format('YYYY');
            })
            setCreditBoxAmount(amountGenerator(data, 'CD'));
        }
        if (dummyCounter == 9) {
            setCreditBoxCounter(0);
            setCreditBoxText('Last Year');
            setCreditBoxTextFontSize(18);
            let data = _.filter(mainData, (item) => {
                return item.type == 'CREDIT' && `${item.dateYear}` == moment.tz(moment(), 'Asia/Kolkata').subtract(1, 'y').format('YYYY');
            })
            setCreditBoxAmount(amountGenerator(data, 'CD'));
        }
    }
    debitBoxDataChanger = (check = null) => {
        let dummyCounter = debitBoxCounter;
        if (isNull(check)) {
            dummyCounter++;
        }
        if (dummyCounter == 1) {
            setDebitBoxCounter(dummyCounter);
            setDebitBoxText('Overall');
            setDebitBoxTextFontSize(20);
            let data = _.filter(mainData, (item) => {
                return item.type == 'DEBIT';
            })
            setDebitBoxAmount(amountGenerator(data, 'CD'));
        }
        if (dummyCounter == 2) {
            setDebitBoxCounter(dummyCounter);
            setDebitBoxText('Today');
            setDebitBoxTextFontSize(20);
            let data = _.filter(mainData, (item) => {
                return item.type == 'DEBIT' && `${item.dateYear}-${item.dateMonth}-${item.dateDay}` == moment.tz(moment(), 'Asia/Kolkata').format('YYYY-MM-DD');
            })
            setDebitBoxAmount(amountGenerator(data, 'CD'));
        }
        if (dummyCounter == 3) {
            setDebitBoxCounter(dummyCounter);
            setDebitBoxText('Yesterday');
            setDebitBoxTextFontSize(18);
            let data = _.filter(mainData, (item) => {
                return item.type == 'DEBIT' && `${item.dateYear}-${item.dateMonth}-${item.dateDay}` == moment.tz(moment(), 'Asia/Kolkata').subtract(1, 'd').format('YYYY-MM-DD');
            })
            setDebitBoxAmount(amountGenerator(data, 'CD'));
        }
        if (dummyCounter == 4) {
            setDebitBoxCounter(dummyCounter);
            setDebitBoxText('Last 15 Days');
            setDebitBoxTextFontSize(15);
            let data = _.filter(mainData, (item) => {
                return item.type == 'DEBIT' && `${item.dateYear}-${item.dateMonth}-${item.dateDay}` >= moment.tz(moment(), 'Asia/Kolkata').subtract(15, 'd').format('YYYY-MM-DD');
            })
            setDebitBoxAmount(amountGenerator(data, 'CD'));
        }
        if (dummyCounter == 5) {
            setDebitBoxCounter(dummyCounter);
            setDebitBoxText('Last 30 Days');
            setDebitBoxTextFontSize(15);
            let data = _.filter(mainData, (item) => {
                return item.type == 'DEBIT' && `${item.dateYear}-${item.dateMonth}-${item.dateDay}` >= moment.tz(moment(), 'Asia/Kolkata').subtract(30, 'd').format('YYYY-MM-DD');
            })
            setDebitBoxAmount(amountGenerator(data, 'CD'));
        }
        if (dummyCounter == 6) {
            setDebitBoxCounter(dummyCounter);
            setDebitBoxText('This Month');
            setDebitBoxTextFontSize(18);
            let data = _.filter(mainData, (item) => {
                return item.type == 'DEBIT' && `${item.dateYear}-${item.dateMonth}` == moment.tz(moment(), 'Asia/Kolkata').format('YYYY-MM');
            })
            setDebitBoxAmount(amountGenerator(data, 'CD'));
        }
        if (dummyCounter == 7) {
            setDebitBoxCounter(dummyCounter);
            setDebitBoxText('Last Month');
            setDebitBoxTextFontSize(18);
            let data = _.filter(mainData, (item) => {
                return item.type == 'DEBIT' && `${item.dateYear}-${item.dateMonth}` == moment.tz(moment(), 'Asia/Kolkata').subtract(1, 'M').format('YYYY-MM');
            })
            setDebitBoxAmount(amountGenerator(data, 'CD'));
        }
        if (dummyCounter == 8) {
            setDebitBoxCounter(dummyCounter);
            setDebitBoxText('This Year');
            setDebitBoxTextFontSize(18);
            let data = _.filter(mainData, (item) => {
                return item.type == 'DEBIT' && `${item.dateYear}` == moment.tz(moment(), 'Asia/Kolkata').format('YYYY');
            })
            setDebitBoxAmount(amountGenerator(data, 'CD'));
        }
        if (dummyCounter == 9) {
            setDebitBoxCounter(0);
            setDebitBoxText('Last Year');
            setDebitBoxTextFontSize(18);
            let data = _.filter(mainData, (item) => {
                return item.type == 'DEBIT' && `${item.dateYear}` == moment.tz(moment(), 'Asia/Kolkata').subtract(1, 'y').format('YYYY');
            })
            setDebitBoxAmount(amountGenerator(data, 'CD'));
        }
    }

    useEffect(() => {
        mainBoxDataChanger(1);
        crebitBoxDataChanger(1);
        debitBoxDataChanger(1);
    }, [mainData])

    // Overall, today, tomarrow, Last 15 Days, Last 30 Days, This Month, Last Month, This Year, Last Year
    return (
        <View style={styles.main}>
            <View style={styles.portfolioBox}>
                {/* // My portfolio */}
                <TouchableOpacity style={styles.portfolioMainBox} onPress={() => { mainBoxDataChanger() }}>
                    <View style={{ flexDirection: 'row', marginHorizontal: 20, marginVertical: 30 }}>
                        <Text style={{ fontSize: mainBoxTextFontSize, alignSelf: 'flex-start', color: 'black' }}>{mainBoxText} Portfolio</Text>
                        <TouchableOpacity onPress={() => callGraphScreen()}>
                            <Image source={require('../assets/images/loupe.png')} style={{ width: 50, height: 50, marginHorizontal: 20 }} />
                        </TouchableOpacity>
                    </View>
                    <Text style={{ fontSize: 50, marginHorizontal: 20, alignSelf: 'flex-end', color: 'black' }}>{mainBoxAmount}</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.debitCreditBox}>
                {/* // Debit Credit */}
                <TouchableOpacity style={styles.debitCreditMainBox} onPress={() => { debitBoxDataChanger() }}>
                    <Text style={{ fontSize: debitBoxTextFontSize, margin: 15, alignSelf: 'flex-start', color: 'black' }}>{debitBoxText} Debit</Text>
                    <Text style={{ fontSize: debitBoxAmount.toLocaleString().replaceAll(',', '').length < 9 ? 30 : 25, margin: 15, alignSelf: 'flex-end' }}>{debitBoxAmount}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.debitCreditMainBox} onPress={() => { crebitBoxDataChanger() }}>
                    <Text style={{ fontSize: creditBoxTextFontSize, margin: 15, alignSelf: 'flex-start', color: 'black' }}>{creditBoxText} Credit</Text>
                    <Text style={{ fontSize: creditBoxAmount.toLocaleString().replaceAll(',', '').length < 9 ? 30 : 25, margin: 15, alignSelf: 'flex-end' }}>{creditBoxAmount}</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.buttonBox}>
                {/* //Buttons */}
                <View style={styles.pressableView}>
                    <Pressable style={[styles.pressable, { backgroundColor: '#FF0000' }]} android_ripple={{ color: 'white', borderless: true }} onPress={() => { resetVariable(); setType('DEBIT'); setModelIsVisible(true); }}>
                        <Text style={{ fontSize: 40, fontWeight: 'bold', color: 'white' }}>DEBIT</Text>
                    </Pressable>
                </View>
                <View style={styles.pressableView}>
                    <Pressable style={[styles.pressable, { backgroundColor: '#0CF107' }]} android_ripple={{ color: 'white', borderless: true }} onPress={() => { resetVariable(); setType('CREDIT'); setModelIsVisible(true); }}>
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
                                <TouchableOpacity onPress={() => {
                                    let dataCheck = verifyData(amount, title, description, type, date, 1);
                                    if (dataCheck == 'success') {
                                        setModelIsVisible(false);
                                    }
                                }}>
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