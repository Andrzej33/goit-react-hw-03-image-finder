import { LoadMoreBtn } from "components/Button/Button";
import { ImageItem } from "components/ImageGalleryItem/ImageGaleryItem";
import {Loader} from "components/Loader/Loader"
import { Component } from "react"



const API_KEY = '34316934-23a1792d471904186ea8894b3';
const URL = 'https://pixabay.com/api/'



export class ImageGallery extends Component {

  state={
    total:1,
    page:1,
    images:[],
    loadingNothing:false,
    error:null,
    status:'idle'
  }

  componentDidUpdate(prevProps,prevState){
   if( prevProps.imageName !==this.props.imageName ||
    prevState.page !== this.state.page) {
    

    // console.log('changed name');
    this.setState({status:'pending'})
    fetch(`${URL}?q=${this.props.imageName}&page=${this.state.page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`)
    .then(res => {
    if(res.ok){
return res.json()
    }
  return Promise.reject(new Error(`nothing found to this key word ${this.props.name}`))
  })
  .then(data => {
      const hits  = data.hits
     
       if(!hits.length){
        this.setState({status:'idle',loadingNothing: true })
       return alert('we find nothing')
      }
      this.setState(prevState => ({
        page: prevState.page,
        total: data.total,
        status:'resolved',
          images: [...prevState.images, ...hits],
          
      }))
     
    //   const total = data.totalHits
    console.log(data.total);
  }
    ).catch(error=> this.setState({error,status:'rejected'}))
    
   }
  }

  loadNextPage = () => {
    this.setState(prevSt => ({
      page: prevSt.page + 1
    }));
  };



  render() {
    const{images,error,status,total} = this.state
    if(status==='pending') {
      return <Loader/>
    }
    if(status==='rejected') {
      return <div>{error.message}</div>
    }
    if(status==='rejected') {
      return <div>{error.message}</div>
    }
    if(status==='resolved' && total>12){
      return (
<>
<ul className="gallery">
      
      {images.map((image) => <li key={image.id}>
        <ImageItem image={image}/>
      </li>)}
    </ul>
        <LoadMoreBtn onLoadMore={this.loadNextPage}/>
</>
      )
            }
    if(status==='resolved') {
      return (
        <ul className="gallery">
      
      {images.map((image) => <li key={image.id}>
        <ImageItem image={image}/>
      </li>)}
    </ul>
      )
      }
   
    }}
    
//   return (
//     <ul className="gallery">
//       {error && <div>{error.message}</div>}
//       {loading && <div>downloading</div>}
//       {images && (images.map((image) => <li key={image.id}>
//         <ImageItem image={image}/>
//       </li>))}
    
// </ul>
// )
//   }
// }