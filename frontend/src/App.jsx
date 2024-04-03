
import {Routes, Route} from "react-router-dom";

import Login from "./assets/pages/Login/Login.jsx";
import Register from "./assets/pages/Register/Register.jsx";
import Validate from "./assets/pages/Validate/Validate.jsx";
import Dashboard from "./assets/pages/Dashboard/Dashboard.jsx";
import {Profile} from "./assets/pages/Profile/Profile.jsx";

import { UserProvider } from "./assets/contexts/userProvider.jsx";
import { UserAvatarProvider } from "./assets/contexts/userAvatarProvider.jsx";
import { UserTokenProvider } from "./assets/contexts/userTokenProvider.jsx";


function App() {
  

  return (
    <>
    <UserProvider>
    <UserAvatarProvider>
    <UserTokenProvider>
    <Routes>
      <Route path='/' element={<Dashboard />} />
      <Route path='/register' element={<Register />} /> 
      <Route path='/login' element={<Login />} /> 
      <Route path='/validate/:registrationCode' element={<Validate />} />
      <Route path='/profile' element={<Profile />} />
    </ Routes>
    </UserTokenProvider>
    </UserAvatarProvider>
    </UserProvider>
    </>
  )
}

export default App
