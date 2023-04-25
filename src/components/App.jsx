import {Component} from 'react';

import { Searchbar } from './Searchbar/Searchbar';
import { ToastContainer } from 'react-toastify';
import { ImageGallery } from './ImageGallery/ImageGallrey';
import { GlobalStyle } from './GlobalStyle/GlobalStyle';
import { AppContainer } from './ContainerApp/ContainerApp.styled';





export class App extends Component {
 
 state={
  imageName:'',
  // images:null,
  // loading:false,
 }
 
 
 searchSubmit = imageName=> {
  // console.log(imageName);
  this.setState({imageName})
 }
 
 
 
 render(){
  return (
    <AppContainer>
    <Searchbar onSubmit={this.searchSubmit}/>
    <ImageGallery imageName={this.state.imageName}/>
     <ToastContainer autoClose={3000}/>
    {/* {this.state.loading && <h1>завантажуємо</h1>} */}
    <GlobalStyle/>
    
    </AppContainer>
  );
 }
  
};
