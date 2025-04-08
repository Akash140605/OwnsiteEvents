import { motion } from "framer-motion";

const Contact = () => {
  return (
    <div className="p-10  min-h-screen flex items-center justify-center relative min-h-screen bg-gradient-to-br from-red-100 to-orange-100 px-4 md:px-12 lg:px-20">
      <motion.div
        className="w-full max-w-lg bg-white bg-opacity-95 shadow-lg backdrop-blur-lg rounded-2xl p-6 border-2 border-transparent hover:border-red-500 transition-all duration-300"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h2
          className="text-4xl font-extrabold text-red-700 text-center mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Contact Us
        </motion.h2>
        <motion.form
          className="space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <motion.input
            type="text"
            placeholder="Your Name"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-300"
            whileFocus={{ scale: 1.05 }}
          />
          <motion.input
            type="email"
            placeholder="Your Email"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-300"
            whileFocus={{ scale: 1.05 }}
          />
          <motion.textarea
            placeholder="Your Message"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-300"
            rows="4"
            whileFocus={{ scale: 1.05 }}
          />
          <motion.button
            className="w-full bg-gradient-to-r from-red-600 to-yellow-500 text-white font-bold py-3 rounded-full hover:from-yellow-500 hover:to-red-600 transition transform hover:scale-105 hover:shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Send
          </motion.button>
        </motion.form>
      </motion.div>
    </div>
  );
};

export default Contact;
