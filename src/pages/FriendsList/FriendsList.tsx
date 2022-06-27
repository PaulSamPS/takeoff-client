import React, { FormEvent } from 'react';
import styles from './Friendslist.module.scss';
import { Link } from 'react-router-dom';
import { useRequest } from '../../hooks/useRequest';
import { API_URL } from '../../http/axios';
import { Button } from '../../components/Button/Button';
import { ReactComponent as SearchIcon } from '../../helpers/icons/search.svg';

export const FriendsList = () => {
  const { friends } = useRequest();
  const [text, setText] = React.useState<string | null>('');
  console.log(text);

  return (
    <>
      <div className={styles.borderTop} />
      <div className={styles.wrapper}>
        <form className={styles.search}>
          <div
            className={styles.input}
            id='input'
            contentEditable='true'
            placeholder='Поиск друзей...'
            role='textbox'
            aria-multiline='true'
            onInput={(e: FormEvent<HTMLDivElement>) => setText(e.currentTarget.textContent)}
          ></div>
          <Button appearance='primary' disabled={true}>
            <SearchIcon />
          </Button>
        </form>
        <div className={styles.grid}>
          {friends.length > 0 ? (
            friends.map((f) => (
              <div className={styles.card} key={f.id}>
                <Link to={`/main/people/${f.id}`} replace className={styles.followers}>
                  <img
                    src={f.avatar == null ? `/photo.png` : `${API_URL}/avatar/${f.avatar}`}
                    alt={f.name}
                  />
                </Link>
                <div className={styles.body}>
                  <span className={styles.userName}>{f.name}</span>
                  <span className={styles.position}>{f.position}</span>
                  <span className={styles.sendMessage}>Написать сообщение</span>
                </div>
              </div>
            ))
          ) : (
            <h3>Пока друзей нет</h3>
          )}
        </div>
      </div>
    </>
  );
};
