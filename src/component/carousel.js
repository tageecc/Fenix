import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import LinearGradient from 'react-native-linear-gradient';
import {wp, viewportWidth, Color1, Color2} from '../Util';

export default class CarouselComponent extends Component {

    renderItem({item, index}) {
        let {data:{pay,income}} = this.props;
        return (
            <LinearGradient colors={[Color1, Color2]} style={styles.card}>
                <Text
                    style={styles.date}>{new Date().toLocaleString().replace(/(\d+)\/(\d+)\/(\d+).*/g, "$1年$2月")}</Text>
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
            </LinearGradient>
        );
    }

    render() {
        return (
            <Carousel
                data={[0,0,0]}
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
    }
});