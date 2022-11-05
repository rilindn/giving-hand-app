import { useEffect, useState } from 'react';
import _ from 'lodash';
import { Skeleton } from '@mui/material';

import { IProduct } from 'interfaces/post';
import styles from './MyProducts.module.scss';
import useAuth from 'hooks/useAuth';
import { getMyProducts } from 'api/ApiMethods';
import Product from './Product/Product';

const MyProducts: React.FC<Props> = () => {
  const { authData } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const [products, setProducts] = useState<IProduct[]>([]);

  const fetchProducts = async () => {
    try {
      const products = await getMyProducts(authData?._id);
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
      <div className={styles.content}>
        <h2 className={styles.title}>My Products</h2>
        {!loading ? (
          <div className={styles.products}>
            {products.map((product: IProduct) => (
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

interface Props {}

export default MyProducts;
