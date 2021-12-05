import java.io.File

fun main() {
    val input = File("input.txt").readText(Charsets.UTF_8).split("\n").map { it.toInt() };
    // Part one
    println(input.windowed(2).count { (a,b) -> a < b });
    // Part two
    println(input.windowed(3).windowed(2).count { (a,b) -> a.sum() < b.sum()});
}