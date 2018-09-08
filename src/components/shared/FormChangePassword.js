import React from 'react';
import * as Yup from 'yup';
import { Field, Form, Formik } from 'formik';

const initialValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  address: '',
  address2: '',
  city: '',
  state: '',
  zip: ''
};

const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .max(25, 'First name must be less than 25 characters.')
    .required('First name is required.'),
  lastName: Yup.string()
    .max(25, 'Last name must be less than 25 characters.')
    .required('Last name is required.'),
  email: Yup.string()
    .email('Invalid email address.')
    .required('Email is required.'),
  password: Yup.string()
    .min(6, 'Password must to be greater than 6 characters.')
    .required('Password is required.'),
  address: Yup.string()
    .max(25, 'Address must be less than 25 characters.')
    .required('Address is required.'),
  address2: Yup.string().max(25, 'Address 2 must be less than 25 characters.'),
  city: Yup.string()
    .max(25, 'City must be less than 25 characters.')
    .required('City is required.'),
  state: Yup.string().required('State is required.'),
  zip: Yup.string()
    .matches(/^\d{5}$/, 'Invalid zip code.')
    .required('Zip is required.')
});

const onSubmit = (values, actions) => {
  setTimeout(() => {
    alert(JSON.stringify(values, null, 2));
    actions.setSubmitting(false);
  }, 1000);
};

const render = ({ errors, touched, isSubmitting }) => (
  <Form>
    <div className="form-row">
      <div className="form-group col-md-6">
        <label htmlFor="firstName">First name</label>
        <Field
          type="text"
          name="firstName"
          className={
            errors.firstName && touched.firstName
              ? 'form-control is-invalid'
              : 'form-control'
          }
        />
        {errors.firstName &&
          touched.firstName && (
            <div className="invalid-feedback">{errors.firstName}</div>
          )}
      </div>
      <div className="form-group col-md-6">
        <label htmlFor="lastName">Last name</label>
        <Field
          type="text"
          name="lastName"
          className={
            errors.lastName && touched.lastName
              ? 'form-control is-invalid'
              : 'form-control'
          }
        />
        {errors.lastName &&
          touched.lastName && (
            <div className="invalid-feedback">{errors.lastName}</div>
          )}
      </div>
    </div>
    <div className="form-group">
      <label htmlFor="email">Email</label>
      <Field
        type="text"
        name="email"
        className={
          errors.email && touched.email
            ? 'form-control is-invalid'
            : 'form-control'
        }
      />
      {errors.email &&
        touched.email && <div className="invalid-feedback">{errors.email}</div>}
    </div>
    <div className="form-group">
      <label htmlFor="password">Password</label>
      <Field
        type="password"
        name="password"
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
      <label htmlFor="address">Address</label>
      <Field
        type="text"
        name="address"
        className={
          errors.address && touched.address
            ? 'form-control is-invalid'
            : 'form-control'
        }
      />
      {errors.address &&
        touched.address && (
          <div className="invalid-feedback">{errors.address}</div>
        )}
    </div>
    <div className="form-group">
      <label htmlFor="address2">Address 2</label>
      <Field
        type="text"
        name="address2"
        className={
          errors.address2 && touched.address2
            ? 'form-control is-invalid'
            : 'form-control'
        }
      />
      {errors.address2 &&
        touched.address2 && (
          <div className="invalid-feedback">{errors.address2}</div>
        )}
    </div>
    <div className="form-row">
      <div className="form-group col-md-6">
        <label htmlFor="city">City</label>
        <Field
          type="text"
          name="city"
          className={
            errors.city && touched.city
              ? 'form-control is-invalid'
              : 'form-control'
          }
        />
        {errors.city &&
          touched.city && <div className="invalid-feedback">{errors.city}</div>}
      </div>
      <div className="form-group col-md-4">
        <label htmlFor="state">State</label>
        <Field
          component="select"
          name="state"
          className={
            errors.state && touched.state
              ? 'form-control is-invalid'
              : 'form-control'
          }
        >
          <option value="">Choose...</option>
          <option value="red">Red</option>
          <option value="green">Green</option>
          <option value="blue">Blue</option>
        </Field>
        {errors.state &&
          touched.state && (
            <div className="invalid-feedback">{errors.state}</div>
          )}
      </div>
      <div className="form-group col-md-2">
        <label htmlFor="zip">Zip</label>
        <Field
          type="text"
          name="zip"
          className={
            errors.zip && touched.zip
              ? 'form-control is-invalid'
              : 'form-control'
          }
        />
        {errors.zip &&
          touched.zip && <div className="invalid-feedback">{errors.zip}</div>}
      </div>
    </div>
    <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
      {isSubmitting ? 'Please wait...' : 'Submit'}
    </button>
  </Form>
);

const FormChangePassword = () => (
  <Formik
    initialValues={initialValues}
    validationSchema={validationSchema}
    onSubmit={onSubmit}
    render={render}
  />
);

export default FormChangePassword;
