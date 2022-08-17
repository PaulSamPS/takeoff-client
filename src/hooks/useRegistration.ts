import {
  IRegistrationForm,
  IUseRegistrationProps,
  IUseRegistrationReturn,
} from '../interfaces/registrationForm.interface';
import { registration } from '../redux/actions/authAction';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from './redux';

export const useRegistration = ({
  reset,
  error,
}: IUseRegistrationProps): IUseRegistrationReturn => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSwitchMethod = () => {
    navigate('/');
  };

  const onSubmit = async (formData: IRegistrationForm) => {
    if (typeof formData.gender !== 'string') {
      formData.gender = formData.gender.value;
    }
    if (typeof formData.city !== 'string') {
      formData.city = formData.city.value;
    }
    await dispatch(registration(formData)).then(() => {
      if (!error) {
        navigate('/registration/success');
        reset();
      }
    });
  };

  return { handleSwitchMethod, onSubmit };
};
