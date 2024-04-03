import { useContext } from "react";
import { useEffect } from "react";
import { useGetUser } from "../../hooks/useGetUser.jsx";
import { UserAvatarContext } from "../../contexts/userAvatarProvider.jsx";

//COMPONENTE PARA OBTENER UN BANNER CON EL USERNAME Y LA FOTO DE PERFIL DEL USUARIO
export const UserBanner = () => {

  const userState = useGetUser();
  const {userAvatar, setUserAvatar} = useContext(UserAvatarContext);
  const avatarName = userState?.data?.user?.avatar;
  const userId = userState?.data?.user.id;

  useEffect(() => {
    if (avatarName) {
      setUserAvatar(`http://localhost:4000/uploads/users/${userId}/${avatarName}`);
      console.log('se ejecuta el use effect');
    }}, [avatarName, setUserAvatar, userId]);

  return (
    <div className="flex bg-purple-800 justify-end items-center">
      <h1 className="text-xl text-center text-white p-5">{userState.data.user.username}</h1>
      {userAvatar && <img className="w-10 h-10 rounded-full mr-10" src={userAvatar} alt='Imagen de perfil' />}
    </div>
  )
}
