import { Component } from "react"




export class ImageGallery extends Component {


  componentDidUpdate(prevProps,prevState){
   if( prevProps.imageName !==this.props.imageName) {
    console.log('changed name');
   }
  }
  render() {
  return (
    <ul class="gallery">
  {/* {images.map((image) => <li key={id}>{image}</li>)} */}
</ul>
)
  }
}