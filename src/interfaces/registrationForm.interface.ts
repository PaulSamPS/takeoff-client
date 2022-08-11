import {DefaultValues, KeepStateOptions, UnpackNestedValue} from 'react-hook-form';

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
}

export interface IUseRegistrationProps {
    reset: (
        values?: DefaultValues<IRegistrationForm> | UnpackNestedValue<IRegistrationForm>,
        keepStateOptions?: KeepStateOptions
    ) => void;
    error: string | undefined;
}


export interface IUseRegistrationReturn {
    handleSwitchMethod: () => void;
    onSubmit: (formData: IRegistrationForm) => Promise<void>;
}
