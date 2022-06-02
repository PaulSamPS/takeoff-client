import React from 'react';
import styles from './Dialogs.module.scss';

// interface IRooms {
//   id: number;
//   roomId: string;
// }

export const Dialogs = () => {
  // const { rooms } = useChat();
  // const { name } = useParams();
  //
  // const filteredRooms: IRooms[] = [];
  //
  // rooms.filter((room: IRooms) => {
  //   if (!filteredRooms.some((e: IRooms) => e.roomId === room.roomId)) {
  //     filteredRooms.push(room);
  //   }
  // });
  // console.log(name, rooms);
  //
  // if (filteredRooms.length <= 0) {
  //   return <h2>Диалогов нет</h2>;
  // }

  return (
    <div className={styles.wrapper}>
      <div className={styles.dialogs}>
        {/* {filteredRooms.map((r: IRooms) => (*/}
        {/*  <span key={r.id}>{r.roomId}</span>*/}
        {/* ))}*/}
      </div>
    </div>
  );
};
