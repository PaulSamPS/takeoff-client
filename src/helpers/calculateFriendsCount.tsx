export const calculateFriendsCount = (count: number) => {
  if (count === 0) {
    return <span style={{ color: 'var(--grey)', fontSize: '13px' }}>друзей</span>;
  }
  if (count === 1) {
    return <span style={{ color: 'var(--grey)', fontSize: '13px' }}>друг</span>;
  }
  if (count > 1 && count < 5) {
    return <span style={{ color: 'var(--grey)', fontSize: '13px' }}>друга</span>;
  }
  if (count >= 5) {
    return <span style={{ color: 'var(--grey)', fontSize: '13px' }}>друзей</span>;
  }
};
