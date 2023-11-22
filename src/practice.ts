class Practice {
  constructor(private members: string[]) {}

  get mostRecentPracticeMember() {
    return this.members[0];
  }

  set mostRecentPracticeMember(newMember: string) {
    this.members.push(newMember);
  }

  addMember(newMember: string) {
    this.members.push(newMember);
  }
}

const practice = new Practice([]);

practice.mostRecentPracticeMember = "Max";

console.log(practice.mostRecentPracticeMember);
