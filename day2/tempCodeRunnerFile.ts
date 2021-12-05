import fs from "fs";

interface Movement { 
    direction: string,
    steps: number
}

// read file input.txt
const input = fs.readFileSync("./input.txt", "utf8");

const movements : Movement[] = input.split("\n").map(s => s.split(" ")).map(s => ({direction: s[0], steps: parseInt(s[1])}));

let horizontal : number = 0;
let depth : number = 0;
let aim : number = 0;

for (let movement of movements) {
    switch (movement.direction) {
        case "forward": 
            horizontal += movement.steps;
            depth += (aim * movement.steps);
            break;
        case "down":
            aim += movement.steps;
            break;
        case "up": 
            aim -= movement.steps;
            break; 
    }
}

console.log(horizontal);
console.log(depth);

console.log(horizontal * depth);