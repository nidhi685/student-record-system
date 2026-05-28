import { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import API from "../services/api";

const AttendanceList = () => {

  const [attendance, setAttendance] = useState([]);

  // Fetch Attendance
  const fetchAttendance = async () => {

    try {

      const res = await API.get(
        "/admin/attendance"
      );

      setAttendance(res.data.attendance);

    } catch (error) {

      console.log(error);
    }
  };

  useEffect(() => {
    fetchAttendance();
  }, []);

  return (

    <Layout>

      <div className="p-6">

        <h1 className="text-3xl font-bold mb-6">
          Attendance List
        </h1>

        <div className="bg-white shadow-lg rounded-xl p-5 overflow-x-auto">

          <table className="w-full border-collapse">

            <thead>

              <tr className="bg-gray-100 border-b">

                <th className="p-3 text-left">
                  Student
                </th>

                <th className="p-3 text-left">
                  Course
                </th>

                <th className="p-3 text-left">
                  Subject
                </th>

                <th className="p-3 text-left">
                  Attendance
                </th>

              </tr>

            </thead>

            <tbody>

              {attendance.length > 0 ? (

                attendance.map((item) => (

                  <tr
                    key={item._id}
                    className="border-b hover:bg-gray-50"
                  >

                    <td className="p-3">
                      {item.studentId?.name}
                    </td>

                    <td className="p-3">
                      {item.studentId?.course}
                    </td>

                    <td className="p-3">
                      {item.subject}
                    </td>

                    <td className="p-3">

                      <span
                        className={`px-3 py-1 rounded-full text-white text-sm
                        ${
                          item.percentage >= 75
                            ? "bg-green-500"
                            : item.percentage >= 50
                            ? "bg-yellow-500"
                            : "bg-red-500"
                        }`}
                      >
                        {item.percentage}%
                      </span>

                    </td>

                  </tr>

                ))

              ) : (

                <tr>

                  <td
                    colSpan="4"
                    className="p-5 text-center text-gray-500"
                  >
                    No Attendance Found
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

export default AttendanceList;