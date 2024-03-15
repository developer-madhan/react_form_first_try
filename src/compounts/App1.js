import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const HeaderForm = ({ saveFormData }) => {
  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    console.log("Header form data:", values);
    saveFormData(values); // Save form data
    resetForm(); // Reset form fields
    setSubmitting(false); // Don't forget to setSubmitting(false) when done
  };

  return (
    <div>
      <h2 className="text-center" >Header Form</h2>
      <Formik
        initialValues={{
          name: "",
          email: "",
          dateOfBirth: "",
          country: "",
          gender: "",
          agree: false,
        }}
        validationSchema={Yup.object({
          name: Yup.string().required("Required"),
          email: Yup.string()
            .email("Invalid email address")
            .required("Required"),
          dateOfBirth: Yup.date().required("Required"),
          country: Yup.string().required("Required"),
          gender: Yup.string().required("Required"),
          agree: Yup.boolean().oneOf(
            [true],
            "Must accept terms and conditions"
          ),
        })}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="col-md-6 m-auto">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <Field type="text" name="name" className="form-control" />
              <ErrorMessage
                name="name"
                component="div"
                className="text-danger"
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <Field type="email" name="email" className="form-control" />
              <ErrorMessage
                name="email"
                component="div"
                className="text-danger"
              />
            </div>
            <div className="form-group">
              <label htmlFor="dateOfBirth">Date of Birth</label>
              <Field type="date" name="dateOfBirth" className="form-control" />
              <ErrorMessage
                name="dateOfBirth"
                component="div"
                className="text-danger"
              />
            </div>
            <div className="form-group">
              <label htmlFor="country">Country</label>
              <Field as="select" name="country" className="form-control">
                <option value="">Select a country</option>
                <option value="USA">USA</option>
                <option value="Canada">Canada</option>
                <option value="UK">UK</option>
              </Field>
              <ErrorMessage
                name="country"
                component="div"
                className="text-danger"
              />
            </div>
            <div className="form-group">
              <div>Gender</div>
              <div>
                <label className="mr-2">
                  <Field
                    type="radio"
                    name="gender"
                    value="male"
                    className="mr-1"
                  />{" "}
                  Male
                </label>{" "}
                <label className="mr-2">
                  <Field
                    type="radio"
                    name="gender"
                    value="female"
                    className="mr-1"
                  />{" "}
                  Female
                </label>{" "}
                <label className="mr-2">
                  <Field
                    type="radio"
                    name="gender"
                    value="other"
                    className="mr-1"
                  />{" "}
                  Other
                </label>
              </div>
              <ErrorMessage
                name="gender"
                component="div"
                className="text-danger"
              />
            </div>

            <div className="form-group">
              <div className="form-check">
                <Field
                  type="checkbox"
                  id="agree"
                  name="agree"
                  className="form-check-input"
                />
                <label htmlFor="agree" className="form-check-label">
                  Agree to terms and conditions
                </label>
              </div>
              <ErrorMessage
                name="agree"
                component="div"
                className="text-danger"
              />
            </div>
            <div className="d-flex justify-content-center">
              <button className="btn btn-primary" type="submit" disabled={isSubmitting}>
                Submit
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

const App1 = () => {
  const [formData, setFormData] = useState([]);

  const saveFormData = (data) => {
    setFormData((prevData) => [...prevData, data]);
  };

  const downloadLogFile = () => {
    const formDataString = formData
      .map(
        (data, index) =>
          `Header form data ${index + 1}:\n${JSON.stringify(data, null, 2)}`
      )
      .join("\n\n");

    const blob = new Blob([formDataString], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "form_data_log.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="container" >
      <HeaderForm saveFormData={saveFormData} />
      <div className="d-flex justify-content-center my-5" >
      <button className="btn btn-success" onClick={downloadLogFile}>Download Log File</button>
      </div>
    </div>
  );
};

export default App1;
