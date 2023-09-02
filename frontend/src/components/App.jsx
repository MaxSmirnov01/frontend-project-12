import React from 'react';
// eslint-disable-next-line object-curly-newline
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import NavbarComponent from './Navbar';
import AuthorizationForm from './AuthorizationForm';
import routes from '../routes';
import useAuth from '../hooks';
import Chat from './Chat';
import NotFound from './NotFound';

const PrivateRoute = () => {
  const auth = useAuth();
  return auth.loggedIn ? <Chat /> : <Navigate to={routes.loginPath()} />;
};

const App = () => (
  <div className="h-100">
    <div className="h-100" id="chat">
      <div className="d-flex flex-column h-100">
        <NavbarComponent />
        <BrowserRouter>
          <Routes>
            <Route path={routes.chatPath()} element={<PrivateRoute />} />
            <Route path={routes.loginPath()} element={<AuthorizationForm />} />
            <Route path={routes.notFoundPath()} element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  </div>
);

export default App;
