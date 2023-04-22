// import { Component } from "react"
// import {toast} from 'react-toastify'

export const Searchbar =({onSubmit}) =>  {
// let imageName= '';

const handleSubmit = e => {
  e.preventDefault();
  const formData = new FormData(e.target)
  const imageName =formData.get('name').toLowerCase()
  if(imageName.trim()===''){
    // toast.info('введіть пошуковий запит')
    prompt('введіть пошуковий запит')
    return
  }
 
  onSubmit(imageName)
  e.target.reset()
}
 return(
  <header className="searchbar">
  <form className="form" onSubmit={handleSubmit} >
    <button type="submit" className="button">
      <span className="button-label">Search</span>
    </button>

    <input
    name="name"
      className="input"
      type="text"
      autoComplete="off"
      autoFocus
      placeholder="Search images and photos"
    />
  </form>
</header>
 )


}