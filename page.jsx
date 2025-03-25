"use client";
import React from "react";

function MainComponent() {
  const [view, setView] = useState("overview");
  const [studentData, setStudentData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { data: user } = useUser();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/check-admission-status", {
          method: "POST",
        });
        if (!response.ok) {
          throw new Error("Failed to fetch student data");
        }
        const data = await response.json();
        setStudentData(Array.isArray(data) ? data : [data]);
      } catch (err) {
        console.error(err);
        setError("Failed to load student data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="rounded-lg bg-white p-6 shadow-lg">
          <p className="text-center text-lg text-gray-600">
            Please sign in to access the admin dashboard
          </p>
          <div className="mt-4 text-center">
            <a
              href="/account/signin"
              className="text-blue-600 hover:text-blue-800"
            >
              Sign In
            </a>
          </div>
        </div>
      </div>
    );
  }

  const navigationItems = [
    { id: "overview", label: "Overview", icon: "fas fa-chart-pie" },
    { id: "payments", label: "Payments", icon: "fas fa-credit-card" },
    { id: "applications", label: "Applications", icon: "fas fa-file-alt" },
    { id: "admissions", label: "Admissions", icon: "fas fa-graduation-cap" },
    { id: "records", label: "Student Records", icon: "fas fa-folder-open" },
  ];

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex h-[600px] items-center justify-center">
          <div className="text-lg text-gray-600">Loading...</div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex h-[600px] items-center justify-center">
          <div className="text-lg text-red-600">{error}</div>
        </div>
      );
    }

    switch (view) {
      case "overview":
        return (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg bg-white p-6 shadow-lg">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-semibold">Total Applications</h3>
                <i className="fas fa-users text-blue-500"></i>
              </div>
              <p className="text-3xl font-bold">{studentData.length}</p>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-lg">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-semibold">Pending Reviews</h3>
                <i className="fas fa-clock text-yellow-500"></i>
              </div>
              <p className="text-3xl font-bold">
                {studentData.filter((app) => app.status === "pending").length}
              </p>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-lg">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-semibold">Approved</h3>
                <i className="fas fa-check-circle text-green-500"></i>
              </div>
              <p className="text-3xl font-bold">
                {studentData.filter((app) => app.status === "approved").length}
              </p>
            </div>
          </div>
        );

      case "payments":
        return (
          <div className="rounded-lg bg-white p-6 shadow-lg">
            <h2 className="mb-6 text-xl font-bold">Payment Management</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      Student
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {studentData.map((student, index) => (
                    <tr key={index}>
                      <td className="whitespace-nowrap px-6 py-4">
                        {student.id}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {student.firstName} {student.lastName}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">$500</td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-semibold text-green-800">
                          Paid
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case "applications":
        return (
          <div className="rounded-lg bg-white p-6 shadow-lg">
            <h2 className="mb-6 text-xl font-bold">Application Review</h2>
            <div className="space-y-6">
              {studentData.map((application, index) => (
                <div
                  key={index}
                  className="rounded-lg border p-4 hover:border-blue-500"
                >
                  <div className="flex justify-between">
                    <h3 className="text-lg font-semibold">
                      {application.firstName} {application.lastName}
                    </h3>
                    <span className="rounded-full bg-yellow-100 px-2 py-1 text-xs font-semibold text-yellow-800">
                      {application.status}
                    </span>
                  </div>
                  <p className="mt-2 text-gray-600">
                    {application.programChoice}
                  </p>
                  <div className="mt-4 flex justify-end space-x-2">
                    <button className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600">
                      Approve
                    </button>
                    <button className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600">
                      Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case "admissions":
        return (
          <div className="rounded-lg bg-white p-6 shadow-lg">
            <h2 className="mb-6 text-xl font-bold">Admission Decisions</h2>
            <div className="space-y-4">
              {studentData.map((student, index) => (
                <div key={index} className="rounded-lg border p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">
                        {student.firstName} {student.lastName}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {student.academicDetails?.educationLevel}
                      </p>
                    </div>
                    <select className="rounded-lg border p-2">
                      <option>Select Decision</option>
                      <option>Accept</option>
                      <option>Reject</option>
                      <option>Waitlist</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case "records":
        return (
          <div className="rounded-lg bg-white p-6 shadow-lg">
            <h2 className="mb-6 text-xl font-bold">Student Records</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      Program
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {studentData.map((student, index) => (
                    <tr key={index}>
                      <td className="whitespace-nowrap px-6 py-4">
                        {student.firstName} {student.lastName}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {student.email}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {student.programChoice}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-semibold text-blue-800">
                          {student.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <div className="w-64 bg-white p-4 shadow-lg">
          <div className="mb-6">
            <h1 className="text-xl font-bold text-gray-800">Admin Dashboard</h1>
          </div>
          <nav className="space-y-2">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setView(item.id)}
                className={`flex w-full items-center rounded-lg px-4 py-2 text-left ${
                  view === item.id
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <i className={`${item.icon} mr-3`}></i>
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="flex-1 p-8">{renderContent()}</div>
      </div>
    </div>
  );
}

export default MainComponent;