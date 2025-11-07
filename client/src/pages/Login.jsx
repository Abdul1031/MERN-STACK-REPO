import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import api from "../api/axiosInstance";
import { useDispatch } from "react-redux";
import { fetchMe } from "../store/authSlice";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const LoginSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().min(6, "Too short!").required("Password is required"),
});

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (values, { setSubmitting }) => {
    try {
      const res = await api.post("/auth/login", values, {
        withCredentials: true,
      });
      toast.success(res.data.message || "Login successful!");

      await dispatch(fetchMe());

      setTimeout(() => {
        navigate("/dashboard");
      }, 800);
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid email or password");
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
          initialValues={{ email: "", password: "", consent: false }}
          validationSchema={LoginSchema}
          onSubmit={handleLogin}
        >
          {({ isSubmitting }) => (
            <Form>
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
                <a href="/forgot" className="forgot-link">
                  Forgot password?
                </a>
                <ErrorMessage
                  name="password"
                  component="div"
                  className="error"
                />
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
                {isSubmitting ? "Signing in..." : "Sign In"}
              </button>

              <p className="admin-note">
                Don't have an account?{" "}
                <a href="/signup" className="action-link">
                  Sign up
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

export default Login;
