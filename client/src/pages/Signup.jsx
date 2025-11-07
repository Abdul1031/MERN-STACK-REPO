import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import api from "../api/axiosInstance";
import { useDispatch } from "react-redux";
import { fetchMe } from "../store/authSlice";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import "./Login.css";

const SignupSchema = Yup.object({
  name: Yup.string().required("Full name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().min(6, "Too short!").required("Password is required"),
  role: Yup.string()
    .oneOf(["admin", "user"], "Select a valid role")
    .required("Role is required"),
});

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignup = async (values, { setSubmitting }) => {
    try {
      const res = await api.post("/auth/signup", values, {
        withCredentials: true,
      });
      toast.success("Signup successful!");
      await dispatch(fetchMe());

      setTimeout(() => {
        navigate("/dashboard");
      }, 800);
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="login-container">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="login-box">
        <h1 className="brand-title">AlMukarramah</h1>
        <p className="subtitle">Project Management System</p>

        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
            role: "user",
            consent: false,
          }}
          validationSchema={SignupSchema}
          onSubmit={handleSignup}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="form-group">
                <label>Full Name</label>
                <Field
                  type="text"
                  name="name"
                  placeholder="Your name"
                  className="input-field"
                />
                <ErrorMessage name="name" component="div" className="error" />
              </div>

              <div className="form-group">
                <label>Email Address</label>
                <Field
                  type="email"
                  name="email"
                  placeholder="your@email.com"
                  className="input-field"
                />
                <ErrorMessage name="email" component="div" className="error" />
              </div>

              <div className="form-group">
                <label>Password</label>
                <Field
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  className="input-field"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="error"
                />
              </div>

              <div className="form-group">
                <label>Role</label>
                <Field as="select" name="role" className="input-field">
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </Field>
                <ErrorMessage name="role" component="div" className="error" />
              </div>

              <div className="checkbox-row">
                <Field type="checkbox" name="consent" />
                <label className="consent-text">
                  I consent to the processing of my personal data according to
                  the Privacy Policy
                </label>
              </div>

              <button
                type="submit"
                className="signin-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Creating Account..." : "Sign Up"}
              </button>

              <p className="admin-note">
                Already have an account?{" "}
                <a href="/login" className="action-link">
                  Sign in
                </a>
              </p>
            </Form>
          )}
        </Formik>

        <footer className="login-footer">
          <p>© 2025 AlMukarramah. All rights reserved.</p>
          <div className="footer-links">
            <a href="#">Privacy Policy</a> | <a href="#">Terms of Use</a>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Signup;
