// autobind decorator
function autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  const adjDescriptor: PropertyDescriptor = {
    configurable: true, // プロパティの変更を可能にする
    // オリジナルの関数にアクセスしようとしたときに実行されるゲッター
    get() {
      const boundFn = originalMethod.bind(this);
      return boundFn;
    },
  };
  return adjDescriptor;
}

// ProjectInput Class
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

  @autobind
  private submitHandler(event: Event) {
    event.preventDefault();
    console.log(this.titleInputElement.value); // configureメソッドのthis.submitHandlerにbindメソッドでthisを渡さないとこのthisはこのクラスのオブジェクトを参照せず、イベントの対象となったformを参照してしまう。formにはtitleInputElementは存在しないためundefinedとなりエラーになってしまう。
    // autobindデコレータを追加したことにより、メソッド内に記述する必要がなくなった
  }

  private configure() {
    // 「プロジェクト追加」ボタンが押されたときのイベントリスナー。bindメソッドは関数が実行されたときにthisが参照すべきオブジェクトを渡す。このthisを渡すのが意味するところは、submitHandlerのメソッドの内側ではconfigureメソッドと同じコンテキストでthisを参照するということ。configureメソッドはconstructorの中から呼び出されているため、このクラスのオブジェクトを参照する。
    // autobindデコレータを追加したことにより、メソッド内に記述する必要がなくなった
    // 元のメソッド === this.element.addEventListener("submit", this.submitHandler.bind(this));
    // autobindデコレータ追加後の記述↓
    this.element.addEventListener("submit", this.submitHandler);
  }

  private attach() {
    this.hostElement.insertAdjacentElement("afterbegin", this.element);
  }
}

const prjInput = new ProjectInput();
console.log(prjInput);
