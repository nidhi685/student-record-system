import { useState } from "react";

import {
  useNavigate,
  Link
} from "react-router-dom";

import API from "../services/api";

const Register = () => {

  const navigate = useNavigate();

  const [form, setForm] = useState({

    name: "",

    email: "",

    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {

    setForm({

      ...form,

      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      const res = await API.post(
        "/admin/register",
        form
      );

      alert(
        res.data.message ||
        "Registered successfully"
      );

      navigate("/");

    } catch (err) {

      alert(

        err.response?.data?.message ||

        "Something went wrong"
      );

    } finally {

      setLoading(false);
    }
  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-blue-200">

      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">

        <h2 className="text-3xl font-bold text-center mb-6 text-blue-600">

          Admin Register

        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={form.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={form.password}
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
          >

            {loading
              ? "Registering..."
              : "Register"}

          </button>

        </form>

        <p className="text-center mt-5 text-sm">

          Already have an account?

          {" "}

          <Link
            to="/"
            className="text-blue-600 font-semibold"
          >
            Login
          </Link>

        </p>

      </div>

    </div>
  );
};

export default Register;