import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const ContactForm1 = () => {
  return (
    <div className="container">
      <h1 className="text-center my-3">Contact Us</h1>
      <Formik
        initialValues={{
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        }}
        validationSchema={Yup.object({
          name: Yup.string().required("*Please enter your full name"),
          email: Yup.string()
            .email("*Invalid email address")
            .required("*Please enter your email address"),
          phone: Yup.string()
            .matches(/^\d{10}$/, "Invalid phone number")
            .required("*Please enter your phone number"),
          subject: Yup.string().required("*Please enter a subject."),
          message: Yup.string().required("*Please enter a message."),
        })}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        <Form className="col-md-6 m-auto">
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <Field type="text" name="name" className="form-control" />
            <div className="text-danger">
              <ErrorMessage name="name" />
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <Field type="email" name="email" className="form-control" />
            <div className="text-danger">
              <ErrorMessage name="email" />
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="phone" className="form-label">
              Phone
            </label>
            <Field type="text" name="phone" className="form-control" />
            <div className="text-danger">
              <ErrorMessage name="phone" />
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="subject" className="form-label">
              Subject
            </label>
            <Field type="text" name="subject" className="form-control" />
            <div className="text-danger">
              <ErrorMessage name="subject" />
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="message" className="form-label">
              Message
            </label>
            <Field as="textarea" name="message" className="form-control" />
            <div className="text-danger">
              <ErrorMessage name="message" />
            </div>
          </div>
          <div className="my-3 d-flex justify-content-center">
            <button type="submit" className="btn btn-success">
              Submit
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default ContactForm1;
