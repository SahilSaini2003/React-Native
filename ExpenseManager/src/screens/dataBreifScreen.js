const { Text, View, StyleSheet, TouchableOpacity } = require("react-native");
import Icon from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

function DataBreifScreen({ route }) {

    const { itemData } = route.params;
    const typeColor = itemData[0].type == 'Debit' ? '#FF0000' : '#0CF107';
    const descriptionHeight = itemData[0].description != null ? (itemData[0].description).length > 50 ? ((itemData[0].description).length > 100 ? 200 : 150) : 100 : null;
    return (
        <View style={styles.mainBox}>
            <View style={{ width: 120, height: 35, backgroundColor: typeColor, alignItems: "center", marginTop: 10, borderRadius: 20, borderWidth: 2, borderColor: 'black' }}>
                <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>{(itemData[0].type).toUpperCase()}</Text>
            </View>
            <View style={styles.textView}>
                <Text style={styles.textTitle}>Date of Transaction :</Text>
                <Text style={[styles.textArea, { fontSize: 15 }]}>{itemData[0].date}</Text>
            </View>
            <View style={styles.textView}>
                <Text style={styles.textTitle}>Transacted Amount</Text>
                <Text style={styles.textArea}><Icon name='rupee-sign' size={20} color={'black'} />{itemData[0].amount}</Text>
            </View>
            <View style={[styles.textView, { flexDirection: 'column', height: 70 }]}>
                <Text style={styles.textTitle}>Transacted Reason</Text>
                <Text style={styles.textArea}>{itemData[0].title}</Text>
            </View>
            {itemData[0].description != null ?
                <View style={[styles.textView, { flexDirection: 'column', height: descriptionHeight }]}>
                    <Text style={[styles.textTitle, { marginBottom: 5 }]}>Transaction Description</Text>
                    <Text style={styles.textArea}>{itemData[0].description}</Text>
                </View> : null}
            <TouchableOpacity style={[styles.textView, { backgroundColor: '#0000FF', height: 50 }]}>
                <Text style={{ fontSize: 30, color: 'white', fontWeight: 'bold' }}><Icon name='pencil-alt' size={30} color={'white'} /> UPDATE</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.textView, { backgroundColor: '#B22222', height: 50 }]}>
                <Text style={{ fontSize: 30, color: 'white', fontWeight: 'bold' }}><MaterialCommunityIcons name='delete-empty' size={40} color={'white'} /> DELETE</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    mainBox: {
        flex: 1,
        backgroundColor: '#F3E0D6',
        margin: 10,
        borderRadius: 20,
        borderWidth: 2,
        alignItems: 'center'
    },
    textView: {
        backgroundColor: '#FFFDD0',
        width: '90%',
        marginTop: 25,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
        borderRadius: 10,
        borderWidth: 1
    },
    textTitle: {
        fontSize: 15,
        color: '#676767',
        marginHorizontal: 10
    },
    textArea: {
        fontSize: 20,
        color: 'black',
        marginHorizontal: 10
    }
})

export default DataBreifScreen;