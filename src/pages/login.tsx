import React, { useState } from "react";
import { Mail, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { loginUser } from "../redux/app/auth/authSlice";
import { showSnackbar } from "../redux/app/error/errorSlice";
import snackbarMessages from "../components/messages/message";

interface LoginFormValues {
  email: string;
  password: string;
  // rememberMe: boolean;
}

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon: React.FC<{ className?: string }>;
  name: string;
  label: string;
}

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

const initialValues: LoginFormValues = {
  email: "",
  password: "",
  // rememberMe: false,
};

const LoginPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const handleSubmit = async (values: LoginFormValues) => {
    setLoading(true);
    try {
      const response = await dispatch(loginUser(values));
      if (response?.meta?.requestStatus === "fulfilled") {
        dispatch(
          showSnackbar({
            message: snackbarMessages.success.loginSuccess,
            severity: "info",
          })
        );
      } else {
        dispatch(
          showSnackbar({
            message: snackbarMessages.error.loginFailed,
            severity: "error",
          })
        );
      }
      window.location.href = "/dashboard";
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  const InputField: React.FC<InputFieldProps> = ({
    icon: Icon,
    name,
    label,
    ...props
  }) => (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div className="relative h-[42px]">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Icon className="h-5 w-5 text-gray-400" />
        </div>
        <Field
          {...props}
          name={name}
          className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg 
                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                    text-gray-900 placeholder:text-gray-400"
        />
      </div>
      <ErrorMessage
        name={name}
        component="div"
        className="text-red-500 text-sm mt-1"
      />
    </div>
  );

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 bg-blue-600 p-12 flex-col justify-between relative overflow-hidden">
        <div className="relative z-10">
          <div className="text-white">
            <h1 className="text-4xl font-bold mb-4">Welcome Back!</h1>
            <p className="text-blue-100 text-lg">
              Log in to access your HR dashboard and manage your workforce
              efficiently.
            </p>
          </div>
        </div>

        <div className="absolute inset-0 opacity-10">
          <div className="absolute right-0 bottom-0 w-96 h-96 bg-white rounded-full transform translate-x-1/2 translate-y-1/2"></div>
          <div className="absolute left-0 top-0 w-72 h-72 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              Login to HR Manager
            </h2>

            <Formik
              initialValues={initialValues}
              validationSchema={LoginSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form>
                  <InputField
                    icon={Mail}
                    type="email"
                    name="email"
                    label="Email"
                    placeholder="Enter your email"
                  />

                  <InputField
                    icon={Lock}
                    type="password"
                    name="password"
                    label="Password"
                    placeholder="Enter your password"
                  />

                  <div className="flex items-center justify-between mb-6">
                    {/* <div className="flex items-center">
                      <Field
                        type="checkbox"
                        name="rememberMe"
                        className="h-4 w-4 text-blue-600 rounded border-gray-300"
                      />
                      <label className="ml-2 block text-sm text-gray-700">
                        Remember me
                      </label>
                    </div> */}
                    <button
                      onClick={() => navigate("/auth/forgot-password")}
                      className="text-sm text-blue-600 hover:text-blue-500"
                    >
                      Forgot password?
                    </button>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting || loading}
                    className="w-full bg-blue-600 text-white py-2.5 px-4 rounded-lg font-medium 
                                        hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 
                                        focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed
                                        transition-colors duration-200"
                  >
                    {loading ? "Loading..." : "Login"}
                  </button>

                  <div className="text-center mt-6">
                    <span className="text-gray-600">
                      Don't have an account?
                    </span>
                    <button
                      type="button"
                      onClick={() => navigate("/auth/signup")}
                      className="ml-2 text-blue-600 hover:text-blue-500"
                    >
                      Sign up
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
