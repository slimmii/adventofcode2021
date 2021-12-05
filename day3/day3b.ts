import fs from "fs";

// read file input.txt
const input = fs.readFileSync("./input.txt", "utf8").split("\n");
let values : number = input.length;

let bitArray : number[][] = input.map(line => line.split("").map(i => parseInt(i)));

function getColumn(array: number[][], col: number) : number[] {
    return array.map(row => row[col]);
}

function getBitCount(array: number[]): [number,number] {
    return [array.filter(num => num == 0).length, array.filter(num => num == 1).length];
}

const mcb = (bitCount: [number, number]) => bitCount[1] >= bitCount[0] ? 1 : 0;
const lcb = (bitCount: [number, number]) => bitCount[0] <= bitCount[1] ? 0 : 1;


function filter(array: number[][], comparator: any) {
    let filter = [...array];
    let bitPos : number = 0;
    do {
        filter = filter.filter(row => row[bitPos] == comparator(getBitCount(getColumn(filter, bitPos))));
        bitPos++;
    } while (filter.length > 1)

    return parseInt(filter[0].join(''),2);
}

let generatorRating = filter(bitArray, mcb);
let scrubberRating = filter(bitArray, lcb);

console.log(generatorRating * scrubberRating);