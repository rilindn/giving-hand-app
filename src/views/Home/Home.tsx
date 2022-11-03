import React, { useEffect, useState } from 'react';
import { Skeleton } from '@mui/material';
import _ from 'lodash';

import styles from './Home.module.scss';
import Search from 'components/Search/Search';
import { getAllProducts } from 'api/ApiMethods';
import { IProduct } from 'interfaces/post';
import Product from './Product/Product';
import Categories from './Categories/Categories';

const Home: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const fetchProducts = async () => {
    try {
      const products = await getAllProducts();
      if (products?.status === 200) {
        setProducts(products.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className={styles.wrapper}>
      <Search />
      <div className={styles.content}>
        <Categories selectedCategories={selectedCategories} setSelectedCategories={setSelectedCategories} />
        {!loading ? (
          <div className={styles.products}>
            {products.map((product) => (
              <Product key={product?._id} product={product} />
            ))}
          </div>
        ) : (
          <div className={styles.products}>
            {_.range(6).map((m) => (
              <div key={m}>
                <Skeleton key={m} variant="rectangular" height={250} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
