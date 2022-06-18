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
import { Message } from './pages/Messages/Message';
import { Dialogs } from './pages/Dialogs/Dialogs';
import { Conversations } from './pages/Conversations/Conversations';
import { UserInfo } from './pages/UserInfo/UserInfo';
import { Friends } from './pages/Friends/Friends';
import { Requests } from './pages/Requests/Requests';
import { FriendsList } from './pages/FriendsList/FriendsList';
import { People } from './pages/People/People';

export const App = () => {
  return (
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
          <Route index element={<Main />} />
          <Route path='profile' element={<Profile />} />
          <Route path='dialogs/:name' element={<Dialogs />} />
          <Route path='conversations/:id' element={<Message />} />
          <Route path='conversations' element={<Conversations />} />
          <Route path='people' element={<People />} />
          <Route path='people/:id' element={<UserInfo />} />
          <Route path='friends' element={<FriendsList />}>
            <Route index element={<Friends />} />
            <Route path='requests' element={<Requests />} />
          </Route>
        </Route>
        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
    </BrowserRouter>
  );
};
