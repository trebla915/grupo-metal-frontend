// app/sections/Contact.tsx
"use client";

import { useState } from "react";
import { FaEnvelope, FaPhone, FaInstagram } from 'react-icons/fa';

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Add your form submission logic here
    console.log('Form submitted:', formData);
  };

  return (
    <section id="contact" className="relative min-h-screen flex items-center justify-center py-20">
      {/* Background with dramatic gradient */}
      <div className="absolute inset-0 bg-black">
        <div className="absolute inset-0 bg-gradient-to-br from-rose-900/20 via-black to-black" />
        <div className="absolute inset-0 bg-[url('/background.jpg')] opacity-5 mix-blend-overlay" />
        {/* Animated flame effect */}
        <div className="absolute inset-0 bg-gradient-to-t from-rose-600/5 via-transparent to-transparent animate-pulse" />
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-6xl md:text-7xl font-bold text-white mb-6 tracking-wider">
            CONNECT WITH US
          </h2>
          <div className="h-1 w-32 bg-rose-600 mx-auto mb-8 transform -skew-x-12" />
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Join the metal revolution. Reach out for bookings, collaborations, or just to share your love for heavy music.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="bg-black/50 backdrop-blur-sm border border-rose-600/20 p-8 rounded-lg transform hover:-translate-y-1 transition-transform duration-300">
              <h3 className="text-3xl font-bold text-rose-600 mb-6 tracking-wide">GET IN TOUCH</h3>
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <FaEnvelope className="text-2xl text-rose-600" />
                  <div>
                    <p className="text-gray-400">Email</p>
                    <a href="mailto:contact@grupometal.com" className="text-white hover:text-rose-600 transition-colors">
                      contact@grupometal.com
                    </a>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <FaPhone className="text-2xl text-rose-600" />
                  <div>
                    <p className="text-gray-400">Phone</p>
                    <a href="tel:+1234567890" className="text-white hover:text-rose-600 transition-colors">
                      (123) 456-7890
                    </a>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <FaInstagram className="text-2xl text-rose-600" />
                  <div>
                    <p className="text-gray-400">Social</p>
                    <a href="https://instagram.com/your-handle" target="_blank" rel="noopener noreferrer" className="text-white hover:text-rose-600 transition-colors">
                      @grupometal
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="bg-black/50 backdrop-blur-sm border border-rose-600/20 p-8 rounded-lg space-y-6">
            <div>
              <label htmlFor="name" className="block text-rose-600 text-sm font-medium mb-2 uppercase tracking-wider">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full bg-black/50 border border-rose-600/30 rounded-md px-4 py-3 text-white focus:outline-none focus:border-rose-600 transition-colors"
                placeholder="Your Name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-rose-600 text-sm font-medium mb-2 uppercase tracking-wider">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-black/50 border border-rose-600/30 rounded-md px-4 py-3 text-white focus:outline-none focus:border-rose-600 transition-colors"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-rose-600 text-sm font-medium mb-2 uppercase tracking-wider">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full bg-black/50 border border-rose-600/30 rounded-md px-4 py-3 text-white focus:outline-none focus:border-rose-600 transition-colors resize-none"
                placeholder="Your Message"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-rose-600 text-white py-4 px-8 rounded-md text-lg font-bold uppercase tracking-wider hover:bg-rose-700 transform hover:-translate-y-1 transition-all duration-300"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black to-transparent" />
    </section>
  );
}