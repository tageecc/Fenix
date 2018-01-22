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
import {viewportWidth, viewportHeight, gradientColor, BankMap, Color1, Color2, combineObject} from "./Util";
import {base} from "./Analyse";
import Spinner from 'react-native-spinkit';

export default class App extends Component {

    state = {
        pay: {},
        income: {},
        showSpinner: false,
    };

    componentDidMount() {
        this.calculate();
    }

    calculate() {
        this.setState({showSpinner: true});
        base(-1).then(({pay, income}) => {
            this.setState({pay, income, showSpinner: false})
        })
    }

    render() {
        let {pay, income, showSpinner} = this.state;
        let colors = gradientColor(Color1, Color2, Object.keys(pay).length);
        let cardData = combineObject(pay, income);
        return <View>
            <Header/>
            <Carousel data={{pay, income}}/>
            {
                Object.keys(cardData).map((data, i) => <Card key={i} bank={BankMap[data].name} color={colors[i]}
                                                             data={cardData[data]}/>)
            }
            <TouchableOpacity activeOpacity={0.8} onPress={this.calculate.bind(this)}>
                <LinearGradient colors={[Color1, Color2]} style={styles.manageBtn}>
                    <Text style={styles.manageBtnTxt}>重新分析</Text>
                </LinearGradient>
            </TouchableOpacity>
            {
                showSpinner && <View style={styles.spinner}>
                    <Spinner size={50} type={'9CubeGrid'} color={'#46d9c4'} isVisible={true}/>
                </View>
            }

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
        height: viewportHeight,
        elevation: 2,
    }
});