import { useState } from 'react';
import { Avatar, Modal, Menu, MenuItem } from '@mui/material';

import CustomButton from 'components/Button/Button';
import ProductForm from 'components/ProductForm/ProductForm';
import useAuth from 'hooks/useAuth';
import stringAvatar from 'utils/stringAvatar';
import { NotificationsOutlined } from '@mui/icons-material';
import styles from './Header.module.scss';

const Header: React.FC<Props> = () => {
  const { authData, handleSignOut } = useAuth();
  const [isProductFormShown, setIsProductFormShown] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const fullName = `${authData.firstName} ${authData.lastName}`;

  return (
    <div className={styles.main}>
      <div className={styles.leftContainer}>
        <span className={styles.name}>Giving Hand</span>
      </div>
      <div className={styles.rightContainer}>
        <CustomButton title="List a Product" onClick={() => setIsProductFormShown(true)} />
        <NotificationsOutlined fontSize="large" color="primary" />
        <div className={styles.user}>
          <span>{fullName}</span>
          <Avatar onClick={(e) => handleClick(e)} {...stringAvatar(fullName)} />
          <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
            <MenuItem onClick={handleSignOut}>Logout</MenuItem>
          </Menu>
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
