import { useLocation, useParams } from 'react-router-dom';

export const pageTitle = () => {
  const { pathname } = useLocation();
  const { id } = useParams();

  switch (pathname) {
    case '/main/news':
      return 'Новости';
    case `/main/profile/${id}`:
      return 'Профиль';
    case '/main/conversations':
      return 'Чаты';
    case `/main/conversations/${id}`:
      return 'Чат';
    case '/main/friends':
      return 'Друзья';
  }
};
