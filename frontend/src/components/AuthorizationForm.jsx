import { Card, Form, Button } from 'react-bootstrap';
import React, { useRef, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const schema = Yup.object().shape({
  username: Yup.string().required('Ник обязателен'),
  password: Yup.string().required('Пароль обязателен'),
});

const AuthorizationForm = () => {
  const input = useRef(null);

  useEffect(() => input.current.focus(), []);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: schema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <Card className="shadow-sm">
            <Card.Body className="row p-5">
              <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <img src="images/avatar.jpg" className="rounded-circle" alt="Войти" />
              </div>
              <Form onSubmit={formik.handleSubmit} className="col-12 col-md-6 mt-3 mt-mb-0">
                <h1 className="text-center mb-4">Войти</h1>
                <Form.Floating className="mb-3">
                  <Form.Control
                    type="username"
                    placeholder="Ваш ник"
                    required
                    autoComplete="username"
                    id="username"
                    onChange={formik.handleChange}
                    value={formik.values.username}
                    isInvalid={!!formik.errors.username}
                    ref={input}
                  />
                  <Form.Label htmlFor="username">Ваш ник</Form.Label>
                  <Form.Control.Feedback type="invalid">{formik.errors.username}</Form.Control.Feedback>
                </Form.Floating>
                <Form.Floating className="mb-4">
                  <Form.Control
                    type="password"
                    placeholder="password"
                    required
                    name="password"
                    autoComplete="current-password"
                    id="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    isInvalid={!!formik.errors.password}
                  />
                  <Form.Label htmlFor="password">Пароль</Form.Label>
                  <Form.Control.Feedback type="invalid">{formik.errors.password}</Form.Control.Feedback>
                </Form.Floating>
                <Button type="submit" className="mb-3 w-100" variant="outline-primary">
                  Войти
                </Button>
              </Form>
            </Card.Body>
            <Card.Footer className="p-4">
              <div className="text-center">
                <span>Нет аккаунта? </span>
                <a href="/signap">Регистрация</a>
              </div>
            </Card.Footer>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AuthorizationForm;
