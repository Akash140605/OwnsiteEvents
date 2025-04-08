import React from "react";
import { useNavigate } from "react-router-dom";

const EventDetailsCard = ({ event }) => {
  const navigate = useNavigate();

  // ✅ Check if the event date is in the past
  const isEventPast = new Date(event.event_date) < new Date();

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden max-w-sm mx-auto hover:scale-105 transition-transform duration-300">
      <div className="p-4 mt-7">
        <h3 className="text-2xl font-bold text-center mb-2 text-gray-800">
          {event.title}
        </h3>
        <p className="text-sm text-gray-600 mb-4 mt-5">{event.description}</p>
        <div className="flex justify-between text-sm text-gray-500 mb-2">
          <p>
            <strong>Category:</strong> {event.category}
          </p>
          <p>
            <strong>Seats:</strong> {event.seats}
          </p>
        </div>
        <div className="flex justify-between text-sm mt-2 text-gray-500 mb-2">
          <p>
            <strong>Venue:</strong> {event.venue}
          </p>
          <p>
            <strong>Fee:</strong> ₹{event.entry_fee}
          </p>
        </div>
        <div className="mt-4 text-center">
          <button
            onClick={() => navigate("/event_registration")}
            disabled={isEventPast}
            className={`${isEventPast?"text-red-600":"text-black-600"} bg-green-100 border-2  hover:border-2 bg-green-100 text-lg font-semibold py-2 px-4 rounded-lg transition-all border-gray-300  ${
              isEventPast
                ? "bg-gray-400 text-dark cursor-not-allowed"
                : "bg-green-100 text-dark hover:bg-blue-200"
            }`}
          >
            {isEventPast ? "Registration Closed" : "Register Now"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventDetailsCard;
