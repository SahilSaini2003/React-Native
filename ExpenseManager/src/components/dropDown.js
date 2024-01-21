import { TouchableOpacity, View, Text, Image, FlatList, StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';

function dropDown({
    id,
    data,
    state,
    setState,
    textData,
    setTextData,
    handelFilterDropdown,
    manageData,
}) {
    return (
        <>
            <TouchableOpacity
                style={{
                    height: scale(35),
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
                onPress={() => {
                    setState(!state);
                    handelFilterDropdown(data);
                }}>
                <Text style={{ color: '#676767', fontSize: scale(18), marginLeft: scale(10) }}>
                    {textData}
                </Text>
                {state ? (
                    <Image
                        source={require('../assets/images/down-arrow.png')}
                        style={styles.img}
                    />
                ) : (
                    <Image
                        source={require('../assets/images/up-arrow.png')}
                        style={styles.img}
                    />
                )}
            </TouchableOpacity>
            {state ? (
                <View style={{ width: '100%', borderTopWidth: 1, height: data.length * 30, maxHeight: 110 }}>
                    <FlatList
                        data={data}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={{ width: '100%', alignItems: 'center' }}
                                onPress={async () => {
                                    let res = await manageData(item, id);
                                    if (res == 'success') {
                                        setTextData(item);
                                        setState(!state);
                                    }
                                }}>
                                <Text style={{ fontSize: scale(14), color: 'black', marginVertical: scale(4) }}>
                                    {item}
                                </Text>
                            </TouchableOpacity>
                        )}
                        keyExtractor={(item, index) => index}
                    />
                </View>
            ) : null}
        </>
    );
}

const styles = StyleSheet.create({
    img:{ width: scale(18), height: scale(18), marginLeft: scale(6), marginTop: scale(5) }
})

export default dropDown;
