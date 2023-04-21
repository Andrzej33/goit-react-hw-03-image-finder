// import PropTypes from 'prop-types';

export const IconButton = ({children,onClick,...allyProps}) => (
    <button type='button' className='iconButton' onClick={onClick} {...allyProps}>{children}</button>
)


IconButton.defaultProps={
    onClick:()=>null,
    children: null,
}

// IconButton.propTypes={
//     onClick:PropTypes.func.isRequired,
//     children:PropTypes.node,
//     'arial-label':PropTypes.string.isRequired,
// }

