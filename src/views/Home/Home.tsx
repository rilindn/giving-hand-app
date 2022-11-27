import React, { useEffect, useState } from 'react';
import { Skeleton } from '@mui/material';
import _ from 'lodash';

import Search from 'components/Inputs/Search/Search';
import { getProducts } from 'api/ApiMethods';
import { IProduct } from 'interfaces/product';
import CustomButton from 'components/Inputs/Button/Button';
import styles from './Home.module.scss';
import Product from './Product/Product';
import Categories from './Categories/Categories';

const PRODUCTS_LIMIT = 12;
let pagination = 1;
let offset = 0;

const Home: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingMore, setLoadingMore] = useState<boolean>(true);
  const [search, setSearch] = useState<string>('');
  const [products, setProducts] = useState<IProduct[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [isEndOfResults, setIsEndOfResults] = useState<boolean>(false);

  const fetchProducts = async (loadMore?: boolean) => {
    if (loadMore) {
      offset = pagination * PRODUCTS_LIMIT;
      pagination = pagination + 1;
    }
    setLoadingMore(true);
    const categories = selectedCategories.join(',');
    try {
      const productsData = await getProducts({ search, categories, offset });
      if (productsData?.status === 200) {
        if (loadMore) {
          setProducts([...products, ...productsData.data]);
        } else {
          setProducts(productsData.data);
        }
        setIsEndOfResults(productsData.data.length < PRODUCTS_LIMIT);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingMore(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [search, selectedCategories]);

  return (
    <div className={styles.wrapper}>
      <Search setSearch={setSearch} />
      <div className={styles.content}>
        <Categories selectedCategories={selectedCategories} setSelectedCategories={setSelectedCategories} />
        {!loading ? (
          <div className={styles.productsContainer}>
            <div className={styles.products}>
              {products.map((product) => (
                <Product key={product?._id} product={product} />
              ))}
            </div>
            {isEndOfResults ? (
              <h3>End of results</h3>
            ) : (
              <CustomButton
                onClick={() => fetchProducts(true)}
                variant="outlined"
                title="Load more"
                loading={loadingMore}
              />
            )}
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
