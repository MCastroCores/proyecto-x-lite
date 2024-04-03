import { NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import './Header.css';
import { useContext } from 'react';
import { UserContext } from '../../contexts/userProvider.jsx';
import { UserTokenContext } from '../../contexts/userTokenProvider.jsx';




function Header() {

const {userState, setUserState} = useContext(UserContext);
const {setToken} = useContext(UserTokenContext);
let navigate = useNavigate();

const handleClickCloseSession = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUserState(null);
    navigate('/');
  }

  return (
    <header className='containerheader bg-purple-800'>
      <h1>X-LITE</h1>
      <NavLink to='/'>Dashboard</NavLink>
      {userState && <NavLink to='/profile'>Profile</NavLink>}
      {!userState &&
      <>
      <NavLink to='/register'>Registro</NavLink>
      <NavLink to='/login'>Login</NavLink>
      </>}
      {userState && <button className='buttonRegisterForm bg-red-600 text-white'  onClick={handleClickCloseSession}>Log Out</button>}
    </header>
  )
}

export default Header