import React, { DetailedHTMLProps, HTMLAttributes } from 'react';
import styles from './MobileHeader.module.scss';
import { ReactComponent as BurgerIcon } from '../../../helpers/icons/burger.svg';
import cn from 'classnames';
import { MobileSidebar } from '../../../components/MobileSidebar/MobileSidebar';

export const MobileHeader: React.FC<
  DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
> = ({ className }) => {
  const [showSidebar, setShowSidebar] = React.useState<boolean>(false);

  return (
    <div className={cn(styles.wrapper, className)}>
      <BurgerIcon onClick={() => setShowSidebar(true)} />
      <MobileSidebar setModal={setShowSidebar} modal={showSidebar} />
    </div>
  );
};
