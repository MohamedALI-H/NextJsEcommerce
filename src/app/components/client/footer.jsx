import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto flex flex-wrap justify-between items-center">
        <div className="w-full md:w-1/2 text-center md:text-left mb-4 md:mb-0">
          <p>&copy; 2024 Your Company. All rights reserved.</p>
        </div>
        <div className="w-full md:w-1/2 text-center md:text-right">
          <ul className="flex justify-center md:justify-end space-x-6">
            <li>
              <a href="#" className="hover:text-gray-300">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-300">
                Terms of Service
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-300">
                Contact Us
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
