import React from 'react';
import { arrayOf, shape, string, func } from 'prop-types';
import cn from 'classnames';

import styles from './styles.module.scss';

function ImageList({ list, selectImage, selectedKey }) {
  return (
    <div className={styles.imageList}>
      {list.map(image => {
        const { key, imageUrl } = image;

        return (
          <img
            className={cn(styles.image, { [styles.selected]: key === selectedKey })}
            onClick={() => selectImage(image)}
            key={key}
            alt={key}
            src={imageUrl}
            aria-hidden="true"
          />
        );
      })}
    </div>
  );
}

ImageList.defaultProps = { list: [], selectedKey: '' };

ImageList.propTypes = {
  list: arrayOf(shape({ key: string.isRequired, imageUrl: string.isRequired })),
  selectImage: func.isRequired,
  selectedKey: string
};
export default ImageList;
