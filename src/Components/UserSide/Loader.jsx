import { jellyTriangle } from 'ldrs'
function Loader() {
    jellyTriangle.register()
  return (
    <div className='flex justify-center items-center w-full h-screen bg-opacity-15'>
<l-jelly-triangle
  size="30"
  speed="1.75" 
  color="black" 
></l-jelly-triangle>
    </div>
  )
}

export default Loader
