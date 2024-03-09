import React from 'react';
import { Text, TouchableOpacity, View, StyleSheet, Alert } from 'react-native';
import { scale } from 'react-native-size-matters';
import RNFetchBlob from 'rn-fetch-blob';
import { useDataContext } from '../context/dataContext';
// import fs from 'fs';
import moment from 'moment-timezone';
import path from 'react-native-path';
import fs from 'react-native-fs';

// import Modal from 'react-

function BackupScreen() {
    let { mainData } = useDataContext();
    const path = RNFetchBlob.fs.dirs.DownloadDir + '/' + 'Expense Manager';

    async function createBackup() {
        let name = path + `/ExpenseBackup_${moment().format('YYYYMMDD_HHmmss')}.json`
        fs.writeFile(name, JSON.stringify(mainData), 'utf8')
            .then(() => {
                Alert.alert(
                    'Backup SuccessFull!',
                    'File Generated at\n'+name,
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
                        .then(()=>{
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

    return (
        <View style={styles.mainBox}>
            <TouchableOpacity style={styles.buttons} onPress={() => { handleGetFileList(); }}>
                <Text style={styles.text}>Generate Backup</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttons}>
                <Text style={styles.text}>Upload Backup</Text>
            </TouchableOpacity>
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
