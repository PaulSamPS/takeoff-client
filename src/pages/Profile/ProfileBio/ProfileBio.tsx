import React from 'react';
import styles from './ProfileBio.module.scss';
import { calculateTime } from '../../../helpers/calculateTime';
import { Link, useParams } from 'react-router-dom';
import { calculateFriendsCount } from '../../../helpers/calculateFriendsCount';
import { calculateFollowersCount } from '../../../helpers/calculateFollowersCount';
import { ProfileBioProps } from './ProfileBio.props';
import { useAppSelector } from '../../../hooks/redux';
import { useRequest } from '../../../hooks/useRequest';
import { useFollow } from '../../../hooks/useFollow';
import cn from 'classnames';
import { Button } from '../../../components/UI/Button/Button';
import { motion } from 'framer-motion';
import { Modal } from '../../../components/UI/Modal/Modal';
import { ModalUsers } from '../../../components/ModalUsers/ModalUsers';

export const ProfileBio = ({ user }: ProfileBioProps) => {
  const { friendsUserInfo } = useRequest();
  const { followings } = useFollow();
  const loginUser = useAppSelector((state) => state.loginReducer.user);
  const { users } = useAppSelector((state) => state.socketOnlineUserReducer);
  const usersOnline = users.map((user: any) => user.userId);
  const [visibleInfo, setVisibleInfo] = React.useState<boolean>(false);
  const [friendsModal, setFriendsModal] = React.useState<boolean>(false);
  const { id } = useParams();

  const variants = {
    open: { opacity: 1, height: 'auto' },
    closed: { opacity: 0, height: 0 },
  };

  React.useEffect(() => {
    setVisibleInfo(false);
  }, [id]);

  return (
    <div className={styles.bio}>
      <div className={styles.top}>
        <h1>{user?.firstName + ' ' + user?.lastName}</h1>
        {usersOnline.includes(id) ? (
          <div className={styles.online}>online</div>
        ) : (
          <div className={styles.lastVisit}>
            {user?.bio.gender === 'Мужской' ? 'был' : 'была'} в сети{' '}
            {user && calculateTime(user.lastVisit)}
          </div>
        )}
      </div>
      <div className={styles.middle}>
        {user?.bio.birthday && (
          <div className={styles.block}>
            <h3 className={styles.item}>День рождения:</h3>
            <span className={styles.itemName}>
              {user.bio.birthday.day + ' ' + user.bio.birthday.month + ' ' + user.bio.birthday.year}
            </span>
          </div>
        )}
        {user?.bio.city && (
          <div className={styles.block}>
            <h3 className={styles.item}>Город:</h3>
            <span className={styles.itemName}>{user.bio.city}</span>
          </div>
        )}
        <Button
          appearance='primary'
          className={styles.visibleInfo}
          onClick={() => setVisibleInfo(!visibleInfo)}
        >
          {!visibleInfo ? 'Показать подробную информацию' : 'Скрыть подробную информацию'}
        </Button>
        {visibleInfo && (
          <motion.div
            className={styles.mainInfo}
            animate={visibleInfo ? 'open' : 'closed'}
            initial={'closed'}
            exit={'closed'}
            variants={variants}
            transition={{
              damping: 20,
              type: 'spring',
              stiffness: 260,
              duration: 0.2,
            }}
          >
            <div className={cn(styles.block, styles.blockFlex)}>
              <h3 className={styles.title}>Основная информация</h3>
              <div className={styles.border} />
              {loginUser.id === id && (
                <Link className={styles.edit} to={'/main/edit'}>
                  Редактировать
                </Link>
              )}
            </div>
            {user?.bio.language && (
              <div className={styles.block}>
                <h3 className={styles.item}>Язык:</h3>
                <span className={styles.itemName}>{user.bio.language}</span>
              </div>
            )}
            {user?.bio.gender && (
              <div className={styles.block}>
                <h3 className={styles.item}>Пол:</h3>
                <span className={styles.itemName}>{user.bio.gender}</span>
              </div>
            )}
            {user?.bio.familyStatus && (
              <div className={styles.block}>
                <h3 className={styles.item}>Семейное положение:</h3>
                <span className={styles.itemName}>{user?.bio.familyStatus}</span>
              </div>
            )}
          </motion.div>
        )}
      </div>
      <div className={styles.bottom}>
        <Link to={'#'} className={styles.friends} onClick={() => setFriendsModal(true)}>
          <span className={styles.count}>{friendsUserInfo.length}</span>
          {calculateFriendsCount(friendsUserInfo.length)}
        </Link>
        <Link to={'#'} className={styles.friends}>
          <span className={styles.count}>{followings && followings.length}</span>
          {calculateFollowersCount(followings && followings.length)}
        </Link>
      </div>
      <Modal modal={friendsModal} setModal={setFriendsModal}>
        <ModalUsers />
      </Modal>
    </div>
  );
};
