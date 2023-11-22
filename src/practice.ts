class Practice {
  constructor(
    public id: string,
    public name: string,
    protected members: string[]
  ) {}

  addMember(newMember: string) {
    this.members.push(newMember);
  }

  showMembers() {
    console.log(this.members);
  }
}

class SecondPractice extends Practice {
  constructor(id: string) {
    super(id, "Second", []);
  }

  addMember(newMember: string) {
    if (newMember === "Foo") {
      return;
    }
    this.members.push(newMember);
  }
}

const secondPractice = new SecondPractice("Second");
secondPractice.addMember("Max");
secondPractice.addMember("Foo");

secondPractice.showMembers();
// console.log(secondPractice);

// secondPractice.showInformation();
