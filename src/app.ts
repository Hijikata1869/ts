const add = (a: number, b: number = 1) => {
  return a + b;
};

const printOutput: (output: string | number | string[]) => void = (output) =>
  console.log(output);

const hobbies = ["Sports", "Cooking"];
const activeHobbies = ["Hiking"];

activeHobbies.push(...hobbies);

const person = {
  name: "Max",
  age: 30,
};

const copiedPerson = {
  ...person,
};

console.log(copiedPerson);
