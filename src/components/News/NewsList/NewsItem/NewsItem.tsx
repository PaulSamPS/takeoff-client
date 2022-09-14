import React from 'react';
import { NewsItemProps } from './NewsItem.props';
import { NewsItemIcons } from './Icons/Icons';
import { NewsItemComment } from './Comment/Comment';
import { NewsItemBody } from './Body/Body';

import styles from './NewsItem.module.scss';

export const NewsItem = ({
  post,
  postModal,
  setIsPostModal,
  setVisibleNotification,
}: NewsItemProps): JSX.Element => {
  const [isAllComments, setIsAllComments] = React.useState<boolean>(false);
  const [hoverPost, setHoverPost] = React.useState<boolean>(false);

  return (
    <div
      className={styles.wrapper}
      onMouseEnter={() => setHoverPost(true)}
      onMouseLeave={() => setHoverPost(false)}
      onTouchStart={() => setHoverPost(true)}
    >
      <NewsItemBody post={post} hoverPost={hoverPost} />
      <NewsItemIcons
        post={post}
        setIsPostModal={setIsPostModal}
        setVisibleNotification={setVisibleNotification}
        setIsAllComments={setIsAllComments}
        isAllComments={isAllComments}
        postModal={postModal}
      />
      <NewsItemComment
        post={post}
        isAllComments={isAllComments}
        setIsAllComments={setIsAllComments}
      />
    </div>
  );
};
