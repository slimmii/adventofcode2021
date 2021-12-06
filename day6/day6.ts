import fs from "fs";
import * as _ from 'lodash';
import { Memoize } from "typescript-memoize";

class Calculator {
    getAmountAfterDay(fish: number, day: number) {
        let amount = 1;
        let fishCounter = fish;
        for (let i = 1; i <= day; i++) {
            if (fishCounter == 0) {
                fishCounter = 6;
                amount += this.getAmountAfterDay(8, day - i);
            } else {
                fishCounter--;
            }
        }
        return amount;
    }
}

let fish: number[] = fs.readFileSync("./input.txt", "utf8").split(",").map(i => parseInt(i));

let calc : Calculator = new Calculator();
let total = 0;
for (let fi of fish) {
    total += calc.getAmountAfterDay(fi, 256);
}
console.log(total);
