export class User {
  public username: string;
  public email: string;
  public discordId: string;
  public password: string;
  public id: number;

  constructor(username: string, email: string, password: string) {
    this.username = username;
    this.email = email;
    this.password = password;
  }
}
