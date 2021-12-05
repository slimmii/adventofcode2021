import java.io.File

fun main(args: Array<String>) {
    val input = File("input.txt")
        .readText(Charsets.UTF_8)
        .split("\n")
        .map { it.split(" -> ").map { it.split(",").map { it.toInt()} }}


    val diagram: Diagram = Diagram(input)

    println(diagram.getSafePoints().size)

}