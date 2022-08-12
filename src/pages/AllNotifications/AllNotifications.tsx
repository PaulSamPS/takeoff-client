import React from 'react';
import {Outlet} from 'react-router-dom';
import {RightBar} from '../../components/RightBar/RightBar';
import styles from './AllNotifications.module.scss';

export const AllNotifications = () => {
    return (
        <div className={styles.wrapper}>
            <Outlet/>
            <RightBar firstItem={'Лайки'} secondItem={'Комментарии'} firstItemLink={'/main/all-notifications'} secondItemLink={'/main/all-notifications/comments'}/>
        </div>
    );
};

