import { FC } from 'react'
import { GoogleLogo, Screenshot, TaskLogo } from '../utils/constants'
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { auth } from '../config/firebase'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { login } from '../redux/authSlice'
import Circles from '../components/Circles'


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

    
    <div className="flex overflow-hidden justify-between h-screen w-screen px-20 bg-[#FFF9F9] max-md:flex max-md:flex-col max-md:px-1 relative">


        <div className='flex flex-col items-start justify-center w-2/4 h-screen md:pl-10 max-lg:w-full max-md:flex max-md:flex-col max-md:justify-evenly max-md:mt-64 max-md:items-center '>
            <div className='flex flex-col items-center '>
            <div className='flex text-customPurple  '>
                <img src={TaskLogo} alt="task_logo" className='mx-2'/>
                <h1 className='font-bold text-2xl max-lg:justify-center items-center max-lg:text-3xl'> TaskBuddy</h1>
            </div>
            <div className="w-3/5 px-2 mt-3 max-lg:w-full max-lg:px-0 max-md:text-center  max-md:w-4/6 max-md:flex max-md:flex-col max-md:items-center">
                <p className='text-xs font-medium mb-8  '>Streamline your workflow progress effortlessly with our all-in-one task management app.</p>
                <button onClick={userLogin} className='hover:bg-zinc-950 bg-zinc-800 text-white p-2 text-md flex w-72 rounded-xl items-center justify-center'><img src={GoogleLogo} alt="google_logo" className='w-5 h-5 mx-2'/> Continue with Google</button>
            </div>
            </div>
            <div className='mx-16 md:hidden' >
                <Circles section={'full'}/>
            </div>
        </div>
        <div className='flex h-screen w-6/12 pt-10 relative max-lg:hidden'>
            <div className={`border-2 border-customPurple w-full h-full  rounded-full border-opacity-30 flex flex-col items-center justify-center p-9`}>
                <div className={`border-2 border-customPurple w-full h-full rounded-full border-opacity-35 flex flex-col items-center justify-center p-12`}>
                    <div className={`border-2 border-customPurple w-full h-full  rounded-full border-opacity-55`} >
                    </div>
                </div>
            </div>
                <div className="absolute top-20 left-32 z-10 w-full h-5/6 overflow-hidden py-2 shadow-lg rounded-lg">
                    <img src={Screenshot} alt="login_demo" className='w-full h-screen rounded-lg border-2 shadow-md  '/>
                </div>
            </div>
        
        
        
    </div>
  )
}

export default Login