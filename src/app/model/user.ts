export class User {
  constructor(public username: string,
              public token: string,
              public password?: string,
              public email?: string,
              public roles?: Array<string>) {
  }
}
