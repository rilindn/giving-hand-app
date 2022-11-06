import { ArrowBackIos } from '@mui/icons-material';

import styles from './PrevArrow.module.scss';

const PrevArrow = ({ currentSlide, slideCount, ...props }: any) => (
  <button
    {...props}
    className={['slick-prev slick-arrow' + (currentSlide === 0 ? ' slick-disabled' : ''), styles.main]}
    aria-hidden="true"
    aria-disabled={currentSlide === 0 ? true : false}
    type="button"
  >
    <ArrowBackIos color="info" fontSize="large" />
  </button>
);

export default PrevArrow;
