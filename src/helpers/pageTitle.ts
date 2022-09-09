import { useLocation, useParams } from 'react-router-dom';

export const pageTitle = () => {
  const { pathname } = useLocation();
  const { id } = useParams();

  switch (pathname) {
    case '/main/news':
      return 'Все посты';
    case `/main/news/${id}`:
      return 'Мои посты';
    case `/main/profile/${id}`:
      return 'Профиль';
    case '/main/conversations':
      return 'Чаты';
    case `/main/conversations/${id}`:
      return 'Чат';
    case '/main/friends':
      return 'Друзья';
    case '/main/conversations/unread':
      return 'Непрочитанные';
    case '/main/friends/requests':
      return 'Заявки в друзья';
    case '/main/friends/find':
      return 'Поиск друзей';
  }
};
