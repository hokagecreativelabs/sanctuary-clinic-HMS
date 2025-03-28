"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Patients() {
  const [patients, setPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedPatientId, setSelectedPatientId] = useState(null); // Track the patient to be deleted
  const router = useRouter();

  // Fetch patients
  const fetchPatients = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("No token found. Please log in again.");
      setLoading(false);
      router.push("/login");
      return;
    }

    try {
      const res = await fetch(
        "https://sanctuary-clinic-hms-production.up.railway.app/api/patients",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, 
          },
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to fetch patients");

      setPatients(data);
      setFilteredPatients(data); 
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  // Handle search filter
  const handleSearch = (e) => {
    setSearch(e.target.value);
    if (e.target.value === "") {
      setFilteredPatients(patients); 
    } else {
      setFilteredPatients(
        patients.filter((patient) =>
          patient.name.toLowerCase().includes(e.target.value.toLowerCase())
        )
      );
    }
  };

  // Handle dropdown filter (e.g., filter by gender)
  const handleFilter = (e) => {
    setFilter(e.target.value);
    if (e.target.value === "") {
      setFilteredPatients(patients);
    } else {
      setFilteredPatients(
        patients.filter((patient) =>
          patient.gender && patient.gender.toLowerCase() === e.target.value.toLowerCase() // Check if gender exists
        )
      );
    }
  };
  
  // Handle delete patient
  const handleDelete = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("No token found. Please log in again.");
      setLoading(false);
      router.push("/login");
      return;
    }

    try {
      const res = await fetch(
        `https://sanctuary-clinic-hms-production.up.railway.app/api/patients/${selectedPatientId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Failed to delete patient");

      // Filter out the deleted patient from the patients and filteredPatients arrays
      setPatients((prevPatients) =>
        prevPatients.filter((patient) => patient._id !== selectedPatientId)
      );
      setFilteredPatients((prevFiltered) =>
        prevFiltered.filter((patient) => patient._id !== selectedPatientId)
      );
      setShowModal(false); // Close the modal after deletion
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading patients...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Patients List</h2>

      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => router.push("/add-patient")}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Add Patient
        </button>

        <div className="flex space-x-4 items-center">
          <input
            type="text"
            value={search}
            onChange={handleSearch}
            placeholder="Search by name"
            className="border p-2 rounded"
          />

          <select
            value={filter}
            onChange={handleFilter}
            className="border p-2 rounded"
          >
            <option value="">Filter by Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
      </div>

      {filteredPatients.length > 0 ? (
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Phone</th>
              <th className="px-4 py-2 border">Gender</th>
              <th className="px-4 py-2 border">Date of Birth</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPatients.map((patient) => (
              <tr key={patient._id}>
                <td className="px-4 py-2 border">{patient.name}</td>
                <td className="px-4 py-2 border">{patient.email}</td>
                <td className="px-4 py-2 border">{patient.phone}</td>
                <td className="px-4 py-2 border">{patient.gender}</td>
                <td className="px-4 py-2 border">
                  {new Date(patient.dob).toLocaleDateString()}
                </td>
                <td className="px-4 py-2 border">
                  <button
                    onClick={() => router.push(`/edit-patient/${patient._id}`)}
                    className="text-yellow-500 mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      setSelectedPatientId(patient._id); 
                      setShowModal(true); // Show confirmation modal
                    }}
                    className="text-red-500"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No patients found.</p>
      )}

      {/* Modal for Confirmation */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Are you sure you want to delete this patient?</h3>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowModal(false)} 
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
