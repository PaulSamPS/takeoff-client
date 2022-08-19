import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ReactComponent as CloseIcon } from '../../../helpers/icons/close.svg';
import { ToastProps } from './Toast.props';
import { API_URL } from '../../../http/axios';

import { Emoji } from 'emoji-mart';
import reactStringReplace from 'react-string-replace';

import styles from './Toast.module.scss';

export const Toast = ({
  setModal,
  modal,
  bannerData,
  newMessageReceived,
}: ToastProps): JSX.Element => {
  const variants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: '100%' },
  };

  const handleCloseModal = () => {
    setModal(false);
  };

  React.useEffect(() => {
    setModal && setTimeout(() => setModal(false), 3000);
  }, [modal]);

  return (
    <AnimatePresence>
      {modal && (
        <motion.div
          className={styles.toast}
          onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
          animate={modal ? 'open' : 'closed'}
          variants={variants}
          initial={'closed'}
          exit={'closed'}
          transition={{
            damping: 20,
            type: 'spring',
            stiffness: 360,
          }}
        >
          <CloseIcon onClick={handleCloseModal} />
          <div className={styles.avatar}>
            <img
              src={
                bannerData.avatar === '' || bannerData.avatar === null
                  ? `/photo.png`
                  : `${API_URL}/avatar/${bannerData.avatar}`
              }
              alt={bannerData.name}
            />
          </div>
          <div className={styles.body}>
            <span>{newMessageReceived?.name}</span>
            <p>
              {reactStringReplace(newMessageReceived?.message, /:(.+?):/g, (match, i) => (
                <Emoji key={i} emoji={match} set='apple' size={16} native={false} />
              ))}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
