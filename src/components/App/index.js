import React from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import unselected from 'assets/images/default/user.png';
import { DEFAULT_FACES, DEFAULT_MAKS } from './constants';
import styles from './styles.module.scss';

function App() {
  return (
    <div className={styles.mainWrapper}>
      <h1 className="title is-1 has-text-centered mb-6">Póntelos!</h1>
      <div className={styles.appContainer}>
        <div className={styles.defaultImages}>
          {DEFAULT_FACES.map(({ imageUrl, key }) => (
            <img className={styles.faceImage} key={key} alt={key} src={imageUrl} />
          ))}
        </div>
        <div className={styles.previewContainer}>
          <img className={styles.previewImage} alt="face" src={unselected} />
          <div className="file is-primary mt-5 is-large is-centered">
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label className="file-label">
              <input className="file-input" type="file" name="photo" />
              <span className="file-cta">
                <span className="file-icon">
                  <i className="fas fa-upload" />
                </span>
                <span className="file-label">Sube una foto…</span>
              </span>
            </label>
          </div>
        </div>
        <div className={styles.defaultImages}>
          {DEFAULT_MAKS.map(({ imageUrl, key }) => (
            <img className={styles.faceImage} key={key} alt={key} src={imageUrl} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
