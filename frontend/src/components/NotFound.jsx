import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const NotFound = () => {
  const { t } = useTranslation();

  return (
    <div className="text-center">
      <img alt="Страница не найдена" className="img-fluid h-50" src="/images/not_found2.png" />
      <h1 className="h4 text-muted">{t('NotFound.notFoundPage')}</h1>
      <p className="text-muted">
        {`${t('NotFound.youCanGo')} `}
        <Link to="/">{t('NotFound.mainPage')}</Link>
      </p>
    </div>
  );
};

export default NotFound;
