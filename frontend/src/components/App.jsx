import React, { useState, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NavbarComponent from './Navbar';
import AuthorizationForm from './AuthorizationForm';
import routes from '../routes';
import MainPage from './MainPage';
import NotFound from './NotFound';
import Signup from './Signup';
import { AuthContext } from '../contexts';

const AuthProvider = ({ children }) => {
  const user = localStorage.getItem('user');
  const [loggedIn, setLoggedIn] = useState(!!user);

  const logIn = () => setLoggedIn(true);
  const logOut = () => {
    localStorage.removeItem('user');
    setLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={useMemo(() => ({ loggedIn, logIn, logOut }), [loggedIn])}>
      {children}
    </AuthContext.Provider>
  );
};

const PrivateRoute = () => {
  if (localStorage.getItem('user')) {
    return <MainPage />;
  }
  return <Navigate to={routes.loginPath()} />;
};

const App = () => (
  <div className="d-flex flex-column h-100">
    <AuthProvider>
      <Router>
        <NavbarComponent />
        <Routes>
          <Route path={routes.mainPath()} element={<PrivateRoute />} />
          <Route path={routes.loginPath()} element={<AuthorizationForm />} />
          <Route path={routes.notFoundPath()} element={<NotFound />} />
          <Route path={routes.signupPath()} element={<Signup />} />
        </Routes>
      </Router>
    </AuthProvider>
    <ToastContainer />
  </div>
);

export default App;
