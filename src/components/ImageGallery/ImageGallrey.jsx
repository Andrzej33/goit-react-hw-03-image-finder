import { LoadMoreBtn } from 'components/Button/Button';
import { ImageItem } from 'components/ImageGalleryItem/ImageGaleryItem';
import { Loader } from 'components/Loader/Loader';
import { Modal } from 'components/Modal/Modal';
import { Component } from 'react';
import { GalleryList } from './ImageGallery.styled';
import {toast} from 'react-toastify'

const API_KEY = '34316934-23a1792d471904186ea8894b3';
const URL = 'https://pixabay.com/api/';

export class ImageGallery extends Component {
  state = {
    total: 1,
    page: 1,
    images: [],
    loading: false,
    error: null,
    showModal: false,
  };

  // Проводимо перевірку чи змінився пошуковий запит або номер сторінки. Якщо так - робимо fetch

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.imageName !== this.props.imageName ||
      (prevState.page !== this.state.page && prevState.total === this.state.total)
    ) {
      // Вмикаємо Loader і посилаємо запит на backend через fetch

      this.setState({ loading: true });
      fetch(
        `${URL}?q=${this.props.imageName}&page=${prevProps.imageName === this.props.imageName? this.state.page: 1}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
      )
        .then(res => {
          // Проводимо перевірку відповіді з backend: якщо відповідь ок - розпарсимо її, в іншому випадку створюємо помилку з вказанням проблеми

          if (res.ok) {
            return res.json();
          }

          return Promise.reject(
            new Error(`An error occurred, please try again later`)
          );
        })
        .then(data => {
          const hits = data.hits;

          if (!hits.length) {
            return toast.info(`WE FIND NOTHING BY ${this.props.imageName} REQUEST`,{position: toast.POSITION.TOP_CENTER});
          }

          // Проводимо  перевірку? якщо новий пошуковий запит - то скидаємо номер сторінки та перезаписуємо масив обєктів на новий: якщо ж натискаємо на кнопку LoadMore - до попереднього запиту додаємо обєкти нового.

          if (prevProps.imageName !== this.props.imageName) {
            this.setState({ total: data.total, images: [...hits], page: 1 });
            return;
          }
          this.setState(prevState => ({
            total: data.total,

            images: [...prevState.images, ...hits],
          }));

          // Відловлюємо помилки та вимикаємо Loader.
        })
        .catch(error => {
          this.setState({ error: error.message });
        })
        .finally(() => {
          this.setState({ loading: false });
        });
    }
  }

  loadNextPage = () => {
    this.setState(prevSt => ({
      page: prevSt.page + 1,
    }));
  };

  // При натисканні на зображення - отримуємо посилання на велике зображення та його опис та додаємо ці дані в state, звідки передаємо їх саме в модальне вікно при його відкритті

  openModal = (largeImageURL, alt) => {
    this.setState({ showModal: true, largeImageURL, alt });
  };

  // Метод закриття модалки який ми прокидаємо далі і викликаємо на модалці

  closeModal = () => {
    this.setState({ showModal: false });
  };

  render() {
    const {
      images,
      error,
      total,
      loading,
      page,
      showModal,
      largeImageURL,
      alt,
    } = this.state;

    return (
      <>
        {showModal && (
          <Modal onClose={this.closeModal}>
            <img src={largeImageURL} alt={alt} />
          </Modal>
        )}
        <GalleryList>
          {error && <div>{error}</div>}
          <ImageItem images={images} openModal={this.openModal} />
        </GalleryList>
        {loading && <Loader />}
        {total / 12 > page && <LoadMoreBtn onLoadMore={this.loadNextPage} />}
      </>
    );
  }
}
