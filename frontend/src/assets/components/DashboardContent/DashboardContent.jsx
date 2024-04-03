import PropTypes from "prop-types";
import { UserBanner } from "../UserBanner/UserBanner.jsx";
import { TweetForm } from "../TweetForm/TweetForm.jsx";
import moment from "moment";
import { useContext } from "react";
import { UserTokenContext } from "../../contexts/userTokenProvider.jsx";

function DashboardContent({ tweets, user, setIsTouched, isTouched }) {
  const { token } = useContext(UserTokenContext);
  console.log(token);
  console.log(tweets);
  console.log(user);

  const handleDeleteTweet = async (URL) => {
    try {
      const response = await fetch(URL, {
        method: "DELETE",
        headers: {
          Authorization: `${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        console.log("llegamos a este error");
        throw new Error();
      }

      console.log(data);
      setIsTouched(!isTouched);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <UserBanner />
      <main className="flex flex-col justify-center items-center md:flex-row min-h-screen md:mx-5">
        <section className="md:w-5/6 p-10">
          <h2 className="text-2xl mb-5">Tweets</h2>
          <ul className="flex flex-col border border-black mb-5 p-5 gap-3">
            {tweets?.data.tweets.map((tweet) => {
              return (
                <li
                  className="flex flex-col border border-black p-8 justify-around "
                  key={tweet.id}
                >
                  <p className="break-words mb-5">{tweet.text}</p>
                  <div className="flex flex-col md:flex-row justify-between">
                    <p className="text-sm">
                      {moment(tweet.createdAt).format("DD/MM/YY HH:mm:ss")}
                    </p>
                    <div className="flex gap-4">
                      <>
                        <p className="text-sm">{tweet.username}</p>
                        {user.data.user.id === tweet.userId && (
                          <button
                            onClick={() =>
                              handleDeleteTweet(
                                `http://localhost:4000/tweets/${tweet.id}`
                              )
                            }
                            className="border border-black bg-red-600 px-3"
                          >
                            D
                          </button>
                        )}
                      </>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>
        <div className="mb-5 md:self-start">
          <TweetForm setIsTouched={setIsTouched} isTouched={isTouched} />
        </div>
      </main>
    </>
  );
}

DashboardContent.propTypes = {
  token: PropTypes.object,
  tweets: PropTypes.object,
  user: PropTypes.object,
};

export default DashboardContent;
