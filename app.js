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
var Role;
(function (Role) {
    Role["ADMIN"] = "ADMIN";
    Role[Role["READ_ONLY"] = 100] = "READ_ONLY";
    Role[Role["AUTHOR"] = 200] = "AUTHOR";
})(Role || (Role = {}));
var person = {
    name: "daichi",
    age: 29,
    hobbies: ["Sports", "Cooking"],
    role: Role.ADMIN
};
console.log(Role);
