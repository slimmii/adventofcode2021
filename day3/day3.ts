import fs from "fs";

// read file input.txt
const input = fs.readFileSync("./input.txt", "utf8").split("\n");
let values : number = input.length;

let bitArray : number[][] = input.map(line => line.split("").map(i => parseInt(i)));

let bitStringEpsilon: string = "";
let bitStringGamma: string = "";

for (let x=0;x<bitArray[0].length;x++) {
    let countOnes : number = 0;
    let countZeroes : number = 0;
    for (let y=0;y<values;y++) {
        if (bitArray[y][x] == 1) {
            countOnes++;
        } else {
            countZeroes++;
        }
    }
    let mostCommonBit : number = countZeroes > countOnes ? 0 : 1;
    let leastCommonBit : number = countOnes > countZeroes ? 0 : 1;

    bitStringGamma += mostCommonBit;
    bitStringEpsilon += leastCommonBit;
}

let gammaRate : number = parseInt(bitStringGamma,2);
let epsilonRate : number = parseInt(bitStringEpsilon,2);

console.log(gammaRate * epsilonRate);
