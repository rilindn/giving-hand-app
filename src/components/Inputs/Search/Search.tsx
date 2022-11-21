import CustomInput from 'components/Inputs/Input/Input';
import { useForm } from 'react-hook-form';
import CustomButton from 'components/Inputs/Button/Button';

import InputAdornment from '@mui/material/InputAdornment';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { Dispatch, SetStateAction, useEffect } from 'react';
import styles from './Search.module.scss';

const Search: React.FC<Props> = ({ setSearch }) => {
  const { control, watch } = useForm();
  const search = watch('search');

  const handleSearch = () => {
    setSearch(search);
  };

  useEffect(() => {
    if (!search) setSearch(search);
  }, [search]);

  return (
    <div className={styles.main}>
      <h1>What FREE stuff are you looking for?</h1>
      <div className={styles.input}>
        <CustomInput
          control={control}
          rounded
          name="search"
          placeholder="Search"
          margin="none"
          onEnter={handleSearch}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchRoundedIcon />
              </InputAdornment>
            )
          }}
        />
        <CustomButton title="Search" rounded onClick={handleSearch} />
      </div>
    </div>
  );
};

interface Props {
  setSearch: Dispatch<SetStateAction<string>>;
}

export default Search;
