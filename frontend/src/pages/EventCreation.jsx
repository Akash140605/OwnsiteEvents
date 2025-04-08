import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaSpinner, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';

const EventCreation = () => {
  const [eventData, setEventData] = useState({
    user_id: '',
    title: '',
    description: '',
    category: '',
    tags: '',
    eventDate: '',
    registrationDeadline: '',
    seats: '',
    venue: '',
    entryFee: '',
    paymentLink: '',
    organizerContact: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch user ID from localStorage when component mounts
  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      setEventData((prevState) => ({ ...prevState, user_id: userId }));
    }
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData({
      ...eventData,
      [name]: value,
    });
  };

  // Form validation before submission
  const validateForm = () => {
    const { title, description, category, tags, eventDate, registrationDeadline, seats, venue, entryFee, paymentLink, organizerContact } = eventData;

    if (!title || !description || !category || !tags || !eventDate || !registrationDeadline || !seats || !venue || !entryFee || !paymentLink || !organizerContact) {
      setError('Please fill in all fields');
      return false;
    }

    if (isNaN(seats) || seats <= 0) {
      setError('Seats must be a positive number');
      return false;
    }

    if (isNaN(entryFee) || entryFee < 0) {
      setError('Entry Fee must be a valid number');
      return false;
    }

    setError('');
    return true;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    // Get the user ID from localStorage
    const userId = localStorage.getItem('userId');

    if (!userId) {
      setError('User is not authenticated. Please log in.');
      setLoading(false);
      return;
    }

    const eventDataToSend = {
      user_id: userId,
      ...eventData,
    };

    try {
      const response = await fetch('http://localhost/event_api/event_create.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventDataToSend),
      });

      const result = await response.json();

      if (result.status === 'success') {
        setLoading(false);
        toast.success('Event Created Successfully', {
          icon: <FaCheckCircle className="text-green-500" />,
        });

        // Reset the form after success
        setEventData({
          user_id: '',
          title: '',
          description: '',
          category: '',
          tags: '',
          eventDate: '',
          registrationDeadline: '',
          seats: '',
          venue: '',
          entryFee: '',
          paymentLink: '',
          organizerContact: '',
        });
      } else {
        setLoading(false);
        setError(result.message || 'An error occurred while creating the event');
        toast.error(result.message || 'An error occurred while creating the event');
      }
    } catch (error) {
      setLoading(false);
      setError('Failed to create the event. Please try again later.');
      toast.error('Failed to create the event. Please try again later.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-6">Event Creation</h2>

      {/* Show error message */}
      {error && (
        <div className="mb-4 text-red-500">
          <FaExclamationCircle className="inline mr-2" />
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Event Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={eventData.title}
            onChange={handleChange}
            className="mt-1 block w-full p-4 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Event Description
          </label>
          <textarea
            id="description"
            name="description"
            value={eventData.description}
            onChange={handleChange}
            className="mt-1 block w-full p-4 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>

        {/* Category */}
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">
            Event Category
          </label>
          <input
            type="text"
            id="category"
            name="category"
            value={eventData.category}
            onChange={handleChange}
            className="mt-1 block w-full p-4 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>

        {/* Tags */}
        <div>
          <label htmlFor="tags" className="block text-sm font-medium text-gray-700">
            Event Tags
          </label>
          <input
            type="text"
            id="tags"
            name="tags"
            value={eventData.tags}
            onChange={handleChange}
            className="mt-1 block w-full p-4 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>

        {/* Event Date */}
        <div>
          <label htmlFor="eventDate" className="block text-sm font-medium text-gray-700">
            Event Date
          </label>
          <input
            type="date"
            id="eventDate"
            name="eventDate"
            value={eventData.eventDate}
            onChange={handleChange}
            className="mt-1 block w-full p-4 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>

        {/* Registration Deadline */}
        <div>
          <label htmlFor="registrationDeadline" className="block text-sm font-medium text-gray-700">
            Registration Deadline
          </label>
          <input
            type="date"
            id="registrationDeadline"
            name="registrationDeadline"
            value={eventData.registrationDeadline}
            onChange={handleChange}
            className="mt-1 block w-full p-4 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>

        {/* Seats */}
        <div>
          <label htmlFor="seats" className="block text-sm font-medium text-gray-700">
            Seats Available
          </label>
          <input
            type="number"
            id="seats"
            name="seats"
            value={eventData.seats}
            onChange={handleChange}
            className="mt-1 block w-full p-4 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>

        {/* Venue */}
        <div>
          <label htmlFor="venue" className="block text-sm font-medium text-gray-700">
            Event Venue
          </label>
          <input
            type="text"
            id="venue"
            name="venue"
            value={eventData.venue}
            onChange={handleChange}
            className="mt-1 block w-full p-4 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>

        {/* Entry Fee */}
        <div>
          <label htmlFor="entryFee" className="block text-sm font-medium text-gray-700">
            Entry Fee
          </label>
          <input
            type="number"
            id="entryFee"
            name="entryFee"
            value={eventData.entryFee}
            onChange={handleChange}
            className="mt-1 block w-full p-4 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>

        {/* Payment Link */}
        <div>
          <label htmlFor="paymentLink" className="block text-sm font-medium text-gray-700">
            Payment Link
          </label>
          <input
            type="url"
            id="paymentLink"
            name="paymentLink"
            value={eventData.paymentLink}
            onChange={handleChange}
            className="mt-1 block w-full p-4 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>

        {/* Organizer Contact */}
        <div>
          <label htmlFor="organizerContact" className="block text-sm font-medium text-gray-700">
            Organizer Contact
          </label>
          <input
            type="text"
            id="organizerContact"
            name="organizerContact"
            value={eventData.organizerContact}
            onChange={handleChange}
            className="mt-1 block w-full p-4 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white p-4 rounded-lg hover:bg-indigo-700 transition"
          disabled={loading}
        >
          {loading ? (
            <>
              <FaSpinner className="inline mr-2 animate-spin" />
              Creating Event...
            </>
          ) : (
            'Create Event'
          )}
        </button>
      </form>

      {/* Toast Notifications */}
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};

export default EventCreation;
