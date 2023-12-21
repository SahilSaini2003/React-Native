import { TouchableOpacity, View, Text, Image, FlatList } from 'react-native';

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
                    height: 40,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
                onPress={() => {
                    setState(!state);
                    handelFilterDropdown(data);
                }}>
                <Text style={{ color: '#676767', fontSize: 20, marginLeft: 10 }}>
                    {textData}
                </Text>
                {state ? (
                    <Image
                        source={require('../assets/images/down-arrow.png')}
                        style={{ width: 20, height: 20, marginLeft: 10, marginTop: 6 }}
                    />
                ) : (
                    <Image
                        source={require('../assets/images/up-arrow.png')}
                        style={{ width: 20, height: 20, marginLeft: 10, marginTop: 6 }}
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
                                onPress={() => {
                                    let res = manageData(item, id);
                                    if (res == 'success') {
                                        setTextData(item);
                                        setState(!state);
                                    }
                                }}>
                                <Text style={{ fontSize: 16, color: 'black', marginVertical: 5 }}>
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

export default dropDown;
