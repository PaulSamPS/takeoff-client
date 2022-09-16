import React, { memo } from 'react';
import { calculateTime } from '../../../helpers/calculateTime';
import { Link, useLocation, useParams } from 'react-router-dom';
import { calculateFriendsCount } from '../../../helpers/calculateFriendsCount';
import { calculateFollowersCount } from '../../../helpers/calculateFollowersCount';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { Button, Modal, Spinner } from '../../UI';
import { ModalUsers } from '../../ModalUsers/ModalUsers';
import { ProfileBioProps } from './Bio.props';

import cn from 'classnames';
import { motion } from 'framer-motion';

import styles from './Bio.module.scss';
import { IFollow } from '../../../interfaces/useFollow.interface';
import { setFollowersUser } from '../../../redux/reducers/followersUserReducer';
import { SocketContext } from '../../../helpers/socketContext';
import { useScreenWidth } from '../../../hooks/useScreenWidth';

export const Bio = memo(({ user, isLoadingUserInfo }: ProfileBioProps): JSX.Element => {
  const socket = React.useContext(SocketContext);
  const dispatch = useAppDispatch();
  const loginUser = useAppSelector((state) => state.loginReducer.user);
  const { users } = useAppSelector((state) => state.socketOnlineUserReducer);
  const { friendsUserInfo } = useAppSelector((state) => state.friendsUserInfoReducer);
  const { followers } = useAppSelector((state) => state.followersUserReducer);

  const [visibleInfo, setVisibleInfo] = React.useState<boolean>(false);
  const [friendsModal, setFriendsModal] = React.useState<boolean>(false);
  const [activeIndex, setActiveIndex] = React.useState<number>(0);

  const { id } = useParams();
  const { screenWidth } = useScreenWidth();
  const { pathname } = useLocation();

  const usersOnline = users.map((user: any) => user.userId);

  const variants = {
    open: { opacity: 1, height: 'auto' },
    closed: { opacity: 0, height: 0 },
  };

  const handleOpenModalFriends = () => {
    setActiveIndex(1);
    setFriendsModal(true);
    localStorage.setItem('friendsUserInfo', id!);
    localStorage.setItem('followId', id!);
    localStorage.setItem('backToProfile', pathname);
  };

  const setBackToProfile = () => {
    localStorage.setItem('friendsUserInfo', id!);
    localStorage.setItem('followId', id!);
    localStorage.setItem('backToProfile', pathname);
  };

  const handleOpenModalFollowings = () => {
    setActiveIndex(0);
    setFriendsModal(true);
    localStorage.setItem('friendsUserInfo', id!);
    localStorage.setItem('followId', id!);
    localStorage.setItem('backToProfile', pathname);
  };

  React.useEffect(() => {
    setVisibleInfo(false);
  }, [id]);

  React.useEffect(() => {
    socket?.emit('followersUserInfo:get', {
      userId: id,
    });
    socket?.on('followersUserInfo:set', ({ followingsUser }: IFollow) => {
      dispatch(setFollowersUser(followingsUser));
    });

    return () => {
      socket?.off('followersUserInfo:set');
    };
  }, [socket, id]);

  return (
    <div className={styles.bio}>
      {isLoadingUserInfo ? (
        <Spinner />
      ) : (
        <>
          <div className={styles.top}>
            <h1>{user?.name.firstName + ' ' + user?.name.lastName}</h1>
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
                  {user.bio.birthday.day +
                    ' ' +
                    user.bio.birthday.month +
                    ' ' +
                    user.bio.birthday.year}
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
            <Link
              to={screenWidth < 1000 ? '/main/user-friends' : '#'}
              className={styles.friends}
              onClick={screenWidth < 1000 ? setBackToProfile : handleOpenModalFriends}
            >
              <span className={styles.count}>{friendsUserInfo && friendsUserInfo.length}</span>
              {calculateFriendsCount(friendsUserInfo && friendsUserInfo.length)}
            </Link>
            <Link
              to={screenWidth < 1000 ? '/main/user-friends' : '#'}
              className={styles.friends}
              onClick={screenWidth < 1000 ? setBackToProfile : handleOpenModalFollowings}
            >
              <span className={styles.count}>{followers && followers.length}</span>
              {calculateFollowersCount(followers && followers.length)}
            </Link>
          </div>
        </>
      )}
      <Modal modal={friendsModal} setModal={setFriendsModal}>
        <ModalUsers
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
          setFriendsModal={setFriendsModal}
        />
      </Modal>
    </div>
  );
});
