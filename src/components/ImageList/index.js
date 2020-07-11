import React, { useState } from 'react';
import { arrayOf, shape, string, func } from 'prop-types';
import cn from 'classnames';

import styles from './styles.module.scss';

function ImageList({ list, selectImage }) {
  const [selectedKey, setSelectedKey] = useState('');

  const handleClick = (key, imageUrl) => {
    setSelectedKey(key);
    selectImage(imageUrl);
  };

  return (
    <div className={styles.imageList}>
      {list.map(({ imageUrl, key }) => (
        <img
          className={cn(styles.image, {
            [styles.selected]: key === selectedKey
          })}
          onClick={() => handleClick(key, imageUrl)}
          key={key}
          alt={key}
          src={imageUrl}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

ImageList.defaultProps = {
  list: []
};

ImageList.propTypes = {
  list: arrayOf(
    shape({
      key: string.isRequired,
      imageUrl: string.isRequired
    })
  ),
  selectImage: func.isRequired
};
export default ImageList;
