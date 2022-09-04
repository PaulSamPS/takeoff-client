import React from 'react';
import styles from './MobileSidebar.module.scss';
import { MobileSidebarType } from '../../layout/Main/MobileHeader/MobileSidebar.type';
import { AnimatePresence, motion } from 'framer-motion';

export const MobileSidebar = ({ setModal, modal }: MobileSidebarType) => {
  const variants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: '-100%' },
  };

  const variantsOverlay = {
    open: { opacity: 1 },
    closed: { opacity: 0 },
  };

  return (
    <AnimatePresence>
      {modal && (
        <motion.div
          className={styles.overlay}
          onClick={() => setModal(false)}
          animate={modal ? 'open' : 'closed'}
          variants={variantsOverlay}
          exit={'closed'}
          initial={'closed'}
          transition={{
            type: 'spring',
            stiffness: 260,
            damping: 20,
          }}
        >
          <motion.div
            className={styles.menu}
            animate={modal ? 'open' : 'closed'}
            variants={variants}
            initial={'closed'}
            exit={'closed'}
            transition={{
              type: 'spring',
              stiffness: 260,
              damping: 20,
            }}
          ></motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
