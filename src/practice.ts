class Practice {
  constructor(private readonly id: string, public name: string) {}

  showInformation(this: Practice) {
    console.log(`id: ${this.id}, name: ${this.name}`);
  }
}

const practice = new Practice("1", "Max");

// practice.showInformation();
