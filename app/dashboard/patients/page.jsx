"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Patients() {
  const [patients, setPatients] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchPatients = async () => {
    const token = localStorage.getItem("token"); // Retrieve token from localStorage

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
            Authorization: `Bearer ${token}`, // Send the token in the Authorization header
          },
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to fetch patients");

      setPatients(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
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
      <div className="space-y-4">
        {patients.length > 0 ? (
          patients.map((patient) => (
            <div key={patient.id} className="border p-4 rounded-lg">
              <h3 className="text-lg font-semibold">{patient.name}</h3>
              <p>Email: {patient.email}</p>
              <p>Phone: {patient.phone}</p>
            </div>
          ))
        ) : (
          <p>No patients found.</p>
        )}
      </div>
    </div>
  );
}
