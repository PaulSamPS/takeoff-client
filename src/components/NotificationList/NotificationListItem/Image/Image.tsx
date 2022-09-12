import React from 'react';
import { API_URL } from '../../../../http/axios';
import { Button } from '../../../UI';
import { ReactComponent as ArrowDownIcon } from '../../../../helpers/icons/arrowDown.svg';
import { ImageProps } from './Image.props';
import { useAppSelector } from '../../../../hooks/redux';
import { useNotifications } from '../../../../hooks/useNotifications';
import { POST_IMAGE_URL } from '../../../../helpers/constants';

import styles from '../NotificationListItem.module.scss';

export const NotificationListItemImage = ({ notification }: ImageProps) => {
  const loginUser = useAppSelector((state) => state.loginReducer.user);
  const { deleteNotification } = useNotifications();

  return (
    <div className={styles.postImage}>
      {notification.post.image !== null && (
        <img
          src={`${API_URL}/${POST_IMAGE_URL}/${notification.post.image}`}
          alt={loginUser.name.firstName + '' + loginUser.name.lastName}
        />
      )}
      <Button appearance='transparent'>
        <ArrowDownIcon />
        <div className={styles.deleteNotification}>
          <div onClick={() => deleteNotification(loginUser.id, notification._id)}>Удалить</div>
        </div>
      </Button>
    </div>
  );
};
