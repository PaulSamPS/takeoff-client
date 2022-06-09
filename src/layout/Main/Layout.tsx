import { Outlet } from 'react-router-dom';
import { Header } from './Header/Header';
import { Footer } from './Footer/Footer';
import styles from './Layout.module.scss';
import {useChat} from '../../hooks/useChat';

export const Layout = () => {
    const {chats} = useChat();
    console.log(chats);
  return (
    <div className={styles.wrapper}>
      <Header />
      <div className={styles.content}>
        <Outlet />
      </div>
      <Footer className={styles.footer} />
    </div>
  );
};
