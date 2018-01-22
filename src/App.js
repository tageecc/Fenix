/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import Header from './component/header';
import Carousel from './component/carousel';
import Card from './component/card';
import {viewportWidth, viewportHeight, gradientColor, BankMap, Color1, Color2} from "./Util";
import {base} from "./Analyse";
import Spinner from 'react-native-spinkit';

export default class App extends Component {

    state = {
        cost: {},
        showSpinner: false,
    };

    componentDidMount() {
        this.calculate();
    }

    calculate() {
        this.setState({showSpinner: true});
        base().then(cost => {
            this.setState({cost,showSpinner: false})
        })
    }

    render() {
        let {cost, showSpinner} = this.state;
        let colors = gradientColor(Color1, Color2, Object.keys(cost).length);
        console.log(cost);
        return <View>
            <Header/>
            <Carousel data={cost}/>
            {
                Object.keys(cost).map((ct, i) => {
                    return <Card key={i} bank={BankMap[ct].name} cost={cost[ct]} color={colors[i]}/>
                })
            }
            <TouchableOpacity activeOpacity={0.8} onPress={this.calculate.bind(this)}>
                <LinearGradient colors={[Color1, Color2]} style={styles.manageBtn}>
                    <Text style={styles.manageBtnTxt}>重新分析</Text>
                </LinearGradient>
            </TouchableOpacity>
            <View style={styles.spinner}>
                <Spinner size={50} type={'9CubeGrid'} color={'#46d9c4'} isVisible={showSpinner}/>
            </View>
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

    },
    spinner: {
        position: 'absolute',
        top: 0,
        left: 0,
        justifyContent: 'center',
        alignItems: 'center',
        width: viewportWidth,
        height: viewportHeight
    }
});