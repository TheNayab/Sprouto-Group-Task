import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";

function Auth() {
  const navigate = useNavigate();

  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Validation Schema
  const validationSchema = Yup.object({
    fullName: isSignUp
      ? Yup.string()
          .min(3, "Full Name must be at least 3 characters")
          .required("Full Name is required")
      : Yup.string(),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: isSignUp
      ? Yup.string()
          .oneOf([Yup.ref("password")], "Passwords must match")
          .required("Confirm Password is required")
      : Yup.string(),
  });

  // Formik Hook
  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const endpoint = isSignUp
          ? "http://localhost:4000/api/v1/registration"
          : "http://localhost:4000/api/v1/login";
        const body = isSignUp
          ? {
              name: values.fullName,
              email: values.email,
              password: values.password,
              confirmPassword: values.confirmPassword,
            }
          : {
              email: values.email,
              password: values.password,
            };

        const response = await fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(body),
        });

        const data = await response.json();

        if (data.success) {
          toast.success(
            isSignUp
              ? "User successfully registered"
              : "User login successfully"
          );
          Cookies.set("token", data.authToken, {
            expires: 2,
            secure: true,
            sameSite: "none",
          });

          setTimeout(() => {
            navigate("/"); // Redirect to home page after displaying the toast
          }, 1000);
        } else {
          toast.error(data.message);
        }
      } catch (error: any) {
        console.log("Error: " + error);
        if (error.response && error.response.status === 401) {
          toast.error(error.message);
        } else {
          toast.error(
            `An error occurred while ${
              isSignUp ? "registering" : "logging in"
            } user`
          );
        }
      }
    },
  });

  const authToken = Cookies.get("token");

  useEffect(() => {
    if (authToken) {
      navigate("/");
    }
  }, [authToken, navigate]);

  if (authToken) {
    return null;
  }

  return (
    <div className="h-screen w-screen bg-blue-400 flex flex-col md:flex-row items-center justify-center p-4">
      {/* Left Side - Form Section */}
      <div className="w-full md:w-3/4 lg:w-1/2 flex justify-center items-center">
        <div className="w-full max-w-md md:max-w-lg lg:max-w-xl bg-white bg-opacity-10 backdrop-blur-3xl p-6 md:p-8 lg:p-10 rounded-2xl shadow-xl border border-white/30">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white text-center mb-6">
            {isSignUp ? "Create an Account" : "Sign In"}
          </h2>
          <form
            className="space-y-4 md:space-y-6"
            onSubmit={formik.handleSubmit}
          >
            {/* Full Name */}
            {isSignUp && (
              <div className="flex flex-col">
                <div className="relative flex items-center">
                  <FaUser className="absolute left-4 text-gray-500 text-lg" />
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Full Name"
                    className="w-full pl-12 pr-4 py-3 bg-white text-black text-lg placeholder-gray-500 rounded-lg focus:ring-2 focus:ring-[#A5E9E1] focus:outline-none"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.fullName}
                  />
                </div>
                {formik.touched.fullName && formik.errors.fullName && (
                  <p className="text-red-500 text-sm mt-1 font-bold">
                    {formik.errors.fullName}
                  </p>
                )}
              </div>
            )}

            {/* Email */}
            <div className="flex flex-col">
              <div className="relative flex items-center">
                <FaEnvelope className="absolute left-4 text-gray-500 text-lg" />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="w-full pl-12 pr-4 py-3 bg-white text-black text-lg placeholder-gray-500 rounded-lg focus:ring-2 focus:ring-[#A5E9E1] focus:outline-none"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                />
              </div>
              {formik.touched.email && formik.errors.email && (
                <p className="text-red-500 text-sm mt-1 font-bold">
                  {formik.errors.email}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="flex flex-col">
              <div className="relative flex items-center">
                <FaLock className="absolute left-4 text-gray-500 text-lg" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  className="w-full pl-12 pr-12 py-3 bg-white text-black text-lg placeholder-gray-500 rounded-lg focus:ring-2 focus:ring-[#A5E9E1] focus:outline-none"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                />
                <button
                  type="button"
                  className="absolute right-4 text-gray-500 text-lg"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                </button>
              </div>
              {formik.touched.password && formik.errors.password && (
                <p className="text-red-500 text-sm mt-1 font-bold">
                  {formik.errors.password}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            {isSignUp && (
              <div className="flex flex-col">
                <div className="relative flex items-center">
                  <FaLock className="absolute left-4 text-gray-500 text-lg" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    className="w-full pl-12 pr-12 min-h-[48px] bg-white text-black text-lg placeholder-gray-500 rounded-lg focus:ring-2 focus:ring-[#A5E9E1] focus:outline-none"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.confirmPassword}
                  />
                  <button
                    type="button"
                    className="absolute right-4 text-gray-500 text-lg"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <AiFillEyeInvisible />
                    ) : (
                      <AiFillEye />
                    )}
                  </button>
                </div>
                {formik.touched.confirmPassword &&
                  formik.errors.confirmPassword && (
                    <p className="text-red-500 text-sm mt-1 font-bold">
                      {formik.errors.confirmPassword}
                    </p>
                  )}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-white hover:text-blue-600 hover:border border-blue-500 text-white font-semibold py-3 text-lg rounded-2xl transition duration-300"
            >
              {isSignUp ? "Sign Up" : "Sign In"}
            </button>
          </form>

          <p className="text-center text-white mt-4 text-lg">
            {isSignUp ? "Already have an account?" : "Don't have an account?"}
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-blue-500 hover:underline ml-1"
            >
              {isSignUp ? "Sign In" : "Sign Up"}
            </button>
          </p>
        </div>
      </div>

      {/* Right Side - Image Section */}
      <div className="hidden md:flex md:w-1/2 h-full items-center justify-center p-4">
        <img
          src="./testing3.gif"
          alt="UI Illustration"
          className="w-full h-auto max-h-screen object-cover"
        />
      </div>
      <ToastContainer aria-label={undefined} />
    </div>
  );
}

export default Auth;
