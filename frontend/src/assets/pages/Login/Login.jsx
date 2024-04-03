import { Footer } from '../../components/Footer/Footer.jsx'
import Header from '../../components/Header/Header.jsx'
import LoginForm from '../../components/LoginForm/LoginForm.jsx'

function Login() {
  return (
    <>
    <Header />
    <main className='min-h-screen'>
      <LoginForm />
    </main>
    <Footer />
    </>
  )
}

export default Login