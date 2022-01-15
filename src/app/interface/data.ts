export class Data{
  email:string;
  password:string;
  fullName:object;


  public setFullName(firstName, lastName) {
        this.fullName = {
            first: firstName,
            last: lastName
        };
    }
}
