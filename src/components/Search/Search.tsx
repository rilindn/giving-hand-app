import CustomInput from 'components/Input/Input';
import styles from './Search.module.scss';
import { useForm } from 'react-hook-form';
import CustomButton from 'components/Button/Button';

import InputAdornment from '@mui/material/InputAdornment';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';

const Search: React.FC<Props> = () => {
  const { control } = useForm();

  return (
    <div className={styles.main}>
      <h1>What FREE stuff are you looking for?</h1>
      <div className={styles.input}>
        <CustomInput
          control={control}
          rounded
          name="search"
          margin="none"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchRoundedIcon />
              </InputAdornment>
            )
          }}
        />
        <CustomButton title="Search" rounded />
      </div>
    </div>
  );
};

interface Props {}

export default Search;
