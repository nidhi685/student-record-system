import { useState } from "react";
import API from "../services/api";
import Layout from "../../components/layout/Layout";
import { useNavigate } from "react-router-dom";

const AddStudent = () => {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    enrollment: "",
    email: "",
    mobile: "",
    course: "",
    semester: "",
    address: "",
    password: "",
  });

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await API.post(
        "/admin/add-student",
        form
      );

      alert("Student Added Successfully");

      navigate("/students");

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message ||
        "Failed to Add Student"
      );
    }
  };

  return (
    <Layout>
      <div className="p-8">

        {/* Heading */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            Add Student
          </h1>

          <p className="text-gray-500 mt-1">
            Fill student information below
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white max-w-4xl rounded-2xl shadow-md p-8">

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-5"
          >

            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Name
              </label>

              <input
                type="text"
                name="name"
                placeholder="Enter name"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500"
                value={form.name}
                onChange={handleChange}
              />
            </div>

            {/* Enrollment */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Enrollment Number
              </label>

              <input
                type="text"
                name="enrollment"
                placeholder="Enter enrollment number"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500"
                value={form.enrollment}
                onChange={handleChange}
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>

              <input
                type="email"
                name="email"
                placeholder="Enter email"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500"
                value={form.email}
                onChange={handleChange}
              />
            </div>

            {/* Mobile */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mobile Number
              </label>

              <input
                type="text"
                name="mobile"
                placeholder="Enter mobile number"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500"
                value={form.mobile}
                onChange={handleChange}
              />
            </div>

            {/* Course */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Course
              </label>

              <select
                name="course"
                value={form.course}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500"
              >

                <option value="">
                  Select Course
                </option>

                <option value="MCA">
                  MCA
                </option>

                <option value="BCA">
                  BCA
                </option>

                <option value="BSc IT">
                  BSc IT
                </option>

                <option value="BTech">
                  BTech
                </option>

              </select>
            </div>

            {/* Semester */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Semester
              </label>

              <select
                name="semester"
                value={form.semester}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500"
              >

                <option value="">
                  Select Semester
                </option>

                {[1, 2, 3, 4, 5, 6].map((sem) => (

                  <option
                    key={sem}
                    value={sem}
                  >
                    Semester {sem}
                  </option>

                ))}

              </select>
            </div>

            {/* Address */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Address
              </label>

              <textarea
                name="address"
                rows="4"
                placeholder="Enter address"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500"
                value={form.address}
                onChange={handleChange}
              />
            </div>

            {/* Password */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>

              <input
                type="password"
                name="password"
                placeholder="Enter password"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500"
                value={form.password}
                onChange={handleChange}
              />
            </div>

            {/* Button */}
            <div className="md:col-span-2 flex justify-end">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition"
              >
                Save Student
              </button>
            </div>

          </form>
        </div>
      </div>
    </Layout>
  );
};

export default AddStudent;