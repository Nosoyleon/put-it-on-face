import React, { useState, useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import ImageList from 'components/ImageList';

import { loadModels, maskify } from 'utils/maskify';

import unselected from 'assets/images/default/user.png';
import Notification from 'components/Notification';
import { DEFAULT_FACES, DEFAULT_MAKS } from './constants';
import styles from './styles.module.scss';

function App() {
  const [selectedFace, setSelectedFace] = useState({});
  const [selectedMask, setSelectedMask] = useState({});
  const [modelsUp, setModelsUp] = useState(false);
  const [masking, setMasking] = useState(false);
  const [notification, setNotification] = useState({});

  useEffect(() => {
    loadModels()
      .then(() => {
        // eslint-disable-next-line no-console
        console.log('Models up');
        setModelsUp(true);
      })
      .catch(() => {
        setModelsUp('false');
      });
  }, []);

  useEffect(() => {
    if (modelsUp && selectedMask.imageUrl && selectedFace.imageUrl) {
      setMasking(true);
      const imageContainer = document.querySelector(`.${styles.imageWrapper}`);
      const originalImage = document.querySelector(`.${styles.previewImage}`);
      setTimeout(async () => {
        const masked = await maskify(
          selectedMask.imageUrl,
          imageContainer,
          originalImage
        );
        if (masked === 'no-face')
          setNotification({
            message: 'No se detectó un rostro',
            className: 'is-danger'
          });
        if (masked === 'masked') {
          setNotification({});
        }
        setMasking(false);
      }, 200);
    }
  }, [selectedFace, selectedMask, modelsUp]);

  const cleanOverlay = () => {
    const elem = document.querySelector('#mask-overlay');
    if (elem) elem.parentNode.removeChild(elem);
  };

  const cleanLocalFace = () => {
    const localFace = document.querySelector('.file-input');
    localFace.value = null;
  };

  const handleDelete = () => {
    cleanOverlay();
    cleanLocalFace();
    setSelectedFace({});
    setNotification({});
  };

  const handleSelect = (image, method) => {
    if (image.key === selectedFace.key || image.key === selectedMask.key) return;
    cleanOverlay();
    cleanLocalFace();
    method(image);
  };

  const handleFile = files => {
    if (files.length) {
      cleanOverlay();
      setSelectedFace({
        imageUrl: URL.createObjectURL(files[0]),
        key: 'local-file'
      });
    }
  };

  return (
    <div className={styles.mainWrapper}>
      <h1 className="title is-1 has-text-centered">Póntelos!</h1>
      <Notification
        message={notification.message}
        className={notification.className}
        onDelete={() => setNotification({})}
      />
      <div className={styles.appContainer}>
        <ImageList
          list={DEFAULT_FACES}
          selectImage={face => handleSelect(face, setSelectedFace)}
          selectedKey={selectedFace.key}
        />
        <div className={styles.previewContainer}>
          <figure className={styles.imageWrapper}>
            {selectedFace?.imageUrl && (
              <button
                type="button"
                aria-label="delete"
                className={`delete is-large ${styles.delete}`}
                onClick={handleDelete}
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
              <input
                className="file-input"
                type="file"
                name="photo"
                onChange={e => handleFile(e.target.files)}
              />
              <span className="file-cta">
                <span className="file-icon">
                  <i className="fas fa-upload" />
                </span>
                <span className="file-label">Sube una foto…</span>
              </span>
            </label>
          </div>
          {masking && (
            <div className={styles.loaderContainer}>
              <div className={styles.loader} />
            </div>
          )}
        </div>

        <ImageList
          list={DEFAULT_MAKS}
          selectImage={mask => handleSelect(mask, setSelectedMask)}
          selectedKey={selectedMask.key}
        />
      </div>
    </div>
  );
}

export default App;
