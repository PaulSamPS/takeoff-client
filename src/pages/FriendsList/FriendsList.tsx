import React, { FormEvent } from 'react';
import styles from './Friendslist.module.scss';
import { useRequest } from '../../hooks/useRequest';
import { Button } from '../../components/Button/Button';
import { ReactComponent as SearchIcon } from '../../helpers/icons/search.svg';
import { FriendCard } from '../../components/FriendCard/FriendCard';
import { useScroll } from '../../hooks/usseScroll';

export const FriendsList = () => {
  const { friends } = useRequest();
  const [text, setText] = React.useState<string | null>('');
  const { scrollY } = useScroll();
  console.log(text);

  React.useEffect(() => {
    document.getElementById('input')?.focus();
  }, []);

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.top}>
          <div>
            Все друзья <span>21</span>
          </div>
          <div>
            Друзья онлайн <span>2</span>
          </div>
        </div>
        <form
          className={styles.search}
          style={{
            position: scrollY >= 75 ? 'sticky' : 'relative',
            top: scrollY >= 75 ? '71px' : '0',
          }}
        >
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
        <div className={styles.cardGrid}>
          {friends.length > 0 ? (
            friends.map((friend) => <FriendCard key={friend.id} friend={friend} />)
          ) : (
            <h3>Друзей пока нет</h3>
          )}
        </div>
      </div>
    </>
  );
};
