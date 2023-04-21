import{createPortal} from 'react-dom'

const modalRoot = document.querySelector('#modal-root')

export const Modal = ({children}) =>(
 createPortal(   <div className="overlay">
 <div className="modal">
  {children}
 </div>
</div>,modalRoot)
)