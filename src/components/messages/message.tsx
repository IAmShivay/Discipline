// snackbarMessages.ts

import { logout } from "../../redux/app/auth/authSlice";

interface SnackbarMessages {
    success: {
        [key: string]: string;
    };
    error: {
        [key: string]: string;
    };
    info: {
        [key: string]: string;
    };
}

const snackbarMessages: SnackbarMessages = {
    success: {
        employeeDeleted: "Employee deleted successfully.",
        employeeOnboarded: "Employee successfully onboarded.",
        payrollProcessed: "Payroll has been processed successfully.",
        profileUpdated: "Employee profile updated successfully.",
        leaveApproved: "Leave request approved.",
        leaveRejected: "Leave request rejected.",
        attendanceMarked: "Attendance marked successfully.",
        performanceReviewed: "Performance review completed successfully.",
        trainingCompleted: "Training completed successfully.",
        passwordUpdated: "Password updated successfully.",
        emailUpdated: "Email address updated successfully.",
        roleUpdated: "User role updated successfully.",
        authSuccess: "Authentication successful.",
        loginSuccess: "Login successful. Welcome back!",
        signupSuccess: "Sign-up successful. Welcome aboard!",
        passwordResetSuccess: "Password reset successfully. You can now log in.",
        emailVerificationSuccess: "Email successfully verified.",
        accountActivated: "Account has been activated successfully.",
        caseCreated: "Case created successfully.",
        caseUpdated: "Case updated successfully.",
        caseClosed: "Case closed successfully.",
        caseDeleted: "Case deleted successfully.",
    },
    error: {
        
        employeeOnboardingFailed: "Failed to onboard the employee. Please try again.",
        payrollProcessFailed: "Payroll processing failed. Please try again later.",
        profileUpdateError: "Error updating employee profile. Please try again.",
        leaveRequestError: "There was an issue with processing the leave request. Try again later.",
        attendanceError: "Error marking attendance. Please check the system and try again.",
        performanceReviewFailed: "Failed to complete the performance review. Please try again.",
        trainingError: "Error recording training completion. Please try again.",
        passwordUpdateFailed: "Password update failed. Please try again.",
        emailUpdateFailed: "Failed to update email address. Please verify the email and try again.",
        roleUpdateFailed: "Error updating user role. Please try again.",
        authFailed: "Authentication failed. Please check your credentials and try again.",
        sessionExpired: "Your session has expired. Please log in again.",
        unauthorizedAccess: "You are not authorized to access this resource.",
        loginFailed: "Login failed. Invalid username or password.",
        signupFailed: "Sign-up failed. Please ensure all fields are valid and try again.",
        passwordResetFailed: "Password reset failed. Please try again later.",
        emailVerificationFailed: "Email verification failed. Please check your inbox and try again.",
        accountDeactivated: "Your account is deactivated. Please contact support.",
        accountLocked: "Your account is locked due to too many failed login attempts.",
        invalidCredentials: "Invalid credentials. Please check your email and password.",
        emailAlreadyInUse: "This email is already associated with an existing account. Try logging in.",
        weakPassword: "Password is too weak. Please choose a stronger password.",
        caseCreationFailed: "Failed to create the case. Please try again.",
        caseUpdateFailed: "Error updating the case. Please try again later.",
        caseCloseFailed: "Error closing the case. Please try again later.",
        caseDeletionFailed: "Failed to delete the case. Please check the details and try again.",
        caseNotFound: "The requested case could not be found. Please verify the case ID.",
    },
    info: {
        passwordResetMessage: "Enter your email to receive a password reset link.",
        logoutMessage: "You have been logged out. Redirecting to login page...",
        employeeEditing: "Employee data updated successfully.",
        fillEmployeeDetails: "Please ensure all employee details are filled before proceeding.",
        reviewPerformance: "Review employee performance and provide feedback during appraisal cycles.",
        trackPayrollStatus: "You can track payroll status in the payroll dashboard.",
        fillLeaveRequest: "Fill out the leave request form before submitting.",
        contactHRSupport: "For any issues or queries, contact the HR support team.",
        updateAttendance: "Ensure attendance is updated regularly to avoid discrepancies.",
        trainingReminder: "Ensure all employees are enrolled in relevant training programs.",
        passwordChangeReminder: "Remember to update your password regularly for security.",
        authReminder: "For security purposes, make sure to log out from shared devices.",
        updateProfile: "Update your profile information to keep it current.",
        roleManagement: "Only admins can manage user roles and permissions.",
        accountSecurityReminder: "For your security, enable two-factor authentication for your account.",
        emailVerificationReminder: "Don't forget to verify your email after signing up to complete your registration.",
        passwordResetReminder: "Forgot your password? Reset it by following the instructions sent to your email.",
        sessionTimeoutReminder: "For security, your session will expire after a period of inactivity.",
        caseStatusReminder: "Regularly update the case status to reflect the current progress.",
        caseDetailsInfo: "Ensure all necessary details are provided when creating or updating a case.",
        caseCloseInfo: "Once resolved, remember to close the case and notify relevant stakeholders.",
        caseDeletionWarning: "Deleting a case is permanent. Make sure this action is intentional.",
    }
};

export default snackbarMessages;
