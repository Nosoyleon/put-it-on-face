import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import ImageList from 'components/ImageList';

import unselected from 'assets/images/default/user.png';
import { DEFAULT_FACES, DEFAULT_MAKS } from './constants';
import styles from './styles.module.scss';

function App() {
  const [selectedFace, setSelectedFace] = useState({});
  const [selectedMask, setSelectedMask] = useState({});

  return (
    <div className={styles.mainWrapper}>
      <h1 className="title is-1 has-text-centered mb-6">Póntelos!</h1>
      <div className={styles.appContainer}>
        <ImageList
          list={DEFAULT_FACES}
          selectImage={face => setSelectedFace(face)}
          selectedKey={selectedFace.key}
        />
        <div className={styles.previewContainer}>
          <figure className={`image ${styles.imageWrapper}`}>
            {selectedFace?.imageUrl && (
              <button
                type="button"
                aria-label="delete"
                className={`delete is-large ${styles.delete}`}
                onClick={() => setSelectedFace({})}
              />
            )}
            <img
              className={styles.previewImage}
              alt="face"
              src={selectedFace.imageUrl || unselected}
            />
          </figure>

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
          <span>{selectedMask.imageUrl}</span>
        </div>

        <ImageList
          list={DEFAULT_MAKS}
          selectImage={mask => setSelectedMask(mask)}
          selectedKey={selectedMask.key}
        />
      </div>
    </div>
  );
}

export default App;
