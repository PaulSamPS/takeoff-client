import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { News } from './pages/News/News';
import { PrivateAuth } from './helpers/PrivateAuth';
import { FriendsList, Find, Friends, Requests } from './pages/FriendsList';
import { Conversations, ConversationsList, Chat, Unread } from './pages/ConversationsList';
import { socketContext, SocketContext } from './helpers/socketContext';
import { Profile } from './pages/Profile/Profile';
import { Login, Registration, RegistrationSuccess, Auth } from './layout/Auth';
import { Basic, Contacts, Edit } from './pages/Edit';
import { UserFriends } from './pages/UserFriends/UserFriends';
import { Settings, General, Notifications } from './pages/Settings';
import { AllNotifications, Item } from './pages/AllNotifications';
import { Layout } from './layout/Main';

export const App = () => {
  const { socket } = socketContext();

  return (
    <SocketContext.Provider value={socket}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Auth />}>
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
            <Route path='edit' element={<Edit />}>
              <Route index element={<Basic />} />
              <Route path='contacts' element={<Contacts />} />
            </Route>
            <Route path='conversations' element={<ConversationsList />}>
              <Route index element={<Conversations />} />
              <Route path='unread' element={<Unread />} />
              <Route path=':id' element={<Chat />} />
            </Route>
            <Route path='friends' element={<FriendsList />}>
              <Route index element={<Friends />} />
              <Route path='requests' element={<Requests />} />
              <Route path='find' element={<Find />} />
            </Route>
            <Route path='user-friends' element={<UserFriends />}>
              <Route index element={<Friends />} />
              <Route path='followers' element={<Friends />} />
            </Route>
            <Route path='settings' element={<Settings />}>
              <Route index element={<General />} />
              <Route path='notifications' element={<Notifications />} />
            </Route>
            <Route path='all-notifications' element={<AllNotifications />}>
              <Route index element={<Item />} />
              <Route path='comments' element={<Item />} />
            </Route>
          </Route>
          <Route path='*' element={<Navigate to='/' replace />} />
        </Routes>
      </BrowserRouter>
    </SocketContext.Provider>
  );
};
