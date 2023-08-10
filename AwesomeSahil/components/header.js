import React from "react";
import { View, Text, StyleSheet } from "react-native";

const App = props => {
    return (
        <View style={styles.header}>
            <Text style={styles.text}>{props.title}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        padding: 10,
        alignItems: 'center',
        backgroundColor: '#800080' 
    },
    text: { 
        fontSize: 30, 
        color: 'white'
    }
})

export default App;