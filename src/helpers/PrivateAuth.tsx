import React from 'react';
import { Navigate } from 'react-router-dom';
import { PrivateAuthProps } from './PrivateAuth.props';

export const PrivateAuth = ({ children }: PrivateAuthProps) => {
  const isAuth = localStorage.getItem('AccessToken');

  if (!isAuth) {
    return <Navigate to='/' />;
  }

  return children;
};
