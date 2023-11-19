class Department {
  // private readonly id: string;
  // name: string;
  private employees: string[] = [];

  // readonly修飾子をつけると、プロパティを変更するコードをエラーにするので、一度初期値が設定された後は変わらないことを確実にすることができる。
  constructor(private readonly id: string, public name: string) {}

  describe(this: Department) {
    console.log(`Department (${this.id}): ${this.name}`);
  }

  addEmployee(employee: string) {
    this.employees.push(employee);
  }

  printEmployeeInformation() {
    console.log(this.employees.length);
    console.log(this.employees);
  }
}

const accounting = new Department("d1", "NEW NAME");

accounting.addEmployee("Max");
accounting.addEmployee("Manu");

accounting.printEmployeeInformation();
accounting.describe();

// const accountingCopy = { name: "DUMMY", describe: accounting.describe };

// accountingCopy.describe();
