import { Component } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { Searchbar } from './Searchbar/Searchbar';
import { Slide, ToastContainer } from 'react-toastify';
import { ImageGallery } from './ImageGallery/ImageGallrey';
import { GlobalStyle } from './GlobalStyle/GlobalStyle';
import { AppContainer } from './ContainerApp/ContainerApp.styled';

export class App extends Component {
  state = {
    imageName: '',
  };

  //  Отримуємо пошуковий запит з Input при submit та записуємо в state

  searchSubmit = imageName => {
    this.setState({ imageName });
  };

  render() {
    return (
      <AppContainer>
        <Searchbar onSubmit={this.searchSubmit} />
        <ImageGallery imageName={this.state.imageName} />
        <ToastContainer autoClose={2500} transition={Slide}  />

        <GlobalStyle />
      </AppContainer>
    );
  }
}
