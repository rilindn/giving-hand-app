import { useEffect, useState } from 'react';
import _ from 'lodash';
import { useSnackbar } from 'notistack';
import { InputAdornment, Skeleton } from '@mui/material';

import { IProduct } from 'interfaces/product';
import useAuth from 'hooks/useAuth';
import { deleteProduct, getMyProducts } from 'api/ApiMethods';
import CustomSelect from 'components/Inputs/Select/Select';
import CustomInput from 'components/Inputs/Input/Input';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { useForm } from 'react-hook-form';
import styles from './MyProducts.module.scss';
import Product from './Product/Product';
import categories from '../../data/categories';

const MyProducts: React.FC<Props> = () => {
  const { authData } = useAuth();
  const { control, watch } = useForm();
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState<boolean>(false);
  const [products, setProducts] = useState<IProduct[]>([]);
  const search = watch('search') || '';
  const categoriesFilter = watch('categoriesFilter') || '';

  const fetchProducts = async () => {
    try {
      const products = await getMyProducts(authData?._id, search, categoriesFilter);
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
  }, [search, categoriesFilter]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <div className={styles.header}>
          <h2 className={styles.title}>My Products</h2>
          <div className={styles.filters}>
            <CustomSelect
              control={control}
              name="categoriesFilter"
              label="Categories"
              defaultValue="all"
              options={[{ label: 'All', value: 'all' }, ...categories]}
            />
            <CustomInput
              control={control}
              name="search"
              placeholder="Search"
              margin="none"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchRoundedIcon />
                  </InputAdornment>
                )
              }}
            />
          </div>
        </div>
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
