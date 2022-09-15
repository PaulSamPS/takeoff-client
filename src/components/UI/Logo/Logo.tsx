import React from 'react';
import styles from './Logo.module.scss';
import { LogoProps } from './Logo.props';

export const Logo = ({ justify }: LogoProps) => {
  return (
    <div className={styles.wrapper} style={{ justifyContent: justify }}>
      <div className={styles.logo}>T</div>
      <h1>Takeoff</h1>
    </div>
  );
};
