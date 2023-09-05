import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <div className="text-center">
    <img alt="Страница не найдена" className="img-fluid h-50" src="/images/not_found2.png" />
    <h1 className="h4 text-muted">Страница не найдена</h1>
    <p className="text-muted">
      Но вы можете перейтиㅤ
      <Link to="/">на главную страницу</Link>
    </p>
  </div>
);

export default NotFound;
