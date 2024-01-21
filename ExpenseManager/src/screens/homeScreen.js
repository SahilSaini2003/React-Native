const {
    Text,
    View,
    StyleSheet,
    Modal,
    Image,
    TouchableOpacity,
    Pressable,
    TextInput,
    KeyboardAvoidingView,
    Platform,
    Keyboard,
    Alert,
    ScrollView
} = require('react-native');
import { useEffect, useState } from 'react';
import moment from 'moment-timezone';
import _,{isNull} from 'underscore';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

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
            },
        );
        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                setKeyboardActive(false);
            },
        );
        //Clean up listeners when the component unmounts
        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);

    callGraphScreen = () => {
        if (mainData.length < 2) {
            Alert.alert(
                'No Transaction Found!',
                'You require at least Two entries to access this feature.',
                [{ text: 'Okay!' }],
            );
            return;
        }
        navigation.navigate('Progress');
    };

    amountGenerator = (filteredData, type = null) => {
        let totalAmount = 0;
        if (type == null) {
            _.map(filteredData, data => {
                if (data.type == 'DEBIT') {
                    totalAmount = totalAmount - data.amount;
                } else if (data.type == 'CREDIT') {
                    totalAmount = totalAmount + data.amount;
                }
            });
        }
        if (type == 'CD') {
            _.map(filteredData, data => {
                totalAmount = totalAmount + data.amount;
            });
        }
        if (type == 'C') {
            let dummy = _.filter(filteredData, data => {
                return data.type == 'CREDIT';
            });
            _.map(dummy, data => {
                totalAmount = totalAmount + data.amount;
            });
        }
        if (type == 'D') {
            let dummy = _.filter(filteredData, data => {
                return data.type == 'DEBIT';
            });
            _.map(dummy, data => {
                totalAmount = totalAmount + data.amount;
            });
        }
        return totalAmount;
    };

    let resetVariable = () => {
        setType();
        setDate(moment.tz(moment(), 'Asia/Kolkata').format('YYYY-MM-DD hh:mm:ss'));
        setAmount();
        setTitle('');
        setDescription('');
    };

    const [modelIsVisible, setModelIsVisible] = useState(false);
    const [type, setType] = useState();
    const [date, setDate] = useState(
        moment.tz(moment(), 'Asia/Kolkata').format('YYYY-MM-DD hh-mm-ss'),
    );
    const [amount, setAmount] = useState();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const [mainBoxCounter, setMainBoxCounter] = useState(1);
    const [mainBoxText, setMainBoxText] = useState('Overall');
    const [mainBoxTextFontSize, setMainBoxTextFontSize] = useState(28);
    const [mainBoxAmount, setMainBoxAmount] = useState(amountGenerator(mainData));

    const [creditBoxCounter, setCreditBoxCounter] = useState(1);
    const [creditBoxText, setCreditBoxText] = useState('Overall');
    const [creditBoxTextFontSize, setCreditBoxTextFontSize] = useState(19);
    const [creditBoxAmount, setCreditBoxAmount] = useState(
        amountGenerator(mainData, 'C'),
    );

    const [debitBoxCounter, setDebitBoxCounter] = useState(1);
    const [debitBoxText, setDebitBoxText] = useState('Overall');
    const [debitBoxTextFontSize, setDebitBoxTextFontSize] = useState(19);
    const [debitBoxAmount, setDebitBoxAmount] = useState(
        amountGenerator(mainData, 'D'),
    );

    mainBoxDataChanger = (check = null) => {
        let dummyCounter = mainBoxCounter;
        if (isNull(check)) {
            dummyCounter++;
        }
        if (dummyCounter == 1) {
            setMainBoxCounter(dummyCounter);
            setMainBoxText('Overall');
            setMainBoxTextFontSize(28);
            setMainBoxAmount(amountGenerator(mainData));
        }
        if (dummyCounter == 2) {
            setMainBoxCounter(dummyCounter);
            setMainBoxText('Today');
            setMainBoxTextFontSize(28);
            let data = _.filter(mainData, item => {
                return (
                    `${item.dateYear}-${item.dateMonth}-${item.dateDay}` ==
                    moment.tz(moment(), 'Asia/Kolkata').format('YYYY-MM-DD')
                );
            });
            setMainBoxAmount(amountGenerator(data));
        }
        if (dummyCounter == 3) {
            setMainBoxCounter(dummyCounter);
            setMainBoxText('Yesterday');
            setMainBoxTextFontSize(24);
            let data = _.filter(mainData, item => {
                return (
                    `${item.dateYear}-${item.dateMonth}-${item.dateDay}` ==
                    moment
                        .tz(moment(), 'Asia/Kolkata')
                        .subtract(1, 'd')
                        .format('YYYY-MM-DD')
                );
            });
            setMainBoxAmount(amountGenerator(data));
        }
        if (dummyCounter == 4) {
            setMainBoxCounter(dummyCounter);
            setMainBoxText('Last 15 Days');
            setMainBoxTextFontSize(21);
            let data = _.filter(mainData, item => {
                return (
                    `${item.dateYear}-${item.dateMonth}-${item.dateDay}` >=
                    moment
                        .tz(moment(), 'Asia/Kolkata')
                        .subtract(15, 'd')
                        .format('YYYY-MM-DD')
                );
            });
            setMainBoxAmount(amountGenerator(data));
        }
        if (dummyCounter == 5) {
            setMainBoxCounter(dummyCounter);
            setMainBoxText('Last 30 Days');
            setMainBoxTextFontSize(21);
            let data = _.filter(mainData, item => {
                return (
                    `${item.dateYear}-${item.dateMonth}-${item.dateDay}` >=
                    moment
                        .tz(moment(), 'Asia/Kolkata')
                        .subtract(30, 'd')
                        .format('YYYY-MM-DD')
                );
            });
            setMainBoxAmount(amountGenerator(data));
        }
        if (dummyCounter == 6) {
            setMainBoxCounter(dummyCounter);
            setMainBoxText('This Month');
            setMainBoxTextFontSize(23);
            let data = _.filter(mainData, item => {
                return (
                    `${item.dateYear}-${item.dateMonth}` ==
                    moment.tz(moment(), 'Asia/Kolkata').format('YYYY-MM')
                );
            });
            setMainBoxAmount(amountGenerator(data));
        }
        if (dummyCounter == 7) {
            setMainBoxCounter(dummyCounter);
            setMainBoxText('Last Month');
            setMainBoxTextFontSize(23);
            let data = _.filter(mainData, item => {
                return (
                    `${item.dateYear}-${item.dateMonth}` ==
                    moment.tz(moment(), 'Asia/Kolkata').subtract(1, 'M').format('YYYY-MM')
                );
            });
            setMainBoxAmount(amountGenerator(data));
        }
        if (dummyCounter == 8) {
            setMainBoxCounter(dummyCounter);
            setMainBoxText('This Year');
            setMainBoxTextFontSize(24);
            let data = _.filter(mainData, item => {
                return (
                    `${item.dateYear}` ==
                    moment.tz(moment(), 'Asia/Kolkata').format('YYYY')
                );
            });
            setMainBoxAmount(amountGenerator(data));
        }
        if (dummyCounter == 9) {
            setMainBoxCounter(0);
            setMainBoxText('Last Year');
            setMainBoxTextFontSize(24);
            let data = _.filter(mainData, item => {
                return (
                    `${item.dateYear}` ==
                    moment.tz(moment(), 'Asia/Kolkata').subtract(1, 'y').format('YYYY')
                );
            });
            setMainBoxAmount(amountGenerator(data));
        }
    };
    crebitBoxDataChanger = (check = null) => {
        let dummyCounter = creditBoxCounter;
        if (isNull(check)) {
            dummyCounter++;
        }
        if (dummyCounter == 1) {
            setCreditBoxCounter(dummyCounter);
            setCreditBoxText('Overall');
            setCreditBoxTextFontSize(19);
            let data = _.filter(mainData, item => {
                return item.type == 'CREDIT';
            });
            setCreditBoxAmount(amountGenerator(data, 'CD'));
        }
        if (dummyCounter == 2) {
            setCreditBoxCounter(dummyCounter);
            setCreditBoxText('Today');
            setCreditBoxTextFontSize(19);
            let data = _.filter(mainData, item => {
                return (
                    item.type == 'CREDIT' &&
                    `${item.dateYear}-${item.dateMonth}-${item.dateDay}` ==
                    moment.tz(moment(), 'Asia/Kolkata').format('YYYY-MM-DD')
                );
            });
            setCreditBoxAmount(amountGenerator(data, 'CD'));
        }
        if (dummyCounter == 3) {
            setCreditBoxCounter(dummyCounter);
            setCreditBoxText('Yesterday');
            setCreditBoxTextFontSize(17);
            let data = _.filter(mainData, item => {
                return (
                    item.type == 'CREDIT' &&
                    `${item.dateYear}-${item.dateMonth}-${item.dateDay}` ==
                    moment
                        .tz(moment(), 'Asia/Kolkata')
                        .subtract(1, 'd')
                        .format('YYYY-MM-DD')
                );
            });
            setCreditBoxAmount(amountGenerator(data, 'CD'));
        }
        if (dummyCounter == 4) {
            setCreditBoxCounter(dummyCounter);
            setCreditBoxText('Last 15 Days');
            setCreditBoxTextFontSize(14);
            let data = _.filter(mainData, item => {
                return (
                    item.type == 'CREDIT' &&
                    `${item.dateYear}-${item.dateMonth}-${item.dateDay}` >=
                    moment
                        .tz(moment(), 'Asia/Kolkata')
                        .subtract(15, 'd')
                        .format('YYYY-MM-DD')
                );
            });
            setCreditBoxAmount(amountGenerator(data, 'CD'));
        }
        if (dummyCounter == 5) {
            setCreditBoxCounter(dummyCounter);
            setCreditBoxText('Last 30 Days');
            setCreditBoxTextFontSize(14);
            let data = _.filter(mainData, item => {
                return (
                    item.type == 'CREDIT' &&
                    `${item.dateYear}-${item.dateMonth}-${item.dateDay}` >=
                    moment
                        .tz(moment(), 'Asia/Kolkata')
                        .subtract(30, 'd')
                        .format('YYYY-MM-DD')
                );
            });
            setCreditBoxAmount(amountGenerator(data, 'CD'));
        }
        if (dummyCounter == 6) {
            setCreditBoxCounter(dummyCounter);
            setCreditBoxText('This Month');
            setCreditBoxTextFontSize(15);
            let data = _.filter(mainData, item => {
                return (
                    item.type == 'CREDIT' &&
                    `${item.dateYear}-${item.dateMonth}` ==
                    moment.tz(moment(), 'Asia/Kolkata').format('YYYY-MM')
                );
            });
            setCreditBoxAmount(amountGenerator(data, 'CD'));
        }
        if (dummyCounter == 7) {
            setCreditBoxCounter(dummyCounter);
            setCreditBoxText('Last Month');
            setCreditBoxTextFontSize(15);
            let data = _.filter(mainData, item => {
                return (
                    item.type == 'CREDIT' &&
                    `${item.dateYear}-${item.dateMonth}` ==
                    moment
                        .tz(moment(), 'Asia/Kolkata')
                        .subtract(1, 'M')
                        .format('YYYY-MM')
                );
            });
            setCreditBoxAmount(amountGenerator(data, 'CD'));
        }
        if (dummyCounter == 8) {
            setCreditBoxCounter(dummyCounter);
            setCreditBoxText('This Year');
            setCreditBoxTextFontSize(17);
            let data = _.filter(mainData, item => {
                return (
                    item.type == 'CREDIT' &&
                    `${item.dateYear}` ==
                    moment.tz(moment(), 'Asia/Kolkata').format('YYYY')
                );
            });
            setCreditBoxAmount(amountGenerator(data, 'CD'));
        }
        if (dummyCounter == 9) {
            setCreditBoxCounter(0);
            setCreditBoxText('Last Year');
            setCreditBoxTextFontSize(17);
            let data = _.filter(mainData, item => {
                return (
                    item.type == 'CREDIT' &&
                    `${item.dateYear}` ==
                    moment.tz(moment(), 'Asia/Kolkata').subtract(1, 'y').format('YYYY')
                );
            });
            setCreditBoxAmount(amountGenerator(data, 'CD'));
        }
    };
    debitBoxDataChanger = (check = null) => {
        let dummyCounter = debitBoxCounter;
        if (isNull(check)) {
            dummyCounter++;
        }
        if (dummyCounter == 1) {
            setDebitBoxCounter(dummyCounter);
            setDebitBoxText('Overall');
            setDebitBoxTextFontSize(19);
            let data = _.filter(mainData, item => {
                return item.type == 'DEBIT';
            });
            setDebitBoxAmount(amountGenerator(data, 'CD'));
        }
        if (dummyCounter == 2) {
            setDebitBoxCounter(dummyCounter);
            setDebitBoxText('Today');
            setDebitBoxTextFontSize(19);
            let data = _.filter(mainData, item => {
                return (
                    item.type == 'DEBIT' &&
                    `${item.dateYear}-${item.dateMonth}-${item.dateDay}` ==
                    moment.tz(moment(), 'Asia/Kolkata').format('YYYY-MM-DD')
                );
            });
            setDebitBoxAmount(amountGenerator(data, 'CD'));
        }
        if (dummyCounter == 3) {
            setDebitBoxCounter(dummyCounter);
            setDebitBoxText('Yesterday');
            setDebitBoxTextFontSize(17);
            let data = _.filter(mainData, item => {
                return (
                    item.type == 'DEBIT' &&
                    `${item.dateYear}-${item.dateMonth}-${item.dateDay}` ==
                    moment
                        .tz(moment(), 'Asia/Kolkata')
                        .subtract(1, 'd')
                        .format('YYYY-MM-DD')
                );
            });
            setDebitBoxAmount(amountGenerator(data, 'CD'));
        }
        if (dummyCounter == 4) {
            setDebitBoxCounter(dummyCounter);
            setDebitBoxText('Last 15 Days');
            setDebitBoxTextFontSize(15);
            let data = _.filter(mainData, item => {
                return (
                    item.type == 'DEBIT' &&
                    `${item.dateYear}-${item.dateMonth}-${item.dateDay}` >=
                    moment
                        .tz(moment(), 'Asia/Kolkata')
                        .subtract(15, 'd')
                        .format('YYYY-MM-DD')
                );
            });
            setDebitBoxAmount(amountGenerator(data, 'CD'));
        }
        if (dummyCounter == 5) {
            setDebitBoxCounter(dummyCounter);
            setDebitBoxText('Last 30 Days');
            setDebitBoxTextFontSize(15);
            let data = _.filter(mainData, item => {
                return (
                    item.type == 'DEBIT' &&
                    `${item.dateYear}-${item.dateMonth}-${item.dateDay}` >=
                    moment
                        .tz(moment(), 'Asia/Kolkata')
                        .subtract(30, 'd')
                        .format('YYYY-MM-DD')
                );
            });
            setDebitBoxAmount(amountGenerator(data, 'CD'));
        }
        if (dummyCounter == 6) {
            setDebitBoxCounter(dummyCounter);
            setDebitBoxText('This Month');
            setDebitBoxTextFontSize(16);
            let data = _.filter(mainData, item => {
                return (
                    item.type == 'DEBIT' &&
                    `${item.dateYear}-${item.dateMonth}` ==
                    moment.tz(moment(), 'Asia/Kolkata').format('YYYY-MM')
                );
            });
            setDebitBoxAmount(amountGenerator(data, 'CD'));
        }
        if (dummyCounter == 7) {
            setDebitBoxCounter(dummyCounter);
            setDebitBoxText('Last Month');
            setDebitBoxTextFontSize(16);
            let data = _.filter(mainData, item => {
                return (
                    item.type == 'DEBIT' &&
                    `${item.dateYear}-${item.dateMonth}` ==
                    moment
                        .tz(moment(), 'Asia/Kolkata')
                        .subtract(1, 'M')
                        .format('YYYY-MM')
                );
            });
            setDebitBoxAmount(amountGenerator(data, 'CD'));
        }
        if (dummyCounter == 8) {
            setDebitBoxCounter(dummyCounter);
            setDebitBoxText('This Year');
            setDebitBoxTextFontSize(17);
            let data = _.filter(mainData, item => {
                return (
                    item.type == 'DEBIT' &&
                    `${item.dateYear}` ==
                    moment.tz(moment(), 'Asia/Kolkata').format('YYYY')
                );
            });
            setDebitBoxAmount(amountGenerator(data, 'CD'));
        }
        if (dummyCounter == 9) {
            setDebitBoxCounter(0);
            setDebitBoxText('Last Year');
            setDebitBoxTextFontSize(17);
            let data = _.filter(mainData, item => {
                return (
                    item.type == 'DEBIT' &&
                    `${item.dateYear}` ==
                    moment.tz(moment(), 'Asia/Kolkata').subtract(1, 'y').format('YYYY')
                );
            });
            setDebitBoxAmount(amountGenerator(data, 'CD'));
        }
    };

    useEffect(() => {
        mainBoxDataChanger(1);
        crebitBoxDataChanger(1);
        debitBoxDataChanger(1);
    }, [mainData]);

    return (
        <View style={styles.main}>
            <View style={styles.portfolioBox}>
                {/* // My portfolio */}
                <TouchableOpacity
                    style={styles.portfolioMainBox}
                    onPress={() => {
                        mainBoxDataChanger();
                    }}>
                    <View style={styles.mainBoxView}>
                        <View style={styles.mainBoxTextView}>
                            <Text
                                style={[
                                    styles.mainBoxText,
                                    { fontSize: scale(mainBoxTextFontSize) },
                                ]}>
                                {mainBoxText} Portfolio
                            </Text>
                        </View>
                        <View style={styles.mainBoxMagnifingImage}>
                            <TouchableOpacity onPress={() => callGraphScreen()}>
                                <Image
                                    source={require('../assets/images/loupe.png')}
                                    style={styles.magnifingImage}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.mainBoxAmountView}>
                        <Text style={styles.mainBoxAmount}>{mainBoxAmount}</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={styles.debitCreditBox}>
                {/* // Debit Credit */}
                <TouchableOpacity
                    style={styles.debitCreditMainBox}
                    onPress={() => {
                        debitBoxDataChanger();
                    }}>
                    <View style={styles.debitCreditTextView}>
                        <Text
                            style={[styles.debitCreditText, { fontSize: scale(debitBoxTextFontSize) }]}>
                            {debitBoxText} Debit
                        </Text>
                    </View>
                    <View style={styles.debitCreditAmountView}>
                        <Text
                            style={[
                                styles.debitCreditAmount,
                                {
                                    fontSize:
                                        debitBoxAmount.toLocaleString().replaceAll(',', '').length < 9
                                            ? scale(30)
                                            : scale(25),
                                },
                            ]}>
                            {debitBoxAmount}
                        </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.debitCreditMainBox}
                    onPress={() => {
                        crebitBoxDataChanger();
                    }}>
                    <View style={styles.debitCreditTextView}>
                        <Text
                            style={[styles.debitCreditText, { fontSize: scale(creditBoxTextFontSize) }]}>
                            {creditBoxText} Credit
                        </Text>
                    </View>
                    <View style={styles.debitCreditAmountView}>
                        <Text
                            style={[
                                styles.debitCreditAmount,
                                {
                                    fontSize:
                                        creditBoxAmount.toLocaleString().replaceAll(',', '').length <
                                            9
                                            ? scale(30)
                                            : scale(25),
                                },
                            ]}>
                            {creditBoxAmount}
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={styles.buttonBox}>
                {/* //Buttons */}
                <View style={styles.pressableView}>
                    <Pressable
                        style={[styles.pressable, { backgroundColor: '#FF0000' }]}
                        android_ripple={{ color: 'white', borderless: true }}
                        onPress={() => {
                            resetVariable();
                            setType('DEBIT');
                            setModelIsVisible(true);
                        }}>
                        <Text style={styles.buttonBoxText}>
                            DEBIT
                        </Text>
                    </Pressable>
                </View>
                <View style={styles.pressableView}>
                    <Pressable
                        style={[styles.pressable, { backgroundColor: '#0CF107' }]}
                        android_ripple={{ color: 'white', borderless: true }}
                        onPress={() => {
                            resetVariable();
                            setType('CREDIT');
                            setModelIsVisible(true);
                        }}>
                        <Text style={[styles.buttonBoxText, { color: 'black' }]}>
                            CREDIT
                        </Text>
                    </Pressable>
                </View>
            </View>
            <Modal visible={modelIsVisible} animationType="slide" transparent={true}>
                <KeyboardAvoidingView
                    style={styles.flexEnd1}
                    behavior={'padding'}
                    keyboardVerticalOffset={-1000}>
                    <View style={styles.flexEnd1}>
                        {/* <></> */}
                        <View
                            style={
                                isKeyboardActive
                                    ? [styles.modelView, { flex: 1 }]
                                    : [styles.modelView]
                            }>
                            <ScrollView style={{width: '100%', height: '100%'}}>
                                <View style={{width: '100%', alignItems: 'center', height: '100%'}} >
                                    {type == 'DEBIT' ? (
                                        <View style={[styles.typeButton, { backgroundColor: 'red' }]}>
                                            <Text
                                                style={styles.modelTypeText}>
                                                DEBIT
                                            </Text>
                                        </View>
                                    ) : (
                                        <View style={[styles.typeButton, { backgroundColor: '#0CF107' }]}>
                                            <Text
                                                style={[styles.modelTypeText, { color: 'black' }]}>
                                                CREDIT
                                            </Text>
                                        </View>
                                    )}
                                    <View style={[styles.dataBox, styles.date]}>
                                        <TextInput
                                            placeholder="Date"
                                            placeholderTextColor={'#666362'}
                                            textAlign="center"
                                            maxLength={19}
                                            style={{ fontSize: scale(18), color: 'black' }}
                                            defaultValue={date}
                                            onChangeText={text => {
                                                setDate(text);
                                            }}></TextInput>
                                    </View>
                                    <View style={[styles.dataBox, styles.amount]}>
                                        <TextInput
                                            placeholder="Enter Amount"
                                            placeholderTextColor={'#666362'}
                                            textAlign="center"
                                            keyboardType="number-pad"
                                            maxLength={8}
                                            style={{ fontSize: scale(18), color: 'black' }}
                                            onChangeText={text => {
                                                setAmount(parseInt(text));
                                            }}></TextInput>
                                    </View>
                                    <View style={[styles.dataBox, styles.title]}>
                                        <TextInput
                                            placeholder="Enter Transacted Reason"
                                            placeholderTextColor={'#666362'}
                                            textAlign="center"
                                            maxLength={15}
                                            style={{ fontSize: scale(20), color: 'black' }}
                                            onChangeText={text => {
                                                setTitle(text);
                                            }}></TextInput>
                                    </View>
                                    <View style={[styles.dataBox, styles.description]}>
                                        <ScrollView>
                                            <TextInput
                                                multiline
                                                numberOfLines={5}
                                                placeholder="Enter Description(If needed)"
                                                placeholderTextColor={'#666362'}
                                                textAlign="center"
                                                maxLength={150}
                                                style={{
                                                    fontSize: scale(20),
                                                    color: 'black',
                                                    textAlignVertical: 'top',
                                                }}
                                                onChangeText={text => {
                                                    setDescription(text);
                                                }}></TextInput>
                                        </ScrollView>
                                    </View>
                                    <View style={{ flex: 1, flexDirection: 'row', marginTop: scale(20) }}>
                                        <TouchableOpacity
                                            onPress={() => {
                                                setModelIsVisible(false);
                                            }}>
                                            <Image
                                                source={require('../assets/images/cross.png')}
                                                style={{
                                                    width: scale(100),
                                                    height: scale(100),
                                                    borderRadius: 20,
                                                    marginHorizontal: scale(20),
                                                }}
                                            />
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            onPress={() => {
                                                let dataCheck = verifyData(
                                                    amount,
                                                    title,
                                                    description,
                                                    type,
                                                    date,
                                                    1,
                                                );
                                                if (dataCheck == 'success') {
                                                    setModelIsVisible(false);
                                                }
                                            }}>
                                            <Image
                                                source={require('../assets/images/tick.png')}
                                                style={{
                                                    width: scale(100),
                                                    height: scale(100),
                                                    borderRadius: 20,
                                                    marginHorizontal: scale(20),
                                                }}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </ScrollView>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
    },
    mainBoxView: {
        flexDirection: 'row',
        marginHorizontal: moderateScale(20),
        marginTop: moderateScale(30),
        marginBottom: moderateScale(3),
        height: verticalScale(70),
        alignItems: 'flex-start',
    },
    mainBoxText: {
        alignSelf: 'flex-start',
        color: 'black',
        textAlign: 'center',
    },
    mainBoxTextView: {
        width: '83%',
        justifyContent: 'center',
    },
    mainBoxMagnifingImage: {
        width: '17%',
        justifyContent: 'center',
    },
    magnifingImage: {
        width: moderateScale(48),
        height: moderateScale(48),
    },
    mainBoxAmountView: {
        marginHorizontal: moderateScale(20),
        marginBottom: moderateScale(30),
        marginTop: moderateScale(3),
    },
    mainBoxAmount: {
        fontSize: scale(50),
        marginHorizontal: moderateScale(20),
        alignSelf: 'flex-end',
        color: 'black',
    },
    portfolioBox: {
        flex: 2,
        alignItems: 'center',
    },
    portfolioMainBox: {
        backgroundColor: '#FFF49C',
        width: '90%',
        marginTop: scale(15),
        height: '90%',
        borderRadius: scale(20),
        borderWidth: scale(2),
        elevation: 25,
    },
    debitCreditBox: {
        flex: 2,
        justifyContent: 'space-evenly',
        flexDirection: 'row-reverse',
        marginTop: verticalScale(15),
    },
    debitCreditMainBox: {
        backgroundColor: '#40E0D0',
        width: '45%',
        height: '60%',
        borderRadius: scale(25),
        borderWidth: scale(2),
        elevation: 25,
    },
    debitCreditTextView: {
        marginTop: scale(15),
        marginHorizontal: scale(13),
        height: verticalScale(50)
    },
    debitCreditText: {
        alignSelf: 'flex-start',
        color: 'black',
    },
    debitCreditAmountView: {
        marginHorizontal: scale(13),
        height: verticalScale(40)
    },
    debitCreditAmount: {
        alignSelf: 'flex-end',
    },
    buttonBox: {
        flex: 1,
        flexDirection: 'row-reverse',
    },
    buttonBoxText: {
        fontSize: scale(38),
        fontWeight: 'bold',
        color: 'white'
    },
    pressableView: {
        width: '45%',
        borderRadius: 50,
        margin: scale(8),
    },
    pressable: {
        width: '100%',
        height: verticalScale(60),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        borderWidth: 2,
        elevation: 25,
        backgroundColor: 'blue',
    },
    flexEnd1: {
        flex: 1,
        justifyContent: 'flex-end'
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
    modelTypeText: {
        color: 'white',
        fontSize: scale(20),
        fontWeight: 'bold'
    },
    dataBox: {
        backgroundColor: '#FFFDD0',
        width: '80%',
        marginTop: scale(18),
        borderBottomWidth: 2,
        height: scale(45),
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
        justifyContent: 'center',
    },
    description: {
        height: scale(180),
    },
    typeButton: {
        width: scale(120),
        height: scale(35),
        alignItems: 'center',
        marginTop: scale(10),
        borderRadius: 20,
        borderWidth: 2,
        borderColor: 'black',
    },
});

export default HomeScreen;
