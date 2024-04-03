import { Footer } from "../../components/Footer/Footer.jsx"
import Header from "../../components/Header/Header.jsx"
import { UserProfile } from "../../components/UserProfile/UserProfile.jsx"

export const Profile = () => {
  return (
    <>
    <Header />
    <main className="min-h-screen">
      <UserProfile />
    </main>
    <Footer />
    </>
  )
}
