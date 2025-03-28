"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function PatientsList() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function fetchPatients() {
      setLoading(true);
      setError(null);

      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Unauthorized: No token found");

        const res = await fetch(
          "https://sanctuary-clinic-hms-production.up.railway.app/api/patients",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`, // Attach token
            },
          }
        );

        if (res.status === 401) throw new Error("Unauthorized: Invalid token");
        if (!res.ok) throw new Error("Failed to fetch patients");

        const data = await res.json();

        if (Array.isArray(data)) {
          setPatients(data);
        } else {
          console.error("Unexpected API response:", data);
          setPatients([]);
        }
      } catch (error) {
        console.error("Error fetching patients:", error);
        setError(error.message);
        setPatients([]);
      } finally {
        setLoading(false);
      }
    }

    fetchPatients();
  }, []);

  const filteredPatients = patients.filter((p) =>
    p.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4 md:p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Patients</h1>
        <Link href="/dashboard/patients/add">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
            Add Patient
          </button>
        </Link>
      </div>

      <input
        type="text"
        placeholder="Search patients..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-2 border rounded mb-4"
      />

      {loading ? (
        <p>Loading patients...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : filteredPatients.length === 0 ? (
        <p>No patients found.</p>
      ) : (
        <ul className="space-y-3">
          {filteredPatients.map((patient) => (
            <li
              key={patient._id}
              className="p-4 border rounded-md flex justify-between items-center"
            >
              <div>
                <p className="font-medium">{patient.name}</p>
                <p className="text-sm text-gray-600">Age: {patient.age}</p>
              </div>
              <Link href={`/dashboard/patients/${patient._id}`}>
                <button className="bg-gray-700 text-white px-3 py-1 rounded-md">
                  View
                </button>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
