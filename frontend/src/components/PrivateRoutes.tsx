import React from 'react';
import { Route, Navigate } from 'react-router-dom';

interface PrivateRouteProps {
  component: React.ComponentType<any>;
  [key: string]: any;
}

const PrivateRoute = ({ component: Component, ...rest }: PrivateRouteProps) => {
  const token = localStorage.getItem('token'); // O utilizar un estado global de autenticación

  return (
    <Route
      {...rest}
      element={token ? <Component /> : <Navigate to="/login" />}
    />
  );
};

export default PrivateRoute;
