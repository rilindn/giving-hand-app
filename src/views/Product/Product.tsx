import _ from 'lodash';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PlaceIcon from '@mui/icons-material/Place';
import Slider from 'react-slick';
import { Avatar, Chip, Modal } from '@mui/material';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import { GoogleMap, MarkerF, useLoadScript } from '@react-google-maps/api';

import { IProduct } from 'interfaces/product';
import { getProductById, getProducts } from 'api/ApiMethods';
import useAuth from 'hooks/useAuth';
import CustomButton from 'components/Button/Button';
import stringAvatar from 'utils/stringAvatar';
import moment from 'moment';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import RequestProduct from './RequestProduct/RequestProduct';
import RelatedProducts from './RelatedProducts/RelatedProducts';
import ProductRequests from './ProductRequests/ProductRequests';
import styles from './Product.module.scss';

const libraries: ('drawing' | 'geometry' | 'localContext' | 'places' | 'visualization')[] = ['places'];

const Product: React.FC<Props> = ({}) => {
  const { id } = useParams();
  const { authData } = useAuth();
  const [product, setProduct] = useState<IProduct>();
  const [isProductFormShown, setIsProductFormShown] = useState<boolean>(false);
  const [relatedProducts, setRelatedProducts] = useState<IProduct[]>([]);
  const googleMapsApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY!;
  const { isLoaded } = useLoadScript({
    googleMapsApiKey,
    libraries
  });

  const getProduct = async () => {
    if (!id) return;
    const result = await getProductById(id);
    if (result?.status === 200) {
      setProduct(result.data);
      getRelatedProducts(result.data.categories);
    }
  };

  const getRelatedProducts = async (categories: string[]) => {
    const categoriesQuery = categories.join(',');
    const result = await getProducts({ categories: categoriesQuery });
    if (result?.status === 200) {
      setRelatedProducts(result.data);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  if (!product) return <div></div>;

  const fullName = `${product.user?.[0].firstName} ${product.user?.[0].lastName}`;

  return (
    <div className={styles.main}>
      <div className={styles.product}>
        <h2 className={styles.title}>{product.title}</h2>
        <div className={styles.productData}>
          <div className={styles.slider}>
            <Slider
              arrows={true}
              dots={true}
              infinite={true}
              slidesToShow={1}
              slidesToScroll={1}
              nextArrow={<ArrowForwardIos color="info" fontSize="large" />}
              prevArrow={<ArrowBackIos color="info" fontSize="large" />}
            >
              {product.images.map((image) => (
                <div className={styles.slide} key={image.url}>
                  <div className={styles.background} style={{ backgroundImage: `url(${image.url})` }} />
                  <img className={styles.image} src={image.url} alt="" />
                </div>
              ))}
            </Slider>
          </div>
          <div className={styles.details}>
            <div>
              <div className={styles.header}>
                <div className={styles.user}>
                  <Avatar {...stringAvatar(fullName, 40, 40, 18)} />
                  <h3>{fullName}</h3>
                </div>
                <span className={styles.date}>{moment(product.createdAt).fromNow()}</span>
              </div>
              <p>{product.description}</p>
              <div className={styles.categories}>
                {product.categories?.map((category) => (
                  <Chip key={category} label={_.capitalize(category)} />
                ))}
              </div>
              <span className={styles.location}>
                <PlaceIcon color="primary" fontSize="large" />
                {product.location?.address}
              </span>
            </div>
            <CustomButton
              disabled={product.userId === authData._id}
              onClick={() => setIsProductFormShown(true)}
              title="Request"
            />
          </div>
        </div>
      </div>
      <div className={styles.map}>
        {isLoaded && (
          <GoogleMap zoom={9} mapContainerStyle={{ height: '100%' }} center={product.location}>
            <MarkerF
              position={{
                lat: product.location.lat,
                lng: product.location.lng
              }}
            />
          </GoogleMap>
        )}
      </div>

      {authData._id !== product?.user?.[0]?._id
        ? !!relatedProducts.length && <RelatedProducts products={relatedProducts} />
        : !!product.requests.length && <ProductRequests requests={product.requests} />}
      <Modal className={styles.modal} open={isProductFormShown} onClose={() => setIsProductFormShown(false)}>
        <>
          <RequestProduct productId={product._id} onClose={() => setIsProductFormShown(false)} />
        </>
      </Modal>
    </div>
  );
};

interface Props {}

export default Product;
