import { useState } from 'react';
import { Avatar, Modal, Menu, MenuItem } from '@mui/material';

import CustomButton from 'components/Inputs/Button/Button';
import ProductForm from 'components/Forms/ProductForm/ProductForm';
import useAuth from 'hooks/useAuth';
import stringAvatar from 'utils/stringAvatar';
import NotificationsPopper from 'components/NotificationsPopper/NotificationsPopper';
import UserProfileForm from 'components/Forms/UserProfileForm/UserProfileForm';
import styles from './Header.module.scss';

const Header: React.FC<Props> = () => {
  const { authData, handleSignOut } = useAuth();
  const [isProductFormShown, setIsProductFormShown] = useState<boolean>(false);
  const [isUserProfileFormShown, setIsUserProfileFormShown] = useState<boolean>(false);
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
        <NotificationsPopper />
        <div className={styles.user}>
          <span className={styles.fullName}>{fullName}</span>
          <Avatar onClick={(e) => handleClick(e)} {...stringAvatar(fullName)} />
          <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
            <MenuItem onClick={() => setIsUserProfileFormShown(true)}>
              <Avatar onClick={(e) => handleClick(e)} {...stringAvatar(fullName, 35, 35, 15)} />
              <span className={styles.yourProfile}>Your profile</span>
            </MenuItem>
            <MenuItem onClick={handleSignOut}>Logout</MenuItem>
          </Menu>
        </div>
      </div>
      <Modal className={styles.modal} open={isProductFormShown} onClose={() => setIsProductFormShown(false)}>
        <>
          <ProductForm onClose={() => setIsProductFormShown(false)} />
        </>
      </Modal>
      <Modal className={styles.modal} open={isUserProfileFormShown} onClose={() => setIsUserProfileFormShown(false)}>
        <>
          <UserProfileForm onClose={() => setIsUserProfileFormShown(false)} />
        </>
      </Modal>
    </div>
  );
};

interface Props {}

export default Header;
