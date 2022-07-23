export interface IEditProfile {
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
  familyStatus:
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
  day:
    | {
        value: string;
        label: string;
      }
    | string;
  month:
    | {
        value: string;
        label: string;
      }
    | string;
  year:
    | {
        value: string;
        label: string;
      }
    | string;
  language:
    | {
        value: string;
        label: string;
      }
    | string;
}
