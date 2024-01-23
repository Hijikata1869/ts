// Project State Management
class ProjectState {
  // ProjectStateクラスの内側で、イベントリスナーを管理する。具体的にはイベントリスナーとしての関数のリストを管理する。何か状態に変更が合った場合には、そのリスナー関数が必ず呼び出されるようにする必要がある。以下に、リスナーの配列をプロパティとして追加する。
  private listeners: any[] = [];
  private projects: any[] = [];
  private static instance: ProjectState;

  private constructor() {} // 状態管理をするインスタンスのオブジェクトはアプリケーションで１つだけにしたいので、シングルトンにする

  static getInstance() {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new ProjectState();
    return this.instance;
  }

  // リスナーを追加するためのメソッド
  addListener(listenerFn: Function) {
    this.listeners.push(listenerFn);
  }

  addProject(title: string, description: string, manday: number) {
    const newProject = {
      id: Math.random().toString(),
      title: title,
      description: description,
      manday: manday,
    };
    this.projects.push(newProject);
    // この実装の意味合い。litenersプロパティは関数の配列。考え方としては何か変化が起きたとき、ここでは例えば、addProjectの関数が呼ばれてプロジェクトが追加されたときに全てのリスナー関数を呼び出すということ。リスナーの配列をループして、配列に含まれている、全てのリスナー関数をループする。
    for (const listenerFn of this.listeners) {
      // listenersは関数への参照なので、関数として呼び出すことができる。ここで、リスナー関数への引数として変化に関係のあるものを渡す。このProjectStateクラスはプロジェクトのリストを管理するためのものなのでプロジェクトの配列を渡す。ただしオリジナルではなく、そのコピーを渡す。なので、sliceメソッドの戻り値を渡す。それによって、リスナー側でこの配列を変更できないようにする。
      listenerFn(this.projects.slice());
    }
  }
}

const projectState = ProjectState.getInstance(); // シングルトンになっている

// Validation
interface Validatable {
  value: string | number;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
}

function validate(validatableInput: Validatable) {
  let isValid = true;
  if (validatableInput.required) {
    isValid = isValid && validatableInput.value.toString().trim().length !== 0;
  }
  if (
    validatableInput.minLength != null &&
    typeof validatableInput.value === "string"
  ) {
    isValid =
      isValid && validatableInput.value.length >= validatableInput.minLength;
  }
  if (
    validatableInput.maxLength != null &&
    typeof validatableInput.value === "string"
  ) {
    isValid =
      isValid && validatableInput.value.length <= validatableInput.maxLength;
  }
  if (
    validatableInput.min != null &&
    typeof validatableInput.value === "number"
  ) {
    isValid = isValid && validatableInput.value >= validatableInput.min;
  }
  if (
    validatableInput.max != null &&
    typeof validatableInput.value === "number"
  ) {
    isValid = isValid && validatableInput.value <= validatableInput.max;
  }
  return isValid;
}

// autobind decorator
function autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    get() {
      const boundFn = originalMethod.bind(this);
      return boundFn;
    },
  };
  return adjDescriptor;
}

// ProjectList Class
class ProjectList {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLElement;
  assignedProjects: any[];

  constructor(private type: "active" | "finished") {
    this.templateElement = document.getElementById(
      "project-list"
    )! as HTMLTemplateElement;
    this.hostElement = document.getElementById("app")! as HTMLDivElement;
    this.assignedProjects = [];

    const importedNode = document.importNode(
      this.templateElement.content,
      true
    );
    this.element = importedNode.firstElementChild as HTMLElement; // sectionタグ以下
    this.element.id = `${this.type}-projects`;

    // 変更に関心があるクラスを実装する。ProjectListのクラス。ここで、リスナーを設定。ここでは関数を渡す必要がある。これは、ProjectStateの中でリスナーとして管理される。そして、なんらかのProjectのStateに変更があればリスナー関数が呼び出される。ここで引数として渡されているprojectsのリストはなんらかの変更が行われたもの。それを、assignedProjectsのプロパティに上書きしている。そして、このリスナー関数でやりたいことは新しいプロジェクトのリストを表示すること。そのためにrenderProjectsというメソッドを実装している。
    projectState.addListener((projects: any[]) => {
      this.assignedProjects = projects;
      this.renderProjects();
    });

    this.attach();
    this.renderContent();
  }

  // リストを表示するためのメソッド。プロジェクトを表示するにはリストの要素にアクセスする必要がある。
  private renderProjects() {
    const listEl = document.getElementById(
      `${this.type}-projects-list`
    )! as HTMLUListElement;
    for (const prjItem of this.assignedProjects) {
      const listItem = document.createElement("li");
      listItem.textContent = prjItem.title;
      listEl.appendChild(listItem);
    }
  }

  private renderContent() {
    const listId = `${this.type}-projects-list`;
    this.element.querySelector("ul")!.id = listId;
    this.element.querySelector("h2")!.textContent =
      this.type === "active" ? "実行中プロジェクト" : "完了プロジェクト";
  }

  private attach() {
    this.hostElement.insertAdjacentElement("beforeend", this.element);
  }
}

// ProjectInput Class
// フォームの表示と、入力値の取得を行うクラス
class ProjectInput {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLFormElement;
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  mandayInputElement: HTMLInputElement;

  constructor() {
    this.templateElement = document.getElementById(
      "project-input"
    )! as HTMLTemplateElement;
    this.hostElement = document.getElementById("app")! as HTMLDivElement;

    const importedNode = document.importNode(
      this.templateElement.content,
      true
    );
    this.element = importedNode.firstElementChild as HTMLFormElement; // formタグ以下
    this.element.id = "user-input"; // formタグのidに"user-input"を設定

    this.titleInputElement = this.element.querySelector(
      "#title"
    ) as HTMLInputElement;

    this.descriptionInputElement = this.element.querySelector(
      "#description"
    ) as HTMLInputElement;

    this.mandayInputElement = this.element.querySelector(
      "#manday"
    ) as HTMLInputElement;

    this.configure();
    this.attach();
  }

  private gatherUserInput(): [string, string, number] | void {
    const enteredTitle = this.titleInputElement.value;
    const enteredDescription = this.descriptionInputElement.value;
    const enteredManday = this.mandayInputElement.value;

    const titleValidatable: Validatable = {
      value: enteredTitle,
      required: true,
    };

    const descriptionValidatable: Validatable = {
      value: enteredDescription,
      required: true,
      minLength: 5,
    };

    const mandayValidatable: Validatable = {
      value: +enteredManday,
      required: true,
      min: 1,
      max: 1000,
    };
    if (
      !validate(titleValidatable) ||
      !validate(descriptionValidatable) ||
      !validate(mandayValidatable)
    ) {
      alert("入力値が正しくありません。再度お試しください。");
      return;
    } else {
      return [enteredTitle, enteredDescription, +enteredManday];
    }
  }

  private clearInputs() {
    this.titleInputElement.value = "";
    this.descriptionInputElement.value = "";
    this.mandayInputElement.value = "";
  }

  @autobind
  private submitHandler(event: Event) {
    event.preventDefault();
    const userInput = this.gatherUserInput();
    if (Array.isArray(userInput)) {
      const [title, desc, manday] = userInput;
      // addProjectが呼ばれた後に、更新されたリストを、プロジェクトのリストのクラスに渡す必要がある。プロジェクトリストのクラスは新しいプロジェクトを画面に表示しなければならない。ここでは、オブザーバーパターンを使う(オブザーバーパターンとは、コンピュータプログラミングにおける一種の設計パターン。 これは、一つのオブジェクトの「状態」が変わった時に、その変更を他のオブジェクトに自動的に通知するシステムのことを指す。)。イベントリスナーを使う。
      projectState.addProject(title, desc, manday);
      this.clearInputs();
    }
  }

  private configure() {
    this.element.addEventListener("submit", this.submitHandler);
  }

  private attach() {
    this.hostElement.insertAdjacentElement("afterbegin", this.element);
  }
}

const prjInput = new ProjectInput();
const activePrjList = new ProjectList("active");
const finishPrjList = new ProjectList("finished");
