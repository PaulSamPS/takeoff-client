import React from 'react';
import './App.scss';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AuthLayout } from './layout/Auth/AuthLayout';
import { Login } from './layout/Auth/Login/Login';
import { Registration } from './layout/Auth/Registration/Registration';
import { Layout } from './layout/Main/Layout';
import { Boards } from './pages/Boards';

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<AuthLayout />}>
          <Route index element={<Login />} />
          <Route path='/registration' element={<Registration />} />
          <Route path='*' element={<Navigate to='/' replace />} />
        </Route>
        <Route path='/main' element={<Layout />}>
          <Route index element={<Boards />} />
          <Route path='*' element={<Navigate to='/main' replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
