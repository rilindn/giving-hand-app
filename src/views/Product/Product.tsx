import _ from 'lodash';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PlaceIcon from '@mui/icons-material/Place';
import Slider from 'react-slick';

import styles from './Product.module.scss';
import { IProduct } from 'interfaces/post';
import { getProductById } from 'api/ApiMethods';
import { Avatar, Chip, Modal } from '@mui/material';
import CustomButton from 'components/Button/Button';
import stringAvatar from 'utils/stringAvatar';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import RequestProduct from './RequestProduct/RequestProduct';

const Product: React.FC<Props> = ({}) => {
  const { id } = useParams();
  const [product, setProduct] = useState<IProduct>();
  const [isProductFormShown, setIsProductFormShown] = useState<boolean>(false);

  const getProduct = async () => {
    if (!id) return;
    const result = await getProductById(id);
    if (result?.status === 200) {
      console.log('first', result.data);
      setProduct(result.data);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  if (!product) return <div></div>;

  const fullName = `${product.user?.[0].firstName} ${product.user?.[0].lastName}`;

  return (
    <div className={styles.main}>
      <h2 className={styles.title}>{product.title}</h2>
      <div className={styles.product}>
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
            <p>{product.description}</p>
            <div className={styles.user}>
              <Avatar {...stringAvatar(fullName)} />
              <span>{fullName}</span>
            </div>
            <div className={styles.categories}>
              {product.categories?.map((category) => (
                <Chip key={category} label={_.capitalize(category)} />
              ))}
            </div>
            <span className={styles.location}>
              <PlaceIcon color="primary" fontSize="large" />
              {product.location}
            </span>
          </div>
          <CustomButton onClick={() => setIsProductFormShown(true)} title="Request" />
        </div>
      </div>
      <div className={styles.relatedProducts}>Related Products</div>
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
