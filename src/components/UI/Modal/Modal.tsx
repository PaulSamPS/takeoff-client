import React from 'react';
import { ReactComponent as CloseIcon } from '../../../helpers/icons/close.svg';
import { ModalProps } from './Modal.props';
import { AnimatePresence, motion } from 'framer-motion';
import styles from './Modal.module.scss';
import { useScroll } from '../../../hooks/useScroll';

export const Modal = ({ children, setModal, modal }: ModalProps): JSX.Element => {
  const [scrollModalOpen, setScrollModalOpen] = React.useState<number>(0);
  const { scrollY } = useScroll();

  const handleCloseModal = () => {
    setModal(false);
  };

  const variants = {
    open: { opacity: 1 },
    closed: { opacity: 0 },
  };

  const variantsModal = {
    open: { opacity: 1, y: 0 },
    closed: { opacity: 0, y: '-100%' },
  };

  React.useEffect(() => {
    if (modal) {
      document.body.style.position = 'fixed';
      document.body.style.left = '0';
      document.body.style.right = '0';
      document.body.style.top = `-${scrollY}px`;
      setScrollModalOpen(scrollY);
    } else {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      window.scrollTo(0, scrollModalOpen);
    }
  }, [modal]);

  return (
    <AnimatePresence>
      {modal && (
        <motion.div
          className={styles.overlay}
          onClick={handleCloseModal}
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
          <motion.div
            className={styles.modal}
            onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
            animate={modal ? 'open' : 'closed'}
            variants={variantsModal}
            initial={'closed'}
            exit={'closed'}
            transition={{
              damping: 20,
              type: 'spring',
              stiffness: 360,
            }}
          >
            <CloseIcon className={styles.closeIcon} onClick={handleCloseModal} />
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
