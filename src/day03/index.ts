import run from "aocrunner";

const regex = /mul\((\d{1,3}),(\d{1,3})\)/g;
const regex2 = /\s*(do\(\)|don't\(\)|mul\(\d{1,3},\d{1,3}\))\s*/g;
const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  const input: number[][] = Array.from(
    parseInput(rawInput).matchAll(regex),
  ).map((match) => [Number(match[1]), Number(match[2])]);
  const multValues = input.map((arr) => arr[0] * arr[1]);

  return multValues.reduce((prev, curr) => curr + prev);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput).match(regex2) as string[];
  const validInput: string[] = [];
  let isValid = true;
  input.forEach((str) => {
    const trimmedStr = str.trim()
    if (trimmedStr === `don't()`) {
      isValid = false;
    }
    if (trimmedStr === `do()`) {
      isValid = true;
    }
    if (trimmedStr.startsWith("mul") && isValid) {
      validInput.push(str);
    }
  });
  const multValues = validInput.map((str) => {
    return Array.from(str.matchAll(regex)).map(
      (match) => Number(match[1]) * Number(match[2]),
    )[0];
  });
  return multValues.reduce((prev, curr) => curr + prev);
};

run({
  part1: {
    tests: [
      {
        input: `xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))`,
        expected: 161,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))`,
        expected: 48,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
