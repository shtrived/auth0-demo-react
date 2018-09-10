import React from 'react';
import * as Yup from 'yup';
import { Field, Form, Formik } from 'formik';

const initialValues = {
  password: '',
  passwordConfirm: ''
};

const validationSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, 'Password must to be greater than 6 characters.')
    .required('Password is required.'),
  passwordConfirm: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords do not match.')
    .required('Password confirm is required')
});

const onSubmit = (values, actions) => {
  setTimeout(() => {
    alert(JSON.stringify(values, null, 2));
    actions.setSubmitting(false);
  }, 1000);
};

const render = ({ errors, touched, isSubmitting }) => (
  <Form>
    <div className="form-group">
      <label htmlFor="password">Password</label>
      <Field
        name="password"
        type="password"
        className={
          errors.password && touched.password
            ? 'form-control is-invalid'
            : 'form-control'
        }
      />
      {errors.password &&
        touched.password && (
          <div className="invalid-feedback">{errors.password}</div>
        )}
    </div>
    <div className="form-group">
      <label htmlFor="passwordConfirm">Confirm password</label>
      <Field
        name="passwordConfirm"
        type="password"
        className={
          errors.passwordConfirm && touched.passwordConfirm
            ? 'form-control is-invalid'
            : 'form-control'
        }
      />
      {errors.passwordConfirm &&
        touched.passwordConfirm && (
          <div className="invalid-feedback">{errors.passwordConfirm}</div>
        )}
    </div>
    <hr className="mb-4" />
    <button className="btn btn-primary" disabled={isSubmitting} type="submit">
      {isSubmitting ? 'Please wait...' : 'Submit'}
    </button>
  </Form>
);

const ChangePassword = () => (
  <Formik
    initialValues={initialValues}
    onSubmit={onSubmit}
    render={render}
    validationSchema={validationSchema}
  />
);

export default ChangePassword;
