import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-green-100 mt-auto">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold text-green-600 mb-4">LearnHub</h3>
            <p className="text-gray-600 mb-4">
              Empowering learners worldwide with quality education and expert instruction.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 rounded-full bg-green-100 hover:bg-green-600 text-green-600 hover:text-white flex items-center justify-center transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-green-100 hover:bg-green-600 text-green-600 hover:text-white flex items-center justify-center transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-green-100 hover:bg-green-600 text-green-600 hover:text-white flex items-center justify-center transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-green-100 hover:bg-green-600 text-green-600 hover:text-white flex items-center justify-center transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/courses" className="text-gray-600 hover:text-green-600 transition-colors">
                  Browse Courses
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-600 hover:text-green-600 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/instructors" className="text-gray-600 hover:text-green-600 transition-colors">
                  Become Instructor
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-green-600 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-4">Support</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/faqs" className="text-gray-600 hover:text-green-600 transition-colors">
                  FAQs
                </Link>
              </li>
              <li>
                <Link to="/help" className="text-gray-600 hover:text-green-600 transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-600 hover:text-green-600 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-600 hover:text-green-600 transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-gray-600">
                <Mail className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span>support@learnhub.com</span>
              </li>
              <li className="flex items-start gap-2 text-gray-600">
                <Phone className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-start gap-2 text-gray-600">
                <MapPin className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span>123 Learning Street, Education City, EC 12345</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-green-100 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-2">
            <p className="text-gray-600 text-sm">
              © 2024 LearnHub. All rights reserved.
            </p>
            <div className="flex gap-4 text-sm">
              <Link to="/privacy" className="text-gray-600 hover:text-green-600 transition-colors">
                Privacy
              </Link>
              <Link to="/terms" className="text-gray-600 hover:text-green-600 transition-colors">
                Terms
              </Link>
              <Link to="/cookies" className="text-gray-600 hover:text-green-600 transition-colors">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;