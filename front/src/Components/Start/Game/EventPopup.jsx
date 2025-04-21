// EventPopup.jsx
import React, { useEffect, useState } from 'react';

const EventPopup = ({ message }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setVisible(true);
      const timeout = setTimeout(() => setVisible(false), 5000);
      return () => clearTimeout(timeout);
    }
  }, [message]);

  return (
    visible && (
      <div className="fixed top-5 left-1/2 transform -translate-x-1/2 bg-yellow-300 text-black px-6 py-3 rounded shadow-lg z-50 animate-pulse">
        📢 {message}
      </div>
    )
  );
};

export default EventPopup;
