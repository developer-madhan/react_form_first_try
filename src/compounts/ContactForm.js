import React, { useState } from "react";
import * as Yup from "yup";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    errors: {}, // Store validation errors
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validation
    Yup.object({
      name: Yup.string().required("*Please enter your full name"),
      email: Yup.string()
        .email("Invalid email address")
        .required("*Please enter your email address"),
      phone: Yup.string()
        .matches(/^\d{10}$/, "Invalid phone number")
        .required("*Please enter your phone number"),
      subject: Yup.string().required("*Please enter a subject."),
      message: Yup.string().required("*Please enter a message."),
    })
      .validate(formData, { abortEarly: false })
      .then(() => {
        // Form is valid, submit or perform other actions
        alert(JSON.stringify(formData, null, 2));
      })
      .catch((errors) => {
        // Form validation failed, store errors
        const errorMap = {};
        errors.inner.forEach((error) => {
          errorMap[error.path] = error.message;
        });
        setFormData({
          ...formData,
          errors: errorMap,
        });
      });
  };

  return (
    <div className="container">
      <h1 className="text-center my-3">Contact Us</h1>
      <form onSubmit={handleSubmit} className="col-md-6 m-auto">
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="form-control"
          />
          {formData.errors.name && (
            <div className="text-danger">{formData.errors.name}</div>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="form-control"
          />
          {formData.errors.name && (
            <div className="text-danger">{formData.errors.email}</div>
          )}
        </div>{" "}
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Phone
          </label>
          <input
            type="text"
            name="Phone"
            value={formData.phone}
            onChange={handleChange}
            className="form-control"
          />
          {formData.errors.name && (
            <div className="text-danger">{formData.errors.phone}</div>
          )}
        </div>{" "}
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Subject
          </label>
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className="form-control"
          />
          {formData.errors.name && (
            <div className="text-danger">{formData.errors.subject}</div>
          )}
        </div>{" "}
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
          Message
          </label>
          <input
            type="text"
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="form-control"
          />
          {formData.errors.name && (
            <div className="text-danger">{formData.errors.message}</div>
          )}
        </div>
        <div className="my-3 d-flex justify-content-center">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
