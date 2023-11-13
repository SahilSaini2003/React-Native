import { Text, View, FlatList } from 'react-native'

function historyData({mainData}) {
    
    let a= [1,2,3,4,5,6,7,8,9,0]
    return(
        // <Text>Histoy Data</Text>
        <View style={{flex: 1, margin: 10}}>
            {/* <Text>{mainData[0].id}</Text> */}
            <FlatList 
            data={mainData}
            renderItem={({item}) => 
                <View style={{width:100,height:100}}>
                    <Text style={{fontSize: 20, color:'black'}}> {item} </Text>
                </View>
            }
            keyExtractor={item => item.id}
            />
        </View>
    )
}

export default historyData;