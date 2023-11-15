const add = (a: number, b: number = 1) => {
  return a + b;
};

const printOutput: (output: string | number) => void = (output) =>
  console.log(output);

printOutput(add(2, 5));

const button = document.querySelector("button");

if (button) {
  button.addEventListener("click", (event) => {
    console.log(event);
  });
}
