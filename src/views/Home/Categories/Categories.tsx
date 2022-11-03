import React, { useEffect } from 'react';

import styles from './Categories.module.scss';
import categories from 'data/categories';
import { Chip } from '@mui/material';

const Categories: React.FC<Props> = ({ selectedCategories, setSelectedCategories }) => {
  const handleCategoriesFilter = (value: string) => {
    if (value === 'all') {
      setSelectedCategories([]);
      localStorage.setItem('categoryFilters', '');
    } else if (selectedCategories.includes(value)) {
      const newValue = selectedCategories.filter((c) => c !== value);
      setSelectedCategories(newValue);
      localStorage.setItem('categoryFilters', JSON.stringify(newValue));
    } else {
      const newValue = [...selectedCategories, value];
      setSelectedCategories(newValue);
      localStorage.setItem('categoryFilters', JSON.stringify(newValue));
    }
  };

  const loadSelectedCategoriesFromLocalStorage = () => {
    const valueFromLocalStorage = localStorage.getItem('categoryFilters');
    if (valueFromLocalStorage) {
      const catg: string[] = JSON.parse(valueFromLocalStorage);
      setSelectedCategories(catg || []);
    }
  };

  useEffect(() => {
    loadSelectedCategoriesFromLocalStorage();
  }, []);

  return (
    <div className={styles.main}>
      <Chip
        key="all"
        label="All"
        onClick={() => handleCategoriesFilter('all')}
        className={!selectedCategories?.length ? styles.selected : ''}
      />
      {categories.map(({ label, value }) => (
        <Chip
          key={value}
          onClick={() => handleCategoriesFilter(value)}
          className={selectedCategories.includes(value) ? styles.selected : ''}
          label={label}
        />
      ))}
    </div>
  );
};

interface Props {
  selectedCategories: string[];
  setSelectedCategories: React.Dispatch<React.SetStateAction<string[]>>;
}

export default Categories;
