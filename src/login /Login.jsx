import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import "./login.css"
import {Link} from "react-router-dom";

const Login = () => {
  // Define validation schema using Yup
  const validationSchema = Yup.object().shape({
    email: Yup.string().trim().required("Email is required").email("Invalid email"),
    password: Yup.string().trim().min(8, "Password must be at least 8 characters").required("Password is required"),
  });

  // Define initial form values
  const initialValues = {
    email: '',
    password: '',
  };

  // Submission handler function
  const handleSubmit = (values, { setSubmitting }) => {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
    }, 400);
  };

  return (
    <div className='dav'>
      <h2>Login</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className='ok'>
              <label htmlFor="email">Email:</label>
              <Field type="email" id="email" name="email" />
              <ErrorMessage name="email" component="div" className="error" />
            </div>
            <div className='no'>
              <label htmlFor="password">Password:</label>
              <Field type="password" id="password" name="password" />
              <ErrorMessage name="password" component="div" className="error" />
            </div>
            <br/>
            <button className='pop' type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Logging in...' : 'Login'}
            </button>
            <Link to="/signup">Signup</Link> 
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
