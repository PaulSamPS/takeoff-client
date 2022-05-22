import { io } from 'socket.io-client';
import React from 'react';
import { useAppSelector } from './redux';

const URL = 'http://localhost:4000';

export const useChat = (name?: string | undefined) => {
  // извлекаем данные пользователя из локального хранилища
  const { user } = useAppSelector((state) => state.loginReducer);
  const roomId = `23242`;
  // локальное состояние для списка пользователей
  const [users, setUsers] = React.useState([]);
  // локальное состояние для списка сообщений
  const [messages, setMessages] = React.useState([]);
  const [privateMessages, setPrivateMessages] = React.useState([]);
  const [rooms, setRooms] = React.useState([]);
  // состояние для системного сообщения
  const [log, setLog] = React.useState(null);

  console.log(privateMessages);

  // иммутабельное состояние для сокета
  const { current: socket } = React.useRef(
    io(URL, {
      query: {
        // отправляем идентификатор комнаты и имя пользователя на сервер
        roomId: roomId,
        userName: user.name,
        recipientUserName: name,
      },
    })
  );

  // регистрируем обработчики
  React.useEffect(() => {
    // сообщаем о подключении нового пользователя
    socket.emit('create', 'dialog');
    socket.emit('user:add', user);

    // запрашиваем сообщения из БД
    socket.emit('message:get');

    // запрашиваем комнаты из БД
    socket.emit('rooms:get');

    // обрабатываем получение системного сообщения
    socket.on('log', (log) => {
      setLog(log);
    });

    // обрабатываем получение обновленного списка пользователей
    socket.on('user_list:update', (users) => {
      setUsers(users);
    });

    // обрабатываем получение обновленного списка сообщений
    socket.on('message_list:update', (messages) => {
      setMessages(messages);
    });

    // обрабатываем получение обновленного списка комнат
    socket.on('rooms_list:update', (rooms) => {
      setRooms(rooms);
    });

    socket.on('privateMsg', (from, message) => {
      setPrivateMessages(message);
    });
  }, []);

  // метод для отправки сообщения
  const sendMessage = (message: any) => {
    socket.emit('message:add', name, message);
  };

  // метод для удаления сообщения
  const removeMessage = (message: any) => {
    socket.emit('message:remove', message);
  };

  return { roomId, users, messages, rooms, log, sendMessage, removeMessage };
};
