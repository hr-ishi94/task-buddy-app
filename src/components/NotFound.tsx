import { NotFoundImage } from '../utils/constants'

const NotFound = () => {
  return (
    <div className='flex flex-col justify-center items-center h-screen'>
        <img src={NotFoundImage} alt="notfound" className='w-1/4'/>
    </div>
  )
}

export default NotFound