import styles from './Header.module.scss';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import CustomButton from 'components/Button/Button';
import { useState } from 'react';
import { Avatar, Modal } from '@mui/material';
import ProductForm from 'components/ProductForm/ProductForm';
import useAuth from 'hooks/useAuth';
import stringAvatar from 'utils/stringAvatar';

const Header: React.FC<Props> = () => {
  const { authData } = useAuth();
  const [isProductFormShown, setIsProductFormShown] = useState<boolean>(false);
  const fullName = `${authData.firstName} ${authData.lastName}`;

  return (
    <div className={styles.main}>
      <div className={styles.leftContainer}>
        <MenuRoundedIcon fontSize="large" />
        <span className={styles.name}>Giving Hand</span>
      </div>
      <div className={styles.rightContainer}>
        <CustomButton title="List a Product" onClick={() => setIsProductFormShown(true)} />
        <div className={styles.user}>
          <span>{fullName}</span>
          <Avatar {...stringAvatar(fullName)} />
        </div>
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
