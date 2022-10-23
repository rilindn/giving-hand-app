import { CircularProgress } from '@mui/material';
import Button from '@mui/material/Button';
import styles from './Button.module.scss';

const CustomButton: React.FC<Props> = ({ variant = 'contained', type = 'button', title, loading = false }) => {
  return (
    <Button className={styles.main} variant={variant} type={type}>
      {loading ? <CircularProgress size={25} /> : <span className={styles.title}>{title}</span>}
    </Button>
  );
};

interface Props {
  variant?: 'text' | 'outlined' | 'contained' | undefined;
  type?: 'button' | 'submit' | 'reset' | undefined;
  title?: string;
  loading?: boolean;
}

export default CustomButton;
