import React, {Component} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import Header from './component/header';
import Carousel from './component/carousel';
import Card from './component/card';
import {viewportWidth, viewportHeight, gradientColor, BankMap, Color1, Color2, combineObject} from "./Util";
import {base, trend} from "./Analyse";
import Spinner from 'react-native-spinkit';
import SplashScreen from 'react-native-splash-screen';
export default class App extends Component {

    state = {
        monthData: {},
        trendData: [],
        cardData:{},
        showSpinner: false,
    };

    componentDidMount() {
        this.calculate();
        // 2s关闭启动屏幕
        setTimeout(()=>SplashScreen.hide(),1000);

    }

    async calculate() {
        this.setState({showSpinner: true});
        let monthData = await base(0);
        let lastMonthData = await base(-1);
        let trendData = await trend(-1);
        this.setState({
            monthData,
            trendData,
            lastMonthData,
            cardData: combineObject(monthData.pay, monthData.income),
            showSpinner: false
        })
    }

    setCardData(data) {
        this.setState({cardData:combineObject(data.pay, data.income)})
    }

    render() {
        let {monthData, lastMonthData, trendData, cardData, showSpinner} = this.state;
        let colors = gradientColor(Color1, Color2, Object.keys(monthData.pay || 0).length);
        return (
            <View>
                <Header/>
                <Carousel monthData={monthData} lastMonthData={lastMonthData} trendData={trendData}
                          setCardData={this.setCardData.bind(this)}/>
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
        )
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
        backgroundColor: '#f5f5f5'
    }
});