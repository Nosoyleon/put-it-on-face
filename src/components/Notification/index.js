import React from 'react';
import { string } from 'prop-types';

function Notification({ message, className }) {
  return (
    <div className={`notification ${className}`}>
      <button type="button" className="delete" aria-label="delete" />
      {message}
    </div>
  );
}

Notification.defaultProps = { className: '' };

Notification.propTypes = {
  message: string.isRequired,
  className: string
};

export default Notification;
