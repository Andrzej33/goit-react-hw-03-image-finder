import{createPortal} from 'react-dom'
import { Overlay } from './Modal.styled'
import { ModalImg } from './Modal.styled'

const modalRoot = document.querySelector('#modal-root')

export const Modal = ({children}) =>(
 createPortal(   <Overlay>
 <ModalImg>
  {children}
  </ModalImg>
 </Overlay>
,modalRoot)
)