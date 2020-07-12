import React, { useState, useEffect } from 'react';
import { string, func } from 'prop-types';
import cn from 'classnames';

import styles from './styles.module.scss';

function Notification({ message, className, onDelete }) {
  const [messageLoaded, setMessageLoaded] = useState(false);

  const handleDelete = () => {
    setMessageLoaded(false);
    setTimeout(() => {
      onDelete();
    }, 100);
  };

  useEffect(() => {
    if (message) {
      setTimeout(() => setMessageLoaded(true), 100);
    } else {
      setMessageLoaded(false);
    }
  }, [message]);

  return (
    <div className={cn(styles.container, { [styles.showContainer]: message })}>
      <div
        className={cn(`notification ${styles.notification} ${className}`, {
          [styles.newMessage]: messageLoaded,
          [styles.hidden]: !messageLoaded
        })}
      >
        <button
          type="button"
          onClick={handleDelete}
          className="delete"
          aria-label="delete"
        />
        {message}
      </div>
    </div>
  );
}

Notification.defaultProps = { className: '', message: '' };

Notification.propTypes = {
  message: string,
  className: string,
  onDelete: func.isRequired
};

export default Notification;
