


export const ImageGallery = ({images,id}) => (
    <ul class="gallery">
  {images.map((image) => <li key={id}>{image}</li>)}
</ul>
)