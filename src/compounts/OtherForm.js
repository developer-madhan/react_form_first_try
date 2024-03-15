import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const OtherForm = () => {
  const [submissionStatus, setSubmissionStatus] = useState(null);

  return (
    <div className="container">
      <h1 className="text-center my-3">Other Form</h1>
      <Formik
        initialValues={{
          username: '',
          password: '',
          confirmPassword: ''
        }}
        validationSchema={Yup.object({
          username: Yup.string().required('Username is required'),
          password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
          confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Confirm Password is required')
        })}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmissionStatus('success');
            setSubmitting(false);
          }, 400);
        }}
      >
        <Form className="col-md-6 m-auto" >
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Username</label>
            <Field type="text" name="username" className="form-control" />
            <ErrorMessage name="username" component="div" className="text-danger" />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <Field type="password" name="password" className="form-control" />
            <ErrorMessage name="password" component="div" className="text-danger" />
          </div>
          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
            <Field type="password" name="confirmPassword" className="form-control" />
            <ErrorMessage name="confirmPassword" component="div" className="text-danger" />
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </Form>
      </Formik>
      {submissionStatus === 'success' && <div className="text-success mt-3">Form submitted successfully!</div>}
    </div>
  );
};

export default OtherForm;
