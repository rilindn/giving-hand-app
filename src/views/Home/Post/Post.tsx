import Chip from '@mui/material/Chip';

import styles from './Post.module.scss';
import { IProduct } from 'interfaces/post';

const Post: React.FC<Props> = ({ product }) => {
  return (
    <div
      className={styles.main}
      style={{
        backgroundImage: `url(${product.images[0]?.url})`
      }}
    >
      <div className={styles.categories}>
        {product.categories?.map((category) => (
          <Chip color="info" key={category} label={category} />
        ))}
      </div>
      <div className={styles.details}>
        <span className={styles.title}>{product.title}</span>
        <span className={styles.location}>{product.location}</span>
      </div>
    </div>
  );
};

interface Props {
  product: IProduct;
}

export default Post;
