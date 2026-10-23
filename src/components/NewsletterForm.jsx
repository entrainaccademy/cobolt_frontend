'use client';

import React, { useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 max-w-md md:ml-auto">
      {subscribed ? (
        <div className="flex items-center gap-2 text-green-600 font-semibold bg-green-50 px-4 py-3 rounded-lg border border-green-200 w-full animate-fade-in">
          <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
          <span>Subscription successful! Thank you.</span>
        </div>
      ) : (
        <>
          <input
            suppressHydrationWarning
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your corporate email"
            required
            className="flex-grow px-4 py-3 bg-white text-sm text-primary rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all duration-200"
          />
          <button
            type="submit"
            className="inline-flex items-center justify-center p-3 text-white bg-primary hover:bg-accent rounded-lg transition-colors duration-200 shadow"
            aria-label="Subscribe to newsletter"
          >
            <Send className="w-4 h-4" />
          </button>
        </>
      )}
    </form>
  );
}
