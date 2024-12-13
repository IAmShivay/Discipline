import React, { useState } from "react";
import { Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { showSnackbar } from "../redux/app/error/errorSlice";
import { changeUserPassword } from "../redux/app/auth/authSlice";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import logo from "../components/assets/Black.png";
// Validation Schema
const ChangePasswordSchema = Yup.object().shape({
  currentPassword: Yup.string().required("Current password is required"),
  newPassword: Yup.string()
    .min(8, "New password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "New password must include uppercase, lowercase, number, and special character"
    )
    .notOneOf(
      [Yup.ref("currentPassword")],
      "New password must be different from current password"
    )
    .required("New password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword")], "Passwords must match")
    .required("Please confirm new password"),
});

const ChangePasswordPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const query = new URLSearchParams(useLocation().search);
  const token = query.get("token");
  const error = useSelector((state: RootState) => state.auth.error);
  // Handle password change
  const handlePasswordChange = async (values: any) => {
    const valuesWithToken = {
      ...values,
      token: token, // This is the token from the URL query parameter
    };
    const response = await dispatch(changeUserPassword(valuesWithToken));
    if (response.meta.requestStatus === "fulfilled") {
      dispatch(
        showSnackbar({
          message: "Password changed successfully",
          severity: "success",
        })
      );
      navigate("/dashboard");
    } else {
      const { errors }: any = error;

      dispatch(
        showSnackbar({
          message: errors?.map((e: any) => e.message) || "An error occurred",
          severity: "error",
        })
      );
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
            <h1 className="text-4xl font-bold mb-4">Change Password</h1>
            <p className="text-blue-100 text-lg">
              Create a new secure password to protect your account.
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
        <div className="px-8 py-10">
            {/* Logo Section */}
            <div className="flex justify-center mb-6">
              <img
                src={logo}
                alt="Company Logo"
                className="h-16 w-auto object-contain"
              />
            </div>

            <Formik
              initialValues={{
                newPassword: "",
                confirmPassword: "",
                currentPassword: "",
              }}
              validationSchema={ChangePasswordSchema}
              onSubmit={handlePasswordChange}
            >
              {({ isSubmitting }) => (
                <Form>
                  <InputField
                    icon={Lock}
                    type="currentPassword"
                    name="currentPassword"
                    label="Current Password"
                    // placeholder="Enter new password"
                  />
                  <InputField
                    icon={Lock}
                    type="password"
                    name="newPassword"
                    label="New Password"
                    // placeholder="Enter new password"
                  />

                  <InputField
                    icon={Lock}
                    type="password"
                    name="confirmPassword"
                    label="Confirm New Password"
                    // placeholder="Confirm new password"
                  />

                  <button
                    type="submit"
                    disabled={isSubmitting || loading}
                    className="w-full bg-blue-600 text-white py-2.5 px-4 rounded-lg font-medium 
                                        hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 
                                        focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed
                                        transition-colors duration-200"
                  >
                    {loading ? "Updating..." : "Change Password"}
                  </button>

                  <div className="text-center mt-6">
                    <button
                      type="button"
                      onClick={() => navigate("/dashboard")}
                      className="text-blue-600 hover:text-blue-500"
                    >
                      Cancel
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

export default ChangePasswordPage;
