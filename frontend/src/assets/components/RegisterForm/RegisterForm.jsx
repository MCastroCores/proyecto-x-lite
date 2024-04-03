import { useContext, useState } from 'react'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import './RegisterForm.css';
import { UserContext } from '../../contexts/userProvider.jsx';
import { UserAvatarContext } from '../../contexts/userAvatarProvider.jsx';
import { UserTokenContext } from '../../contexts/userTokenProvider.jsx';
import { registerUserSchema } from '../../schemas/users/registerUserSchema.js';

function RegisterForm() {

  const {token} = useContext(UserTokenContext);
  const {userState} = useContext(UserContext);
  const {userAvatar} = useContext(UserAvatarContext);

  const [successState, setSuccessState] = useState('');
  const [errorState, setErrorState] = useState('');

  const {register, handleSubmit, formState, reset} = useForm({
    mode: 'onTouched',
    resolver: zodResolver(registerUserSchema)
  });

  const { errors, isValid } = formState;

  
  const handleSubmitOwn = async (form) => {
    
    const fetchData = async () => {
      try {
        const user = {
          username: form.username, 
          email: form.email, 
          password: form.password
        };


        const response = await fetch('http://localhost:4000/users/register', {
          method: 'POST',
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify(user)
        });

        if (!response.ok){
          throw new Error('Network response was not ok ' + response.statusText);
        }

        const data = await response.json();

        console.log(data);
        setSuccessState('Usuario registrado, activa tu cuenta en el correo electrónico');
        console.log(successState);
        reset();
      } catch (error) {
        console.log(error.message)
        setErrorState(error.message);
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
    <form className='registerForm' onSubmit={handleSubmit(handleSubmitOwn)}>Registro
    <input className= 'inputRegisterForm' type="text" placeholder='Username...' {...register('username')}  />
    <p className='h-4 text-sm text-red-500'>{errors.username && errors.username.message}</p>
    <input className= 'inputRegisterForm' type="email" placeholder='Email...' {...register('email')}  />
    <p className='h-4 text-sm text-red-500'>{errors.email && errors.email.message}</p>
    <input className= 'inputRegisterForm' type="password" placeholder='Pass...' {...register('password')}  />
    <p className='h-8 text-sm text-red-500'>{errors.password && errors.password.message}</p>
    <button className= 'buttonRegisterForm' disabled={!isValid}>Enviar</button>
    </form>
    {(successState && <p className='pRegisterForm'>{successState}</p>)}
    {(errorState && <p className='pRegisterForm'>{errorState}</p>)}
    </>
  )
}

export default RegisterForm