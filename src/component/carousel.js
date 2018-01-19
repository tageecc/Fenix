import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import LinearGradient from 'react-native-linear-gradient';
import {wp, viewportWidth} from '../Util';


const ENTRIES = [
    {
        title: '本月消费',
        illustration: 'http://i.imgur.com/UYiroysl.jpg'
    },
    {
        title: '今年消费',
        illustration: 'http://i.imgur.com/UPrs1EWl.jpg'
    },
    {
        title: '今日消费',
        illustration: 'http://i.imgur.com/UPrs1EWl.jpg'
    }
];

export default class CarouselComponent extends Component {

    renderItem() {
        let {total} = this.props;
        return (
            <LinearGradient colors={['#5cdb52', '#45d8bb', '#42c9da']}
                            style={styles.card}>
                <Text style={styles.date}>2018年01月</Text>
               <View style={styles.costContain}>
                   <View style={[styles.bdR,styles.content]}>
                       <Text style={styles.costTit}>收入</Text>
                       <Text style={styles.cost}>1233￥</Text>
                   </View>
                   <View style={styles.content}>
                       <Text style={styles.costTit}>支出</Text>
                       <Text style={styles.cost}>￥ {total}</Text>
                   </View>
               </View>
            </LinearGradient>
        );
    }

    render() {

        return (
            <Carousel
                data={ENTRIES}
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
    costContain:{
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center',
        marginTop:40,
    },
    content:{
        flex:1,
        alignItems:'center',
    },
    bdR:{
        borderRightWidth:1,
        borderRightColor:'#fff'
    },
    costTit:{
        color:'#fff'
    },
    cost:{
        color:'#f5f5f5',
        marginTop:10,
        fontSize:20
    }
});