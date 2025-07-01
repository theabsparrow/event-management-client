"use client";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 dark:bg-black dark:text-gray-400">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h2 className="text-2xl font-bold text-purple-600">EventPro</h2>
            <p className="mt-3 text-sm">
              Your ultimate event management partner. Making every event
              unforgettable.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Explore</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/events" className="hover:text-purple-500">
                  Upcoming Events
                </a>
              </li>
              <li>
                <a href="/services" className="hover:text-purple-500">
                  Our Services
                </a>
              </li>
              <li>
                <a href="/pricing" className="hover:text-purple-500">
                  Pricing
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-purple-500">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/faq" className="hover:text-purple-500">
                  FAQ
                </a>
              </li>
              <li>
                <a href="/help" className="hover:text-purple-500">
                  Help Center
                </a>
              </li>
              <li>
                <a href="/terms" className="hover:text-purple-500">
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a href="/privacy" className="hover:text-purple-500">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Social & Contact */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Connect</h3>
            <p className="text-sm mb-3">
              123 Event Lane, City Center
              <br />
              +880-1234-567890
            </p>
            <div className="flex space-x-4 text-xl text-gray-400">
              <a href="https://facebook.com" className="hover:text-purple-500">
                <FaFacebook />
              </a>
              <a href="https://twitter.com" className="hover:text-purple-500">
                <FaTwitter />
              </a>
              <a href="https://instagram.com" className="hover:text-purple-500">
                <FaInstagram />
              </a>
              <a href="https://linkedin.com" className="hover:text-purple-500">
                <FaLinkedin />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 border-t border-gray-700 pt-6 text-sm text-center">
          <p>
            &copy; {new Date().getFullYear()} EventPro. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
