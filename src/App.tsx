import React from 'react';
import './App.scss';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Login } from './pages/Auth/Login/Login';
import { Registration } from './pages/Auth/Registration/Registration';
import { Layout } from './layout/Main/Layout';
import { Main } from './pages/Main';
import { AuthLayout } from './layout/Auth/AuthLayout';
import { PrivateAuth } from './helpers/PrivateAuth';
import { Profile } from './pages/Profile/Profile';
import { RegistrationSuccess } from './pages/Auth/RegistrationSuccess/RegistrationSuccess';
import { Messages } from './pages/Messages/Messages';
import { Dialogs } from './pages/Dialogs/Dialogs';
import { Conversations } from './pages/Conversations/Conversations';
import { UserInfo } from './pages/UserInfo/UserInfo';
import { FriendsList } from './pages/FriendsList/FriendsList';
import { People } from './pages/People/People';
import { Requests } from './pages/Requests/Requests';
import { Friends } from './pages/Friends/Friends';
import { ConversationsList } from './pages/ConversationsList/ConversationsList';
import { ConversationsUnread } from './pages/ConversationsUnread/ConversationsUnread';
import { context, SocketContext } from './helpers/context';

export const App = () => {
  const { socket } = context();

  return (
    <>
      <SocketContext.Provider value={socket}>
        <BrowserRouter>
          <Routes>
            <Route path='/auth' element={<AuthLayout />}>
              <Route index element={<Login />} />
              <Route path='registration' element={<Registration />} />
              <Route path='registration/success' element={<RegistrationSuccess />} />
            </Route>
            <Route
              path='/'
              element={
                <PrivateAuth>
                  <Layout />
                </PrivateAuth>
              }
            >
              <Route index element={<Main />} />
              <Route path='profile' element={<Profile />} />
              <Route path='profile/:id' element={<UserInfo />} />
              <Route path='dialogs/:name' element={<Dialogs />} />
              <Route path='conversations' element={<ConversationsList />}>
                <Route index element={<Conversations />} />
                <Route path='unread' element={<ConversationsUnread />} />
                <Route path=':id' element={<Messages />} />
              </Route>
              <Route path='friends' element={<FriendsList />}>
                <Route index element={<Friends />} />
                <Route path='requests' element={<Requests />} />
                <Route path='find' element={<People />} />
              </Route>
            </Route>
            <Route path='*' element={<Navigate to='/' replace />} />
          </Routes>
        </BrowserRouter>
      </SocketContext.Provider>
    </>
  );
};
