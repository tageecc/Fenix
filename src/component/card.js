import React, {Component} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {getIcon, wp} from '../Util';
import Swipeout from 'react-native-swipeout';

export default class Card extends Component {
    render() {
        let {bank, data, color} = this.props;

        return (
            <Swipeout buttonWidth={100} style={styles.container}
                      right={[{
                          component: (
                              <View style={[styles.swipeBtn, {backgroundColor: color}]}><Text
                                  style={styles.swipeBtnTxt}
                                  numberOfLines={1}>￥ {data.income || 0}</Text>
                              </View>
                          )
                      }]}>
                <View style={styles.wrapper}>
                    <Text style={[styles.icon, {color}]}>{getIcon(bank)}</Text>
                    <Text style={styles.bank}>{bank}</Text>
                    <Text style={styles.pay}>￥ {data.pay || 0}</Text>
                </View>
            </Swipeout>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        height: 56,
        backgroundColor: '#fff',
        marginVertical: 10,
        marginHorizontal: 20,
        borderRadius: 10,
        elevation: 1,
    },
    wrapper: {
        width: wp(100) - 40,
        height: 56,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    icon: {
        fontFamily: 'iconfont',
        fontSize: 20,
        marginTop: -35,
        marginHorizontal: 10
    },
    bank: {
        color: '#333',
        fontSize: 14,
        marginRight: 'auto'
    },
    pay: {
        color: '#999',
        marginRight: 10
    },
    swipeBtn: {
        height: 56,
        alignItems: 'center',
        justifyContent: 'center',
    },
    swipeBtnTxt: {
        color: '#fff',
        textAlign: 'center',
    }
});