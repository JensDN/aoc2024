import run from "aocrunner";

const parseInput = (rawInput: string) =>
  rawInput.split("\n").map((s) => s.split(" ").map((n) => Number(n)));
const checkOrder = (
  arr: number[],
  condition: (current: number, nextValue: number) => boolean,
) => {
  for (let i = 0; i < arr.length - 1; i++) {
    if (!condition(arr[i], arr[i + 1])) {
      return false;
    }
  }
  return true;
};
const isStrictlyIncreasing = (current: number, nextValue: number) =>
  current < nextValue;

const isStrictlyDecreasing = (current: number, nextValue: number) =>
  current > nextValue;

const adjecentLevels = (current: number, nextValue: number) =>
  current !== nextValue &&
  0 < Math.abs(current - nextValue) &&
  Math.abs(current - nextValue) <= 3;

const part1 = (rawInput: string) => {
  const arr: number[][] = parseInput(rawInput);
  const safeArray = arr.map((arr2) => {
    const safeOrder =
      checkOrder(arr2, isStrictlyDecreasing) ||
      checkOrder(arr2, isStrictlyIncreasing);
    const safeLevel = checkOrder(arr2, adjecentLevels);
    if (!safeOrder || !safeLevel) {
      return 0 as number;
    }
    return 1 as number;
  });
  return safeArray.reduce((acc, curr) => acc + curr);
};

const part2 = (rawInput: string) => {
  const arr: number[][] = parseInput(rawInput);
  const runArrProcess = (
    arr: number[],
    index: number,
  ): number => {
    let toTestArr = [];
    if (index < 0) {
      toTestArr = arr;
    } else {
      toTestArr = arr.filter((_, i) => i !== index);
    }
    const safeOrder =
      checkOrder(toTestArr, isStrictlyDecreasing) ||
      checkOrder(toTestArr, isStrictlyIncreasing);
    const safeLevel = checkOrder(toTestArr, adjecentLevels);
    if (!safeOrder || !safeLevel) {
      if (index === arr.length) {
        return 0;
      }
      return runArrProcess(arr,index + 1);
    }
    return 1;
  };
  const safeArray = arr.map((arr) => runArrProcess(arr, -1));
  return safeArray.reduce((acc, curr) => acc + curr);
};

run({
  part1: {
    tests: [
      {
        input: `7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`,
        expected: 2,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`,
        expected: 4,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
