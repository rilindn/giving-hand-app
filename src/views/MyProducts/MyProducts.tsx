import { useEffect, useState } from 'react';
import _ from 'lodash';
import { useSnackbar } from 'notistack';
import { Skeleton } from '@mui/material';

import { IProduct } from 'interfaces/product';
import useAuth from 'hooks/useAuth';
import { deleteProduct, getMyProducts } from 'api/ApiMethods';
import Product from './Product/Product';
import styles from './MyProducts.module.scss';

const MyProducts: React.FC<Props> = () => {
  const { authData } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
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

  const handleDeleteProduct = async (id: string) => {
    const result = await deleteProduct(id);
    if (result?.status === 200) {
      setProducts(products.filter((p) => p._id !== id));
      enqueueSnackbar('Product deleted!', { variant: 'info' });
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <h2 className={styles.title}>My Products</h2>
        {loading ? (
          <div className={styles.products}>
            {_.range(6).map((m) => (
              <div key={m}>
                <Skeleton key={m} variant="rectangular" height={250} />
              </div>
            ))}
          </div>
        ) : products?.length ? (
          <div className={styles.products}>
            {products.map((product: IProduct) => (
              <Product key={product?._id} product={product} handleDeleteProduct={handleDeleteProduct} />
            ))}
          </div>
        ) : (
          <h5>No products to show</h5>
        )}
      </div>
    </div>
  );
};

interface Props {}

export default MyProducts;
