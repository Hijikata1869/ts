function add(n1: number, n2: number) {
  return n1 + n2;
}

function printResult(num: number) {
  console.log("Result: " + num);
}

function addAndHandle(n1: number, n2: number, cb: (num: number) => void) {
  const result = n1 + n2;
  cb(result);
}

// addAndHandle(10, 20, (result) => {
//   console.log(result);
// });

let combineValues: (a: number, b: number) => number;

// combineValues = add;
// combineValues = pringResult
// combineValues = 5;

// console.log(combineValues(8, 8));

// printResult(add(5, 12));

function sendRequest(data: string, cb: (respons: any) => void) {
  return cb({ data: "Hi there!" });
}

sendRequest("Send this!", (response) => {
  console.log(response);
  return true;
});
