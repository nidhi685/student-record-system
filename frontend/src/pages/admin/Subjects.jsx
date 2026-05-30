import { useState } from "react";
import Layout from "../../components/layout/Layout";

const Subjects = () => {

    const [subjectData, setSubjectData] = useState({
        subjectName: "",
        subjectCode: "",
    });

    const [subjects, setSubjects] = useState([]);

    // Handle Input Change
    const handleChange = (e) => {
        setSubjectData({
            ...subjectData,
            [e.target.name]: e.target.value,
        });
    };

    // Add Subject
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!subjectData.subjectName || !subjectData.subjectCode) {
            alert("Please fill all fields");
            return;
        }

        setSubjects([...subjects, subjectData]);

        setSubjectData({
            subjectName: "",
            subjectCode: "",
        });
    };

    return (
        <Layout>
            <div className="p-6">

                {/* Heading */}
                <h1 className="text-3xl font-bold mb-6">
                    Subjects Management
                </h1>

                {/* Form */}
                <div className="bg-white shadow-lg rounded-xl p-6 mb-8 max-w-xl">

                    <form onSubmit={handleSubmit}>

                        {/* Subject Name */}
                        <div className="mb-4">

                            <label className="block mb-2 font-semibold">
                                Subject Name
                            </label>

                            <input
                                type="text"
                                name="subjectName"
                                value={subjectData.subjectName}
                                onChange={handleChange}
                                placeholder="Enter Subject Name"
                                className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />

                        </div>

                        {/* Subject Code */}
                        <div className="mb-4">

                            <label className="block mb-2 font-semibold">
                                Subject Code
                            </label>

                            <input
                                type="text"
                                name="subjectCode"
                                value={subjectData.subjectCode}
                                onChange={handleChange}
                                placeholder="Enter Subject Code"
                                className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />

                        </div>

                        {/* Button */}
                        <button
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg transition"
                        >
                            Add Subject
                        </button>

                    </form>

                </div>

                {/* Subjects Table */}
                <div className="bg-white shadow-lg rounded-xl p-6">

                    <h2 className="text-2xl font-semibold mb-4">
                        Subject List
                    </h2>

                    <table className="w-full border-collapse">

                        <thead>

                            <tr className="bg-gray-100">

                                <th className="p-3 text-left">
                                    Subject Name
                                </th>

                                <th className="p-3 text-left">
                                    Subject Code
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {subjects.length > 0 ? (
                                subjects.map((subject, index) => (

                                    <tr
                                        key={index}
                                        className="border-b"
                                    >

                                        <td className="p-3">
                                            {subject.subjectName}
                                        </td>

                                        <td className="p-3">
                                            {subject.subjectCode}
                                        </td>

                                    </tr>

                                ))
                            ) : (

                                <tr>

                                    <td
                                        colSpan="2"
                                        className="p-4 text-center text-gray-500"
                                    >
                                        No Subjects Added
                                    </td>

                                </tr>

                            )}

                        </tbody>

                    </table>

                </div>

            </div>
        </Layout>
    );
};

export default Subjects;