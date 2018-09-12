import React from 'react';
import * as Yup from 'yup';
import { ErrorMessage, Field, Form, Formik } from 'formik';

const initialValues = {
  firstName: '',
  lastName: '',
  email: '',
  address: '',
  address2: '',
  city: '',
  state: '',
  zipCode: ''
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
  address: Yup.string()
    .max(25, 'Address must be less than 25 characters.')
    .required('Address is required.'),
  address2: Yup.string().max(25, 'Address 2 must be less than 25 characters.'),
  city: Yup.string()
    .max(25, 'City must be less than 25 characters.')
    .required('City is required.'),
  state: Yup.string()
    .test(
      'len',
      'Must be exactly 2 characters',
      val => !val || val.length === 2
    )
    .required('State is required.'),
  zipCode: Yup.string()
    .matches(/^\d{5}$/, 'Zip code must be 5 digits.')
    .required('Zip code is required.')
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
          name="firstName"
          type="text"
          className={
            errors.firstName && touched.firstName
              ? 'form-control is-invalid'
              : 'form-control'
          }
        />
        <ErrorMessage
          className="invalid-feedback"
          component="div"
          name="firstName"
        />
      </div>
      <div className="form-group col-md-6">
        <label htmlFor="lastName">Last name</label>
        <Field
          name="lastName"
          type="text"
          className={
            errors.lastName && touched.lastName
              ? 'form-control is-invalid'
              : 'form-control'
          }
        />
        <ErrorMessage
          className="invalid-feedback"
          component="div"
          name="lastName"
        />
      </div>
    </div>
    <div className="form-group">
      <label htmlFor="email">Email</label>
      <Field
        name="email"
        type="text"
        className={
          errors.email && touched.email
            ? 'form-control is-invalid'
            : 'form-control'
        }
      />
      <ErrorMessage className="invalid-feedback" component="div" name="email" />
    </div>
    <div className="form-group">
      <label htmlFor="address">Address</label>
      <Field
        name="address"
        type="text"
        className={
          errors.address && touched.address
            ? 'form-control is-invalid'
            : 'form-control'
        }
      />
      <ErrorMessage
        className="invalid-feedback"
        component="div"
        name="address"
      />
    </div>
    <div className="form-group">
      <label htmlFor="address2">Address 2 (Optional)</label>
      <Field
        name="address2"
        type="text"
        className={
          errors.address2 && touched.address2
            ? 'form-control is-invalid'
            : 'form-control'
        }
      />
      <ErrorMessage
        className="invalid-feedback"
        component="div"
        name="address2"
      />
    </div>
    <div className="form-row">
      <div className="form-group col-md-6">
        <label htmlFor="city">City</label>
        <Field
          name="city"
          type="text"
          className={
            errors.city && touched.city
              ? 'form-control is-invalid'
              : 'form-control'
          }
        />
        <ErrorMessage
          className="invalid-feedback"
          component="div"
          name="city"
        />
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
          <option value="CA">California</option>
        </Field>
        <ErrorMessage
          className="invalid-feedback"
          component="div"
          name="state"
        />
      </div>
      <div className="form-group col-md-2">
        <label htmlFor="zip">Zip</label>
        <Field
          name="zipCode"
          type="text"
          className={
            errors.zipCode && touched.zipCode
              ? 'form-control is-invalid'
              : 'form-control'
          }
        />
        <ErrorMessage
          className="invalid-feedback"
          component="div"
          name="zipCode"
        />
      </div>
    </div>
    <hr className="mb-4" />
    <button className="btn btn-primary" disabled={isSubmitting} type="submit">
      {isSubmitting ? 'Please wait...' : 'Submit'}
    </button>
  </Form>
);

const FormProfile = () => (
  <Formik
    initialValues={initialValues}
    onSubmit={onSubmit}
    render={render}
    validationSchema={validationSchema}
  />
);

export default FormProfile;
