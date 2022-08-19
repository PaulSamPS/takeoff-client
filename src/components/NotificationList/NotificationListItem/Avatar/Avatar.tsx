import React from 'react';
import { API_URL } from '../../../../http/axios';
import { ReactComponent as NotificationCommentIcon } from '../../../../helpers/icons/notificationComment.svg';
import { AvatarProps } from './Avatar.props';

import cn from 'classnames';

import styles from '../NotificationListItem.module.scss';

export const NotificationListItemAvatar = ({ notification }: AvatarProps) => {
  return (
    <div className={styles.avatar}>
      <img
        src={
          notification.user.avatar == null
            ? `/photo.png`
            : `${API_URL}/avatar/${notification.user.avatar}`
        }
        alt={notification.user.name.firstName + '' + notification.user.name.lastName}
      />
      {notification.type === 'newLike' && (
        <img className={styles.icon} src={'/like.png'} alt={'like'} />
      )}
      {notification.type === 'newComment' && (
        <div className={cn(styles.icon, styles.notificationComment)}>
          <NotificationCommentIcon />
        </div>
      )}
    </div>
  );
};
