import { IEditProfileForm } from '../interfaces/editProfile.interface';
import { adminUpdateUser, updateUser } from '../redux/actions/usersAction';
import { useAppDispatch, useAppSelector } from './redux';
import { DefaultValues, KeepStateOptions, UnpackNestedValue } from 'react-hook-form';
import { IRegistrationForm } from '../interfaces/registrationForm.interface';

interface useEditProfileProps {
  setIsOpen: (click: boolean) => void;
  adminUser?: number;
  reset: (
    values?: DefaultValues<IRegistrationForm> | UnpackNestedValue<IRegistrationForm>,
    keepStateOptions?: KeepStateOptions
  ) => void;
}

export const useEditProfile = ({ setIsOpen, adminUser, reset }: useEditProfileProps) => {
  const { user } = useAppSelector((state) => state.loginReducer);
  const dispatch = useAppDispatch();

  const onSubmit = async (formData: IEditProfileForm) => {
    if (formData.name || formData.email || formData.position || formData.level != '') {
      if (!adminUser) {
        dispatch(updateUser(user.id, formData)).then(() => {
          setIsOpen(false);
          reset();
        });
      } else {
        if (formData.position) {
          if (typeof formData.position !== 'string') {
            formData.position = formData.position.value;
          }
        }
        if (formData.level) {
          if (typeof formData.level !== 'string') {
            formData.level = formData.level.value;
          }
        }
        dispatch(adminUpdateUser(adminUser, formData)).then(() => {
          setIsOpen(false);
          reset();
        });
      }
    }
  };

  return onSubmit;
};
