class Practice {
  constructor(private readonly id: string, public name: string) {}

  showInformation(this: Practice) {
    console.log(`id: ${this.id}, name: ${this.name}`);
  }
}

class SecondPractice extends Practice {
  constructor(id: string, private admins: string[]) {
    super(id, "Second");
  }

  addAdmins(text: string) {
    this.admins.push(text);
  }
}

const secondPractice = new SecondPractice("Second", []);

// console.log(secondPractice);

// secondPractice.showInformation();
