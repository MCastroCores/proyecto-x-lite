import { Footer } from "../../components/Footer/Footer.jsx"
import Header from "../../components/Header/Header.jsx"
import RegisterForm from "../../components/RegisterForm/RegisterForm.jsx"

function Register() {
  return (
    <>
    <Header />
    <main className="min-h-screen">
    <RegisterForm />
    </main>
    <Footer />
    </>
  )
}

export default Register