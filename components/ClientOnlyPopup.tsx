'use client';
import { useEffect, useState } from 'react';

import EmailSubscribePopup from './EmailSubscribePopup';

const ClientOnlyPopup = () => {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowPopup(true), 1000); // optional delay
    return () => clearTimeout(timer);
  }, []);

  if (!showPopup) return null;

  return <EmailSubscribePopup onClose={() => setShowPopup(false)} />;
};

export default ClientOnlyPopup;
