class Department {
  // アクセス修飾子はpublicとprivateの２つがあり、publicはデフォルトなので基本的に記載する必要はない。publicの場合クラスの外からアクセスすることができる。
  // 学習のためわざと書いている。
  public name: string;
  private employees: string[] = [];

  constructor(n: string) {
    this.name = n;
  }

  // この引数thisに, Departmentという型定義が意味することは、describe()が実行されたとき、thisは常にDepartmentクラスをベースにしたインスタンスを参照する必要があるということ
  describe(this: Department) {
    console.log("Department: " + this.name);
  }

  addEmployee(employee: string) {
    this.employees.push(employee);
  }

  printEmployeeInformation() {
    console.log(
      `この部署には${this.employees.length}名の従業員が在籍しています。`
    );
    console.log(this.employees);
  }
}

const accounting = new Department("Accounting");

accounting.addEmployee("Max");
accounting.addEmployee("Manu");

accounting.printEmployeeInformation();

// const accountingCopy = { name: "DUMMY", describe: accounting.describe };

// accountingCopy.describe();
