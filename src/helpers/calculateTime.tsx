import moment from 'moment';
import Moment from 'react-moment';
import 'moment/locale/ru';

export const calculateTime = (createdAt: Date | number | undefined) => {
  moment.locale('ru');
  const today = moment(Date.now());
  const postDate = moment(createdAt);
  const diffInHours = today.diff(postDate, 'hours');
  const diffInDays = today.diff(postDate, 'days');

  if (diffInHours < 24 && diffInDays <= 0) {
    return (
      <>
        сегодня в <Moment format='H:mm'>{createdAt}</Moment>
      </>
    );
  } else if (diffInHours > 24 && diffInHours < 36 && diffInDays == 1) {
    return (
      <>
        вчера в <Moment format='HH:mm'>{createdAt}</Moment>
      </>
    );
  } else if (diffInHours > 36) {
    return <Moment format='D MMMM YYYY в HH:mm'>{createdAt}</Moment>;
  }
};
