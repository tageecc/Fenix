import {BankMap, getMonthByDelta} from "./Util";
import Manager from "react-native-manager";

export const base = async (deltaMonth = 0) => {
    try {
        let pay = {}, income = {}, month = getMonthByDelta(deltaMonth);
        let smsList = await Manager.getSms(
            {
                address: Object.keys(BankMap).join('|'),
                date: {
                    gt: month[0],
                    lt: month[1]
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
        return {pay, income};

    } catch (e) {
        console.log(e);
    }

};