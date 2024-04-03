// HOOK PERSONALIZADO PARA OBTENER LOS DATOS DEL USUARIO A TRAVÉS DE UN TOKEN


// PRIMERO IMPORTAMOS LOS CONTEXTOS NECESARIOS Y USEEFECT DE REACT
import { useContext, useEffect } from "react";
import { UserTokenContext } from "../contexts/userTokenProvider.jsx";
import { UserContext } from "../contexts/userProvider.jsx";

// CREAMOS EL HOOK PERSONALIZADO
export const useGetUser = () => {


  // COGEMOS LAS VARIABLES DEL USUARIO Y EL TOKEN DE SUS CONTEXTOS CORRESPONDIENTES
const {userState, setUserState} = useContext(UserContext);
const {token} = useContext(UserTokenContext);

//LANZAMOS EL USEEFFECT EL CUAL REALIZA UN FETCH PARA OBTENER LA INFORMACIÓN DEL USUARIO
useEffect(() => {
  const fetchData = async () => {
    try {
      if (!token) {
        return;
      }
      console.log('Comprobamos que hay token...')
      const response = await fetch('http://localhost:4000/users', {
        headers: {
          Authorization: `${token}`
        },
      });


      const data = await response.json();

      if (!response.ok){
        console.log('Llegamos a este error');
        setUserState(null);
        localStorage.removeItem('token');
        throw new Error('Network response was not ok ' + response.statusText);
      }
      
      console.log(data);
      setUserState(data);
     
      
      

    } catch (error) {
      console.log(error.message);
    }
  };

  token && fetchData();

  

}, [setUserState, token]);

// RETORNAMOS LA INFORMACIÓN DEL USUARIO
return userState;

}

