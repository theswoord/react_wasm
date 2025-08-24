// src/components/ContactForm.js

import React, { useState } from 'react';
import emailjs from '@emailjs/browser'; 

// An SVG icon for the send button for a nicer touch
const SendIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22 2L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);


function ContactForm() {
  const form = useRef(); // 👈 Create a ref for the form element
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  // 👇 This is the updated handleSubmit function
  const handleSubmit = (e) => {
    e.preventDefault();

    // Replace with your actual IDs from the EmailJS dashboard
    const serviceID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateID =  import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    emailjs.sendForm(serviceID, templateID, form.current, publicKey)
      .then((result) => {
          console.log(result.text);
          alert(`Thank you, ${formData.name}! Your message has been sent successfully.`);
          setFormData({ name: '', email: '', message: '' }); // Reset form
      }, (error) => {
          console.log(error.text);
          alert('Sorry, something went wrong. Please try again later.');
      });
  };

  return (
    <div className="w-full max-w-lg p-6 space-y-4 bg-gray-900 border-4 border-[#565656] shadow-[8px_8px_0px_#3b3b3b]">
      <h2 className="text-3xl font-bold text-center text-white font-press-start">Get in Touch</h2>
      
      {/* 👇 Add the ref to your form element */}
      <form ref={form} onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-200 font-press-start">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name" // This MUST match the variable in your template (e.g., {{name}})
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-3 mt-1 text-white bg-gray-800 border-2 border-[#565656] focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-200 font-press-start">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email" // MUST match {{email}}
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-3 mt-1 text-white bg-gray-800 border-2 border-[#565656] focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-200 font-press-start">
            Message
          </label>
          <textarea
            id="message"
            name="message" // MUST match {{message}}
            rows="4"
            value={formData.message}
            onChange={handleChange}
            required
            className="w-full p-3 mt-1 text-white bg-gray-800 border-2 border-[#565656] focus:outline-none focus:border-blue-500"
          ></textarea>
        </div>
        <div>
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 p-3 font-bold text-white bg-blue-600 border-2 border-b-4 border-r-4 border-blue-800 hover:bg-blue-700 active:border-b-2 active:border-r-2 font-press-start"
          >
            Send Message <SendIcon />
          </button>
        </div>
      </form>
    </div>
  );
}

export default ContactForm;