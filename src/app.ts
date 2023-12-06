const names: Array<string> = []; // string[]
// names[0].split(" ");

const promise: Promise<string> = new Promise((resolve) => {
  setTimeout(() => {
    resolve("終わりました！");
  }, 2000);
});

promise.then((data) => {
  console.log(data);
});
