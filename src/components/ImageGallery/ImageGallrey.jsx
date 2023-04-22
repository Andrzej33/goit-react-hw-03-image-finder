import { ImageItem } from "components/ImageGalleryItem/ImageGaleryItem"
import { Component } from "react"





export class ImageGallery extends Component {

  state={
    total:1,
    page:1,
    images:[],
    loading:false,
    error:null,
  }

  componentDidUpdate(prevProps,prevState){
   if( prevProps.imageName !==this.props.imageName) {
    const KEY = '34316934-23a1792d471904186ea8894b3'

    // console.log('changed name');
    this.setState({loading:true})
    fetch(`https://pixabay.com/api/?q=${this.props.imageName}&page=1&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`).then(res => {
    if(res.ok){
return res.json()
    }
  return Promise.reject(new Error(`nothing found to this key word ${this.props.name}`))
  }).then(data => {
      const hits  = data.hits
      // const {id,webformatURL,largeImageUR} = hits
      // console.log(id,webformatURL,largeImageUR);
      this.setState(prevState => ({
        page: prevState.page,
          images: [...prevState.images, ...hits], // додаємо нові картинки до масиву
          total: data.total,
      }))
    //   const total = data.totalHits
    // console.log(hits,total);
  }
    ).catch(error=> this.setState({error}))
    .finally(()=>this.setState({loading:false}))
   }
  }
  render() {
    const{images,loading,error} = this.state
  return (
    <ul className="gallery">
      {error && <div>{error.message}</div>}
      {loading && <div>downloading</div>}
      {images && (images.map((image) => <li key={image.id}>
        <ImageItem image={image}/>
      </li>))}
    
</ul>
)
  }
}