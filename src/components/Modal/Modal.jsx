import { Component } from 'react';
import{createPortal} from 'react-dom'
import { Overlay } from './Modal.styled'
import { ModalImg } from './Modal.styled'

const modalRoot = document.querySelector('#modal-root')

export class Modal extends Component{

componentDidMount(){
    window.addEventListener('keydown',this.handleKeyDown)
}

handleKeyDown = e=>{
    if(e.code==='Escape'){
        this.props.onClose()
    }
}
componentWillUnmount(){
    window.removeEventListener('keydown',this.handleKeyDown)
}

onBackdropClick=e=> {
    if(e.targer === e.CurrentTarget)
    this.props.onClose()
}

render() {
    return   createPortal(   <Overlay onClick={this.onBackdropClick}>
        <ModalImg>
         {this.props.children}
         </ModalImg>
        </Overlay>
       ,modalRoot,);
       
        }




}












  