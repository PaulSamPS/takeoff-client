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
import { io } from 'socket.io-client';
import { useAppSelector } from './hooks/redux';

export const App = () => {
  const { user } = useAppSelector((state) => state.loginReducer);

  const socket = io('http://localhost:4000');

  socket.on('connect', () => {
    socket.id = user.name;
    console.log(`connect ${socket.id}`);
  });

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
          <Route path='message' element={<Message />} />
        </Route>
        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
    </BrowserRouter>
  );
};
