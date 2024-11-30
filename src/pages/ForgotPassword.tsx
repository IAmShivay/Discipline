import React, { useState } from "react";
import { Lock, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { showSnackbar } from "../redux/app/error/errorSlice";
import { sendPasswordResetLink } from "../redux/app/auth/authSlice";
import snackbarMessages from "../components/messages/message";
// Type for email verification form
interface EmailVerificationFormValues {
  email: string;
}

// Validation Schema
const EmailVerificationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
});

const ResetPasswordInitiatePage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  // Handle email verification and initiate reset process
  const handleEmailVerification = async (
    values: EmailVerificationFormValues
  ) => {
    setLoading(true);
    try {
      // TODO: Replace with actual backend API call to initiate password reset

      const response = await dispatch(sendPasswordResetLink(values.email));

      if (response?.meta?.requestStatus === "fulfilled") {
        dispatch(
          showSnackbar({
            message: snackbarMessages.info.passwordResetMessage,
            severity: "info",
          })
        );

        // Optionally navigate to a confirmation page
        // navigate("/auth/reset-password-sent");
      } else {
        dispatch(
          showSnackbar({
            message: snackbarMessages.info.passwordResetFailed,
            severity: "error",
          })
        );
      }
    } catch (error) {
      dispatch(
        showSnackbar({
          message: "An error occurred. Please try again.",
          severity: "error",
        })
      );
    } finally {
      setLoading(false);
    }
  };

  // Reusable input field component
  const InputField: React.FC<{
    icon: React.FC<{ className?: string }>;
    name: string;
    label: string;
    type?: string;
  }> = ({ icon: Icon, name, label, type = "text", ...props }) => (
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
          type={type}
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
            <h1 className="text-4xl font-bold mb-4">Forgot Password?</h1>
            <p className="text-blue-100 text-lg">
              Enter your email to receive a password reset link.
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
              Reset Your Password
            </h2>

            <Formik
              initialValues={{ email: "" }}
              validationSchema={EmailVerificationSchema}
              onSubmit={handleEmailVerification}
            >
              {({ isSubmitting }) => (
                <Form>
                  <InputField
                    icon={Mail}
                    type="email"
                    name="email"
                    label="Email"
                    // placeholder="Enter your email"
                  />

                  <button
                    type="submit"
                    disabled={isSubmitting || loading}
                    className="w-full bg-blue-600 text-white py-2.5 px-4 rounded-lg font-medium 
                                        hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 
                                        focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed
                                        transition-colors duration-200"
                  >
                    {loading ? "Sending..." : "Send Reset Link"}
                  </button>

                  <div className="text-center mt-6">
                    <button
                      type="button"
                      onClick={() => navigate("/auth/login")}
                      className="text-blue-600 hover:text-blue-500"
                    >
                      Back to Login
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

export default ResetPasswordInitiatePage;
