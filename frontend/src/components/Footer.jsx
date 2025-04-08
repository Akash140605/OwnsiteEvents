import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <motion.footer
      className="bg-gradient-to-r from-gray-900 to-black text-white pt-12 pb-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Main Footer Content */}
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 px-6 relative z-10">
        {/* About Us */}
        <div>
          <h3 className="text-xl font-bold mb-4 text-orange-200 uppercase">
            About OwnSite
          </h3>
          <p className="text-gray-400 leading-relaxed">
            OwnSite is a leading software development company specializing in
            web applications, mobile apps, and modern UI/UX designs. We deliver
            innovative digital solutions for businesses worldwide.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-bold mb-4 text-orange-200 uppercase">
            Quick Links
          </h3>
          <ul className="space-y-3 text-gray-400">
            <li>
              <a href="/" className="hover:text-red-500 transition duration-300">
              <span className="text-green-200">Home</span>
              </a>
            </li>
            <li>
              <a
                href="/services"
                className="hover:text-red-500 transition duration-300"
              >
                 <span className="text-green-200">Events</span>
              </a>
            </li>
            <li>
              <a
                href="/about"
                className="hover:text-red-500 transition duration-300"
              >
                <span className="text-green-200">About Us</span>
              </a>
            </li>
            <li>
              <a
                href="/portfolio"
                className="hover:text-red-500 transition duration-300"
              >
                 <span className="text-green-200">PortFolio</span>
              </a>
            </li>
         
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-xl font-bold mb-4 text-orange-200 uppercase">
            Contact Us
          </h3>
          <ul className="space-y-3 text-gray-400">
            <li className="flex items-center space-x-2">
              <FaPhoneAlt className="text-green-200" />{" "}
              <span>+91 98765 43210</span>
            </li>
            <li className="flex items-center space-x-2">
              <FaEnvelope className="text-green-200" />{" "}
              <span>info@ownsite.com</span>
            </li>
            <li className="flex items-center space-x-2">
              <FaMapMarkerAlt className="text-green-200" />{" "}
              <span>Noida, Uttar Pradesh, India</span>
            </li>
            <li className="flex items-center space-x-2">
              <FaMapMarkerAlt className="text-green-200" />{" "}
              <span>Lucknow, Uttar Pradesh, India</span>
            </li>
          </ul>
        </div>

        {/* Social Media Links */}
        <div>
          <h3 className="text-orange-200 text-xl font-bold mb-4 uppercase">
            Follow Us
          </h3>
          <div className="flex justify-start space-x-4">
            {[
              { icon: <FaFacebook  className="text-blue-700"/>, link: "https://facebook.com" },
              { icon: <FaTwitter className="text-blue-300"/>, link: "https://twitter.com" },
              { icon: <FaInstagram className="text-pink-400" />, link: "https://instagram.com" },
              { icon: <FaLinkedin className="text-blue-500" />, link: "https://linkedin.com" },
            ].map((item, index) => (
              <motion.a
                key={index}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2 }}
                className="text-2xl text-orange-200 hover:text-red-500 transition duration-300"
              >
                {item.icon}
              </motion.a>
            ))}
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="border-t border-gray-700 mt-10 pt-4 text-center text-sm text-gray-400">
        © {new Date().getFullYear()}{" "}
        <span className="font-bold text-yellow-500">OwnSite</span>. All Rights
        Reserved. | Built with ❤️ by OwnSite Team.
      </div>
    </motion.footer>
  );
};

export default Footer;
