import styles from './Header.module.scss';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import CustomButton from 'components/Button/Button';
import { useState } from 'react';
import { Modal } from '@mui/material';
import ProductForm from 'components/ProductForm/ProductForm';

const Header: React.FC<Props> = () => {
  const [isProductFormShown, setIsProductFormShown] = useState<boolean>(false);

  return (
    <div className={styles.main}>
      <div className={styles.leftContainer}>
        <MenuRoundedIcon fontSize="large" />
        <span className={styles.name}>Giving Hand</span>
      </div>
      <div className={styles.rightContainer}>
        <CustomButton title="List a Product" onClick={() => setIsProductFormShown(true)} />
      </div>
      <Modal className={styles.modal} open={isProductFormShown} onClose={() => setIsProductFormShown(false)}>
        <>
          <ProductForm onClose={() => setIsProductFormShown(false)} />
        </>
      </Modal>
    </div>
  );
};

interface Props {}

export default Header;
