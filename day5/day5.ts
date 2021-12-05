import fs from "fs";
import * as _ from 'lodash';

class HashTable<K,V> {
    map: Map<string,V> = new Map();

    set(key: K, value: V) {
        this.map.set(JSON.stringify(key), value);
    }

    get(key: K): V | undefined {
        let val = this.map.get(JSON.stringify(key));
        if (val) {
            return val;
        }
    }

    forEach(callbackfn: (value: V, key: string, map: Map<string, V>) => void) {
        return this.map.forEach(callbackfn);
    }

    entries() {
        let r : [K,V][] = [];
        for (let e of this.map.entries()) {
            r.push([JSON.parse(e[0]),e[1]]);
        }
        return r;
    }
}

interface Coords {
    x: number,
    y: number
}

class Diagram {
    diagram: HashTable<Coords, number> = new HashTable();

    constructor(input: number[][][]) {
        for (let line of input) {
            let from = { x: line[0][0], y: line[0][1] };
            let to = { x: line[1][0], y: line[1][1] };
            if (from.x !== to.x) {
                for (let x = Math.min(from.x, to.x); x <= Math.max(from.x, to.x); x++) {
                    let y = (((to.y - from.y) / (to.x - from.x)) * (x - from.x)) + from.y;
                    this.diagram.set({x,y}, (this.diagram.get({x,y}) ?? 0)+1);
                }
            } else {
                for (let y= Math.min(from.y, to.y); y <= Math.max(from.y, to.y); y++) {
                    this.diagram.set({x: from.x,y}, (this.diagram.get({x: from.x,y}) ?? 0)+1);
                }
            }
        }
    
    
    }

    getSafePoints() {
        let safe : Coords[] = [];

        for (let [key, value] of this.diagram.entries()) {
            if (value >= 2) {
                safe.push(key);
            }
        }

        return safe;
    }
    

}

// read file input.txt
const input = fs.readFileSync("./input.txt", "utf8").split("\n").map(l => l.split(" -> ").map(e => e.split(",").map(i => parseInt(i))));

let diagram : Diagram = new Diagram(input);

console.log(diagram.getSafePoints().length);

