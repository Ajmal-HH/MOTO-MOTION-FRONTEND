import { Audio } from 'react-loader-spinner'


function Loader() {
  return (
    <div className='flex justify-center items-center'>
      <Audio
  height="20"
  width="100"
  color="black"
  ariaLabel="loading"
/>
    </div>
  )
}

export default Loader
