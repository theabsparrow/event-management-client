"use client";
import Link from "next/link";
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
                <Link href="/events" className="hover:text-purple-500">
                  Upcoming Events
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-purple-500">
                  Our Services
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-purple-500">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-purple-500">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/faq" className="hover:text-purple-500">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/help" className="hover:text-purple-500">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-purple-500">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-purple-500">
                  Privacy Policy
                </Link>
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
              <Link
                href="https://facebook.com"
                className="hover:text-purple-500"
              >
                <FaFacebook />
              </Link>
              <Link
                href="https://twitter.com"
                className="hover:text-purple-500"
              >
                <FaTwitter />
              </Link>
              <Link
                href="https://instagram.com"
                className="hover:text-purple-500"
              >
                <FaInstagram />
              </Link>
              <Link
                href="https://linkedin.com"
                className="hover:text-purple-500"
              >
                <FaLinkedin />
              </Link>
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
