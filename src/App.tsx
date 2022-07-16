import React from 'react';
import './App.scss';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from './layout/Main/Layout';
import { News } from './pages/News/News';
import { AuthLayout } from './layout/Auth/AuthLayout';
import { PrivateAuth } from './helpers/PrivateAuth';
import { FriendsList } from './pages/FriendsList/FriendsList';
import { ConversationsList } from './pages/ConversationsList/ConversationsList';
import { context, SocketContext } from './helpers/context';
import { Profile } from './pages/Profile/Profile';
import { Chat } from './pages/Chat/Chat';
import { ConversationsUnread } from './pages/ConversationsList/ConversationsUnread/ConversationsUnread';
import { Conversations } from './pages/ConversationsList/Conversations/Conversations';
import { FriendsFind } from './pages/FriendsList/FriendsFind/FriendsFind';
import { Friends } from './pages/FriendsList/Friends/Friends';
import { FriendsRequests } from './pages/FriendsList/FriendsRequests/FriendsRequests';
import { Login } from './pages/Auth/Login/Login';
import { Registration } from './pages/Auth/Registration/Registration';
import { RegistrationSuccess } from './pages/Auth/RegistrationSuccess/RegistrationSuccess';

export const App = () => {
  const { socket } = context();

  return (
    <>
      <SocketContext.Provider value={socket}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<AuthLayout />}>
              <Route index element={<Login />} />
              <Route path='/registration' element={<Registration />} />
              <Route path='/registration/success' element={<RegistrationSuccess />} />
            </Route>
            <Route
              path='/main'
              element={
                <PrivateAuth>
                  <Layout />
                </PrivateAuth>
              }
            >
              <Route path='news' element={<News />} />
              <Route path='news/:id' element={<News />} />
              <Route path='profile/:id' element={<Profile />} />
              <Route path='conversations' element={<ConversationsList />}>
                <Route index element={<Conversations />} />
                <Route path='unread' element={<ConversationsUnread />} />
                <Route path=':id' element={<Chat />} />
              </Route>
              <Route path='friends' element={<FriendsList />}>
                <Route index element={<Friends />} />
                <Route path='requests' element={<FriendsRequests />} />
                <Route path='find' element={<FriendsFind />} />
              </Route>
            </Route>
            <Route path='*' element={<Navigate to='/' replace />} />
          </Routes>
        </BrowserRouter>
      </SocketContext.Provider>
    </>
  );
};
