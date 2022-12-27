import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Close, Home, DriveFileRenameOutline, Inventory, Chat } from '@mui/icons-material';
import clsx from 'clsx';

import { ClickAwayListener } from '@mui/material';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import styles from './Sidebar.module.scss';

const Sidebar: React.FC<Props> = () => {
  const [isSidebarShown, setIsSidebarShown] = useState<boolean>(false);

  const handleClose = () => {
    setIsSidebarShown(false);
  };

  return (
    <ClickAwayListener onClickAway={handleClose}>
      <div className={styles.main}>
        <span className={styles.burgerIcon}>
          <MenuRoundedIcon fontSize="large" onClick={() => setIsSidebarShown(true)} />
        </span>

        <div className={clsx(styles.sidebar, { [styles.active]: isSidebarShown })}>
          <div className={styles.header}>
            <span className={styles.name}>Giving Hand</span>
            <Close onClick={handleClose} />
          </div>
          <NavLink
            to="/home"
            onClick={handleClose}
            className={({ isActive }) => clsx(styles.subContainer, { [styles.linkActive]: isActive })}
          >
            <div className={styles.item}>
              <Home className={styles.icon} />
              <span className={styles.sectionText}>Home</span>
            </div>
          </NavLink>
          <NavLink
            to="/my-products"
            onClick={handleClose}
            className={({ isActive }) => clsx(styles.subContainer, { [styles.linkActive]: isActive })}
          >
            <div className={styles.item}>
              <Inventory className={styles.icon} width={27} height={25} />
              <span className={styles.sectionText}>My Products</span>
            </div>
          </NavLink>
          <NavLink
            to="/my-requests"
            onClick={handleClose}
            className={({ isActive }) => clsx(styles.subContainer, { [styles.linkActive]: isActive })}
          >
            <div className={styles.item}>
              <DriveFileRenameOutline className={styles.icon} width={27} height={25} />
              <span className={styles.sectionText}>My Requests</span>
            </div>
          </NavLink>
          <NavLink
            to="/messages"
            onClick={handleClose}
            className={({ isActive }) => clsx(styles.subContainer, { [styles.linkActive]: isActive })}
          >
            <div className={styles.item}>
              <Chat className={styles.icon} width={27} height={25} />
              <span className={styles.sectionText}>Messages</span>
            </div>
          </NavLink>
        </div>
      </div>
    </ClickAwayListener>
  );
};

interface Props {}

export default Sidebar;
