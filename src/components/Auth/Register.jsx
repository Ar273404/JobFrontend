import React, { useState } from "react";
import axios from "axios";
import { Link, Navigate } from "react-router-dom";
import toast from "react-hot-toast";
import { url } from "../../Api";
// Reusable Input Component
const InputField = ({
  id,
  label,
  type,
  value,
  onChange,
  placeholder,
  icon,
  required = true,
}) => (
  <div className="mt-4">
    <label htmlFor={id} className="text-white text-xs block mb-2">
      {label}
    </label>
    <div className="relative flex items-center">
      <input
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        type={type}
        required={required}
        className="w-full bg-transparent text-sm text-white border-b border-gray-300 focus:border-yellow-400 px-2 py-3 outline-none"
        placeholder={placeholder}
      />
      {icon && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="#bbb"
          className="w-[18px] h-[18px] absolute right-2"
          viewBox={icon.viewBox}>
          {icon.path}
        </svg>
      )}
    </div>
  </div>
);

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    role: "",
  });

  const [redirectToLogin, setRedirectToLogin] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${url}/user/register`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast.success(data.message);
      setFormData({ name: "", email: "", password: "", phone: "", role: "" });
      setRedirectToLogin(true);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  if (redirectToLogin) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="font-sans bg-white md:h-screen">
      <div className="grid md:grid-cols-2 items-center gap-8 h-full">
        <div className="max-md:order-1 p-4">
          <img
            src="https://readymadeui.com/signin-image.webp"
            className="lg:max-w-[85%] w-full h-full object-contain block mx-auto"
            alt="login"
          />
        </div>

        <div className="flex items-center md:p-8 p-6 bg-[#0C172C] h-full lg:w-11/12 lg:ml-auto">
          <form onSubmit={handleRegister} className="max-w-lg w-full mx-auto">
            <div className="mb-5">
              <h3 className="text-3xl text-center font-bold text-yellow-400">
                Create an account
              </h3>
            </div>

            <InputField
              id="name"
              label="Full Name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter name"
              icon={{
                viewBox: "0 0 24 24",
                path: (
                  <>
                    <circle cx="10" cy="7" r="6" />
                    <path d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5z" />
                  </>
                ),
              }}
            />

            <InputField
              id="email"
              label="Email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email"
              icon={{
                viewBox: "0 0 24 24",
                path: (
                  <path d="M22 4H2v16h20V4zm-2 14H4V6h16v12zm-2-7H6V9h12v2zm0 4H6v-2h12v2z" />
                ),
              }}
            />

            <InputField
              id="password"
              label="Password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
              icon={{
                viewBox: "0 0 24 24",
                path: (
                  <path d="M12 2C9.243 2 7 4.243 7 7v4H5v10h14V11h-2V7c0-2.757-2.243-5-5-5z" />
                ),
              }}
            />

            <InputField
              id="phone"
              label="Phone"
              type="text"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter phone number"
            />

            <div className="mt-4">
              <label htmlFor="role" className="text-white text-xs block mb-2">
                Select Role
              </label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
                className="w-full bg-gray-800 text-sm text-yellow-400 border-b border-gray-300 focus:border-yellow-400 px-2 py-3 outline-none">
                <option value="" disabled>
                  Select your role
                </option>
                <option value="Employer">Employer</option>
                <option value="job Seeker">job Seeker</option>
              </select>
            </div>

            <div className="flex items-center mt-6">
              <input
                id="remember-me"
                type="checkbox"
                className="h-4 w-4 shrink-0 rounded"
              />
              <label
                htmlFor="remember-me"
                className="text-white ml-3 block text-sm">
                I accept the{" "}
                <Link
                  to="/terms"
                  className="text-yellow-500 font-semibold hover:underline">
                  Terms and Conditions
                </Link>
              </label>
            </div>

            <div className="mt-5">
              <button
                type="submit"
                className="w-max shadow-xl py-3 px-6 text-sm text-gray-800 font-semibold rounded-md bg-yellow-400 hover:bg-yellow-500 focus:outline-none">
                Register
              </button>
              <p className="text-sm text-white mt-5">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-yellow-400 font-semibold hover:underline">
                  Login here
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
