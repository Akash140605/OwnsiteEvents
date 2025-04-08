import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';

const CandidateData = () => {
  const { eventId } = useParams();
  const [candidates, setCandidates] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    gender: '',
    role: '',
    city: '',
    address: '',
  });

  // Ref for the table to print
  const tableRef = useRef(null);

  // Fetch candidates for the event
  useEffect(() => {
    fetch(`http://localhost/event_api/get_candidates.php?event_id=${eventId}`)
      .then((response) => response.json())
      .then((data) => setCandidates(data))
      .catch((error) => console.error('Error fetching candidates:', error));
  }, [eventId]);

  // Handle filter change
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  // Filter candidates based on search and filters
  const filteredCandidates = candidates.filter((candidate) => {
    return (
      candidate.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      candidate.phoneNumber.includes(searchQuery)
    ) &&
      (filters.gender === '' || candidate.gender === filters.gender) &&
      (filters.role === '' || candidate.role.toLowerCase().includes(filters.role.toLowerCase())) &&
      (filters.city === '' || candidate.city.toLowerCase().includes(filters.city.toLowerCase())) &&
      (filters.address === '' || candidate.address.toLowerCase().includes(filters.address.toLowerCase()));
  });

  // Function to print only the table
  const handlePrint = () => {
    const printContent = tableRef.current.innerHTML;
    const originalContent = document.body.innerHTML;

    document.body.innerHTML = `
      <html>
        <head>
          <style>
            table {
              width: 100%;
              border-collapse: collapse;
            }
            th, td {
              border: 1px solid #ddd;
              padding: 8px;
            }
            th {
              background-color: #f2f2f2;
            }
          </style>
        </head>
        <body>
          ${printContent}
        </body>
      </html>
    `;

    window.print();
    document.body.innerHTML = originalContent;
    window.location.reload(); // Reload page to restore content after print
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Candidates for Event ID: {eventId}</h2>

      {/* Search Box */}
      <input
        type="text"
        placeholder="Search by Name or Phone Number"
        className="border p-2 rounded mb-4 w-full"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {/* Filters Section */}
      <div className="flex space-x-4 mb-4">
        <select name="gender" onChange={handleFilterChange} className="border p-2 rounded">
          <option value="">Filter by Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>

        <input
          type="text"
          name="role"
          placeholder="Filter by Role"
          onChange={handleFilterChange}
          className="border p-2 rounded"
        />

        <input
          type="text"
          name="city"
          placeholder="Filter by City"
          onChange={handleFilterChange}
          className="border p-2 rounded"
        />

        <input
          type="text"
          name="address"
          placeholder="Filter by Address"
          onChange={handleFilterChange}
          className="border p-2 rounded"
        />
        
        {/* Print Button */}
        <button
          onClick={handlePrint}
          className="bg-blue-500 text-white p-2 rounded"
        >
          PRINT
        </button>
      </div>

      {/* Candidates Table */}
      <div ref={tableRef}>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Name</th>
              <th className="border p-2">Phone</th>
              <th className="border p-2">Role</th>
              <th className="border p-2">Gender</th>
              <th className="border p-2">City</th>
              <th className="border p-2">Address</th>
            </tr>
          </thead>
          <tbody>
            {filteredCandidates.length > 0 ? (
              filteredCandidates.map((candidate) => (
                <tr key={candidate.id} className="hover:bg-gray-100">
                  <td className="border p-2">{candidate.fullName}</td>
                  <td className="border p-2">{candidate.phoneNumber}</td>
                  <td className="border p-2">{candidate.role}</td>
                  <td className="border p-2">{candidate.gender}</td>
                  <td className="border p-2">{candidate.city}</td>
                  <td className="border p-2">{candidate.address}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="border p-2 text-center">
                  No candidates found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CandidateData;
