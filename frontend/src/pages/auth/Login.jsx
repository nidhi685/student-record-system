import { useState, useContext } from "react";

import API from "../services/api";

import { AuthContext } from "../context/AuthContext";

import { Link, useNavigate } from "react-router-dom";

import { EyeIcon, EyeOff } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [role, setRole] = useState("admin");

  const { login } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let res;

      // Admin Login

      if (role === "admin") {
        res = await API.post("/admin/login", {
          email,
          password,
        });

        login({
          user: {
            ...res.data.admin,

            role: "admin",
          },

          token: res.data.token,
        });

        navigate("/dashboard");
      }

      // Student Login
      else {
        res = await API.post("/student/login", {
          email,
          password,
        });

        login({
          user: {
            ...res.data.student,

            role: "student",
          },

          token: res.data.token,
        });

        navigate("/student-dashboard");
      }
    } catch (error) {
      alert(error.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg w-96"
      >
        <h2 className="text-3xl font-bold mb-6 text-center">Login</h2>

        {/* Role */}

        <select
          className="w-full border p-2 mb-3 rounded"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="admin">Admin</option>

          <option value="student">Student</option>
        </select>

        {/* Email */}

        <input
          type="email"
          placeholder="Email"
          value={email}
          className="w-full border p-2 mb-3 rounded"
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password */}

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            className="w-full border p-2 mb-4 rounded"
            onChange={(e) => setPassword(e.target.value)}
          />

          {showPassword ? (
            <EyeOff
              className="absolute top-3 right-3 cursor-pointer text-gray-400"
              size={20}
              onClick={() => setShowPassword(false)}
            />
          ) : (
            <EyeIcon
              className="absolute top-3 right-3 cursor-pointer text-gray-400"
              size={20}
              onClick={() => setShowPassword(true)}
            />
          )}
        </div>

        {/* Button */}

        <button className="bg-blue-500 hover:bg-blue-600 text-white w-full py-2 rounded">
          Login
        </button>

        <p className="text-center mt-5 text-sm">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-600 font-semibold">
            Register
          </Link>
          Student accounts are created by admin only.
        </p>
      </form>
    </div>
  );
};

export default Login;
