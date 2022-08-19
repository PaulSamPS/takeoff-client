import React from 'react';
import styles from './NotificationListItem.module.scss';
import { Modal } from '../../UI/Modal/Modal';
import { NotificationListItemProps } from './NotificationListItem.props';
import { usePost } from '../../../hooks/usePost';
import { NewsItem } from '../../News/NewsList/NewsItem/NewsItem';
import { NotificationListItemInfo } from './Info/Info';
import { NotificationListItemAvatar } from './Avatar/Avatar';
import { NotificationListItemImage } from './Image/Image';

export const NotificationListItem = ({
  notification,
  setVisibleNotification,
  ...props
}: NotificationListItemProps): JSX.Element => {
  const [isPostModal, setIsPostModal] = React.useState<boolean>(false);
  const [offsetTop, setOffsetTop] = React.useState<number>(0);

  const notificationRef = React.useRef<HTMLDivElement>(null);

  const { handleFindPost, findPost } = usePost(notification.post);

  const coordsEl = () => {
    const rect = notificationRef.current?.getBoundingClientRect();
    setOffsetTop(rect!.top);
    localStorage.setItem('followId', notification.user._id);
    localStorage.setItem('friendsUserInfo', notification.user._id);
  };

  return (
    <div className={styles.notification} ref={notificationRef} {...props}>
      <NotificationListItemAvatar notification={notification} />
      <NotificationListItemInfo
        notification={notification}
        offsetTop={offsetTop}
        coordsEl={coordsEl}
        setVisibleNotification={setVisibleNotification}
        setIsPostModal={setIsPostModal}
        handleFindPost={handleFindPost}
      />
      <NotificationListItemImage notification={notification} />
      <Modal setModal={setIsPostModal} modal={isPostModal} postModal={isPostModal}>
        <NewsItem
          post={findPost}
          postModal={isPostModal}
          setIsPostModal={setIsPostModal}
          setVisibleNotification={setVisibleNotification}
        />
      </Modal>
    </div>
  );
};
