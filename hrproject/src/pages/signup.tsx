import React, { useState } from 'react';
import { Mail, Lock, User, Building2, Phone, LucideIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store';
import { registerUser } from '../redux/app/auth/authSlice';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';

interface SignupFormValues {
    fullName: string;
    companyName: string;
    email: string;
    password: string;
    mobileNumber: string;
    terms: boolean | undefined;
}

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
    icon: LucideIcon;
    name: string;
    label?: string;
    placeholder?: string;
}

interface ApiError {
    message: string;
}

const SignupSchema = Yup.object().shape({
    fullName: Yup.string()
        .min(2, 'Name is too short')
        .max(50, 'Name is too long')
        .required('Full name is required'),
    companyName: Yup.string()
        .min(2, 'Company name is too short')
        .max(100, 'Company name is too long')
        .required('Company name is required'),
    email: Yup.string()
        .email('Invalid email format')
        .required('Email is required'),
    password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
            'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
        )
        .required('Password is required'),
    mobileNumber: Yup.string()
        .matches(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number')
        .required('Mobile number is required'),
    terms: Yup.boolean()
        .oneOf([true], 'You must accept the terms and conditions'),
});

const initialValues: SignupFormValues = {
    fullName: '',
    companyName: '',
    email: '',
    password: '',
    mobileNumber: '',
    terms: false,
};

const SignupPage: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(false);

    const handleSubmit = async (
        values: SignupFormValues,
        { setSubmitting, setErrors }: FormikHelpers<SignupFormValues>
    ): Promise<void> => {
        setLoading(true);
        try {
            console.log(values);
            await dispatch(registerUser(values));
            navigate('/auth/login');
        } catch (error) {
            const apiError = error as ApiError;
            setErrors({
                email: apiError.message || 'Registration failed. Please try again.',
            });
        } finally {
            setLoading(false);
            setSubmitting(false);
        }
    };

    const InputField: React.FC<InputFieldProps> = ({ icon: Icon, name, label, ...props }) => (
        <div className="mb-6">
            <div className="relative">
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
        <div className="h-full flex flex-col lg:flex-row">
            <div className="hidden lg:flex lg:w-1/2 bg-blue-600 p-12 flex-col justify-between relative">
                <div className="text-white">
                    <h1 className="text-4xl font-bold mb-4">Join HR Manager</h1>
                    <p className="text-blue-100 text-lg">
                        Create an account to streamline your HR processes and empower your workforce.
                    </p>
                </div>
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute right-0 bottom-0 w-96 h-full bg-white rounded-full transform translate-x-1/2 translate-y-1/2"></div>
                    <div className="absolute left-0 top-0 w-72 h-72 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
                </div>
            </div>
            <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-8 bg-gray-50">
                <div className="w-full max-w-md">
                    <div className="bg-white rounded-xl shadow-lg p-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                            Create an Account
                        </h2>
                        <Formik
                            initialValues={initialValues}
                            validationSchema={SignupSchema}
                            onSubmit={handleSubmit}
                        >
                            {({ isSubmitting }) => (
                                <Form>
                                    <InputField
                                        icon={User}
                                        type="text"
                                        name="fullName"
                                        placeholder="Enter your full name"
                                    />
                                    <InputField
                                        icon={Phone}
                                        type="tel"
                                        name="mobileNumber"
                                        placeholder="Enter your mobile number"
                                    />
                                    <InputField
                                        icon={Building2}
                                        type="text"
                                        name="companyName"
                                        placeholder="Enter company name"
                                    />
                                    <InputField
                                        icon={Mail}
                                        type="email"
                                        name="email"
                                        placeholder="Enter your email"
                                    />
                                    <InputField
                                        icon={Lock}
                                        type="password"
                                        name="password"
                                        placeholder="Create a password"
                                    />
                                    <div className="mb-6">
                                        <div className="flex items-center">
                                            <Field
                                                type="checkbox"
                                                name="terms"
                                                className="h-4 w-4 text-blue-600 rounded border-gray-300"
                                            />
                                            <label className="ml-2 block text-sm text-gray-700">
                                                I agree to the Terms and Privacy Policy
                                            </label>
                                        </div>
                                        <ErrorMessage
                                            name="terms"
                                            component="div"
                                            className="text-red-500 text-sm mt-1"
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={isSubmitting || loading}
                                        className="w-full bg-blue-600 text-white py-2.5 px-4 rounded-lg font-medium 
                                        hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 
                                        focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {loading ? 'Loading...' : 'Create Account'}
                                    </button>
                                    <div className="text-center mt-6">
                                        <span className="text-gray-600">Already have an account?</span>
                                        <button
                                            type="button"
                                            onClick={() => navigate('/login')}
                                            className="ml-2 text-blue-600 hover:text-blue-500"
                                        >
                                            Log in
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

export default SignupPage;
