import PropTypes from 'prop-types';
import { GalleryItem } from './GalleryItem.styled';

export const ImageItem = ({ images, openModal }) => (
  <>
    {images.map((image, i) => (
      <GalleryItem
        key={i}
        onClick={() => {
          openModal(image.largeImageURL, image.tags);
        }}
      >
        <img src={image.webformatURL} alt={image.tags} />
      </GalleryItem>
    ))}
  </>
);

ImageItem.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object).isRequired,
  openModal: PropTypes.func.isRequired,
};
