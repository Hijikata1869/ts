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

  private submitHandler(event: Event) {
    event.preventDefault();
    console.log(this.titleInputElement.value); // configureメソッドのthis.submitHandlerにbindメソッドでthisを渡さないとこのthisはこのクラスのオブジェクトを参照せず、イベントの対象となったformを参照してしまう。formにはtitleInputElementは存在しないためundefinedとなりエラーになってしまう。
  }

  private configure() {
    // 「プロジェクト追加」ボタンが押されたときのイベントリスナー。bindメソッドは関数が実行されたときにthisが参照すべきオブジェクトを渡す。このthisを渡すのが意味するところは、submitHandlerのメソッドの内側ではconfigureメソッドと同じコンテキストでthisを参照するということ。configureメソッドはconstructorの中から呼び出されているため、このクラスのオブジェクトを参照する。
    this.element.addEventListener("submit", this.submitHandler.bind(this));
  }

  private attach() {
    this.hostElement.insertAdjacentElement("afterbegin", this.element);
  }
}

const prjInput = new ProjectInput();
