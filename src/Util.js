import React from 'react';
import {Dimensions, Text} from 'react-native';

export const {width: viewportWidth, height: viewportHeight} = Dimensions.get('window');

export const wp = (percentage) => {
    const value = (percentage * viewportWidth) / 100;
    return Math.round(value);
};

export const getIcon = (str) => {
    switch (str) {
        case '中原银行': {
            return <Text>&#xe61a;</Text>;
        }
        case '交通银行': {
            return <Text>&#xe662;</Text>;
        }
        case '中国银行': {
            return <Text>&#xe658;</Text>;
        }
        case '建设银行': {
            return <Text>&#xe655;</Text>;
        }
        case '中信银行': {
            return <Text>&#xe6cf;</Text>;
        }
        case '招商银行': {
            return <Text>&#xe6cd;</Text>;
        }
        case '邮政银行': {
            return <Text>&#xe6cc;</Text>;
        }
        case '上海银行': {
            return <Text>&#xe6cb;</Text>;
        }
        case '浦发银行': {
            return <Text>&#xe6ca;</Text>;
        }
        case '民生银行': {
            return <Text>&#xe6c8;</Text>;
        }
        case '光大银行': {
            return <Text>&#xe6c5;</Text>;
        }
        case '北京银行': {
            return <Text>&#xe6c3;</Text>;
        }
        case '农业银行': {
            return <Text>&#xe627;</Text>;
        }
        case '工商银行': {
            return <Text>&#xe61c;</Text>;
        }
        case '网商银行': {
            return <Text>&#xe656;</Text>;
        }
        default : {
            return <Text>&#xe602;</Text>
        }

    }
};

export const colorHex = (rgb) => {
    let _this = rgb;
    let reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
    if (/^(rgb|RGB)/.test(_this)) {
        let aColor = _this.replace(/(?:(|)|rgb|RGB)*/g, "").split(",");
        let strHex = "#";
        for (let i = 0; i < aColor.length; i++) {
            let hex = Number(aColor[i]).toString(16);
            hex = hex < 10 ? 0 + '' + hex : hex;// 保证每个rgb的值为2位
            if (hex === "0") {
                hex += hex;
            }
            strHex += hex;
        }
        if (strHex.length !== 7) {
            strHex = _this;
        }
        return strHex;
    } else if (reg.test(_this)) {
        let aNum = _this.replace(/#/, "").split("");
        if (aNum.length === 6) {
            return _this;
        } else if (aNum.length === 3) {
            let numHex = "#";
            for (let i = 0; i < aNum.length; i += 1) {
                numHex += (aNum[i] + aNum[i]);
            }
            return numHex;
        }
    } else {
        return _this;
    }
};
export const colorRgb = (sColor) => {
    let reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
    sColor = sColor.toLowerCase();
    if (sColor && reg.test(sColor)) {
        if (sColor.length === 4) {
            let sColorNew = "#";
            for (let i = 1; i < 4; i += 1) {
                sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
            }
            sColor = sColorNew;
        }
        //处理六位的颜色值
        let sColorChange = [];
        for (let i = 1; i < 7; i += 2) {
            sColorChange.push(parseInt("0x" + sColor.slice(i, i + 2)));
        }
        return sColorChange;
    } else {
        return sColor;
    }
};
export const gradientColor = (startColor, endColor, step) => {
    let startRGB = colorRgb(startColor);//转换为rgb数组模式
    let startR = startRGB[0];
    let startG = startRGB[1];
    let startB = startRGB[2];
    let endRGB = colorRgb(endColor);
    let endR = endRGB[0];
    let endG = endRGB[1];
    let endB = endRGB[2];
    let sR = (endR - startR) / step;//总差值
    let sG = (endG - startG) / step;
    let sB = (endB - startB) / step;
    let colorArr = [];
    for (let i = 0; i < step; i++) {
        let hex = colorHex('rgb(' + parseInt((sR * i + startR)) + ',' + parseInt((sG * i + startG)) + ',' + parseInt((sB * i + startB)) + ')');
        colorArr.push(hex);
    }
    return colorArr;
};
