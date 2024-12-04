import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

type ArrayValues = null | "X" | "M" | "A" | "S";
const directions = [
  [0, 1], // Right
  [0, -1], // Left
  [1, 0], // Down
  [-1, 0], // Up
  [1, 1], // Diagonal Down-Right
  [-1, -1], // Diagonal Up-Left
  [1, -1], // Diagonal Down-Left
  [-1, 1], // Diagonal Up-Right
];
const countXMAS = (grid: ArrayValues[][]) => {
  const word = "XMAS";
  const rows = grid.length;
  const cols = grid[0].length;
  let count = 0;

  function isValid(x: number, y: number) {
    return x >= 0 && x < rows && y >= 0 && y < cols;
  }

  function checkDirection(x: number, y: number, dx: number, dy: number) {
    for (let i = 0; i < word.length; i++) {
      if (
        !isValid(x + i * dx, y + i * dy) ||
        grid[x + i * dx][y + i * dy] !== word[i]
      ) {
        return false;
      }
    }
    return true;
  }

  for (let x = 0; x < rows; x++) {
    for (let y = 0; y < cols; y++) {
      for (const [dx, dy] of directions) {
        if (checkDirection(x, y, dx, dy)) {
          count++;
        }
      }
    }
  }
  return count;
};

function countPattern(gridString: string) {
  // Convert the string into a 2D grid
  const grid = gridString
    .trim()
    .split("\n")
    .map((row: string) => row.split(""));
  const rows = grid.length;
  const cols = grid[0].length;

  let count = 0;

  function isMAS(chars: string[]) {
    return chars.join("") === "MAS" || chars.join("") === "SAM";
  }

  function matchesXMAS(x: number, y: number) {
    if (x - 1 < 0 || x + 1 >= rows || y - 1 < 0 || y + 1 >= cols) {
      return false; // Out of bounds
    }
    /*
    * M/S . M/S
    * .   A .
    * S/M . S/M
    * */
    const topDiagonal = [
      grid[x - 1][y + 1],
      grid[x][y],
      grid[x + 1][y - 1]];
    const bottomDiagonal = [
      grid[x -1][y - 1],
      grid[x][y],
      grid[x + 1][y + 1],
    ];

    return (
      isMAS(topDiagonal) && // Top-left to bottom-right diagonal// Middle row
      isMAS(bottomDiagonal) // Bottom-left to top-right diagonal
    );
  }

  // Check every position in the grid for an X-MAS pattern
  for (let x = 0; x < rows; x++) {
    for (let y = 0; y < cols; y++) {
      if (matchesXMAS(x, y)) {
        count++;
      }
    }
  }

  return count;
}

const part1 = (rawInput: string) => {
  const grid: ArrayValues[][] = parseInput(rawInput)
    .split("\n")
    .map((str) =>
      str.split("").map((key: string) => {
        if (key === "X" || key === "M" || key === "A" || key === "S") {
          return key;
        } else return null;
      }),
    );
  return countXMAS(grid);
};

const part2 = (rawInput: string) => {
  return countPattern(parseInput(rawInput));
};

run({
  part1: {
    tests: [
      {
        input: `..X...
.SAMX.
.A..A.
XMAS.S
.X....`,
        expected: 4,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `.M.S......
..A..MSMS.
.M.S.MAA..
..A.ASMSM.
.M.S.M....
..........
S.S.S.S.S.
.A.A.A.A..
M.M.M.M.M.
..........`,
        expected: 9,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
