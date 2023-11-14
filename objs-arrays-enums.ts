// const person: {
//   name: string;
//   age: number;
// }
// const person: {
//   name: string;
//   age: number;
//   hobbies: string[];
//   role: [number, string];
// } = {
//   name: "daichi",
//   age: 29,
//   hobbies: ["Sports", "Cooking"],
//   role: [2, "author"],
// };

enum Role {
  ADMIN = "ADMIN",
  READ_ONLY = 100,
  AUTHOR = 200,
}

const person = {
  name: "daichi",
  age: 29,
  hobbies: ["Sports", "Cooking"],
  role: Role.ADMIN,
};

console.log(Role);
