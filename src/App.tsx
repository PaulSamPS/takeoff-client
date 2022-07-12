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
import { UserInfo } from './pages/UserInfo/UserInfo';

export const App = () => {
  const { socket } = context();

  return (
    <>
      <SocketContext.Provider value={socket}>
        <BrowserRouter>
          <Routes>
            <Route path='/auth' element={<AuthLayout />} />
            <Route
              path='/'
              element={
                <PrivateAuth>
                  <Layout />
                </PrivateAuth>
              }
            >
              <Route index element={<News />} />
              <Route path='conversations' element={<ConversationsList />} />
              <Route path='friends' element={<FriendsList />} />
              <Route path='profile' element={<Profile />} />
              <Route path='user-profile' element={<UserInfo />} />
            </Route>
            <Route path='*' element={<Navigate to='/' replace />} />
          </Routes>
        </BrowserRouter>
      </SocketContext.Provider>
    </>
  );
};
