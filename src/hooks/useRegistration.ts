import { IRegistrationForm } from '../interfaces/registrationForm.interface';
import { registration } from '../redux/actions/authAction';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from './redux';
import { DefaultValues, KeepStateOptions, UnpackNestedValue } from 'react-hook-form';

interface IUseRegistrationProps {
  reset: (
    values?: DefaultValues<IRegistrationForm> | UnpackNestedValue<IRegistrationForm>,
    keepStateOptions?: KeepStateOptions
  ) => void;
  error: string | undefined;
}

interface IUseRegistrationReturn {
  handleSwitchMethod: () => void;
  onSubmit: (formData: IRegistrationForm) => Promise<void>;
}

export const useRegistration = ({
  reset,
  error,
}: IUseRegistrationProps): IUseRegistrationReturn => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSwitchMethod = () => {
    navigate({ pathname: '/auth', search: '?auth=login' });
  };

  const onSubmit = async (formData: IRegistrationForm) => {
    if (typeof formData.position !== 'string') {
      formData.position = formData.position.value;
    }
    if (typeof formData.level !== 'string') {
      formData.level = formData.level.value;
    }
    await dispatch(registration(formData)).then(() => {
      if (error == '') {
        navigate('/registration/success');
        reset();
      }
    });
  };

  return { handleSwitchMethod, onSubmit };
};
