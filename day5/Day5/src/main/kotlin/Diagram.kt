import kotlin.collections.HashMap

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
            val from : Coords = Coords(line[0][0], line[0][1])
            val to : Coords = Coords(line[1][0], line[1][1])
            if (from.x != to.x) {
                for (x in Math.min(from.x, to.x)..Math.max(from.x, to.x)) {
                    val y = (((to.y - from.y) / (to.x - from.x)) * (x - from.x)) + from.y;
                    this.diagram[Coords(x, y)] = (this.diagram.get(Coords(x,y)) ?: 0)+1
                }
            } else {
                for (y in Math.min(from.y, to.y) .. Math.max(from.y, to.y)) {
                    this.diagram[Coords(from.x, y)] = (this.diagram.get(Coords(from.x,y)) ?: 0)+1;
                }
            }
        }
        println(this.diagram);
    }

    fun getSafePoints() : List<Coords> {
        return this.diagram.filter { e -> e.value >= 2 }.keys.toList()
    }

}