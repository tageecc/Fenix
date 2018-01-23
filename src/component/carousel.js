import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import LinearGradient from 'react-native-linear-gradient';
import {wp, viewportWidth, Color1, Color2} from '../Util';
import {VictoryLine, VictoryChart, VictoryAxis} from "victory-native";

export default class CarouselComponent extends Component {

    renderItem({item, index}) {
        let {monthData: {year, month, pay, income}, trendData} = this.props;
        if (!year) return null;
        let cnt = null;
        if (index === 0) {
            let payData = [], incomeData = [];
            let maxPay = 0, maxIncome = 0;
            trendData.map(data => {
                let pay = parseInt(data.perMonthTotalPay) || 0;
                let income = parseInt(data.perMonthTotalIncome) || 0;
                payData.push({x: data.month, y: pay});
                incomeData.push({x: data.month, y: income});
                maxPay = maxPay > pay ? maxPay : pay;
                maxIncome = maxIncome > income ? maxIncome : income;
            });
            cnt = (
                <View pointerEvents="none">
                    <VictoryChart height={180} padding={0} style={styles.chart}>
                        <VictoryAxis axisComponent={<View></View>}/>
                        <VictoryAxis axisComponent={<View></View>} dependentAxis/>
                        <VictoryLine interpolation="natural"
                                     style={{data: {stroke: "#2296c2"}}}
                                     data={payData}
                                     domain={{x: [1, 12], y: [0, maxPay + 1000]}}
                        />
                        <VictoryLine interpolation="natural"
                                     style={{data: {stroke: "#97e9cb"}}}
                                     data={incomeData}
                                     domain={{x: [1, 12], y: [-1000, maxIncome + 1000]}}

                        />
                    </VictoryChart>
                </View>
            );
        }
        if (index === 1) {
            cnt = (
                <View>
                    <Text
                        style={styles.date}>{`${year}年 ${month}月`}</Text>
                    <View style={styles.costContain}>
                        <View style={[styles.bdR, styles.content]}>
                            <Text style={styles.costTit}>收入</Text>
                            <Text style={styles.cost}>￥ {eval(Object.values(income).join("+"))}</Text>
                        </View>
                        <View style={styles.content}>
                            <Text style={styles.costTit}>支出</Text>
                            <Text style={styles.cost}>￥ {eval(Object.values(pay).join("+"))}</Text>
                        </View>
                    </View>
                </View>
            )
        }
        return <LinearGradient colors={[Color1, Color2]} style={styles.card}>{cnt}</LinearGradient>;
    }

    render() {
        return (
            <Carousel
                data={[0, 0, 0]}
                renderItem={this.renderItem.bind(this)}
                sliderWidth={viewportWidth}
                itemWidth={wp(80)}
                firstItem={1}
            />
        )
    }
}

const styles = StyleSheet.create({
    card: {
        width: wp(80),
        height: 180,
        paddingHorizontal: wp(2),
        paddingBottom: 18,
        marginVertical: 10,
        borderRadius: 12,
        overflow: 'hidden'
    },
    date: {
        fontSize: 12,
        color: '#fff',
        marginLeft: 10,
        marginTop: 10,
        fontWeight: '700'
    },
    costContain: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: 40,
    },
    content: {
        flex: 1,
        alignItems: 'center',
    },
    bdR: {
        borderRightWidth: 1,
        borderRightColor: '#fff'
    },
    costTit: {
        color: '#fff'
    },
    cost: {
        color: '#f5f5f5',
        marginTop: 10,
        fontSize: 20
    },
    chart: {
        position: 'absolute',
        top: 0,
        left: 0
    },
});