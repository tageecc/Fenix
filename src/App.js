/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import Manager from 'react-native-manager';
import LinearGradient from 'react-native-linear-gradient';

import Header from './component/header';
import Carousel from './component/carousel';
import Card from './component/card';
import {gradientColor} from "./Util";

export default class App extends Component {

    state = {
        js_cost: 0,
        gs_cost: 0,
        zs_cost: 0,
        cars: [
            {title: 'Car A', value: 'Brand A'},
            {title: 'Car B ', value: 'Brand B'},
            {title: 'Car C', value: 'Brand C'},
        ],
    };

    async componentDidMount() {
        let {js_cost, zs_cost, gs_cost} = this.state;
        try {
            let smsList = await Manager.getSms(
                {
                    address: '95533|95588|95555',
                    date: {
                        gt: '1512057600000',
                        lt: '1514736000000'
                    }
                });
            smsList.map(sms => {
                let {body, address} = sms;

                if (address === '95533') {
                    let matcher = body.match(/支出人民币(.*?)元/);
                    matcher && (js_cost += parseFloat(matcher[1]));
                }
                if (address === '95555') {
                    let matcher = body.match(/扣款.*人民币(.*?)\[/);
                    matcher && (zs_cost += parseFloat(matcher[1]));
                }
                if (address === '95588') {
                    let matcher = body.match(/支出（.*?）(.*?)元/);
                    matcher && (gs_cost += parseFloat(matcher[1]));
                }
                this.setState({
                    js_cost,
                    zs_cost,
                    gs_cost
                });
            })
        } catch (e) {
            console.log(e);
        }

    }

    render() {
        let {js_cost, zs_cost, gs_cost} = this.state;
        let colors = gradientColor('#5cdb52', '#42c9da', 3);
        return <View>
            <Header/>
            <Carousel total={gs_cost + zs_cost + js_cost}/>
            <Card bank={'工商银行'} cost={gs_cost} color={colors[0]}/>
            <Card bank={'招商银行'} cost={zs_cost} color={colors[1]}/>
            <Card bank={'建设银行'} cost={js_cost} color={colors[2]}/>
            <TouchableOpacity activeOpacity={0.8}>
                <LinearGradient colors={['#5cdb52', '#45d8bb', '#42c9da']} style={styles.manageBtn}>
                    <Text style={styles.manageBtnTxt}>重新分析</Text>
                </LinearGradient>
            </TouchableOpacity>
        </View>
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f9f9f9',
    },
    manageBtn: {
        width: 120,
        height: 30,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginVertical: 10,
        elevation: 1,
    },
    manageBtnTxt: {
        color: '#f5f5f5',
        fontSize: 12,

    }

});