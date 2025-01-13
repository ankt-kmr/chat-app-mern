import React, { useContext, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa"
import { UserContext } from "../context/userContext";
import { Navigate } from "react-router-dom";
import { useFormStatus } from "react-dom";
import { AuthContext } from "../context/authContext";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { setUserInfo } = useContext(UserContext);
  const { setIsAuthenticated } = useContext(AuthContext);
  const [redirect, setRedirect] = useState(false);
  const { pending } = useFormStatus();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add API call to register user
    try {
      const response = await fetch('http://localhost:7001/api/auth/login', {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: {
          "Content-Type": "application/json",
        },
        "credentials": "include",
      })

      const data = await response.json();

      if (response.ok) {
        setUserInfo(data);
        setIsAuthenticated(true);
        setRedirect(true);
      } else {
        alert("Wrong Credentials");
      }
      // console.log(isAuthenticated);
    } catch (e) {
      setIsAuthenticated(false);
      alert("Error logging in");
    }
  };

  if (redirect) {
    return <Navigate to={'/'} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Login
        </h1>
        <form
          className="space-y-4"
          onSubmit={handleSubmit}
        >
          <div>
            <input
              type="text"
              placeholder="Username"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-3 flex items-center text-gray-600 hover:text-indigo-500 transition "
            >
              {showPassword ? (
                <FaEye className="w-5 h-5" />
              ) : (
                <FaEyeSlash className="w-5 h-5" />
              )}
            </button>
          </div>
          <button
            type="submit"
            disabled={pending}
            className="w-full bg-blue-600 text-white font-medium py-2 px-4 rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Login
          </button>
        </form>
        <p className="text-sm text-gray-500 text-center mt-4">
          Don’t have an account?{" "}
          <a href="/register" className="text-blue-600 hover:underline">
            Register here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
