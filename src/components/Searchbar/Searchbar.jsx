import {toast} from 'react-toastify'
// import { toast } from "react-hot-toast";
import { SlMagnifier } from 'react-icons/sl';
import { SearchBtn, SearchbarHeader } from './SearchBar.styled';
import { Form } from './SearchBar.styled';
import PropTypes from 'prop-types';

export const Searchbar = ({ onSubmit }) => {
  const handleSubmit = e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const imageName = formData.get('name').toLowerCase();
    if (imageName.trim() === '') {
      toast.info('YOUR SEARCH QUERY IS EMPTY',{position: toast.POSITION.TOP_CENTER})
     

      return;
    }

    onSubmit(imageName);
    e.target.reset();
  };
  return (
    <SearchbarHeader>
      <Form onSubmit={handleSubmit}>
        <SearchBtn type="submit">
          <span>
            <SlMagnifier size={25} />
          </span>
        </SearchBtn>

        <input
          name="name"
          className="input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </Form>
    </SearchbarHeader>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
