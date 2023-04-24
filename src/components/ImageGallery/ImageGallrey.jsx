import { LoadMoreBtn } from "components/Button/Button";
import { ImageItem } from "components/ImageGalleryItem/ImageGaleryItem";
import {Loader} from "components/Loader/Loader"
import { Modal } from "components/Modal/Modal";
import { Component } from "react";




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


  toggleModal =(largeImageURL,alt)=>{
    this.setState(({showModal})=>({showModal:!showModal,largeImageURL,alt}))
  }
  // openModal = (largeImageURL, alt) => {

  //   Використовуємо setState з функцією, яка приймає попередній стан і повертає новий.
  //   this.setState(({ showModal }) => {
  //     return { showModal: !showModal, largeImageURL, alt };
  //   });
  // };
// openModal=()

  render() {
    const{images,error,total,loading,page,showModal,largeImageURL,alt} = this.state
   
    
      return (
<>
{showModal && <Modal><img src={largeImageURL} alt={alt} /></Modal>}
<ul className="gallery">
{error && (
              <div>{error}</div>
        )}
      {images.map((image) => <li key={image.id} onClick={this.toggleModal(image.largeImageURL,image.tags)}>
        <ImageItem image={image}/>
      </li>)}
      {loading && <Loader />}
        {total/12 > page && (<LoadMoreBtn onLoadMore={this.loadNextPage}/>)}
        
    </ul>
    </>

      )
            }

          }