
import { MagnifyingGlass } from  'react-loader-spinner'



export const Loader =()=> (
    <MagnifyingGlass
  visible={true}
  height="100"
  width="100"
  ariaLabel="MagnifyingGlass-loading"
  wrapperStyle={{
    display: 'block',
          marginTop: 10,
          marginLeft: 'auto',
          marginRight: 'auto',
  }}
  wrapperClass="MagnifyingGlass-wrapper"
  glassColor = '#c0efff'
  color = '#e4640f'
/>
)