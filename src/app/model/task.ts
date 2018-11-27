export class Task {
  constructor(public text: string,
              public status: string,
              public order: number,
              public deadline?: Date) {
  }
}
