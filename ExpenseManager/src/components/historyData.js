import { Text, View, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5'

function historyData({ mainData }) {

    let a = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
    const TypeStyle = (type) => {
        if (type == 'Debit') {
            return (
                <View style={[styles.typeStyle, {backgroundColor: '#FF0000'}]}>
                    <Text style={styles.typeText}>D</Text>
                </View>
            )
        }
        else {
            return (
                <View style={[styles.typeStyle,{backgroundColor: '#0CF107'}]}>
                    <Text style={styles.typeText}>C</Text>
                </View>
            )
        }
    }
    return (
        // <Text>Histoy Data</Text>
        <View style={{ flex: 1, margin: 10 }}>
            <FlatList
                data={mainData}
                renderItem={({ item }) =>
                    <TouchableOpacity style={{ width: '100%', height: 70, backgroundColor: '#F3E0D6', borderRadius: 20, borderBottomColor:'black', borderBottomWidth: 2, borderWidth: 1, borderTopColor:'white',borderRightColor: 'white', borderLeftColor: 'white'}}>
                        <View style={{ flexDirection: 'row', justifyContent:'space-between', marginHorizontal: 20  }}>
                            <Text style={{fontSize: 20, color: 'black'}}>{item.title}</Text>
                            <Text style={{color: '#666362'}}>{item.date}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent:'space-between', marginHorizontal: 20 }}>
                            <Text>{TypeStyle(item.type)}</Text>
                            <Text  style={{fontSize: 20, color: 'black'}}><Icon name='rupee-sign' size={20} color={'black'}/>{item.amount}</Text>
                        </View>
                    </TouchableOpacity>
                }
                keyExtractor={item => item.id}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    typeStyle: {
        width: 30, 
        height: 30, 
        // backgroundColor: 'black', 
        justifyContent: 'center', 
        alignItems: 'center',
        borderRadius: 50
    },
    typeText: {
        fontSize: 20,
        fontWeight: 'bold',
        color:'white',

    }
})

export default historyData;