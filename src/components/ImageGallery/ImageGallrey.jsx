import { LoadMoreBtn } from "components/Button/Button";
import { ImageItem } from "components/ImageGalleryItem/ImageGaleryItem";
import {Loader} from "components/Loader/Loader"
import { Modal } from "components/Modal/Modal";
import { Component } from "react";
import { GalleryList } from "./ImageGallery.styled";




const API_KEY = '34316934-23a1792d471904186ea8894b3';
const URL = 'https://pixabay.com/api/'



export class ImageGallery extends Component {

  state={
    total:1,
    page:1,
    images:[],
    loading:false,
    error:null,
    showModal:false,
  }

  componentDidUpdate(prevProps,prevState){
   if( prevProps.imageName !==this.props.imageName ||
    prevState.page !== this.state.page) {
    

    
    this.setState({loading:true})
    fetch(`${URL}?q=${this.props.imageName}&page=${this.state.page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`)
    .then(res => {
    if(res.ok){
return res.json()
    }
 console.log('somrthing wrong');
    return Promise.reject(new Error(`An error occurred, please try again later`))
  })
  .then(data => {
      const hits  = data.hits
     
       if(!hits.length){
       
       return alert('we find nothing')
      }
      if(prevProps.imageName !==this.props.imageName){
         this.setState({total: data.total,images:[...hits],
        page:1, })
       return 
      }
      this.setState(prevState => ({
        
        total: data.total,
        
          images: [...prevState.images, ...hits],
          
      }))
     
    
    // console.log(this.state.page);
  }
    ).catch(error => {
      this.setState({ error: error.message });
    })
    .finally(() => {
        this.setState({ loading: false });
      });
    
   }
  }

  loadNextPage = () => {
    this.setState(prevSt => ({
      page: prevSt.page + 1
    }));
  };


  openModal =(largeImageURL,alt)=>{
      this.setState({showModal:true,largeImageURL,alt})
    // console.log(largeImageURL,alt);
  }
  closeModal = () => {

    this.setState({showModal:false})
  };

// openModal=(largeImageURL,alt) =>{
//   this.setState({showModal:true,largeImageURL,alt})
//   console.log(largeImageURL,alt);
// }

  render() {
    const{images,error,total,loading,page,showModal,largeImageURL,alt} = this.state
   
    
      return (
<>

{showModal && <Modal onClose={this.closeModal}>
  <img src={largeImageURL} alt={alt} />
  </Modal>}
<GalleryList>
{error && (
              <div>{error}</div>
        )}
        <ImageItem images={images} openModal={this.openModal}/>
     
      
        
        </GalleryList>
        {loading && <Loader />}
        {total/12 > page && (<LoadMoreBtn onLoadMore={this.loadNextPage}/>)}
    </>

      )
            }

          }




          