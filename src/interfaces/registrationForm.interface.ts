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
  city:
    | {
        value: string;
        label: string;
      }
    | string;
  birthday: string;
  language:
    | {
        value: string;
        label: string;
      }
    | string;
}
