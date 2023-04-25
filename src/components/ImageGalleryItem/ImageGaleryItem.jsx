
export const ImageItem =({images,openModal}) => (
    <>
 {images.map((image) => <li key={image.id}
      onClick={()=>{openModal(image.largeImageURL,image.tags)} } >
      <img src={image.webformatURL} alt={image.tags} />  
      </li>)}
      </>
)