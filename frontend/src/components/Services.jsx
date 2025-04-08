import React, { useState, useEffect } from "react";
import EventDetailsCard from "../pages/EventDetailsCard";
import axios from "axios";

const Services = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data from API
  useEffect(() => {
    axios
      .get("http://localhost/event_api/event_details.php")
      .then((response) => {
        if (response.data.status === "success") {
          setEvents(response.data.data);
        } else {
          console.error("Error fetching events:", response.data.message);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("API error:", error);
        setLoading(false);
      });
  }, []);

  // Split events into upcoming and past events
  const today = new Date().toISOString().split("T")[0];
  const upcomingEvents = events.filter(
    (event) => event.event_date > today && event.event_date !== "0000-00-00"
  );
  const pastEvents = events.filter(
    (event) => event.event_date <= today && event.event_date !== "0000-00-00"
  );

  if (loading) {
    return <p className="text-center mt-10">Loading events...</p>;
  }

  return (
    <div className="w-full flex flex-col justify-center items-center p-auto bg-orange-100  px-4 py-8">
      {/* Upcoming Events */}
      <section className="mb-12 mt-5">
        <h2 className="text-5xl mt-5 font-bold text-[#0D47A1] mb-6 text-center">
          🎉 Upcoming Events
        </h2>
        {upcomingEvents.length > 0 ? (
          <div className="pt-7 w-full flex justify-center items-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 mt-5">
            {upcomingEvents.map((event) => (
              <div
                key={event.id}
                className="w-full max-w-sm bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <EventDetailsCard event={event} />
              </div>
            ))}
          </div>
        </div>
        
        ) : (
          <p className="text-center text-gray-500">No upcoming events found.</p>
        )}
      </section>

      {/* Past Events */}
      <section>
        <h2 className="text-5xl mt-5 font-bold text-[#0D47A1] mb-6 text-center">
          📚 Past Events
        </h2>
        {pastEvents.length > 0 ? (
          <div className="pt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {pastEvents.map((event) => (
              <div
                key={event.id}
                className="w-full max-w-sm bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <EventDetailsCard event={event} />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No past events found.</p>
        )}
      </section>
    </div>
  );
};

export default Services;
