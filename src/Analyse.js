import {BankMap, getMonth} from "./Util";
import Manager from "react-native-manager";

export const base = async () => {
    try {
        let cost = {},nowMonth = getMonth();
        let smsList = await Manager.getSms(
            {
                address: Object.keys(BankMap).join('|'),
                date: {
                    gt: nowMonth[0],
                    lt: nowMonth[1]
                }
            });
        smsList.map(({body, address}) => {
            if (!BankMap[address]) return true;

            let matcher = body.match(BankMap[address].pay);
            if (matcher) {
                if (!cost[address]) {
                    cost[address] = parseFloat(matcher[1]);
                } else {
                    cost[address] += parseFloat(matcher[1]);
                }
            }
        });

        return cost;

    } catch (e) {
        console.log(e);
    }

};