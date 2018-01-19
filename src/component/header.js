import React, {Component} from 'react';
import {View, StyleSheet, Image,Text,TouchableOpacity} from 'react-native';

export default class Header extends Component {
    render() {

        return (
            <View style={styles.container}>
                <Image style={styles.logo} source={require('../assets/images/logo.png')} resizeMode={'contain'}/>
                <Text style={styles.logo_txt}>Fenix</Text>

                <TouchableOpacity>
                    <Text style={styles.menu}>&#xe715;</Text>
                </TouchableOpacity>

            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        height: 50,
        backgroundColor: '#fff',
        elevation: 2,
        paddingHorizontal:16,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-around'
    },
    logo:{
        width:30,
        height:30,
    },
    logo_txt:{
        color:'#45d8bb',
        fontSize:14,
        marginRight:'auto'
    },
    menu:{
        fontFamily:'iconfont',
        fontSize:16,
        marginTop:-20,
        color:'#45d8bb'
    }

});
