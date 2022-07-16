export const calculateFollowersCount = (count: number) => {
  if (count === 0) {
    return <span style={{ color: 'var(--grey)', fontSize: '13px' }}>подаисчиков</span>;
  }
  if (count === 1) {
    return <span style={{ color: 'var(--grey)', fontSize: '13px' }}>подписчик</span>;
  }
  if (count > 1 && count < 5) {
    return <span style={{ color: 'var(--grey)', fontSize: '13px' }}>подписчика</span>;
  }
  if (count >= 5) {
    return <span style={{ color: 'var(--grey)', fontSize: '13px' }}>подписчиков</span>;
  }
};
