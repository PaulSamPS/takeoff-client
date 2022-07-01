import React, { FormEvent } from 'react';
import styles from './Friiend.module.scss';
import { Button } from '../../components/Button/Button';
import { ReactComponent as SearchIcon } from '../../helpers/icons/search.svg';
import { FriendCard } from '../../components/FriendCard/FriendCard';
import { useScroll } from '../../hooks/usseScroll';
import { useRequest } from '../../hooks/useRequest';
import cn from 'classnames';

export const Friends = () => {
  const { friends } = useRequest();
  const { scrollY } = useScroll();
  const [text, setText] = React.useState<string | null>('');
  const [activeSort, setActiveSort] = React.useState<number>(0);
  console.log(text);

  document.getElementById('input')?.focus();

  return (
    <div className={styles.wrapper}>
      {friends.length > 0 && (
        <div className={styles.top}>
          <div
            className={cn(styles.sort, {
              [styles.activeSort]: activeSort === 0,
            })}
            onClick={() => setActiveSort(0)}
          >
            Все друзья <span>{friends.length}</span>
          </div>
          <div
            className={cn(styles.sort, {
              [styles.activeSort]: activeSort === 1,
            })}
            onClick={() => setActiveSort(1)}
          >
            Друзья онлайн <span>2</span>
          </div>
        </div>
      )}
      {friends.length > 0 && (
        <form
          className={styles.search}
          style={{
            position: scrollY >= 75 ? 'sticky' : 'relative',
            top: scrollY >= 75 ? '71px' : '0',
            zIndex: scrollY >= 75 ? '11px' : '0',
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
      )}
      <div className={styles.cardGrid}>
        {friends.length > 0 ? (
          friends.map((friend) => <FriendCard key={friend.id} friend={friend} />)
        ) : (
          <h3>Друзей пока нет</h3>
        )}
      </div>
    </div>
  );
};
