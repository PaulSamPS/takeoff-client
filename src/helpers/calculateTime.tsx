import moment from 'moment';
import Moment from 'react-moment';
import 'moment/locale/ru';

export const calculateTime = (createdAt: Date) => {
  moment.locale('ru');
  const today = moment(Date.now());
  const postDate = moment(createdAt);
  const diffInHours = today.diff(postDate, 'hours');

  if (diffInHours < 24) {
    return (
      <>
        сегодня в <Moment format='HH:mm'>{createdAt}</Moment>
      </>
    );
  } else if (diffInHours > 24 && diffInHours < 36) {
    return (
      <>
        вчера в <Moment format='HH:mm'>{createdAt}</Moment>
      </>
    );
  } else if (diffInHours > 36) {
    return <Moment format='D/MMMM/YYYY HH:mm'>{createdAt}</Moment>;
  }
};
