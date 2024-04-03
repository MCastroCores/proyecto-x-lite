import Header from "../../components/Header/Header.jsx";
// import { useContext } from 'react';
// import { useEffect } from 'react';
import DashboardContent from "../../components/DashboardContent/DashboardContent.jsx";
// import { UserContext } from '../../contexts/userProvider.jsx';
// import { UserTokenContext } from '../../contexts/userTokenProvider.jsx';
import { Footer } from "../../components/Footer/Footer.jsx";
import { useGetUser } from "../../hooks/useGetUser.jsx";
import { useGetTweets } from "../../hooks/useGetTweets.jsx";
import { useContext, useEffect } from "react";
import { UserAvatarContext } from "../../contexts/userAvatarProvider.jsx";

function Dashboard() {
  const userState = useGetUser();
  const [tweetState, setIsTouched, isTouched] = useGetTweets();
  const { setUserAvatar } = useContext(UserAvatarContext);
  const avatarName = userState?.data?.user?.avatar;
  const userId = userState?.data?.user.id;

  console.log(userState);

  // USEEFFECT PARA RECUPERAR LA IMAGEN DEL AVATAR
  useEffect(() => {
    if (avatarName) {
      setUserAvatar(
        `http://localhost:4000/uploads/users/${userId}/${avatarName}`
      );
      console.log("se ejecuta el use effect");
    }
  }, [avatarName, setUserAvatar, userId]);

  console.log(tweetState);

  return userState ? (
    <>
      <Header />
      <main className="min-h-screen">
        <DashboardContent
          tweets={tweetState}
          user={userState}
          setIsTouched={setIsTouched}
          isTouched={isTouched}
        />
      </main>
      <Footer />
    </>
  ) : (
    <>
      <Header />
      <main className="min-h-screen">
        <section>
          <h2 className="text-3xl font-bold text-center p-5">
            ¡Bienvenido a minitwitter!
          </h2>
          <p className="text-2xl mx-2 text-center">
            Registrate o inicia sesión para disfrutar de este sitio web
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Dashboard;
