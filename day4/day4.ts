import fs from "fs";
import * as _ from 'lodash';

class Board {
    winner: boolean = false;
    lastNumber: number = -1;
    numbers: number[][] = [];

    constructor(numbers: number[][]) {
        this.numbers = numbers;
    }

    countUnmarked() {
        console.log(this.numbers);
        return _.flatten(this.numbers).filter(a => a!=-1).reduce((p,c) => p + c,0);

    }

    sum() {
        return this.countUnmarked() * this.lastNumber;
    }

    markNumber(number: number) {
        this.lastNumber = number;
        this.numbers = this.numbers.map(row => row.map(i => i == number ? -1 : i));
        this.checkIfWinner();
    }

    

    checkIfWinner() {
        for (let i=0;i<this.numbers.length;i++) {
            let row = this.numbers[i];
            let col = this.numbers.map(r => r[i]);

            if (row.filter(i => i!=-1).length == 0 || col.filter(i => i!=-1).length == 0) {
                this.winner = true;
            }
        }
        
    }
}


// read file input.txt
const input = fs.readFileSync("./input.txt", "utf8").split("\n\n");
let numbers: number[] = input[0].split(",").map(i => parseInt(i));
let boards: Board[] = input.slice(1).map(board => board.split("\n").map(row => row.split(" ").map(i => parseInt(i)).filter(a => !isNaN(a)))).map(board => new Board(board));

function getWinningBoard(boards: Board[]): Board | undefined {
    let winningBoards = 0;
    for (let number of numbers) {
        for (let i = 0; i < boards.length; i++) {
            let board: Board = boards[i];
            if (!board.winner) {
                board.markNumber(number);
                if (board.winner) {
                    winningBoards++;
                    if (winningBoards == boards.length) {
                        return board;
                    }
                }
            }
        }
    }
}

let winBoard = getWinningBoard(boards);
console.log(winBoard!.sum());