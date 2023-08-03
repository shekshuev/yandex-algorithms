import java.io.File;
import java.io.FileNotFoundException;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;
import java.util.stream.Stream;
import java.util.stream.Collectors;

public class Solution {

    private int[] first;

    private int[] second;

    public void readInput() throws FileNotFoundException {
        Scanner s = new Scanner(new File("./input.txt"));
        int currentLine = 0;
        while (currentLine < 4) {
            if (currentLine == 1) {
                this.first = Stream.of(s.nextLine().split("\\s")).mapToInt(Integer::parseInt).toArray();
            } else if (currentLine == 3) {
                this.second = Stream.of(s.nextLine().split("\\s")).mapToInt(Integer::parseInt).toArray();
            } else {
                s.nextLine();
            }
            currentLine++;
        }
    }

    public void solve() {
        int n = this.first.length;
        int m = this.second.length;
        int[][] dp = new int[n + 1][m + 1];
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= m; j++) {
                if (first[i - 1] == second[j - 1]) {
                    dp[i][j] = dp[i - 1][j - 1] + 1;
                } else {
                    dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
                }
            }
        }
        System.out.println(dp[n][m]);
        if (dp[n][m] > 0) {
            List<Integer> answer1 = new ArrayList<>(),
                    answer2 = new ArrayList<>();
            int i = n,
                    j = m;
            while (dp[i][j] != 0) {
                if (first[i - 1] == second[j - 1]) {
                    answer1.add(0, i);
                    answer2.add(0, j);
                    i--;
                    j--;
                } else if (dp[i][j] == dp[i][j - 1]) {
                    j--;
                } else if (dp[i][j] == dp[i - 1][j]) {
                    i--;
                }
            }
            System.out.println(answer1.stream().map(String::valueOf).collect(Collectors.joining(" ")));
            System.out.println(answer2.stream().map(String::valueOf).collect(Collectors.joining(" ")));
        }
    }

    public static void main(String[] args) throws FileNotFoundException {
        Solution solution = new Solution();
        solution.readInput();
        solution.solve();
    }
}