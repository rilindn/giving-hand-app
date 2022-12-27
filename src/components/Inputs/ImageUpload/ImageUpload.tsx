import React from 'react';

import { Image } from '@mui/icons-material';
import styles from './ImageUpload.module.scss';
import ImageBox from './ImageBox/ImageBox';

interface ProductImages {
  url: string;
}

interface Props {
  productImages: ProductImages[];
  setProductImages: React.Dispatch<React.SetStateAction<ProductImages[]>>;
  isChat?: boolean;
}

const ImageUpload: React.FC<Props> = ({ productImages = [], setProductImages, isChat }) => {
  const openUploadWidget = () => {
    const cloudKeys = {
      cloudName: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME,
      uploadPreset: process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET
    };

    window.cloudinary.openUploadWidget(cloudKeys, (error: any, result: any) => {
      if (result.event === 'success') {
        setProductImages([
          ...productImages,
          {
            url: result.info.secure_url
          }
        ]);
      }
    });
  };

  return (
    <div className={styles.main}>
      {isChat ? (
        <Image fontSize="large" onClick={() => openUploadWidget()} className={styles.imageIcon} />
      ) : (
        <>
          <span className={styles.label}>Images</span>
          <div className={styles.inputWrapper}>
            {productImages?.map(({ url }) => {
              return <ImageBox key={url} url={url} />;
            })}
            <ImageBox asButton onClick={() => openUploadWidget()} />
          </div>
        </>
      )}
    </div>
  );
};

export default ImageUpload;
