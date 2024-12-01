import run from "aocrunner";

const parseInput = (rawInput: string) => {
  const aArr: number[] = [];
  const bArr: number[] = [];
  rawInput.split("\n").forEach((s) => {
    const [a, b] = s.split("   ");
    aArr.push(Number(a));
    bArr.push(Number(b));
  });
  return [aArr, bArr];
};
const part1 = (rawInput: string) => {
  const [arr1, arr2] = parseInput(rawInput);
  const [a, b] = [arr1.sort(), arr2.sort()];
  const distanceArray: number[] = [];
  for (const [index, value] of a.entries()) {
    distanceArray.push(Math.abs(value - b[index]));
  }

  return distanceArray.reduce((acc, v) => acc + v);
};

const part2 = (rawInput: string) => {
  const [arr1, arr2] = parseInput(rawInput);
  const similaryArray: number[] = [];
  arr1.forEach((a) => {
    const totalCountsInB: number = arr2.filter((v) => v === a).length;
    similaryArray.push(a * totalCountsInB);
  });

  return similaryArray.reduce((acc, v) => acc + v);
};

run({
  part1: {
    tests: [
      {
        input: `3   4
4   3
2   5
1   3
3   9
3   3`,
        expected: 11,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `3   4
4   3
2   5
1   3
3   9
3   3`,
        expected: 31,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
