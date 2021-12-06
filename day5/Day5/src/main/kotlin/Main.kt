import java.io.File
import kotlin.collections.HashMap
import kotlin.math.sign

fun main(args: Array<String>) {
    val input = File("input.txt")
        .readText(Charsets.UTF_8)
        .split("\n")
        .map { it.split(" -> ").map { it.split(",").map { it.toInt()} }}


    val diagram: Diagram = Diagram(input)

    println(diagram.getSafePoints().size)

}

class Coords constructor(x: Int, y: Int) {
    var x: Int = x
    var y: Int = y

    override fun toString(): String {
        return "($x,$y)";
    }

    override fun equals(other: Any?): Boolean {
        if (other is Coords) {
            return other.x == x && other.y == y;
        }
        return super.equals(other)
    }

    override fun hashCode(): Int {
        return x.hashCode() + y.hashCode();
    }
}

class Diagram constructor(input : List<List<List<Int>>>) {
    var diagram : HashMap<Coords, Int> = HashMap()
    init {
        for (line in input) {
            var from : Coords = Coords(line[0][0], line[0][1])
            val to : Coords = Coords(line[1][0], line[1][1])
            var xMover = sign((to.x-from.x).toDouble()).toInt()
            var yMover = sign((to.y-from.y).toDouble()).toInt()
            while (from != to) {
                this.diagram[from] = (this.diagram[from] ?: 0) + 1
                from = Coords(from.x+xMover, from.y+yMover)
                println(from)
            }
            this.diagram[from] = (this.diagram[from] ?: 0) + 1
        }

        println(this.diagram);
    }

    fun getSafePoints() : List<Coords> {
        return this.diagram.filter { e -> e.value >= 2 }.keys.toList()
    }

}