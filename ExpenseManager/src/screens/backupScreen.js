import React, { useState } from 'react';
import { Text, TouchableOpacity, View, StyleSheet, Alert } from 'react-native';
import { scale } from 'react-native-size-matters';
import RNFetchBlob from 'rn-fetch-blob';
import { useDataContext } from '../context/dataContext';
import moment from 'moment-timezone';
import fs from 'react-native-fs';
import DocumentPicker from 'react-native-document-picker'
import _ from 'underscore'

function BackupScreen() {
    let { mainData, verifyData } = useDataContext();
    const [count, setCount] = useState(2)
    const [failed, setFailed] = useState(2);
    const [success, setSuccess] = useState(0);
    const [response, setResponse] = useState([{"reasonId": 2, "recordId": 0}, {"reasonId": 2, "recordId": 1}])
    const path = RNFetchBlob.fs.dirs.DownloadDir + '/' + 'Expense Manager';

    const reasons = [
        {id: 1, reasonDes: 'Unable to find Required Keys(amount, title, type, description, date)!'},
        {id: 2, reasonDes: 'Same Data Already Present!'},
        {id: 3, reasonDes: 'Invaild Data!'}
    ]

    async function createBackup() {
        let name = path + `/ExpenseBackup_${moment().format('YYYYMMDD_HHmmss')}.json`
        fs.writeFile(name, JSON.stringify(mainData), 'utf8')
            .then(() => {
                Alert.alert(
                    'Backup SuccessFull!',
                    'File Generated at\n' + name,
                    [{ text: 'Okay!' }],
                );
            })
            .catch((error) => {
                console.error('Error creating file:', error);
            });
    }

    async function handleGetFileList() {
        console.log('path', path);
        await RNFetchBlob.fs
            .isDir(path)
            .then(isDir => {
                console.log('isDir', isDir);
                if (isDir) {
                    createBackup();
                }
                else {
                    RNFetchBlob.fs
                        .mkdir(path)
                        .then(() => {
                            createBackup();
                        })
                        .catch(err => {
                            console.log(err);
                        });
                }
            })
            .catch(e => {
                console.log('Error isDir', e);
            });
    }

    async function uploadJson() {
        console.log('uploadJson');
        try {
            let res = [];
            let json = await DocumentPicker.pick();
            console.log('json', json);
            if (json[0].type == 'application/json') {
                let fileData = await fs.readFile(json[0].uri);
                fileData = JSON.parse(fileData);
                setCount(fileData.length);
                for (let i = 0; i < fileData.length; i++) {
                    let keyRes = await keysCheck(fileData[i]);
                    console.log('keyRes', keyRes);
                    if (keyRes == 'success') {
                        let sameRes = await checkSameData(fileData[i])
                        console.log('sameRes', sameRes);
                        if (sameRes == 'success') {
                            let verifyingData = verifyData(data.amount, data.title, data.description, data.type, data.date, 1);
                            if (verifyingData == 'success') {
                                setSuccess(success + 1);
                            }
                            else {
                                res = [...res, {reasonId: 3, recordId: i + 1}];
                                setFailed(failed + 1);
                            }
                        }
                        else {
                            res = [...res, {reasonId: 2, recordId: i + 1}];
                            setFailed(failed + 1);
                        }
                    }
                    else {
                        res = [...res, {reasonId: 1, recordId: i + 1}];
                        setFailed(failed + 1);
                    }
                }
                console.log(res);
                setResponse(res);
            }
        } catch (error) {
            if (DocumentPicker.isCancel(error)) {
                return;
            }
            else {
                Alert.alert(
                    'Error Occured',
                    error,
                    [{ text: 'Okay!' }],
                );
            }
        }
    }

    let keysCheck = (data) => {
        return new Promise((resolve, reject) => {
            console.log('keysCheck');
            let keys = Object.keys(data);
            if (
                keys.includes('amount') &&
                keys.includes('title') &&
                keys.includes('type') &&
                keys.includes('description') &&
                keys.includes('date')
            ) {
                return resolve('success');
            }
            else {
                return resolve('failed');
            }
        })
    }

    let checkSameData = (data) => {
        return new Promise((resolve, reject) => {
            let filterData = _.filter(mainData, (item) => {
                return item.amount == data.amount && item.title == data.title && item.type == data.type && item.description == data.description && item.date == data.date;
            })
            if (filterData.length == 0) {
                return resolve('success');
            }
            else {
                return resolve('failed');
            }
        })
    }

    return (
        <View style={styles.mainBox}>
            <TouchableOpacity style={styles.buttons} onPress={() => { handleGetFileList(); }}>
                <Text style={styles.text}>Generate Backup</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttons} onPress={() => { uploadJson(); }} >
                <Text style={styles.text}>Upload Backup</Text>
            </TouchableOpacity>
            <View>
                <Text>Upload Report</Text>
                <View>
                    <Text>Total Record Count :- <Text>{count}</Text></Text>
                </View>
                <View>
                    <Text>Success Count :- <Text>{success}</Text></Text>
                </View>
                <View>
                    <Text>Failure Count :- <Text>{failed}</Text></Text>
                    <Text>Reason</Text>
                    <Text>{reasons[0].reasonDes}</Text>
                    <Text>Record Number :- {_.map(response, (data) => { if (data.reasonId == 0) {
                        return data.recordId;
                    }})}</Text>
                    <Text>{reasons[1].reasonDes}</Text>
                    <Text>{reasons[2].reasonDes}</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    mainBox: {
        flex: 1,
        margin: scale(8),
        borderRadius: 20,
        borderWidth: 2,
        backgroundColor: '#FFF49C',
        alignItems: 'center',
    },
    buttons: {
        width: '90%',
        height: 60,
        borderRadius: 20,
        backgroundColor: '#ffae42',
        marginTop: scale(50),
        borderWidth: 2,
        borderColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 25,
    },
});

export default BackupScreen;
