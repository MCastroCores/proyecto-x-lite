import { useContext, useEffect, useState } from "react";
import { UserTokenContext } from "../contexts/userTokenProvider.jsx";
import { UserContext } from "../contexts/userProvider.jsx";

export const useGetTweets = () => {

const [isTouched, setIsTouched] = useState(false);
const [tweetState, setTweetState] = useState(null);
const {token} = useContext(UserTokenContext);
const {userState} = useContext(UserContext);

useEffect(() => {
  const fetchData = async () => {
    try {
      if (!token) {
        return;
      }
      console.log('Comprobamos que hay token...')
      const response = await fetch('http://localhost:4000/tweets', {
        headers: {
          method: 'GET',
          Authorization: `${token}`
        },
      });


      const data = await response.json();

      if (!response.ok){
        console.log('Llegamos a este error');
        setTweetState(null);
        throw new Error('Network response was not ok ' + response.statusText);
      }
      
      console.log(data);
      setTweetState(data);
     
      
      
      
    } catch (error) {
      console.log(error.message);
    }
  };
  
  fetchData();
  
  
  
}, [userState, token, isTouched]);

console.log(tweetState);
return [tweetState, setIsTouched, isTouched];

}