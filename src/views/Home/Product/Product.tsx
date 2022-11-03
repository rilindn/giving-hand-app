import Chip from '@mui/material/Chip';
import _ from 'lodash';

import styles from './Product.module.scss';
import { IProduct } from 'interfaces/post';

const Post: React.FC<Props> = ({ product }) => {
  return (
    <a
      href={`product/${product._id}`}
      className={styles.main}
      style={{
        backgroundImage: `url(${product.images[0]?.url})`
      }}
    >
      <div className={styles.categories}>
        {product.categories?.map((category) => (
          <Chip key={category} label={_.capitalize(category)} />
        ))}
      </div>
      <div className={styles.details}>
        <span className={styles.title}>{product.title}</span>
        <span className={styles.location}>{product.location}</span>
      </div>
    </a>
  );
};

interface Props {
  product: IProduct;
}

export default Post;
