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

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<AuthLayout />}>
          <Route index element={<Login />} />
          <Route path='/registration' element={<Registration />} />
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
        </Route>
        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
    </BrowserRouter>
  );
};
