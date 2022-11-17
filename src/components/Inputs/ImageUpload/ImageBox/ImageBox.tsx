import React from 'react';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';

import styles from './ImageBox.module.scss';

interface Props {
  asButton?: boolean;
  url?: string;
  onClick?: () => void;
}

const ImageBox: React.FC<Props> = ({ asButton, url, onClick }) => {
  return (
    <div className={styles.main}>
      {asButton ? (
        <div className={styles.newImage} onClick={onClick}>
          <AddCircleOutlineRoundedIcon color="primary" fontSize="large" />
        </div>
      ) : (
        <img src={url ? url : ''} alt="r" />
      )}
    </div>
  );
};

export default ImageBox;
