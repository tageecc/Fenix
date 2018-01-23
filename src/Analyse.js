import {BankMap, getMonthByDelta} from "./Util";
import Manager from "react-native-manager";

export const base = async (deltaMonth = 0) => {
    try {
        let pay = {}, income = {}, {year, month, prev, next} = getMonthByDelta(deltaMonth);
        let smsList = await Manager.getSms(
            {
                address: Object.keys(BankMap).join('|'),
                date: {
                    gt: prev,
                    lt: next
                }
            });

        smsList.map(({body, address}) => {
            if (!BankMap[address]) return true;
            let payMatcher = BankMap[address].pay ? body.match(BankMap[address].pay) : null;
            let incomeMatcher = BankMap[address].income ? body.match(BankMap[address].income) : null;
            if (payMatcher) {
                if (!pay[address]) {
                    pay[address] = parseFloat(payMatcher[1]);
                } else {
                    pay[address] += parseFloat(payMatcher[1]);
                }
            }
            if (incomeMatcher) {
                if (!income[address]) {
                    income[address] = parseFloat(incomeMatcher[1]);
                } else {
                    income[address] += parseFloat(incomeMatcher[1]);
                }
            }
        });
        return {year, month, pay, income};

    } catch (e) {
        console.log(e);
    }

};
export const trend = async (deltaYear = 0) => {
    deltaYear = Math.abs(deltaYear);
    let res = [];
    let now = new Date();
    let month = now.getMonth() + 1;

    for (let i = (deltaYear - 1) * 12 + month; i <= deltaYear * 12; i++) {
        let {year, month, pay, income} = await base(-i);
        let perMonthTotalPay = eval(Object.values(pay).join('+'));
        let perMonthTotalIncome = eval(Object.values(income).join('+'));
        if (!perMonthTotalPay && !perMonthTotalIncome) continue;
        res.push({year, month, perMonthTotalPay, perMonthTotalIncome})
    }
    return res;
};