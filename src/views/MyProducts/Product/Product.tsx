import Chip from '@mui/material/Chip';
import _ from 'lodash';

import styles from './Product.module.scss';
import { IProduct } from 'interfaces/post';
import PlaceIcon from '@mui/icons-material/Place';

const Post: React.FC<Props> = ({ product }) => {
  return (
    <a href={`product/${product._id}`} className={styles.main}>
      <img className={styles.image} src={product.images[0]?.url} alt={product.title} />
      <div className={styles.details}>
        <div className={styles.categories}>
          {product.categories?.map((category) => (
            <Chip key={category} label={_.capitalize(category)} />
          ))}
        </div>
        <div className={styles.descriptionGroup}>
          <div className={styles.titleAndDescription}>
            <h2 className={styles.title}>{product.title}</h2>
            <p className={styles.description}>{product.description}</p>
          </div>
          <div className={styles.locationGroup}>
            <PlaceIcon color="primary" fontSize="medium" />
            <span className={styles.location}>{product.location}</span>
          </div>
        </div>
      </div>
    </a>
  );
};

interface Props {
  product: IProduct;
}

export default Post;
