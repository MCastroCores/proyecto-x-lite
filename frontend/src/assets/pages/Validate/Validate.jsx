import { useState } from 'react';
import {useParams} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header.jsx';
import { Footer } from '../../components/Footer/Footer.jsx';

function Validate() {

  let navigate = useNavigate();
  const {registrationCode} = useParams()
  const [activate, setActivate] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(registrationCode);
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:4000/users/validate/${registrationCode}`, {
          method: 'PUT'
        });

        if (!response.ok){
          throw new Error('Network response was not ok ' + Response.satusText);
        }

        const data = await response.json();
        console.log(data);

        setActivate(true);

        setTimeout(() => {
          navigate('/login');
        }, 2000)
       

      } catch (error) {
        console.log(error.message)
      }
    }

    fetchData();
  }
  return (
    <>
    <Header />
    <main className=' min-h-screen flex flex-col gap-14 justify-center items-center'>
      <p className='text-3xl'>!GRACIAS POR UNIRTE A X-LITE¡</p>
      <form onSubmit={handleSubmit}><button className= 'buttonRegisterForm'>Activa tu cuenta</button></form>
      {activate && <p>Tu cuenta ha sido activada con éxito</p>}
    </main>
    <Footer />
    </>
  )
}

export default Validate