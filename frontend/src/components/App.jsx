import React, { useState, useMemo } from 'react';
// eslint-disable-next-line object-curly-newline
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavbarComponent from './Navbar';
import AuthorizationForm from './AuthorizationForm';
import routes from '../routes';
// import useAuth from '../hooks';
import MainPage from './MainPage';
import NotFound from './NotFound';
import AuthContext from '../contexts';

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);

  const logIn = () => setLoggedIn(true);
  const logOut = () => {
    localStorage.removeItem('userToken');
    setLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={useMemo(() => ({ loggedIn, logIn, logOut }), [loggedIn])}>
      {children}
    </AuthContext.Provider>
  );
};

const PrivateRoute = () => {
  // const auth = useAuth();
  if (localStorage.getItem('userToken')) {
    // return auth.loggedIn ? <MainPage /> : <Navigate to={routes.loginPath()} />;
    return <MainPage />;
  }
  return <AuthorizationForm />;
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
        </Routes>
      </Router>
    </AuthProvider>
  </div>
);

export default App;
