// frontend/src/Pages/Admin/AdminChangeCredentials.jsx
import React, { useState, useEffect } from "react";
import { useCompanyLogos } from "../../context/CompanyLogoContext"; // Reusing context for admin API calls
import { CheckCircle, XCircle } from "lucide-react";

const AdminChangeCredentials = () => {
  const { updateAdminEmail, updateAdminPassword } = useCompanyLogos();

  // State for Email Change Form
  const [currentEmail, setCurrentEmail] = useState(""); // Optionally pre-fill if you fetch admin profile
  const [newEmail, setNewEmail] = useState("");
  const [emailPassword, setEmailPassword] = useState("");
  const [emailChangeLoading, setEmailChangeLoading] = useState(false);
  const [emailChangeError, setEmailChangeError] = useState(null);
  const [emailChangeSuccess, setEmailChangeSuccess] = useState(null);

  // State for Password Change Form
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [passwordChangeLoading, setPasswordChangeLoading] = useState(false);
  const [passwordChangeError, setPasswordChangeError] = useState(null);
  const [passwordChangeSuccess, setPasswordChangeSuccess] = useState(null);

  // Clear success/error messages after a few seconds
  useEffect(() => {
    if (emailChangeSuccess || emailChangeError) {
      const timer = setTimeout(() => {
        setEmailChangeSuccess(null);
        setEmailChangeError(null);
      }, 4000);
      return () => clearTimeout(timer);
    }
    if (passwordChangeSuccess || passwordChangeError) {
      const timer = setTimeout(() => {
        setPasswordChangeSuccess(null);
        setPasswordChangeError(null);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [
    emailChangeSuccess,
    emailChangeError,
    passwordChangeSuccess,
    passwordChangeError,
  ]);

  const handleEmailChange = async (e) => {
    e.preventDefault();
    setEmailChangeError(null);
    setEmailChangeSuccess(null);
    setEmailChangeLoading(true);

    if (!newEmail.trim() || !emailPassword.trim()) {
      setEmailChangeError("Please fill in all fields.");
      setEmailChangeLoading(false);
      return;
    }
    if (newEmail.trim() === currentEmail.trim()) {
      setEmailChangeError("New email cannot be the same as current email.");
      setEmailChangeLoading(false);
      return;
    }

    const result = await updateAdminEmail({
      newEmail: newEmail.trim(),
      password: emailPassword.trim(),
    });
    if (result.success) {
      setEmailChangeSuccess("Email updated successfully!");
      setCurrentEmail(newEmail.trim()); // Update current email display if needed
      setNewEmail("");
      setEmailPassword("");
    } else {
      setEmailChangeError(result.error || "Failed to update email.");
    }
    setEmailChangeLoading(false);
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setPasswordChangeError(null);
    setPasswordChangeSuccess(null);
    setPasswordChangeLoading(true);

    if (
      !currentPassword.trim() ||
      !newPassword.trim() ||
      !confirmNewPassword.trim()
    ) {
      setPasswordChangeError("Please fill in all fields.");
      setPasswordChangeLoading(false);
      return;
    }
    if (newPassword.trim() !== confirmNewPassword.trim()) {
      setPasswordChangeError("New password and confirmation do not match.");
      setPasswordChangeLoading(false);
      return;
    }
    if (newPassword.trim().length < 6) {
      setPasswordChangeError(
        "New password must be at least 6 characters long."
      );
      setPasswordChangeLoading(false);
      return;
    }
    if (newPassword.trim() === currentPassword.trim()) {
      setPasswordChangeError(
        "New password cannot be the same as current password."
      );
      setPasswordChangeLoading(false);
      return;
    }

    const result = await updateAdminPassword({
      currentPassword: currentPassword.trim(),
      newPassword: newPassword.trim(),
    });
    if (result.success) {
      setPasswordChangeSuccess("Password updated successfully!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
    } else {
      setPasswordChangeError(result.error || "Failed to update password.");
    }
    setPasswordChangeLoading(false);
  };

  return (
    <section className="bg-gradient-to-br from-gray-50 to-gray-200 py-12 px-4 md:py-16 md:px-6 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-10 text-center drop-shadow-sm">
          Admin Settings
        </h1>

        {/* Email Change Form */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-10 mb-12 border border-gray-200">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
            <span className="mr-3 text-blue-600">📧</span> Change Email
          </h2>
          <form onSubmit={handleEmailChange} className="space-y-6">
            <div>
              <label
                htmlFor="newEmail"
                className="block text-gray-700 font-semibold mb-2 text-sm md:text-base"
              >
                New Email:
              </label>
              <input
                type="email"
                id="newEmail"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label
                htmlFor="emailPassword"
                className="block text-gray-700 font-semibold mb-2 text-sm md:text-base"
              >
                Current Password (for confirmation):
              </label>
              <input
                type="password"
                id="emailPassword"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                value={emailPassword}
                onChange={(e) => setEmailPassword(e.target.value)}
                required
              />
            </div>
            {emailChangeError && (
              <p className="text-red-600 text-sm mt-2 flex items-center">
                <XCircle size={16} className="mr-1" /> {emailChangeError}
              </p>
            )}
            {emailChangeSuccess && (
              <p className="text-green-600 text-sm mt-2 flex items-center">
                <CheckCircle size={16} className="mr-1" /> {emailChangeSuccess}
              </p>
            )}
            <button
              type="submit"
              className="mt-4 w-full md:w-auto bg-[#0A142F] text-white px-8 py-3 rounded-xl hover:bg-blue-700 transition duration-300 font-bold text-lg shadow-md hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-300"
              disabled={emailChangeLoading}
            >
              {emailChangeLoading ? "Updating Email..." : "Update Email"}
            </button>
          </form>
        </div>

        {/* Password Change Form */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-10 border border-gray-200">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
            <span className="mr-3 text-purple-600">🔒</span> Change Password
          </h2>
          <form onSubmit={handlePasswordChange} className="space-y-6">
            <div>
              <label
                htmlFor="currentPassword"
                className="block text-gray-700 font-semibold mb-2 text-sm md:text-base"
              >
                Current Password:
              </label>
              <input
                type="password"
                id="currentPassword"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-200"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
              />
            </div>
            <div>
              <label
                htmlFor="newPassword"
                className="block text-gray-700 font-semibold mb-2 text-sm md:text-base"
              >
                New Password:
              </label>
              <input
                type="password"
                id="newPassword"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-200"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>
            <div>
              <label
                htmlFor="confirmNewPassword"
                className="block text-gray-700 font-semibold mb-2 text-sm md:text-base"
              >
                Confirm New Password:
              </label>
              <input
                type="password"
                id="confirmNewPassword"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-200"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                required
              />
            </div>
            {passwordChangeError && (
              <p className="text-red-600 text-sm mt-2 flex items-center">
                <XCircle size={16} className="mr-1" /> {passwordChangeError}
              </p>
            )}
            {passwordChangeSuccess && (
              <p className="text-green-600 text-sm mt-2 flex items-center">
                <CheckCircle size={16} className="mr-1" />{" "}
                {passwordChangeSuccess}
              </p>
            )}
            <button
              type="submit"
              className="mt-4 w-full md:w-auto bg-[#0A142F] text-white px-8 py-3 rounded-xl hover:bg-purple-700 transition duration-300 font-bold text-lg shadow-md hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-purple-300"
              disabled={passwordChangeLoading}
            >
              {passwordChangeLoading
                ? "Updating Password..."
                : "Update Password"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AdminChangeCredentials;
