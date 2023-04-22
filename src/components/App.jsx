import {Component} from 'react';
import { Modal } from './Modal/Modal';
import { Searchbar } from './Searchbar/Searchbar';
import { ToastContainer } from 'react-toastify';
import { ImageGallery } from './ImageGallery/ImageGallrey';





export class App extends Component {
 
 state={
  imageName:'',
  // images:null,
  // loading:false,
 }
 
 
 searchSubmit = imageName=> {
  console.log(imageName);
  this.setState({imageName})
 }
 
 
 
 render(){
  return (
    <>
    <Searchbar onSubmit={this.searchSubmit}/>
    <div>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum dolor dolorum iure corrupti pariatur soluta sapiente velit, eaque aut quos voluptatum odit nostrum amet quibusdam optio. Doloribus suscipit iusto hic.
    </div>
    <ImageGallery imageName={this.state.imageName}/>
     <ToastContainer autoClose={3000}/>
    {this.state.loading && <h1>завантажуємо</h1>}
    
    <Modal><p>kjhlkjhkhj</p></Modal>
    </>
  );
 }
  
};
