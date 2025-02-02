import { Routes,Route, Navigate } from "react-router-dom"
import Login from "./pages/Login"
import Tasks from "./pages/Tasks"
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./config/firebase";
import { login, logout } from "./redux/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";

const ProtectedRoute = ({element})=>{
  const user = useSelector((state)=>state.auth.user)
  return user?element:<Navigate to="/" />
}
  
const PublicRoute = ({element})=>{ 
  const user = useSelector((state)=>state.auth.user)
  return user?<Navigate to="/tasks" />:element
}

function App() {
  
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userData = {
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
        };
        dispatch(login(userData));
      } else {
        dispatch(logout());
      }
    });

    return () => unsubscribe();
  }, [dispatch]);


  return (
    <div className="font-DM">
      <Routes>
        <Route path="/" element={<PublicRoute element={<Login/>}/> } />    
        <Route path="/tasks" element={<ProtectedRoute element={<Tasks/>}/>} />     
      </Routes>


      <ToastContainer position="bottom-center" />
    </div>
  )
}

export default App
