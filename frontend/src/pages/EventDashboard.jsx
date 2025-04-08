import React, { useState, useEffect, useCallback } from 'react';
import { FaEdit, FaTrash, FaUsers } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// ✅ Base API URL
const API_BASE_URL = 'http://localhost/event_api';

const EventDashboard = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterTag, setFilterTag] = useState('');
  const [minFee, setMinFee] = useState('');
  const [maxFee, setMaxFee] = useState('');
  const [editingEvent, setEditingEvent] = useState(null);
  const [apiError, setApiError] = useState(false);
  const navigate = useNavigate();

  // ✅ Fetch events from API
  const fetchEvents = useCallback(async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/event_details.php`);
      console.log('API Response:', response.data);

      if (response.data && Array.isArray(response.data)) {
        setEvents(response.data);
        setApiError(false);
      } else if (response.data?.data && Array.isArray(response.data.data)) {
        setEvents(response.data.data);
        setApiError(false);
      } else {
        console.error('Invalid data format. API response:', response.data);
        setEvents([]);
        setApiError(true);
      }
    } catch (error) {
      console.error('Error fetching events:', error.response || error.message);
      toast.error('Failed to fetch events. Please try again later.');
      setEvents([]);
      setApiError(true);
    }
  }, []);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  // ✅ Handle event deletion
  const handleDeleteEvent = async (eventId) => {
    console.log('Deleting event with ID:', eventId);
  
    if (!eventId) {
      toast.error('Invalid event ID');
      return;
    }
  
    if (!window.confirm('Are you sure you want to delete this event?')) {
      return;
    }
  
    try {
      const response = await axios.get(`${API_BASE_URL}/delete_event.php?id=${eventId}`);
      console.log('Delete Response:', response.data);
  
      if (response.data?.success || response.data?.status === 'success') {
        setEvents((prevEvents) => prevEvents.filter((event) => event.id !== eventId));
        toast.success('✅ Event deleted successfully!');
      } else {
        toast.error(response.data.message || '⚠️ Failed to delete event!');
      }
    } catch (error) {
      console.error('Error deleting event:', error.message);
      toast.error('❌ Failed to delete event. Please try again.');
    }
  };
  
  

  // ✅ Update Event API Call
  const handleUpdateEvent = async () => {
    try {
      const formData = new FormData();
      formData.append('id', editingEvent.id);
      formData.append('title', editingEvent.title);
      formData.append('tags', editingEvent.tags);
      formData.append('event_date', editingEvent.event_date);
      formData.append('entry_fee', editingEvent.entry_fee);

      const response = await axios.post(`${API_BASE_URL}/update_event.php`, formData);

      if (response.data.success) {
        toast.success('Event updated successfully');
        setEditingEvent(null);
        fetchEvents(); // ✅ Refresh events after update
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error('Error updating event:', error.message);
      toast.error('Failed to update event');
    }
  };

  // ✅ Show registered candidates
  const handleShowAllRegisteredCandidates = (eventId) => {
    navigate(`/candidate-data/${eventId}`);
  };

  // ✅ Handle search and filter logic
  useEffect(() => {
    const filtered = events.filter((event) => {
      const matchesTitle = event.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesTag = filterTag ? event.tags.toLowerCase().includes(filterTag.toLowerCase()) : true;
      const matchesMinFee = minFee ? parseInt(event.entry_fee) >= parseInt(minFee) : true;
      const matchesMaxFee = maxFee ? parseInt(event.entry_fee) <= parseInt(maxFee) : true;

      return matchesTitle && matchesTag && matchesMinFee && matchesMaxFee;
    });

    setFilteredEvents(filtered);
  }, [searchQuery, filterTag, minFee, maxFee, events]);

  // ✅ Input Component
  const InputField = ({ placeholder, value, onChange, type = 'text' }) => (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="p-2 border rounded-md w-full md:w-52"
    />
  );

  // ✅ Handle Edit Event
  const handleEditEvent = (event) => {
    setEditingEvent(event);
  };

  // ✅ Handle input change in update modal
  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditingEvent({ ...editingEvent, [name]: value });
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-6">Event Management Dashboard</h2>

      {/* ✅ Search and Filter Section */}
      <div className="bg-gray-100 p-4 mb-4 flex flex-wrap gap-4 rounded-lg">
        <InputField placeholder="Search by Event Name" value={searchQuery} onChange={setSearchQuery} />
        <InputField placeholder="Filter by Tag Name" value={filterTag} onChange={setFilterTag} />
        <InputField placeholder="Min Entry Fee" value={minFee} onChange={setMinFee} type="number" />
        <InputField placeholder="Max Entry Fee" value={maxFee} onChange={setMaxFee} type="number" />
      </div>

      {/* ✅ Event List */}
      <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
        {apiError ? (
          <div className="text-center py-6 text-red-600 font-semibold">
            Failed to fetch events. Please try again later.
          </div>
        ) : (
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="px-6 py-3">Title</th>
                <th className="px-6 py-3">Tag Name</th>
                <th className="px-6 py-3">Date</th>
                <th className="px-6 py-3">Entry Fee</th>
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEvents.length > 0 ? (
                filteredEvents.map((event) => (
                  <tr key={event.id || event.eventId} className="border-b hover:bg-gray-50 transition">
                    <td className="px-6 py-4">{event.title}</td>
                    <td className="px-6 py-4">{event.tags}</td>
                    <td className="px-6 py-4">{event.event_date}</td>
                    <td className="px-6 py-4">₹{event.entry_fee}</td>
                    <td className="px-6 py-4 flex space-x-2">
                      <button
                        onClick={() => handleShowAllRegisteredCandidates(event.id)}
                        className="text-blue-500 hover:text-blue-700 transition"
                        title="View Registered Candidates"
                      >
                        <FaUsers />
                      </button>
                      <button
                        onClick={() => handleDeleteEvent(event.id)}
                        className="text-red-500 hover:text-red-700 transition"
                        title="Delete Event"
                      >
                        <FaTrash />
                      </button>
                      <button
                        onClick={() => handleEditEvent(event)} // ✅ Corrected here
                        className="text-green-500 hover:text-green-700 transition"
                        title="Edit Event"
                      >
                        <FaEdit />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-gray-600">
                    No events found!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* ✅ Update Event Modal */}
      {editingEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-xl font-semibold mb-4">Update Event</h3>
            <input
              type="text"
              name="title"
              value={editingEvent.title}
              onChange={handleEditInputChange}
              placeholder="Event Title"
              className="w-full p-2 border rounded mb-2"
            />
            <input
              type="text"
              name="tags"
              value={editingEvent.tags}
              onChange={handleEditInputChange}
              placeholder="Tags"
              className="w-full p-2 border rounded mb-2"
            />
            <input
              type="date"
              name="event_date"
              value={editingEvent.event_date}
              onChange={handleEditInputChange}
              className="w-full p-2 border rounded mb-2"
            />
            <input
              type="number"
              name="entry_fee"
              value={editingEvent.entry_fee}
              onChange={handleEditInputChange}
              placeholder="Entry Fee"
              className="w-full p-2 border rounded mb-2"
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={handleUpdateEvent}
                className="bg-blue-500 text-dark px-4 py-2 rounded"
              >
                Update
              </button>
              <button
                onClick={() => setEditingEvent(null)}
                className="bg-gray-500 text-dark px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default EventDashboard;
