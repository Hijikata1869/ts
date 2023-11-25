class Practice {
  constructor(public members: string[]) {
    members = [];
  }
}

const practice = new Practice(["foobar"]);
console.log(practice);
