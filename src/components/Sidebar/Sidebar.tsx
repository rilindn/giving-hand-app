import React from 'react';
import { NavLink } from 'react-router-dom';
import { Close, Home, PostAdd } from '@mui/icons-material';
import clsx from 'clsx';

import styles from './Sidebar.module.scss';

const Sidebar: React.FC<Props> = ({ isActive, onClose }) => {
  return (
    <div className={clsx(styles.main, { [styles.active]: isActive })}>
      <div className={styles.header}>
        <span className={styles.name}>Giving Hand</span>
        <Close onClick={onClose} />
      </div>
      <NavLink
        to="/home"
        onClick={onClose}
        className={({ isActive }) => styles.subContainer + (isActive ? ' ' + styles.linkActive : '')}
      >
        <div className={styles.item}>
          <Home className={styles.icon} />
          <span className={styles.sectionText}>Home</span>
        </div>
      </NavLink>
      <NavLink
        to="/my-products"
        onClick={onClose}
        className={({ isActive }) => styles.subContainer + (isActive ? ' ' + styles.linkActive : '')}
      >
        <div className={styles.item}>
          <PostAdd className={styles.icon} width={27} height={25} />
          <span className={styles.sectionText}>My Products</span>
        </div>
      </NavLink>
    </div>
  );
};

interface Props {
  isActive: boolean;
  onClose: () => void;
}

export default Sidebar;
