import "./App.css";
import { motion } from "framer-motion";
import Layout from "./components/Layout/Layout";

function App() {
  return <><Layout /><motion.a
    href="https://chat.whatsapp.com/K01PSYeXboi7t832IeT4BE"
    target="_blank"
    rel="noopener noreferrer"
    className="whatsapp-button"
    whileHover={{ scale: 1.1 }}
  ><i class="ri-whatsapp-line"></i>
  </motion.a></>;
}

export default App;
