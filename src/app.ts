// const add = (a: number, b: number = 1) => {
//   return a + b;
// };

// const printOutput: (output: string | number | string[]) => void = (output) =>
//   console.log(output);

const hobbies = ["Sports", "Cooking"];
const activeHobbies = ["Hiking"];

activeHobbies.push(...hobbies);

const person = {
  firstName: "Max",
  age: 30,
};

const copiedPerson = {
  ...person,
};

const add = (...numbers: number[]) => {
  return numbers.reduce((curResult, curValue) => {
    return curResult + curValue;
  }, 0);
};

const addedNumbers = add(5, 2, 3);
console.log(addedNumbers);

const [hobby1, hobby2] = hobbies;

const { firstName: userName, age } = person;

console.log(userName, age, person);
