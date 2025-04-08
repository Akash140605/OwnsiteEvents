import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Services from "./components/Services";
import Contact from "./components/Contact";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import EventRegistration from "./pages/EventRegistration";
import EventSecurity from "./pages/EventSecurity";
import EventDetailsCard from "./pages/EventDetailsCard";
import EventCreation from "./pages/EventCreation";
import EventDashboard from "./pages/EventDashboard";
import CandidateData from "./pages/CandidateData";

function App() {
  const event = {
    title: "Music Concert",
    description: "Join us for an exciting music concert featuring top bands.",
    category: "Entertainment",
    seats: "500",
    paymentLink: "https://example.com/payment",
  };
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/create_event" element={<EventSecurity/>} />
        <Route path="/event_creation" element={<EventDashboard/>} />
        <Route path="/event_creation_form" element={<EventCreation/>} />
        <Route path="/event_registration" element={<EventRegistration />}/>
        <Route path="/event_dashboard" element={<EventDetailsCard event={event} />}/>
        <Route path="/candidate-data/:eventId" element={<CandidateData />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
