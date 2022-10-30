import React, { useEffect, useState } from 'react';

import styles from './Home.module.scss';
import Search from 'components/Search/Search';
import { getAllProducts } from 'api/ApiMethods';
import { IProduct } from 'interfaces/post';
import Post from './Post/Post';

const Home: React.FC = () => {
  const [products, setProducts] = useState<IProduct[]>([]);

  const fetchProducts = async () => {
    const products = await getAllProducts();
    if (products?.status === 200) {
      setProducts(products.data);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className={styles.wrapper}>
      <Search />
      <div className={styles.items}>
        {products.map((product) => (
          <Post key={product?._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Home;
