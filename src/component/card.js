import React, {Component} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {getIcon, gradientColor} from '../Util';

export default class Card extends Component {
    render() {
        let {bank, cost,color} = this.props;
        return (
            <View style={styles.container}>
                <Text style={[styles.icon,{color}]}>{getIcon(bank)}</Text>
                <Text style={styles.bank}>{bank}</Text>
                <Text style={styles.cost}>￥ {cost}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        height: 56,
        backgroundColor: '#fff',
        marginVertical: 10,
        marginHorizontal: 16,
        paddingHorizontal: 10,
        borderRadius: 10,
        elevation: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    icon: {
        fontFamily: 'iconfont',
        fontSize: 20,
        marginTop: -35,
        marginRight: 8,
    },
    bank: {
        color: '#333',
        fontSize: 14,
        marginRight: 'auto'
    },
    cost: {
        color: '#999'
    }
});