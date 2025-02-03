import { FC } from 'react'
import { GoogleLogo, Screenshot, TaskLogo } from '../utils/constants'
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { auth } from '../config/firebase'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { login } from '../redux/authSlice'


const Login:FC = () => {

    const provider = new GoogleAuthProvider()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const userLogin= ()=>{

        signInWithPopup(auth,provider).then((result)=>{
            
            const credential = GoogleAuthProvider.credentialFromResult(result)
            const token = credential?.accessToken
            console.log(token,'token');
            
            const user = result.user
            const userData = {
                uid: user.uid,
                displayName: user.displayName,
                email: user.email,
                photoURL: user.photoURL,
              };

            dispatch(login(userData));
            navigate('/tasks')
            
            }).catch((error)=>{
                const errorCode = error.code
                const errorMessage = error.message
                
                const email = error.customData.email
        
                const credential = GoogleAuthProvider.credentialFromError(error)
                console.log(errorCode,'errorcode',credential,'credential')
            
                console.log(errorMessage,'message',email,'email')
                
            })
    
    }

  return (
    <div className="flex overflow-hidden justify-between h-screen w-screen px-20 bg-[#FFF9F9]">
        <div className='flex flex-col items-start justify-center w-2/4 h-screen pl-10 max-lg:w-full  '>
            <div className='flex text-customPurple max-lg:items-center max-lg:ml-6 '>
                <img src={TaskLogo} alt="task_logo" className='mx-2'/>
                <h1 className='font-bold text-2xl max-lg:justify-center items-center max-lg:text-3xl'> TaskBuddy</h1>
            </div>
            <div className="w-3/5 px-2 mt-3 max-lg:w-full max-lg:px-0 max-lg:text-center">
                <p className='text-xs font-medium mb-8 '>Streamline your workflow progress effortlessly with our all-in-one task management app.</p>
                <button onClick={userLogin} className='hover:bg-zinc-950 bg-zinc-800 text-white p-2 text-md flex w-72 rounded-xl items-center justify-center'><img src={GoogleLogo} alt="google_logo" className='w-5 h-5 mx-2'/> Continue with Google</button>
            </div>
        </div>
        <div className='flex h-screen w-6/12 pt-10 relative max-lg:hidden'>
        <div className={`border-2 border-customPurple w-full h-full  rounded-full border-opacity-30 flex flex-col items-center justify-center p-9`}>
            <div className={`border-2 border-customPurple w-full h-full  rounded-full border-opacity-35 flex flex-col items-center justify-center p-12`}>
                <div className={`border-2 border-customPurple w-full h-full  rounded-full border-opacity-55`} >
                </div>
            </div>
        </div>
            <div className="absolute top-20 left-32 z-10 w-full h-5/6 overflow-hidden py-2 shadow-lg rounded-lg">
                <img src={Screenshot} alt="login_demo" className='w-full h-screen rounded-lg border-2 shadow-md  '/>
            </div>
        </div>
        {/* <div className='lg:hidden absolute'>

            <div className='absolute right-0 top-0' >
                <Circles section={'bl-full'}/>
            </div>
            <div className='absolute ' >
                <Circles section={'full'}/>
            </div>
            <div className='absolute r' >
                <Circles section={'r-full'}/>
            </div>
        </div> */}

        
        
    </div>
  )
}

export default Login