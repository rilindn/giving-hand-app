import { CircularProgress } from '@mui/material';
import Button from '@mui/material/Button';
import clsx, { ClassValue } from 'clsx';

import styles from './Button.module.scss';

const CustomButton: React.FC<Props> = ({
  onClick,
  variant = 'contained',
  type = 'button',
  title,
  loading = false,
  rounded,
  customStyles,
  ...props
}) => {
  return (
    <Button
      onClick={onClick}
      className={clsx(customStyles, styles.main, { [styles.rounded]: !!rounded })}
      variant={variant}
      type={type}
      {...props}
    >
      {loading ? <CircularProgress size={25} /> : <span className={styles.title}>{title}</span>}
    </Button>
  );
};

interface Props {
  variant?: 'text' | 'outlined' | 'contained' | undefined;
  type?: 'button' | 'submit' | 'reset' | undefined;
  title?: string;
  loading?: boolean;
  rounded?: boolean;
  disabled?: boolean;
  customStyles?: ClassValue;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  color?: 'primary' | 'inherit' | 'secondary' | 'error' | 'info' | 'success' | 'warning' | undefined;
}

export default CustomButton;
