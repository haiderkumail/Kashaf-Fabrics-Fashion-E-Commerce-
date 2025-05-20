'use client'; 
import React, { useState, useEffect } from 'react';

const EmailSubscribePopup = ({ onClose }: { onClose: () => void }) => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    setError('Please enter a valid email address');
    return;
  }

  setError('');

  try {
    const res = await fetch('/api/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.error || 'Subscription failed');
      return;
    }

    setSubmitted(true);
  } catch {
    setError('Network error. Please try again.');
  }
};


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-xl font-bold"
          aria-label="Close popup"
        >
          &times;
        </button>
        {!submitted ? (
          <>
<h2
  className="text-xl font-normal mb-4 uppercase whitespace-nowrap"
  style={{ fontFamily: "'Montserrat', sans-serif" }}
>
  Subscribe for Latest Updates!
</h2>



            <form onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
              {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
<button
  type="submit"
  className="w-full bg-gradient-to-r from-black to-yellow-500 text-white py-2 rounded hover:from-gray-900 hover:to-yellow-400 transition"
>
  Subscribe
</button>

            </form>
          </>
        ) : (
          <>
            <h2 className="text-xl font-semibold mb-4 text-green-600">
              Thank you for subscribing!
            </h2>
            <p>We&apos;ll keep you updated with our latest products and offers.</p>
            <button
              onClick={onClose}
              className="w-full bg-gradient-to-r from-black to-yellow-500 text-white py-2 rounded hover:from-gray-900 hover:to-yellow-400 transition"
            >
              Close
            </button>
          </>
        )}
      </div>
    </div>
  );
};
export default EmailSubscribePopup;
