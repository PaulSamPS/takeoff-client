export interface IRegistrationForm {
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  gender:
    | {
        value: string;
        label: string;
      }
    | string;
}
