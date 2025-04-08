import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaArrowLeft,
  FaArrowRight,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import img1 from '../assets/img/img1.jpg';
const Home = () => {
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost/event_api/event_details.php")
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          const upcoming = data.data
            .filter((event) => new Date(event.event_date) > new Date())
            .slice(0, 3);
          setUpcomingEvents(upcoming);
        } else {
          console.error("Error fetching events:", data.message);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("API error:", error);
        setLoading(false);
      });
  }, []);

  const handleRegister = (eventId) => {
    navigate("/event_registration");
  };

  const EventCard = ({ event }) => (
    <motion.div
      className="bg-white shadow-xl rounded-2xl p-5 w-full max-w-sm sm:mx-auto transition duration-300 transform hover:-translate-y-2 hover:scale-105 border-2 border-red-500 hover:border-orange-500 relative"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h3 className="text-2xl font-bold text-red-700 mb-2">
        {event.event_name}
      </h3>
      <p className="text-gray-700">{event.description}</p>
      <p className="text-sm text-gray-500 mt-2">📅 Date: {event.event_date}</p>
      <p className="text-sm text-gray-500">⏰ Seats: {event.seats || "N/A"}</p>
      <p className="text-sm text-gray-500">📍 Location: {event.venue || "TBD"}</p>
      <p className="text-sm text-gray-500">
        👤 Organizer: {event.organizer_contact || "N/A"}
      </p>
      <button
        onClick={() => handleRegister(event.id)}
        className="absolute bottom-4 right-4 px-4 py-2 bg-gradient-to-r from-red-600 to-orange-500 text-white font-bold rounded-full hover:from-orange-500 hover:to-red-600 transition"
      >
        Register
      </button>
    </motion.div>
  );

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-red-50 to-orange-100 px-4 md:px-12 lg:px-20">
      {/* Social Icons Fixed on Left */}
     <div className="img"> <img src=" "/></div> 
      <div className="fixed left-4 top-1/2 transform -translate-y-1/2 space-y-4 z-50">
        {[
          {
            icon: FaFacebookF,
            link: "https://facebook.com",
            color:
              "bg-gradient-to-r from-blue-200 to-blue-300 hover:from-blue-700 hover:to-blue-500",
          },
          {
            icon: FaTwitter,
            link: "https://twitter.com",
            color:
              "bg-gradient-to-r from-blue-100 to-blue-300 hover:from-blue-600 hover:to-blue-400",
          },
          {
            icon: FaInstagram,
            link: "https://instagram.com",
            color:
              "bg-gradient-to-r from-pink-300 to-purple-400 hover:from-purple-600 hover:to-pink-500",
          },
          {
            icon: FaLinkedinIn,
            link: "https://linkedin.com",
            color:
              "bg-gradient-to-r from-blue-700 to-gray-800 hover:from-gray-800 hover:to-blue-700",
          },
        ].map((social, index) => (
          <motion.a
            key={index}
            href={social.link}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            className={`p-4 ${social.color} rounded-full shadow-2xl text-white transition duration-300 flex items-center justify-center w-12 h-12`}
          >
            <social.icon className="w-5 h-5" />
          </motion.a>
        ))}
      </div>

      <div className="flex flex-col  items-center justify-center pt-16 pb-20">
        <motion.h1
          className="text-4xl mt-5 sm:text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 text-center leading-tight"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Welcome to <span className="text-red-500 ">OwnSite Events</span>
        </motion.h1>
        <p className="text-lg sm:text-xl text-gray-700 mb-12 text-center max-w-2xl leading-relaxed px-4">
          Manage and showcase all your events seamlessly with elegance and
          simplicity.
        </p>

        {/* Upcoming Events Section */}
        <div className="w-full max-w-6xl flex flex-col justify-center items-center mb-12 mt-15">
          <h2 className="text-3xl font-semibold text-red-600 mb-7 text-center">
            🎉 Upcoming Events
          </h2>
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
              {[...Array(3)].map((_, index) => (
                <div
                  key={index}
                  className="bg-gray-200 h-40 w-full max-w-sm rounded-2xl animate-pulse mx-auto"
                ></div>
              ))}
            </div>
          ) : upcomingEvents.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
              {upcomingEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center">No upcoming events available.</p>
          )}

          {/* View All Link */}
          <div className="mt-10 text-center">
            <button
              onClick={() => navigate("/services")}
              className="text-red-600 hover:bg-red-500 bg-gray-100 hover:text-red-100 text-md font-semibold p-2 border-2 border-radius-5 rounded-lg"
            >
              <div className="flex flex-row items-center justify-center" ><span className="mx-5 text-lg">View All</span>{<FaArrowRight className="text-center"/>}</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
