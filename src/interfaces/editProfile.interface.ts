export interface IEditProfileForm {
  name: string;
  email: string;
  role: string;
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
