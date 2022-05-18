import React from 'react';
import { Navigate } from 'react-router-dom';

interface PrivateAuthProps {
  children: JSX.Element;
}

export const PrivateAuth = ({ children }: PrivateAuthProps) => {
  const isAuth = localStorage.getItem('AccessToken');

  if (!isAuth) {
    return <Navigate to='/' replace />;
  }

  return children;
};
