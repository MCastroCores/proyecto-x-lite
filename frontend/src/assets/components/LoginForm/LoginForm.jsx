import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {loginUserSchema} from '../../schemas/users/loginUserSchema.js'

import './LoginForm.css';
import { UserContext } from '../../contexts/userProvider.jsx';
import { UserAvatarContext } from '../../contexts/userAvatarProvider.jsx';
import { UserTokenContext } from '../../contexts/userTokenProvider.jsx';

function LoginForm() {
  

  const [errorState, setErrorState] = useState(null);
  const {token, setToken} = useContext(UserTokenContext);
  const {userState} = useContext(UserContext);
  const {userAvatar} = useContext(UserAvatarContext);

  const { register, handleSubmit, formState, reset } = useForm({
    mode: 'onTouched',
    resolver: zodResolver(loginUserSchema)
  });

  const {errors, isValid} = formState;

  let navigate = useNavigate();

  
  const handleSubmitOwn = async (form) => {
    errorState && setErrorState(null);
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:4000/users/login', {
          method: 'POST',
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify({email: form.email, password: form.password})
        });

        const data = await response.json();

        if (!response.ok){
          throw new Error('Network response was not ok ' + response.statusText);
        }

       
        console.log(data.data.token);
       
        localStorage.setItem('token', data.data.token)
        setToken(data.data.token);
        reset()

        setTimeout(() => {
          navigate('/');
        }, 2000)

      } catch (error) {
        setErrorState(error);
        console.log(error.message);
      }
    }

    fetchData();
  }
  
  return token ? (
    <>
    {(userAvatar && userState &&
    <div className="flex border border-black justify-center items-center">
      <h1 className="text-3xl text-center  p-5"> Welcome {userState.data.user.username}</h1>
      <img className="w-10 h-10 rounded-full" src={userAvatar} alt='Imagen de perfil' />
    </div>
    )}
    <h2>Estas logueado puedes acceder a la dashboard</h2>
    </>
  ) : (
    <>
    <form className='registerForm' onSubmit={handleSubmit(handleSubmitOwn)}>Login
    <input className= 'inputRegisterForm' type="email"  placeholder='Email...' {...register('email')}  />
    <p className='h-4 text-sm text-red-500'>{errors.email && errors.email.message}</p>
    <input className= 'inputRegisterForm' type="password"  placeholder='Pass...'  {...register('password')}  />
    <p className='h-4 text-sm text-red-500'>{errors.password && errors.password.message}</p>
    <button className= 'buttonRegisterForm' disabled={!isValid}>Enviar</button>
    </form>
    {(errorState && <p className='pRegisterForm'>{errorState.message}</p>)}
    </>
  )
}

export default LoginForm;