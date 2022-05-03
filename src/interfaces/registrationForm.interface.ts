export interface IRegistrationForm {
  name: string;
  password: string;
  email: string;
  position:
    | {
        value: string;
        label: string;
      }
    | string;
  level:
    | {
        value: string;
        label: string;
      }
    | string;
}
