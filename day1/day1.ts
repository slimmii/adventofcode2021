import fs from "fs";

// read file input.txt
const input = fs.readFileSync("input.txt", "utf8");

const measurements : number[] = input.split("\n").map(s => parseInt(s));

let count : number = 0;
for (let i = 0; i < measurements.length - 3; i++) {
    let sum1 = measurements[i] + measurements[i+1] + measurements[i+2];
    let sum2 = measurements[i+1] + measurements[i+2] + measurements[i+3];
    if (sum2 > sum1) {
        count++;
    }
}

console.log(count);