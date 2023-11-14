type Combinable = number | string;
type ComversionDescriptor = "as-number" | "as-text";

function combine(
  input1: Combinable,
  input2: Combinable,
  resultConversion: ComversionDescriptor
) {
  let result;
  if (
    (typeof input1 === "number" && typeof input2 === "number") ||
    resultConversion === "as-number"
  ) {
    result = +input1 + +input2;
  } else {
    result = input1.toString() + input2.toString();
  }
  return result;
  // if (resultConversion === "as-number") {
  //   return +result;
  // } else {
  //   return result.toString();
  // }
}

const combineAges = combine(20, 26, "as-number");
console.log(combineAges);

const combinedStringAges = combine("20", "26", "as-number");
console.log(combinedStringAges);

const combinedNames = combine("foo", "bar", "as-text");
console.log(combinedNames);
