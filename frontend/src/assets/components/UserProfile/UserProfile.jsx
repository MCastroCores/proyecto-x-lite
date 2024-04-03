import { UserContext} from "../../contexts/userProvider.jsx"
import { UserAvatarContext } from "../../contexts/userAvatarProvider.jsx"
import { useContext, useRef, useState } from "react";
import { UserTokenContext } from "../../contexts/userTokenProvider.jsx";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {updateUserSchema} from '../../schemas/users/updateUserSchema.js'
import { useGetUser } from "../../hooks/useGetUser.jsx";
import { UserBanner } from "../UserBanner/UserBanner.jsx";


export const UserProfile = () => {


  const userState = useGetUser();
  const {setUserState} = useContext(UserContext);
  const {setUserAvatar} = useContext(UserAvatarContext);
  const {token} = useContext(UserTokenContext);
  const avatarRef = useRef();
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const userId = userState?.data?.user.id;



  const {register, handleSubmit, reset, formState} = useForm({
    mode: 'onTouched',
    resolver: zodResolver(updateUserSchema)
  });

  const {errors, isValid} = formState;


  const handleClickUploadImage = (e) => {
    setSelectedImage(e.target.files[0]);
    setPreviewImage(URL.createObjectURL(e.target.files[0]));
    console.log(userState);
    console.log('imagen seleccionada');
  }

  const handleFileUpload = async (e) => {
    e.preventDefault();
    console.log(token);
    console.log(selectedImage);
    if (!selectedImage) {
      console.log('Selecciona una imagen')
      return;
    }
    try {
      // Paso 4
      const formData = new FormData();
      formData.append('avatar', selectedImage);

      // Enviamos la solicitud al servidor
      const response = await fetch('http://localhost:4000/users/avatar', {
        method: 'PUT',
        headers: {
          Authorization: `${token}`
        },
        body: formData,
      });

      const data = await response.json();
    
      setUserAvatar(`http://localhost:4000/uploads/users/${userId}/${data.data.avatar}`);
      setPreviewImage(null);
      console.log(data)
      console.log(userState)
      console.log(token);
    
    } catch (err) {
      console.error('Ocurrió un error:', err);
     
    }
  };

  const handleSubmitOwn = async (form) => {
    console.log(form);
    try {
      const user = {
        username: form.username,
        email: form.email,
        bio: form.bio,
        hobbies: form.hobbies
      }
  
      const resp = await fetch('http://localhost:4000/users', {
        method: 'PUT',
        headers: {
          Authorization: `${token}`,
          'Content-type': 'application/json'
        },
        body: JSON.stringify(user)
      });
  
      if (!resp.ok) {
        throw new Error('Ha ocurrido un error con el fetch');
      }

      const data = await resp.json();
      console.log(data)
      setUserState(data)
      reset();
      
    } catch (error) {
      console.log(error.message)
    }
  };


  return (
    <>
    <UserBanner />
    <form className="flex flex-col w-4/5 justify-center items-center mt-10 mx-auto gap-5 border border-black" onSubmit={handleSubmit(handleSubmitOwn)}>Edita tu información de usuario
      <input className="border border-black p-3" type="text" placeholder="Username..." {...register('username')} />
      <p className='h-4 text-sm text-red-500'>{errors.username && errors.username.message}</p>
      <input className="border border-black p-3" type="text" placeholder="Email..." {...register('email')}/>
      <p className='h-4 text-sm text-red-500'>{errors.email && errors.email.message}</p>
      <input className="border border-black p-3 mb-10" type="text" placeholder="Biografía..." {...register('bio')}/>
      <p className='h-4 text-sm text-red-500'>{errors.bio && errors.bio.message}</p>
      <input className="border border-black p-3 mb-10" type="text" placeholder="Hobbies..." {...register('hobbies')}/>
      <p className='h-4 text-sm text-red-500'>{errors.message && errors.hobbies.message}</p>
      <button type="submit" className='buttonRegisterForm mt-5' disabled={!isValid}>Actualizar</button>
    </form>
    <form className="flex flex-col w-4/5 justify-center items-center my-10 mx-auto gap-5 border border-black" onSubmit={handleFileUpload}>Edita tu foto de perfil
      <input type="file" required ref={avatarRef} onChange={handleClickUploadImage} />
      <button type="submit" className='buttonRegisterForm mt-5'>Subir avatar</button>
      {previewImage && <img className="w-10 h-10 rounded-full mb-2" src={previewImage} alt='Imagen preseleccionada' />}
    </form>
    </>
  )
}
